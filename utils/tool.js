import dayjs from 'dayjs'
import qs from '@/libs/query-string'

export const objDecode = params => {
  let _params = {}
  let objKes = Object.keys(params)
  objKes.forEach(item => {
    let _val = params[item]
    _params[item] = decodeURIComponent(_val)
  })
  return _params
}
// url 参数拼接
export const urlAndParams = (url, params) => {
  let _params = qs.stringify(params)
  let _url = _params ? `${url}?${_params}` : url
  return _url
}
// 日期格式化
export const parseDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}
/**
 * @function 分析变量类型并输出带颜色的日志
 * @param {type} any
 */
export const colorLog = (...rest) => {
  console.log('%c %s', 'color: #7f8c8d', `----------start ${parseDate(new Date())}----------`)
  for (let item of rest) {
    console.log('%c [%s] %c %s', 'color: #16a085', Object.prototype.toString.call(item).slice(8, -1),
      'color: #0000ff', ':', item)
  }
  console.log('%c %s', 'color: #7f8c8d', '----------end----------')
}
/** 
 * @function 封装路由
 */
export const routerUtil = {
  goHomePage(params = {}) {
    let url = urlAndParams('/pages/home/index', params)
    uni.switchTab({
      url
    })
  },
  goAuthPage(callback, params = {}) {
    let url = urlAndParams('/pages/account/signin', params)
    uni.reLaunch({
      url,
      success: callback
    })
  },
  navigateTo({
    url,
    params = {}
  }) {
    let _paramStr = qs.stringify(params)
    uni.navigateTo({
      url: _paramStr ? `${url}?${_paramStr}` : url
    })
  },
  goWebview({
    url,
    title,
    params = {}
  }) {
    let _paramStr = qs.stringify({
      url,
      title,
      ...params
    })
    uni.navigateTo({
      url: `/pages/webview/web?${_paramStr}`
    })
  }
}
/**
 * @function 封装表单
 */
export const handleSubmit = async ({
  formInfo = {},
  verify,
  adapt,
  submit,
  dealResult
}) => {
  try {
    if (verify) {
      verify(formInfo);
    }
    if (submit) {
      const res = await submit(adapt ? adapt(formInfo) : formInfo);
      if (dealResult) {
        dealResult(res);
      }
    } else {
      throw 'submit回调方法必须提供！';
    }
  } catch (err) {
    uni.showToast({
      icon: 'none',
      title: typeof err === 'string' ? err : JSON.stringify(err),
      duration: 2500
    });
  }
}
