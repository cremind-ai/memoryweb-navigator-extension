<template></template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  onBeforeMount,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";

import {
  IPCMessageType,
  IPCTopicEnum,
  CommunicationMessageTypeEnum,
  ResPayloadType,
} from "@/types";

import { useAuthStore } from "@/store/auth";
import { useApiStore } from "@/store/api";
import { useUserSettingsStore } from "@/store/user_settings";
import status from "@/constants/status";

const authStore = useAuthStore();
const apiStore = useApiStore();
const userSettingsStore = useUserSettingsStore();

const isAuthenticated = computed(() => userSettingsStore.getAuthentication);

const resizedImageUrl = ref("");
const visiblePage = ref(false);

async function checkAuth() {
  await authStore.getUserInfo().then((res: ResPayloadType) => {
    if (res.status == status.SUCCESS) {
      userSettingsStore.setAuthentication(true);
    }
  });
}

async function storeMemory() {
  if (isAuthenticated.value) {
    const allText = document.body.innerText;
    const fullURL = window.location.href;

    if (resizedImageUrl.value !== "") {
      await apiStore
        .storeMemory(fullURL, allText, resizedImageUrl.value)
        .then((res: ResPayloadType) => {
          console.log(res);
          if (res.status == status.SUCCESS) {
            // Handle success
          }
        });
    }
  }
}

function checkPageFocusManual() {
  if (document.visibilityState === "visible") {
    console.log("Page is visible.");
    return true;
  } else {
    console.log("Page is not visible.");
    return false;
  }
}

async function getImageScreenshot(): Promise<string> {
  return new Promise((resolve, reject) => {
    const data: IPCMessageType = {
      topic: IPCTopicEnum.COMMUNICATION,
      type: CommunicationMessageTypeEnum.CAPTURE_SCREENSHOT,
    };
    chrome.runtime.sendMessage(data, (response: ResPayloadType) => {
      visiblePage.value = checkPageFocusManual();
      console.log(response, visiblePage.value);
      if (
        response.status == status.SUCCESS &&
        response.payload.screenshotUrl &&
        visiblePage.value
      ) {
        const image = new Image();
        image.src = response.payload.screenshotUrl;

        image.onload = function () {
          const height = 300;
          const ratio = height / image.height;
          const width = image.width * ratio;

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(image, 0, 0, width, height);

          const resizedImageUrl = canvas.toDataURL("image/jpeg");

          // Resolve the promise with the resized image URL
          resolve(resizedImageUrl);
        };

        image.onerror = function () {
          // Reject the promise if there's an error loading the image
          reject(new Error("Error loading image"));
        };
      } else {
        // Reject the promise if the response status is not SUCCESS
        reject(new Error("Failed to capture screenshot"));
      }
    });
  });
}

onBeforeMount(async () => {
  checkAuth();
  let observer: MutationObserver;
  let timeout: NodeJS.Timeout;

  async function handleInactivity() {
    await storeMemory();
    observer.disconnect();
  }

  observer = new MutationObserver((mutations) => {
    console.log("Initial DOM content has loaded");
    clearTimeout(timeout);
    timeout = setTimeout(handleInactivity, 5000);
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

document.addEventListener("visibilitychange", () => {
  visiblePage.value = checkPageFocusManual();
  if (visiblePage.value) {
    setTimeout(async () => {
      resizedImageUrl.value = await getImageScreenshot();
      await storeMemory();
    }, 500);
  }
});

onMounted(async () => {
  console.log("onMounted");
  resizedImageUrl.value = await getImageScreenshot();
  await storeMemory();

  // html2canvas(document.body, { height: 500, scale: 0.3 }).then((canvas) => {
  //   const imgData = canvas.toDataURL("image/png");
  //   console.log(imgData);
  //   // Use imgData for display or download
  // });
});
</script>

<style scoped></style>
