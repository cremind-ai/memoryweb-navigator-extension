const config: {
  base_url: string;
  result_code: number | string;
  default_headers: AxiosHeaders;
  request_timeout: number;
} = {
  base_url: import.meta.env.VITE_CREMIND_API,
  result_code: "0000",
  request_timeout: 60000,

  /**
   * application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: "application/json",
};

export { config };
