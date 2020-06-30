<template>
  <view class="container">
    <text>测试表单</text>
    <view class="margin flex flex-direction"><button class="cu-btn line-blue lg block" @click="onSubmit">普通提交</button></view>
    <view class="margin flex flex-direction">
      <button class="cu-btn line-blue lg block" :disabled="formInfo.isBtnDisabled" @click="onSafeSubmit">安全提交</button>
    </view>
  </view>
</template>

<script>
  import {
    testApis
  } from '@/apis';
  import {
    tool
  } from '@/utils';
  export default {
    data() {
      return {
        formInfo: {
          isBtnDisabled: false,
          section1: {
            name: 'xxx',
            tel: '15991856228'
          }
        }
      };
    },
    methods: {
      // 安全提交：应用装饰者模式对普通提交进一步包装
      async onSafeSubmit() {
        this.formInfo.isBtnDisabled = true
        await tool.handleSubmit({
          // formInfo: this.formInfo,
          // verify: this.verify,
          // adapt: this.adapt,
          submit: this.submit,
          dealResult: this.dealResult
        });
        this.formInfo.isBtnDisabled = false
      },
      // 普通提交
      onSubmit() {
        tool.handleSubmit({
          // formInfo: this.formInfo,
          // verify: this.verify,
          // adapt: this.adapt,
          submit: this.submit,
          dealResult: this.dealResult
        });
      },
      async submit(formInfo) {
        return await testApis.loadMockList(formInfo);
      },
      // verify(formInfo) {
      //   const { section1 } = formInfo;
      //   if (!section1.name || !section1.name.trim()) {
      //     throw '姓名不能为空!';
      //   }
      //   if (!this.$validator.isMobilePhone(section1.tel, 'zh-CN')) {
      //     throw '手机号码不符合规范!';
      //   }
      // },
      // adapt(formInfo) {
      //   const { section1 } = formInfo;
      //   return {
      //     name: section1.name,
      //     tel: section1.tel
      //   };
      // },
      dealResult(res) {
        console.color(res);
      }
    }
  };
</script>

<style lang="scss"></style>
