// 全局插件
export default {
  install(Vue) {
    Vue.prototype.$showErr = function(err) {
      if (err) {
        uni.showToast({
          icon: 'none',
          title: typeof err === 'string' ? err : JSON.stringify(err),
          duration: 2500
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: '发生未知错误!',
          duration: 2500
        });
      }
    }
  }
}
