/* eslint-disable no-param-reassign */
import Request from 'zh-uni-request';
import {
  AppConf,
} from '@/config';
import store from '@/store';

const http = new Request();

http.setConfig((config) => {
  config.baseUrl = AppConf.BaseUrl;

  return config;
});
// 全局请求拦截器
http.interceptor.request((config, cancel) => {
  if (!config.noAuth) {
    const {
      token,
    } = store.getters;
    if (token) {
      config.header[AppConf.TokenKey] = token;
    } else {
      cancel('Token 不存在');
    }
  }
  return config;
});
// 全局响应拦截器
http.interceptor.response(
  (res) => (res && res.data ? res.data : res),
  (err) => {
    // eslint-disable-next-line
    console.error('请求响应发生了异常！');
    return err;
  },
);

export default http;
