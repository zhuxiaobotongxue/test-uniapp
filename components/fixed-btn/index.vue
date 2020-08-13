<template>
  <view class="fixed-box" @click="handleFixedBtnClick"><text class="fixed-box-btn" :class="icon"></text></view>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'cuIcon-add'
    }
  },
  methods: {
    handleFixedBtnClick() {
      this.$emit('onFixedBtnClick')
    }
  }
}
</script>

<style lang="scss" scoped>
// 悬浮按钮
.fixed-box {
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  position: fixed;
  left: 480rpx;
  right: 0;
  margin: auto;
  bottom: 70rpx;
  z-index: 9999;
  background-color: #fcdf1b;
  border-radius: 50%;
  &-btn {
    font-size: 40rpx;
    font-weight: bold;
    color: #000;
  }
}
</style>
