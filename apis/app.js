import {
  httpRequest
} from '@/utils'

// 钉钉授权
export const getDingConfig = url => httpRequest.request({
  url: '/ding/jsapi/sign',
  method: 'GET',
  params: {
    url
  }
});
