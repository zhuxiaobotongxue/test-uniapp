import {
  httpRequest
} from '@/utils'

/**
 * @function 测试加载mock对象数据
 */
export const loadMockInfo = () => httpRequest.get('/api/mockInfo')
/**
 * @function 测试加载mock列表数据
 */
export const loadMockList = () => httpRequest.get('/api/mockList')
