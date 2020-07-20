import Vue from 'vue';
import * as R from 'ramda';
import validator from 'validator';
import { tool } from '@/utils';
import MyPlugin from '@/plugin';
import store from './store';
import App from './App';
import Mock from '@/mock';

Vue.prototype.$store = store;
Vue.prototype.$validator = validator;
Vue.prototype.$R = R;
Vue.use(MyPlugin);
Vue.config.productionTip = false;
// eslint-disable-next-line
console.color = tool.colorLog;
App.mpType = 'app';


// #ifdef H5
import animated from 'animate.css';
Vue.use(animated);
import * as dd from 'dingtalk-jsapi';
Vue.prototype.$dd = dd;
// #endif
// #ifdef APP-PLUS
const {
  version, // 客户端的版本名称
  versionCode, // 客户端的版本号
  appid, // 当前应用的APPID
} = plus.runtime;
const {
  brand,
  model,
  pixelRatio,
  system,
  platform,
} = uni.getSystemInfoSync();
Vue.prototype.$curAppInfo = {
  version,
  versionCode,
  appid,
  brand,
  model,
  pixelRatio,
  system,
  platform,
};
// #endif

const app = new Vue({
  store,
  ...App,
});
app.$mount();
