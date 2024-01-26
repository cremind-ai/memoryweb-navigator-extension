import {
  IPCMessageType,
  IPCTopicEnum,
  CommunicationMessageTypeEnum,
  ResPayloadType,
} from "@/types";
import { ofetch } from "ofetch";
import status from "@/constants/status";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    const data: IPCMessageType = request;
    if (data && data.topic === IPCTopicEnum.COMMUNICATION) {
      console.log(data);
      let resPayload: ResPayloadType;
      switch (data.type) {
        case CommunicationMessageTypeEnum.CHECK_AUTH:
          ofetch(`${import.meta.env.VITE_CREMIND_API}/auth/user`, {
            method: "GET",
          })
            .then((response: any) => {
              resPayload = { ...response };
              sendResponse(resPayload);
            })
            .catch(function (error: any) {
              if (error.response) {
                resPayload = { ...error.response._data };
                sendResponse(resPayload);
              } else {
                resPayload.status = status.ERROR;
                resPayload.code = status.REQUEST_ERROR;
                resPayload.msg = error.message;
                sendResponse(resPayload);
              }
            });
          break;

        case CommunicationMessageTypeEnum.LOGOUT:
          ofetch(`${import.meta.env.VITE_CREMIND_API}/auth/logout`, {
            method: "GET",
          })
            .then((response: any) => {
              resPayload = { ...response };
              sendResponse(resPayload);
            })
            .catch(function (error: any) {
              if (error.response) {
                resPayload = { ...error.response._data };
                sendResponse(resPayload);
              } else {
                resPayload.status = status.ERROR;
                resPayload.code = status.REQUEST_ERROR;
                resPayload.msg = error.message;
                sendResponse(resPayload);
              }
            });
          break;

        case CommunicationMessageTypeEnum.STORE_MEMORY:
          ofetch(`${import.meta.env.VITE_CREMIND_API}/memory_navigator/store`, {
            method: "POST",
            body: data.payload,
          })
            .then((response: any) => {
              resPayload = { ...response };
              sendResponse(resPayload);
            })
            .catch(function (error: any) {
              if (error.response) {
                resPayload = { ...error.response._data };
                sendResponse(resPayload);
              } else {
                resPayload.status = status.ERROR;
                resPayload.code = status.REQUEST_ERROR;
                resPayload.msg = error.message;
                sendResponse(resPayload);
              }
            });
          break;

        case CommunicationMessageTypeEnum.SIMILARITY_SEARCH:
          ofetch(
            `${import.meta.env.VITE_CREMIND_API}/memory_navigator/search`,
            {
              method: "POST",
              body: data.payload,
            }
          )
            .then((response: any) => {
              resPayload = { ...response };
              sendResponse(resPayload);
            })
            .catch(function (error: any) {
              if (error.response) {
                resPayload = { ...error.response._data };
                sendResponse(resPayload);
              } else {
                resPayload.status = status.ERROR;
                resPayload.code = status.REQUEST_ERROR;
                resPayload.msg = error.message;
                sendResponse(resPayload);
              }
            });
          break;

        case CommunicationMessageTypeEnum.CAPTURE_SCREENSHOT:
          chrome.tabs.captureVisibleTab(
            { format: "jpeg", quality: 1 },
            (dataUrl) => {
              sendResponse({
                status: status.SUCCESS,
                payload: { screenshotUrl: dataUrl },
              });
            }
          );

          break;
      }
    }
  })();

  // Important! Return true to indicate you want to send a response asynchronously
  return true;
});
