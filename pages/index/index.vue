<template>
  <view class="container">
    <button @click="open({ url: '/pages/test/index' })">测试</button>
  </view>
</template>

<script>
export default {
  methods: {
    open({ url }) {
      uni.navigateTo({ url });
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
