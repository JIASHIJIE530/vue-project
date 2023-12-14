import type { AxiosTransform } from "./axiosTransform";
import type {  Result ,RequestOptions} from "#/axios";
import type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
  } from "axios";


export const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    return config;
  },

  // 请求成功处理
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {

    const { isTransformResponse, isReturnNativeResponse } = options;

    if (isReturnNativeResponse) {
      return res;
    }

    if (!isTransformResponse) {
      return res.data;
    }
    const { data } = res;
    if (!data) {
      throw new Error("request has no return value");
    }

    const { code, result, message } = res.data;

    if (code == 200) {
      return result;
    }
    return res;
  },

  // 请求失败处理
  requestCatchHook: (e, options) => {
    return Promise.reject(e);
  },

  // 请求之前的拦截器
  requestInterceptors: (config, options) => {
    return config;
  },

  // 请求之后的拦截器
  responseInterceptors: (res) => {
    return res;
  },

  // 请求之前的拦截器错误处理

  requestInterceptorsCatch: (error) => {
    return error;
  },
};
