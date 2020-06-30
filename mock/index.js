import Mock from 'mockjs'
import {
  AppConf
} from '@/config'
import * as testInfo from './test.js'

Mock.mock(AppConf.BaseUrl + '/api/mockInfo', 'get', testInfo.mockInfo)
Mock.mock(AppConf.BaseUrl + '/api/mockList', 'get', testInfo.mockList)
Mock.mock(AppConf.BaseUrl + '/api/save', 'post', testInfo.save)
Mock.mock(AppConf.BaseUrl + '/api/sms', 'post', testInfo.sms)

export default Mock
