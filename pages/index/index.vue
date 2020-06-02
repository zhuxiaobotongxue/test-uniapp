<template>
  <view class="container">
    <button @click="handleTest1">打开测试页面</button>
    <button @click="handleTest2">打开钉钉测试页面</button>
  </view>
</template>

<script>
export default {
  methods: {
    handleTest1() {
      uni.navigateTo({ url: '/pages/test/index' });
    },
    handleTest2() {
      uni.navigateTo({ url: '/pages/test/dingding' });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
