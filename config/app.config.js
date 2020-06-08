const env = process.env.NODE_ENV
const baseUrls = {
  development: 'https://oapi.dingtalk.com',
  production: 'https://oapi.dingtalk.com'
}
const BaseUrl = baseUrls[env]

const Auth = {
  Regist: true, // 注册
  Forget: true, // 忘记密码
  CorpId: 'ding4802143b4ae7e180ee0f45d8e4f7c288' // 企业id，用于微应用免登
}

export default {
  // Api 接口 根路径
  BaseUrl,
  Auth
}
