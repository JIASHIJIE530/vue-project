import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import type { RequestOptions, Result } from "#/axios";
import type { CreateAxiosOptions } from "@/utils/http/axiosTransform";
import axios from "axios";
import { AxiosCanceler } from "./axiosCancel";
import { cloneDeep } from "lodash-es";

export class VAxios {
  private axiosInstance: AxiosInstance;

  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  setupInterceptors() {
    //
    const {
      axiosInstance,
      options: { transform },
    } = this;
    //检查有没有transform，拦截器配置
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();
    // 请求拦截器配置
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //查看是否有请求拦截器，没得话使用默认的
        const requestOptions =
          (config as unknown as any).requestOptions ??
          this.options.requestOptions;
        //是否忽略重复请求
        const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true;
        //是否需要添加token
        !ignoreCancelToken && axiosCanceler.addPending(config);
        //请求拦截器,处理config
        if (requestInterceptors && typeof requestInterceptors === "function") {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      undefined
    );
    // 请求拦截器错误处理
    requestInterceptorsCatch &&
      typeof requestInterceptorsCatch === "function" &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );
    // 响应拦截器配置
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && typeof responseInterceptors === "function") {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);
    // 响应拦截器错误处理
    responseInterceptorsCatch &&
      typeof responseInterceptorsCatch === "function" &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(axiosInstance, error);
      });
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    //cloneDeep:深拷贝
    let conf: CreateAxiosOptions = cloneDeep(config);
    // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
    if (config.cancelToken) {
      conf.cancelToken = config.cancelToken;
    }
    if (config.signal) {
      conf.signal = config.signal;
    }

    const transform = this.getTransform();

    const { requestOptions } = this.options;
    //合并配置
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformResponseHook } =
      transform || {};
    if (beforeRequestHook && typeof beforeRequestHook === "function") {
      //conf:请求地址，参数
      //opt:请求配置
      //返回处理好的conf
      conf = beforeRequestHook(conf, opt);
    }
    //
    conf.requestOptions = opt;

    // conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (
            transformResponseHook &&
            typeof transformResponseHook === "function"
          ) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && typeof requestCatchHook === "function") {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }
}
