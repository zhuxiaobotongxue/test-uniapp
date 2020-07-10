import {
  httpRequest,
} from '@/utils';

/**
 * @function 账号密码登录
 */
export const signinByPwd = ({
  name,
  pwd,
}) => new Promise((resolve, reject) => {
  try {
    resolve({
      code: 200,
      data: {
        token: '123',
        userInfo: {
          name: name || '王昭君',
          pwd: pwd || '123',
          tel: '123456789',
        },
      },
    });
  } catch (err) {
    reject(err);
  }
});
/**
 * @function 验证码登录
 */
export const signinByCode = ({
  tel,
  code,
}) => new Promise((resolve, reject) => {
  try {
    resolve({
      code: 200,
      data: {
        token: '123',
        userInfo: {
          name: '露娜',
          code: code || '123',
          tel: tel || '123456789',
        },
      },
    });
  } catch (err) {
    reject(err);
  }
});
// 发送短信验证码
export const sms = ({
  mobile,
  smsmode,
}) => httpRequest.request({
  url: '/api/sms',
  method: 'POST',
  noAuth: true,
  data: {
    mobile,
    smsmode,
  },
});
/**
 * 钉钉code授权登录--用于移动端
 */
export const dingCodeLogin = (code) => httpRequest.request({
  noAuth: true,
  url: '/ding/authorization/dingCodeLogin',
  method: 'GET',
  params: {
    code,
  },
});
