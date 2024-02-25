import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import errorHandler from './errorHandle'

const UMI_APP_API_URL = process.env.UMI_APP_API_URL

const config: AxiosRequestConfig = {
  baseURL: `${UMI_APP_API_URL || ''}/api`,
  timeout: 60000
}

export const request = axios.create(config)

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 一般会请求拦截里面加token，用于后端的验证
    const token = localStorage.getItem("token") as string
    if(token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err: any) => {
    // 请求错误，这里可以用全局提示框进行提示
    return err;
  }
)

request.interceptors.response.use(
  (res: AxiosResponse) => {
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    return res.data;
  },
  (err: any) => {
    errorHandler(err);
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    return err.response;
  }
);