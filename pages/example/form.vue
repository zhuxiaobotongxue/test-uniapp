<template>
  <view class="container">
    <text>测试表单</text>
    <button @click="onSubmit">提交</button>
  </view>
</template>

<script>
import { testApis } from '@/apis';
import { tool } from '@/utils';
export default {
  // data() {
  //   return {
  //     formInfo: {
  //       section1: {
  //         name: 'xxx',
  //         tel: '15991856228'
  //       }
  //     }
  //   };
  // },
  methods: {
    onSubmit() {
      tool.handleSubmit({
        // formInfo: this.formInfo,
        // verify: this.verify,
        // adapt: this.adapt,
        submit: this.submit
        // dealResult: this.dealResult
      });
    },
    async submit(formInfo) {
      return await testApis.loadMockList(formInfo);
    }
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
    // dealResult(res) {
    //   console.color(res);
    // }
  }
};
</script>

<style lang="scss"></style>
