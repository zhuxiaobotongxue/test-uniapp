import Vue from 'vue'
import App from './App'
import store from './store'
import * as R from 'ramda'
import validator from 'validator'
import Mock from '@/mock'
import animated from 'animate.css'
import { tool } from '@/utils'
import MyPlugin from '@/libs/plugin'

console.color = tool.colorLog
App.mpType = 'app'

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(MyPlugin)

Vue.prototype.$store = store
Vue.prototype.$validator = validator
Vue.prototype.$R = R
// #ifdef H5 
import * as dd from 'dingtalk-jsapi'
Vue.prototype.$dd = dd
// #endif
// #ifdef APP-PLUS
const {
  version, // 客户端的版本名称
  versionCode, // 客户端的版本号
  appid // 当前应用的APPID
} = plus.runtime
const {
  brand,
  model,
  pixelRatio,
  system,
  platform
} = uni.getSystemInfoSync()
Vue.prototype.$curAppInfo = {
  version,
  versionCode,
  appid,
  brand,
  model,
  pixelRatio,
  system,
  platform
}
// #endif

const app = new Vue({
  store,
  ...App
})
app.$mount()
