import {
  httpRequest
} from '@/utils'

/**
 * @function 账号密码登录
 */
export const signinByPwd = ({
  name,
  pwd
}) => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: {
        token: '123',
        userInfo: {
          name: '王昭君',
          tel: '123456789'
        }
      }
    })
  })
}
/**
 * @function 验证码登录
 */
export const signinByCode = ({
  tel,
  code
}) => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: {
        token: '123',
        userInfo: {
          name: '露娜',
          tel: '123456789'
        }
      }
    })
  })
}
// 发送短信验证码
export const sms = ({
  mobile,
  smsmode
}) => httpRequest.request({
  url: '/api/sms',
  method: 'POST',
  noAuth: true,
  data: {
    mobile,
    smsmode
  }
});
/**
 * 钉钉code授权登录--用于移动端
 */
export const dingCodeLogin = code => {
  return httpRequest.request({
    noAuth: true,
    url: '/ding/authorization/dingCodeLogin',
    method: 'GET',
    params: {
      code
    }
  })
}
