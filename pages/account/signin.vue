<template>
  <view class="container">
    <view class="padding-tb-xl text-center"><text class="text-xl">uni融合实践</text></view>
    <form>
      <template v-if="[AUTH_MODES.CAPTCHA, AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(formInfo.opType)">
        <view class="cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="请输入手机号码" type="number" v-model="formInfo.captcha.tel" />
          <button class="cu-btn bg-blue shadow" style="width: 200rpx;" @click="sendCaptcha">{{ formInfo.captcha.time > 0 ? formInfo.captcha.time + '秒' : '发送验证码' }}</button>
        </view>
        <view class="cu-form-group">
          <view class="title">验证码</view>
          <input placeholder="请输入验证码" type="number" v-model="formInfo.captcha.code" />
        </view>
      </template>
      <template v-if="[AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(formInfo.opType)">
        <view class="cu-form-group">
          <view class="title">新密码</view>
          <input placeholder="请输入新密码" password v-model="formInfo.captcha.pwd" />
        </view>
        <view class="cu-form-group">
          <view class="title">重复密码</view>
          <input placeholder="请输入重复密码" password v-model="formInfo.captcha.rePwd" />
        </view>
      </template>
      <template v-if="formInfo.opType === AUTH_MODES.ACCOUNT">
        <view class="cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="请输入手机号码" type="number" v-model="formInfo.account.name" />
        </view>
        <view class="cu-form-group">
          <view class="title">密码</view>
          <input placeholder="请输入密码" password v-model="formInfo.account.pwd" />
        </view>
      </template>
      <view class="margin flex flex-direction">
        <button class="cu-btn bg-blue margin-tb-sm lg" :disabled="formInfo.isBtnDisabled" @click="onSafeSubmit">
          {{ formInfo.opType === AUTH_MODES.REGIST ? '注册' : formInfo.opType === AUTH_MODES.FORGET ? '修改' : '登录' }}
        </button>
      </view>
    </form>
    <template v-if="AuthConf.Account && AuthConf.Captcha && [AUTH_MODES.ACCOUNT, AUTH_MODES.CAPTCHA].includes(formInfo.opType)">
      <view class="margin flex flex-direction">
        <button plain size="mini" class="toggle-btn" @click="toggleOpType">{{ formInfo.opType === AUTH_MODES.CAPTCHA ? '手机号密码' : '短信验证码' }}登录</button>
      </view>
    </template>
    <template>
      <view class="margin flex justify-between">
        <button v-if="AuthConf.Regist && formInfo.opType === AUTH_MODES.ACCOUNT" plain size="mini" class="toggle-btn" @click="formInfo.opType = AUTH_MODES.REGIST">注册</button>
        <button v-if="AuthConf.Forget && formInfo.opType === AUTH_MODES.ACCOUNT" plain size="mini" class="toggle-btn" @click="formInfo.opType = AUTH_MODES.FORGET">
          忘记密码?
        </button>
      </view>
      <!-- 当前操作是注册或忘记密码，配置的有注册或忘记密码，配置的有账号登录或验证码登录 -->
      <view
        v-if="[AUTH_MODES.REGIST, AUTH_MODES.FORGET].includes(formInfo.opType) && (AuthConf.Regist || AuthConf.Forget) && (AuthConf.Account || AuthConf.Captcha)"
        class="margin flex flex-direction"
      >
        <button plain size="mini" class="toggle-btn" @click="formInfo.opType = AUTH_MODES.ACCOUNT">直接登录</button>
      </view>
    </template>
    <view class="copy-right">© 陕西未来数据</view>
  </view>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { AppConf } from '@/config'
import { APP_CONST } from '@/constants'
import { userApis } from '@/apis'
import { tool } from '@/utils'

