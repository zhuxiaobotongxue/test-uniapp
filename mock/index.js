import Mock from 'mockjs'

import * as appInfo from './app.js'

Mock.mock('/api/mockInfo', 'get', appInfo.mockInfo)

export default Mock
