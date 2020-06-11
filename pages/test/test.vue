<template>
  <view class="container">
    <!-- 验证动画库 -->
    <view class="margin-top-lg bg-grey animate__animated animate__bounce animate__delay-2s">
      <!-- 验证css库 -->
      <text class="text-red">hello world !</text>
    </view>
    <view class="margin-top-lg bg-grey"></view>
  </view>
</template>

<script>
export default {
  methods: {
    // 验证表单验证库
    testValidator() {
      console.color(this.$validator.isMobilePhone('15991856228'));
    }
  },
  onLoad() {
    // this.testValidator();
    // 打印当前vue页对象
    console.color(this)
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