export default {
  data() {
    const account =
      process.env.NODE_ENV === 'development'
        ? {
            name: '15991856228',
            pwd: '123456'
          }
        : {
            name: '',
            pwd: ''
          }
    return {
      formInfo: {
        isBtnDisabled: false,
        opType: '', // 功能类型控制器
        // 账号密码
        account,
        // 短信验证码、注册、忘记密码
        captcha: {
          tel: '',
          code: '',
          time: 0, // 验证码倒计时
          pwd: '',
          rePwd: ''
        }
      }
    }
  },
  computed: {
    AUTH_MODES: () => APP_CONST.AUTH_MODES,
    AuthConf: () => AppConf.Auth
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions(['regist', 'signin']),
    // 验证码结果处理
    dealResultCaptcha(res) {
      if (res.code === 200) {
        this.formInfo.captcha.time = this.AuthConf.CaptchaTime
        this.calcTime()
      }
    },
    calcTime() {
      if (this.formInfo.captcha.time > 0) {
        this.formInfo.captcha.time--
        this.timer = setTimeout(this.calcTime, 1000)
      } else {
        this.timer && clearTimeout(this.timer)
      }
    },
    // 发送验证码
    async sendCaptcha() {
      try {
        if (this.formInfo.captcha.time > 0) return
        await tool.handleSubmit({
          formInfo: this.formInfo,
          verify: this.verifyCaptcha,
          submit: this.submitCaptcha,
          dealResult: this.dealResultCaptcha
        })
      } catch (err) {
        this.$showErr(err)
      }
    },
    // 提交发送验证码请求
    async submitCaptcha(formInfo) {
      const { captcha } = formInfo
      return await userApis.sms({
        mobile: captcha.tel,
        smsmode: '1'
      })
    },
    // 验证码校验
    verifyCaptcha(formInfo) {
      const { captcha } = formInfo
      if (!this.$validator.isMobilePhone(captcha.tel, 'zh-CN')) {
        throw '手机号码不符合规范!'
      }
    },
    // 初始化:默认账号密码方式登录，若它主动配置了false,则检查验证码登录方式
    init() {
      this.initOpType()
    },
    // 初始化操作类型:根据优先级做判断,越在前，优先级越低，最终仅有一种操作状态生效
    initOpType() {
      if (this.AuthConf.Forget) {
        this.formInfo.opType = this.AUTH_MODES.FORGET
      }
      if (this.AuthConf.Regist) {
        this.formInfo.opType = this.AUTH_MODES.REGIST
      }
      if (this.AuthConf.Captcha) {
        this.formInfo.opType = this.AUTH_MODES.CAPTCHA
      }
      if (this.AuthConf.Account) {
        this.formInfo.opType = this.AUTH_MODES.ACCOUNT
      }
    },
    // 切换登录方式:密码和验证码相互切换
    toggleOpType() {
      this.formInfo.opType = this.formInfo.opType === this.AUTH_MODES.ACCOUNT ? this.AUTH_MODES.CAPTCHA : this.AUTH_MODES.ACCOUNT
    },
    async onSafeSubmit() {
      this.formInfo.isBtnDisabled = true
      tool.handleSubmit({
        formInfo: this.formInfo,
        verify: this.verify,
        adapt: this.adapt,
        submit: this.submit,
        dealResult: this.dealResult
      })
      this.formInfo.isBtnDisabled = false
    },
    // 验证表单
    verify(formInfo) {
      const { account, captcha } = formInfo
      const verifyObj = {
        ACCOUNT: () => {
          if (!this.$validator.isMobilePhone(account.name, 'zh-CN')) {
            this.$showErr('手机号码不符合规范!')
            return false
          }
          if (!account.pwd || !account.pwd.trim()) {
            this.$showErr('密码不能为空!')
            return false
          }
          // 每种类型，若不出现错误，则返回true,保证验证通过
          return true
        },
        CAPTCHA: () => {
          if (!this.$validator.isMobilePhone(captcha.tel, 'zh-CN')) {
            this.$showErr('手机号码不符合规范!')
            return false
          }
          if (!captcha.code || !captcha.code.trim()) {
            this.$showErr('验证码不能为空!')
            return false
          }
          return true
        },
        REGIST: () => {
          if (!this.$validator.isMobilePhone(captcha.tel, 'zh-CN')) {
            this.$showErr('手机号码不符合规范!')
            return false
          }
          if (!captcha.code || !captcha.code.trim()) {
            this.$showErr('验证码不能为空!')
            return false
          }
          if (!captcha.pwd || !captcha.pwd.trim()) {
            this.$showErr('新密码不能为空!')
            return false
          }
          if (!captcha.rePwd || !captcha.rePwd.trim()) {
            this.$showErr('重复密码不能为空!')
            return false
          }
          if (captcha.pwd !== captcha.rePwd) {
            this.$showErr('两次密码输入不一致!')
            return false
          }
          return true
        }
      }
      verifyObj.FORGET = verifyObj.REGIST
      // 验证的结果一定要返回
      return verifyObj[this.formInfo.opType]()
    },
    // 数据适配
    adapt(formInfo) {
      const { account, captcha } = formInfo
      const adaptObj = {
        ACCOUNT: () => ({
          name: account.name,
          pwd: account.pwd
        }),
        CAPTCHA: () => ({
          tel: captcha.tel,
          code: captcha.code
        }),
        REGIST: () => ({
          tel: captcha.tel,
          code: captcha.code,
          pwd: captcha.pwd,
          rePwd: captcha.rePwd
        })
      }
      adaptObj.FORGET = adaptObj.REGIST
      
      return adaptObj[this.formInfo.opType]()
    },
    // 提交
    async submit(formInfo) {
      const submitObj = {
        ACCOUNT: async () => {
          const { data: res } = await userApis.signinByPwd(formInfo)
          return await this.signin({
            token: res.token,
            userInfo: res.userInfo
          })
        },
        CAPTCHA: async () => {
          const { data: res } = await userApis.signinByCode(formInfo)
          return await this.signin({
            token: res.token,
            userInfo: res.userInfo
          })
        }
      }
      return submitObj[this.formInfo.opType]()
    },
    // 处理结果
    dealResult(res) {
      if (res && res.code === 200) {
        tool.routerUtil.goHomePage()
      } else if (res && res.code !== -1) {
        this.$showErr(res)
      }
    }
  }
}
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
    width: 100%;
    text-align: center;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}
</style>
