import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosError,
} from "axios";

import qs from "qs";

import { config } from "./config";

const { base_url } = config;

export const PATH_URL = base_url[import.meta.env.VITE_API_ENV];

const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: config.request_timeout,
  withCredentials: true,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.method === "post" &&
      (config.headers as AxiosRequestHeaders)["Content-Type"] ===
        "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }

    if (config.method === "get" && config.params) {
      let url = config.url as string;
      url += "?";
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

export { service };
