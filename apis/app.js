import {
  httpRequest
} from '@/utils'

/**
 * @function 测试加载mock数据
 */
export const loadMockInfo = () => httpRequest.get('/api/mockInfo')
