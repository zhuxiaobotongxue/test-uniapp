<template>
  <view class="container">
    <view class="padding-tb-xl text-center"><text class="text-xl">uni融合实践</text></view>
    <form>
      <template v-if="[AUTH_MODES.CAPTCHA, AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(auth.opType)">
        <view class="cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="请输入手机号码" type="number" v-model="auth.captcha.tel" />
        </view>
        <view class="cu-form-group">
          <view class="title">验证码</view>
          <input placeholder="请输入验证码" type="number" v-model="auth.captcha.code" />
          <button class="cu-btn bg-green shadow">验证码</button>
        </view>
      </template>
      <template v-if="[AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(auth.opType)">
        <view class="cu-form-group">
          <view class="title">新密码</view>
          <input placeholder="请输入新密码" password v-model="auth.captcha.pwd" />
        </view>
        <view class="cu-form-group">
          <view class="title">重复密码</view>
          <input placeholder="请输入重复密码" password v-model="auth.captcha.rePwd" />
        </view>
      </template>
      <template v-if="auth.opType === AUTH_MODES.ACCOUNT">
        <view class="cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="请输入手机号码" type="number" v-model="auth.account.name" />
        </view>
        <view class="cu-form-group">
          <view class="title">密码</view>
          <input placeholder="请输入密码" password v-model="auth.account.pwd" />
        </view>
      </template>
      <view class="margin flex flex-direction"><button class="cu-btn bg-blue margin-tb-sm lg">登录</button></view>
    </form>
    <!-- <template>
      <view class="margin flex flex-direction">
        <button plain size="mini" class="toggle-btn" @click="toggleOpType">{{ auth.opType === AUTH_MODES.CAPTCHA ? '手机号密码' : '短信验证码' }}登录</button>
      </view>
    </template> -->
    <template>
      <view class="margin flex justify-between">
        <button v-if="AuthConf.Regist && auth.opType === AUTH_MODES.ACCOUNT" plain size="mini" class="toggle-btn" @click="auth.opType = AUTH_MODES.REGIST">注册</button>
        <button v-if="AuthConf.Forget && auth.opType === AUTH_MODES.ACCOUNT" plain size="mini" class="toggle-btn" @click="auth.opType = AUTH_MODES.FORGET">忘记密码?</button>
      </view>
      <view v-if="(AuthConf.Regist || AuthConf.Forget) && [AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(auth.opType)" class="margin flex flex-direction">
        <button plain size="mini" class="toggle-btn" @click="auth.opType = AUTH_MODES.ACCOUNT">直接登录</button>
      </view>
    </template>
    <view class="copy-right">© 陕西未来数据</view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { AppConf } from '@/config';
import { APP_CONST } from '@/constants';
import { pushMsg } from '@/apis';
export default {
  data() {
    return {
      auth: {
        opType: '',
        account: {
          name: '',
          pwd: ''
        },
        captcha: {
          tel: '',
          code: '',
          pwd: '',
          rePwd: ''
        }
      }
    };
  },
  computed: { AUTH_MODES: () => APP_CONST.AUTH_MODES, AuthConf: () => AppConf.Auth },
  mounted() {
    this.auth.opType = this.AUTH_MODES.ACCOUNT;
  },
  methods: {
    ...mapActions(['regist', 'login']),
    // 切换登录方式:密码和验证码相互切换
    toggleOpType() {
      this.auth.opType = this.auth.opType === this.AUTH_MODES.ACCOUNT ? this.AUTH_MODES.CAPTCHA : this.AUTH_MODES.ACCOUNT;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: $uni-bg-color-grey;
  .cu-form-group .title {
    min-width: calc(4em + 30rpx);
  }
  .toggle-btn {
    border: none;
    color: $uni-color-primary;
  }
  .copy-right {
    position: absolute;
    bottom: 20rpx;
    width: calc(100vw - 100rpx);
    text-align: center;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}
</style>
