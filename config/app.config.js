const env = process.env.NODE_ENV;
const baseUrls = {
  development: '',
  production: '',
};
const BaseUrl = baseUrls[env];

const Auth = {
  ShouldSiginFirst: true, // 进入首页前是否必须先登录
  Regist: true, // 是否有注册
  Forget: true, // 是否有忘记密码
  Account: true, // 是否有账号密码登录方式
  Captcha: false, // 是否有验证码登录方式
  CorpId: 'ding4802143b4ae7e180ee0f45d8e4f7c288', // 企业id，用于微应用免登
  CaptchaTime: 60, // 验证码倒计时总时长
};

export default {
  // Api 接口 根路径
  BaseUrl,
  TokenKey: 'X-Access-Token',
  Auth,
};
