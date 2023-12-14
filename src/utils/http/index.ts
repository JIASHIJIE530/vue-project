import {VAxios} from './axios'
import {transform} from './axiosHook'
import { clone } from 'lodash-es'
// import {useGlobSetting} from '@/hooks/setting/index'
// const globSetting=useGlobSetting()

function creatnewAxios(){
  return new VAxios({
    authenticationScheme: '',
    timeout: 10 * 1000,
    // 基础接口地址
    // baseURL: globSetting.apiUrl,
    transform: clone(transform),
    requestOptions: {
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 消息提示类型
        errorMessageMode: 'message',
        // 接口地址
        // apiUrl: globSetting.apiUrl,
        // 接口拼接地址
        // urlPrefix: urlPrefix,
        //  是否加入时间戳
        joinTime: true,
        // 忽略重复请求
        ignoreCancelToken: true,
        // 是否携带token
        withToken: true,
        retryRequest: {
          isOpenRetry: true,
          count: 5,
          waitTime: 100,
        },
      },
  })
}


export const defHttp=creatnewAxios()

