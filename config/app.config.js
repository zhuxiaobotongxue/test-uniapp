const env = process.env.NODE_ENV
const baseUrls = {
  development: 'https://oapi.dingtalk.com',
  production: 'https://oapi.dingtalk.com'
}
const BaseUrl = baseUrls[env]

export default {
  // Api 接口 根路径
  BaseUrl
}
