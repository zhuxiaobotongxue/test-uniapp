import Mock from 'mockjs'

import * as testInfo from './test.js'

Mock.mock('/api/mockInfo', 'get', testInfo.mockInfo)
Mock.mock('/api/mockList', 'get', testInfo.mockList)
Mock.mock('/api/save', 'post', testInfo.save)

export default Mock
