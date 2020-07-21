<template>
  <view class="container">
    <!-- 验证动画库 -->
    <view class="margin-top-lg text-center bg-grey animate__animated animate__bounce animate__delay-2s">
      <!-- 验证css库 -->
      <text class="text-black">test Mock and Promise request</text>
    </view>
    <view class="margin-top-lg bg-grey"></view>
  </view>
</template>

<script>
import { testApis } from '@/apis'

export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {
    // 验证Mock请求
    async testMock() {
      const res = await testApis.loadMockInfo()
      this.info = res.data.obj
      console.color(this.info, '---mock obj')
      const res2 = await testApis.loadMockList()
      console.color(res2.data.arr, '---mock arr')
      const res3 = await testApis.save()
      console.color(res3.data, '---mock post')
    },
    // 验证Promise数据
    async testPromise() {
      const res = await testApis.loadStaticInfo()
      console.color(res, '---静态数据')
    },
    // 验证网络请求
    async testRemote() {
      const res = await testApis.getToken({ appkey: 'dingpdwkf2uvdonamcpo', appsecret: '4o-TMElG_TCODHwBpp7WbkQKSUgNg23m6BlVT04PhHOfYwmF0xmvQX53wPD4hdgn' })
      console.color(res)
    }
  },
  onLoad() {
    this.testMock()
    this.testPromise()
    // this.testRemote();
  }
}
</script>

<style></style>
