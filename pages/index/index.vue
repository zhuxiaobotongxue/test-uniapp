<template>
  <view class="container"><button @click="handleTest">打开测试页面</button></view>
</template>

<script>
export default {
  methods: {
    handleTest() {
      uni.navigateTo({ url: '/pages/test/index' });
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
