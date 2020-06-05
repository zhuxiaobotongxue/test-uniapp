const env = process.env.NODE_ENV
const baseUrls = {
  development: 'https://oapi.dingtalk.com',
  production: 'https://oapi.dingtalk.com'
}
const BaseUrl = baseUrls[env]

export default {
  // Api 接口 根路径
  BaseUrl,
  corpId: 'dingb016f788dc398bd5bc961a6cb783455b' // 企业id，用于微应用免登
}
