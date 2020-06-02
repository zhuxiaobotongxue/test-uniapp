<template>
  <view class="container">
    <view class="margin-top-lg bg-grey"><text class="text-black">钉钉环境支持测试</text></view>
  </view>
</template>

<script>
import { testApis } from '@/apis';
// import * as dd from 'dingtalk-jsapi';
export default {
  methods: {
    // 测试jsapi
    testJsapi() {
      dd.alert({
        content: dd.SDKVersion
      });
    },
    // 测试网络请求
    async testFetch() {
      const res = await testApis.getToken({ appkey: 'dingpdwkf2uvdonamcpo', appsecret: '4o-TMElG_TCODHwBpp7WbkQKSUgNg23m6BlVT04PhHOfYwmF0xmvQX53wPD4hdgn' });
      console.log(res);
    },
    // 免登陆
    testAvoidLogin() {
      dd.getAuthCode({
        success: function(res) {
          console.color(res);
        },
        fail: function(err) {
          console.log(err, '---获取免登授权失败了');
        }
      });
    },
    // 测试H5环境
    testH5() {
      if (this.$dd.env.platform === 'notInDingTalk') {
        console.color('我在非钉钉内置浏览器');
      } else {
        console.color('我在钉钉内置浏览器');
      }
    }
  },
  onLoad() {
    // 钉钉小程序
    /* #ifdef MP-DINGTALK */
    // this.testJsapi();
    // this.testAvoidLogin();
    // this.testFetch();
    /* #endif */
    // H5 && 微应用
    /* #ifdef H5 */
    this.testH5();
    /* #endif */
  }
};
</script>

<style lang="scss">
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
