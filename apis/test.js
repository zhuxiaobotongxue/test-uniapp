import {
  httpRequest
} from '@/utils'

// 注意mock都是开发环境数据，若生产环境需要模拟数据，可直接用promise写死并返回
/**
 * @function 测试加载mock对象数据
 */
export const loadMockInfo = () => httpRequest.get('/api/mockInfo')
/**
 * @function 测试加载mock列表数据
 */
export const loadMockList = () => httpRequest.get('/api/mockList')
/**
 * @function 测试提交mock post接口
 */
// export const save = () => httpRequest.post('/api/save')

export const save = () => httpRequest.request({
  noAuth: true,
  url: '/api/save',
  method: 'POST'
});
/**
 * @function 测试生产环境需要数据，用Promise直接返回
 */
export const loadStaticInfo = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: {
        id: '12345789',
        name: '东皇太一'
      }
    })
  })
}
/**
 * @function 网络请求，获取token
 */
export const getToken = (params) => httpRequest.get('/gettoken', {
  params
})
