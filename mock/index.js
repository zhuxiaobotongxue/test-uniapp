import Mock from 'mockjs'

import * as appInfo from './app.js'

Mock.mock('/api/mockInfo', 'get', appInfo.mockInfo)
Mock.mock('/api/mockList', 'get', appInfo.mockList)

export default Mock
