import Request from 'zh-uni-request'
import sysConfig from '@/config'

const http = new Request()

http.setConfig((config) => {
  config.baseUrl = sysConfig.BaseUrl

  return config
})
// 全局请求拦截器
http.interceptor.request((config, cancel) => {
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
