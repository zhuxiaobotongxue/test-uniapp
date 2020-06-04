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
      let _env = '未知环境';
      // 判断方式一
      if (this.$dd.env.platform === 'notInDingTalk') {
        _env = '非钉钉_H5';
      } else {
        _env = '钉钉_H5';
      }
      // 判断方式二，比方式一分类更具体
      // if (this.$dd.other) {
      //   _env = '非钉钉_H5';
      // } else if (this.$dd.android) {
      //   _env = '钉钉_android_H5';
      // } else if (this.$dd.ios) {
      //   _env = '钉钉_ios_H5';
      // } else if (this.$dd.pc) {
      //   _env = '钉钉_pc_H5';
      // }

      uni.showToast({
        title: _env,
        duration: 5000
      });
    },
    // 写一个方法兼容各端，程序不用操心各终端环境判断的繁琐
    testMethod() {
      this.runMethod();
    },
    // 被测试的方法
    runMethod() {
      class EnvDiff {
        constructor() {
          this.env = '未知环境';
        }
        run() {
          uni.showToast({
            title: this.env,
            duration: 5000
          });
        }
        notInDingTalk() {
          this.env = '非钉钉_H5';
          this.run();
        }
        pc() {
          this.env = '钉钉_PC_H5';
          this.run();
        }
        android() {
          this.env = '钉钉_ANDROID_H5';
          this.run();
        }
        ios(){
          this.env = '钉钉_IOS_H5';
          this.run();
        }
      }

      class MyMethod extends EnvDiff {}

      let myMethod = new MyMethod();
      // uni.showToast({
      //   title: this.$dd.env.platform,
      //   duration: 5000
      // })
      myMethod[this.$dd.env.platform]();
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
    // this.testH5();
    /* #endif */
    this.testMethod();
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
