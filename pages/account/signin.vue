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
      <view class="margin flex flex-direction">
        <button class="cu-btn bg-blue margin-tb-sm lg" @click="onSubmit">
          {{ auth.opType === AUTH_MODES.REGIST ? '注册' : auth.opType === AUTH_MODES.FORGET ? '修改' : '登录' }}
        </button>
      </view>
    </form>
    <template v-if="AuthConf.Account && AuthConf.Captcha && [AUTH_MODES.ACCOUNT, AUTH_MODES.CAPTCHA].includes(auth.opType)">
      <view class="margin flex flex-direction">
        <button plain size="mini" class="toggle-btn" @click="toggleOpType">{{ auth.opType === AUTH_MODES.CAPTCHA ? '手机号密码' : '短信验证码' }}登录</button>
      </view>
    </template>
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
import { tool } from '@/utils'
import form from '@/mixins/form';
export default {
  mixins: [form],
  data() {
    return {
      auth: {
        opType: '', // 功能类型控制器
        // 账号密码
        account: {
          name: '',
          pwd: ''
        },
        // 短信验证码、注册、忘记密码
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
  created() {
    this.init();
  },
  methods: {
    ...mapActions(['regist', 'signin']),
    // 初始化:默认账号密码方式登录，若它主动配置了false,则检查验证码登录方式
    init() {
      if (this.AuthConf.Account) {
        this.auth.opType = this.AUTH_MODES.ACCOUNT;
      } else if (this.AuthConf.Captcha) {
        this.auth.opType = this.AUTH_MODES.CAPTCHA;
      }
    },
    // 切换登录方式:密码和验证码相互切换
    toggleOpType() {
      this.auth.opType = this.auth.opType === this.AUTH_MODES.ACCOUNT ? this.AUTH_MODES.CAPTCHA : this.AUTH_MODES.ACCOUNT;
    },
    /**
     * @function 验证表单
     * @description 若不复写该方法，默认验证通过
     */
    verify() {
      const { account, captcha } = this.auth;
      let verifyObj = {
        ACCOUNT: () => {
          if (!this.$validator.isMobilePhone(account.name, 'zh-CN')) {
            throw '手机号码不符合规范!';
          }
          if (!account.pwd || !account.pwd.trim()) {
            throw '密码不能为空!';
          }
        },
        CAPTCHA: () => {
          if (!this.$validator.isMobilePhone(captcha.tel, 'zh-CN')) {
            throw '手机号码不符合规范!';
          }
          if (!captcha.code || !captcha.code.trim()) {
            throw '验证码不能为空!';
          }
        },
        REGIST: () => {
          if (!this.$validator.isMobilePhone(captcha.tel, 'zh-CN')) {
            throw '手机号码不符合规范!';
          }
          if (!captcha.code || !captcha.code.trim()) {
            throw '验证码不能为空!';
          }
          if (!captcha.pwd || !captcha.pwd.trim()) {
            throw '新密码不能为空!';
          }
          if (!captcha.rePwd || !captcha.rePwd.trim()) {
            throw '重复密码不能为空!';
          }
          if (captcha.pwd !== captcha.rePwd) {
            throw '两次密码输入不一致!';
          }
        }
      };
      verifyObj.FORGET = verifyObj.REGIST;
      // 执行
      verifyObj[this.auth.opType]();
    },
    /**
     * @function 数据适配
     * @description 若不复写该方法，默认返回空对象
     */
    reorganize() {
      const { account, captcha } = this.auth;
      let reorganizeObj = {
        ACCOUNT: () => {
          return {
            name: account.name,
            pwd: account.pwd
          };
        },
        CAPTCHA: () => {
          return {
            tel: captcha.tel,
            code: captcha.code
          };
        },
        REGIST: () => {
          return {
            tel: captcha.tel,
            code: captcha.code,
            pwd: captcha.pwd,
            rePwd: captcha.rePwd
          };
        }
      };
      reorganizeObj.FORGET = reorganizeObj.REGIST;
      // 执行
      return reorganizeObj[this.auth.opType]();
    },
    /**
     * @function 提交
     * @param {obj} info 经适配后的提交数据
     * @description 该方法必须复写，处理提交业务
     */
    handleSubmit(info) {
      let submitObj = {
        ACCOUNT: async () => {
          return await this.signin({ type: this.auth.opType, ...info });
        }
      };
      submitObj.CAPTCHA = submitObj.ACCOUNT;
      return submitObj[this.auth.opType]();
    },
    /**
     * @function 提交之后
     * @description 该方法初步处理返回结果，主要控制异常逻辑，也可以复写
     */
    submitAfter(res) {
      tool.routerUtil.goHomePage()
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
