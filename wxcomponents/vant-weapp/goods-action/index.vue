<template>
<uni-shadow-root class="vant-weapp-goods-action-index"><view :class="'custom-class '+(utils.bem('goods-action', { safe: safeAreaInsetBottom }))">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant-weapp/goods-action/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
component_1.VantComponent({
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    current: 'goods-action',
    linked: function () {
      this.updateStyle();
    },
    unlinked: function () {
      this.updateStyle();
    },
    linkChanged: function () {
      this.updateStyle();
    },
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    updateStyle: function () {
      var _this = this;
      wx.nextTick(function () {
        _this.children.forEach(function (child) {
          child.updateStyle();
        });
      });
    },
  },
});
export default global['__wxComponents']['vant-weapp/goods-action/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-goods-action{position:fixed;right:0;bottom:0;left:0;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;background-color:#fff;background-color:var(--goods-action-background-color,#fff)}.van-goods-action--safe{padding-bottom:env(safe-area-inset-bottom)}
</style>