import {
  tool
} from '@/utils'
/**
 * @function 全局显示提示信息
 * @param {string} err 非必须
 */
export const showErr = (err) => {
  let title = err ? (typeof err === 'string' ? err : JSON.stringify(err)) : '发生未知错误!'
  uni.showToast({
    icon: 'none',
    title,
    duration: 2500
  });
}
/**
 * @function maxin打开路由
 * @param {string} url required
 * @param {object} params 非必须
 */
export const open = (url, params) => {
  url ? tool.routerUtil.navigateTo({
      url,
      params
    }) :
    uni.showToast({
      icon: 'none',
      title: '无链接！',
      duration: 2500
    })
}
