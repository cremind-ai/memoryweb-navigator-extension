export type ResPayloadType = {
  status: number;
  msg: string;
  payload?: any;
  requestId?: string;
  code?: number;
};

export enum CommunicationMessageTypeEnum {
  CHECK_AUTH = "check_auth",
  STORE_MEMORY = "store_memory",
  CAPTURE_SCREENSHOT = "capture_screenshot",
  SIMILARITY_SEARCH = "security_search",
  LOGOUT = "logout",
  MESSAGE = "message",
  ERROR = "error",
}

export enum IPCTopicEnum {
  COMMUNICATION = "communication",
}

export type IPCMessageType = {
  topic: IPCTopicEnum;
  type: CommunicationMessageTypeEnum;
  requestId?: string;
  payload?: any;
  message?: string;
  code?: number;
};
