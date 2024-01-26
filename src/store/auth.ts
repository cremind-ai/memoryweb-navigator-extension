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

export const useAuthStore = defineStore({
  id: "auth",
  actions: {
    getUserInfo(): Promise<ResPayloadType> {
      return new Promise<ResPayloadType>((resolve, reject) => {
        let resPayload: ResPayloadType;
        const data: IPCMessageType = {
          topic: IPCTopicEnum.COMMUNICATION,
          type: CommunicationMessageTypeEnum.CHECK_AUTH,
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
    logout(): Promise<ResPayloadType> {
      return new Promise<ResPayloadType>((resolve, reject) => {
        let resPayload: ResPayloadType;
        const data: IPCMessageType = {
          topic: IPCTopicEnum.COMMUNICATION,
          type: CommunicationMessageTypeEnum.LOGOUT,
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
