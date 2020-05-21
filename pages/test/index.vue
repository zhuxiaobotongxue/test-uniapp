<template>
  <view class="container">
    <!-- 验证动画库 -->
    <view class="margin-top-lg bg-grey animate__animated animate__bounce animate__delay-2s">
      <!-- 验证css库 -->
      <text class="text-black">hello world !</text>
    </view>
    <view class="margin-top-lg bg-grey"></view>
  </view>
</template>

<script>
import { testApis } from '@/apis';
export default {
  data() {
    return {
      info: {}
    };
  },
  methods: {
    // 验证通用方法库
    testUtils() {
      const R = this.$utils;
      const res = R.add(1, 2);
      // console.color(res);
    },
    // 验证表单验证库
    testValidator() {
      // console.color(this.$validator.isMobilePhone('15991856228'));
    },
    // 验证网络请求
    testMock() {
      this.fetchMockInfo();
    },
    // 加载Mock数据
    async fetchMockInfo() {
      const res = await testApis.loadMockInfo();
      this.info = res.data.obj;
      // console.color(this.info);
      const res2 = await testApis.loadMockList();
      // console.color(res2.data.arr);
      const res3 = await testApis.save();
      // console.color(res3.data);
    },
    // 加载写死的数据
    async testPromise() {
      const res = await testApis.loadStaticInfo();
      // console.color(res);
    }
  },
  onLoad() {
    this.testUtils();
    this.testValidator();
    this.testMock();
    this.testPromise();
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
