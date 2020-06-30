import Request from 'zh-uni-request'
import {
  AppConf
} from '@/config'

const http = new Request()

http.setConfig((config) => {
  config.baseUrl = AppConf.BaseUrl

  return config
})
// 全局请求拦截器
http.interceptor.request((config, cancel) => {
  if (!config.noAuth) {
    const {
      token
    } = store.getters
    token ? config.header[AppConf.TokenKey] = token : cancel('Token 不存在')
  }
  return config
})
// 全局响应拦截器
http.interceptor.response(
  res => {
    return res && res.data ? res.data : res
  },
  err => {
    console.error('请求响应发生了异常！')
    return err
  }
)

export default http
