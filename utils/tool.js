import dayjs from 'dayjs'

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
