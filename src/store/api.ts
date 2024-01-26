import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import request from "@/config/axios";
import status from "@/constants/status";
import {
  CommunicationMessageTypeEnum,
  IPCMessageType,
  IPCTopicEnum,
  ResPayloadType,
} from "@/types";

export const useApiStore = defineStore({
  id: "api",
  actions: {
    storeMemory(
      url: string,
      content: string,
      image: string
    ): Promise<ResPayloadType> {
      return new Promise<ResPayloadType>((resolve, reject) => {
        let resPayload: ResPayloadType;
        const data: IPCMessageType = {
          topic: IPCTopicEnum.COMMUNICATION,
          type: CommunicationMessageTypeEnum.STORE_MEMORY,
          payload: {
            url,
            content,
            image,
          },
        };
        chrome.runtime.sendMessage(data, async (response) => {
          if (response.status === status.SUCCESS) {
            resolve(response);
          } else {
            ElMessage.error(response.msg);
            reject(resPayload);
          }
        });
      });
    },
  },
});
