<template>
  <ElCard shadow="never">
    <template #header>
      <slot name="title">
        <div class="content-wrap-flex content-wrap-items-center">
          <span class="content-wrap-title">{{ title }}</span>
        </div>
      </slot>
    </template>
    <div>
      <slot name="content"></slot>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard } from "element-plus";

defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  content: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<style scoped>
.content-wrap-title {
  font-size: 16px;
  font-weight: bold;
}

.content-wrap-flex {
  display: flex;
}

.content-wrap-items-center {
  align-items: center;
}
</style>
