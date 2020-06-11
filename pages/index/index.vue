<template>
  <view></view>
</template>

<script>
import { EnvDiffInH5 } from '@/libs/interface';
import { AppConf } from '@/config';
import { tool } from '@/utils';
export default {
  methods: {
    // 初始化
    init() {
      try {
        this.signin();
      } catch (err) {
        this.$showErr(err);
      }
    },
    // 登录
    signin() {
      // #ifdef H5
      this.signinInH5();
      // #endif
      // #ifndef H5
      this.signinByPwd();
      // #endif
    },
    // 用户名密码登录
    signinByPwd() {
      tool.routerUtil.goAuthPage();
    },
    // 钉钉免登录
    signinByDd({ code }) {
      if (code) {
        tool.routerUtil.goHomePage();
      } else {
        this.$showErr('未提供授权码');
      }
    },
    // h5多环境登录
    signinInH5() {
      const that = this;
      class Signin extends EnvDiffInH5 {
        notInDingTalk() {
          that.signinByPwd();
        }
        dd() {
          const dd = that.$dd;
          dd.ready(function() {
            dd.runtime.permission.requestAuthCode({
              corpId: AppConf.Auth.CorpId,
              onSuccess: function(result) {
                that.signinByDd({ code: result.code });
              },
              onFail: function(err) {
                that.$showErr('免登授权码获取失败');
              }
            });
          });
        }
      }
      let signin = new Signin();
      signin[this.$dd.env.platform]();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style></style>
