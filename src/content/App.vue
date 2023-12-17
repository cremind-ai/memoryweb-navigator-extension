<template>
  <div>Hello</div>
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { Icon } from "@iconify/vue";

onMounted(async () => {
  console.log("Memoryweb onMounted");
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      console.log("Trang web đã load xong");
      var allText = document.body.innerText;

      // Print the text to the console
      console.log(allText);
    }
  };
});
</script>

<style scoped></style>
