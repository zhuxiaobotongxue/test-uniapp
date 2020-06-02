<template>
  <view class="container"><web-view ref="webview" :src="url" /></view>
</template>

<script>
import webviewMixin from './webview.mixin.js';
export default {
  mixins: [webviewMixin]
};
</script>
