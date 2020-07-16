<template>
  <view class="container">
    <button @click="routerUtil.navigateTo({ url: '/pages/test/test' })">通用</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/dingding' })">钉钉</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/example/form' })">表单</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/example/list' })">分页加载列表</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/func' })">高阶函数</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/ramda' })">函数式</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/http' })">请求</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/design' })">设计模式</button>
    <button @click="routerUtil.goWebview({ url: 'http://www.baidu.com', title: '百度一下' })">webview</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/wxapp' })">微信小程序之vant-weapp</button>
    <button @click="routerUtil.navigateTo({ url: '/pages/test/temp' })">临时测试</button>
  </view>
</template>

<script>
import { tool } from '@/utils';

export default {
  computed: {
    routerUtil: () => tool.routerUtil,
  },
};
</script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
