<template>
  <view>
    <view class="banner" @click="previewImage([info.img])">
      <image class="banner-img" :src="info.img"></image>
      <view class="banner-title">{{ info.title }}</view>
    </view>
    <view class="article-meta">
      <text class="article-author">{{ info.name }}</text>
      <text class="article-text">发表于</text>
      <text class="article-time">{{ info.date }}</text>
    </view>
    <view class="article-content"><rich-text :nodes="info.desc"></rich-text></view>
    <!-- #ifdef MP-WEIXIN || MP-QQ -->
    <ad v-if="info.desc.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad>
    <!-- #endif -->
  </view>
</template>

<script>
import { tool } from '@/utils'
import { testApis } from '@/apis'
export default {
  data() {
    return {
      id: '',
      info: {}
    }
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id
      this.fetchDetail()
    } else {
      this.$showErr('缺少必要参数!')
    }
  },
  methods: {
    previewImage: tool.previewImage,
    async fetchDetail() {
      const { code, data } = await testApis.loadMockInfo()
      if (code === 200) {
        this.info = data.obj
        console.color(this.info)
      } else {
        this.$showErr('请求详情信息出错!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 360rpx;
  overflow: hidden;
  position: relative;
  background-color: #ccc;
  &-img {
    width: 100%;
    height: 360rpx;
  }
  &-title {
    max-height: 84rpx;
    overflow: hidden;
    position: absolute;
    left: 30rpx;
    bottom: 30rpx;
    width: 90%;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 42rpx;
    color: white;
    z-index: 11;
  }
}
.article {
  &-meta {
    padding: 20rpx 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: gray;
  }
  &-text {
    font-size: 26rpx;
    line-height: 50rpx;
    margin: 0 20rpx;
  }
  &-author,
  &-time {
    font-size: 30rpx;
  }
  &-content {
    padding: 0 30rpx;
    overflow: hidden;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
}
</style>
