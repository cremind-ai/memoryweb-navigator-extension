<template>
  <ContentWrap class="memoryweb-navigator-search-container">
    <template #title>
      <ElInput
        v-model="inputSearch"
        placeholder="Type something to search for history related websites"
        @keydown.enter="handleSearch"
      >
        <template #prefix>
          <Icon icon="teenyicons:search-outline" />
        </template>
        <template #append>
          <ElButton plain @click="handleSearch"> Search </ElButton>
        </template>
      </ElInput>
      <ElInput
        style="margin-top: 10px"
        v-model="inputDomain"
        placeholder="Only search within this domain, E.G: https://www.example.com"
      >
        <template #prefix>
          <Icon icon="ant-design:global-outlined" />
        </template>
      </ElInput>
    </template>
    <template #content>
      <div>
        <ElCard
          v-for="item in docsPayload"
          :key="item.id"
          class="memoryweb-navigator-search-box-card"
        >
          <ElPopover
            placement="bottom"
            title="Content"
            :width="600"
            trigger="hover"
          >
            <template #reference>
              <div
                class="memoryweb-navigator-image-card"
                @click="handleOpenUrl(item.data.url)"
              >
                <ElImage
                  v-if="item.data.image"
                  :src="item.data.image"
                  fit="cover"
                  :alt="'Image for ' + item.data.url"
                ></ElImage>
                <div v-else>
                  <!-- Display an icon or a placeholder image when there's no image -->
                  <Icon icon="ant-design:global-outlined" />
                </div>
              </div>
            </template>
            <template #default>
              <p>{{ item.data.content }}</p>
            </template>
          </ElPopover>
        </ElCard>
      </div>
    </template>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { ElImage } from "element-plus";
import { ElCard } from "element-plus";
import { ElPopover } from "element-plus";
import { Icon } from "@iconify/vue";
import { onMounted, reactive, Ref, ref, watch } from "vue";
import { ContentWrap } from "@/components";
import {
  CommunicationMessageTypeEnum,
  IPCMessageType,
  IPCTopicEnum,
  ResPayloadType,
} from "@/types";
import status from "@/constants/status";

type DocPayloadType = {
  id: number;
  data: {
    url: string;
    image: string | null;
    content: string;
  };
  items: Array<{
    id: number;
    text: string;
    metadata: any;
    score: number;
  }>;
};

const inputSearch = ref("");
const inputDomain = ref("");
// let docsPayload: DocPayloadType[] = reactive([]);
const docsPayload: Ref<DocPayloadType[]> = ref([]);
const handleOpenUrl = (url: string) => {
  if (url) {
    window.open(url, "_blank");
  }
};

const handleSearch = () => {
  if (inputSearch.value === "") {
    return;
  }
  let payload = {
    query: inputSearch.value,
    data: {
      url: inputDomain.value || null,
    },
  };
  if (inputDomain.value === "") {
    payload.data.url = null;
  }
  const data: IPCMessageType = {
    topic: IPCTopicEnum.COMMUNICATION,
    type: CommunicationMessageTypeEnum.SIMILARITY_SEARCH,
    payload: payload,
  };

  chrome.runtime.sendMessage(data, (response: ResPayloadType) => {
    if (response.status === status.SUCCESS) {
      docsPayload.value = response.payload;
      console.log(docsPayload.value);
    }
  });
};

onMounted(async () => {});
</script>

<style scoped>
.memoryweb-navigator-search-container {
  width: 700px;
}

.memoryweb-navigator-search-box-card {
  margin-bottom: 20px;
}

.memoryweb-navigator-image-card {
  cursor: default; /* Set the default cursor */
}

.memoryweb-navigator-image-card:hover {
  cursor: pointer; /* Change cursor to hand on hover */
}
</style>
