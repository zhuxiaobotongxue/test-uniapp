/* eslint-disable */ 
// 全局插件
// 注意：仅将调用频率非常高，或业务必要方法写在这里，否则建议写入utils中，按需引入
import {
  showErr,
  open,
} from './methods.js';

export default {
  install(Vue) {
    // 挂载至原型的方法，全局仅创建一次
    Vue.prototype.$showErr = showErr;
    // 全局混入的方法，每个页面实例分别复制
    // dom中需要频繁使用的方法
    Vue.mixin({
      methods: {
        open,
      },
    });
  },
};
