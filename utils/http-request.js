import Request from 'zh-uni-request'

const http = new Request()

// 全局请求拦截器
http.interceptor.request((config, cancel) => {
  return config
})
// 全局响应拦截器
http.interceptor.response(
  res => {
    if (res.data.code === 200) {
      return res.data
    } else {
      console.error('返回的状态不是200！')
    }
  },
  err => {
    console.error('请求响应发生了异常！')
    return err
  }
)

export default http
