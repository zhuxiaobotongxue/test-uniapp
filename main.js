import Vue from 'vue'
import App from './App'
import * as R from 'ramda'
import validator from 'validator'
import Mock from '@/mock'
import animated from 'animate.css'
import {
  tool
} from '@/utils'

/* #ifdef H5 */
import * as dd from 'dingtalk-jsapi'
Vue.prototype.$dd = dd
/* #endif */

Vue.config.productionTip = false
Vue.prototype.$validator = validator
Vue.prototype.$utils = R
Vue.use(animated)
console.color = tool.colorLog

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
