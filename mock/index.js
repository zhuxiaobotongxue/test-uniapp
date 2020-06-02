import Mock from 'mockjs'
import sysConfig from '@/config'
import * as testInfo from './test.js'

Mock.mock( sysConfig.BaseUrl + '/api/mockInfo', 'get', testInfo.mockInfo)
Mock.mock( sysConfig.BaseUrl + '/api/mockList', 'get', testInfo.mockList)
Mock.mock( sysConfig.BaseUrl + '/api/save', 'post', testInfo.save)

export default Mock
