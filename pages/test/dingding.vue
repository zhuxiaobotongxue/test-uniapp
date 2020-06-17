<template>
  <view class="container">
    <view class="margin-top-lg bg-grey"><text class="text-black">钉钉环境支持测试</text></view>
    <div><h1>hi</h1></div>
  </view>
</template>

<script>
import { EnvDiffInH5 } from '@/libs/interface';
export default {
  mounted() {
    dd.chooseImage({
      count: 2,
      success: (res) => {
          dd.alert({ 
              title: '选中的图片',
              content: JSON.stringify(res.filePaths)
          })
      },
    });
  }
};
</script>

<style lang="scss">
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
