<template>
  <view></view>
</template>

<script>
import { EnvDiffInH5 } from '@/libs/interface';
import { AppConf } from '@/config';
import { tool } from '@/utils';
export default {
  methods: {
    // 用户名密码登录
    loginByPwd() {
      uni.showToast({
        title: '用户名密码登录',
        duration: 2500
      });
      tool.routerUtil.goAuthPage();
    },
    // h5多环境登录
    loginInH5() {
      const that = this;
      class Login extends EnvDiffInH5 {
        notInDingTalk() {
          that.loginByPwd();
        }
        dd() {
          const dd = that.$dd;
          dd.ready(function() {
            dd.runtime.permission.requestAuthCode({
              corpId: AppConf.CorpId,
              onSuccess: function(result) {
                if (result && result.code) {
                  uni.showToast({
                    title: '授权码获取成功',
                    duration: 2500
                  });
                  tool.routerUtil.goHomePage();
                }
              },
              onFail: function(err) {
                uni.showToast({
                  icon: 'none',
                  title: '免登授权码获取失败',
                  duration: 2500
                });
              }
            });
          });
        }
      }
      let login = new Login();
      login[this.$dd.env.platform]();
    }
  },
  mounted() {
    // #ifdef H5
    this.loginInH5();
    // #endif
    // #ifndef H5
    this.loginByPwd();
    // #endif
  }
};
</script>

<style></style>
