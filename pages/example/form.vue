<template>
  <view class="container">
    <text>测试表单mixin</text>
    <button @click="onSubmit">提交</button>
  </view>
</template>

<script>
import form from '@/mixins/form';
import { testApis } from '@/apis';
export default {
  mixins: [form],
  data() {
    return {
      formInfo: {
        section1: {
          name: 'xxx',
          tel: '15991856228'
        }
      }
    };
  },
  methods: {
    /**
     * @function 提交
     * @param {obj} info 经适配后的提交数据
     * @description 该方法必须复写，处理提交业务
     */
    async handleSubmit(info) {
      return await testApis.loadMockList(info);
    }
  }
};
</script>

<style lang="scss"></style>
