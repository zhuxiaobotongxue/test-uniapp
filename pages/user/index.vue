<template>
  <view class="container">
    <image class="bg-img" src="/static/images/signin/bg.jpg" mode="scaleToFill"></image>
    <view class="cu-card card-box">
      <view class="cu-item user-card-wrap">
        <view class="user-card" v-if="userInfo">
          <image class="cu-avatar round" :src="avatar" mode="scaleToFill" @tap="onTapEditor"></image>
          <view class="cu-username" @tap="onTapEditor">{{ userInfo.name }}</view>
        </view>
      </view>
      <view class="cu-item">
        <view class="cu-list menu sm-border">
          <view class="cu-item arrow" v-for="menu in menuList" :key="menu.id" @click="onTapMenuItem(menu)">
            <button class="cu-btn content">
              <text :class="[menu.iconClass, 'text-lg']"></text>
              <text class="text-grey">{{ menu.label }}</text>
            </button>
            <view class="action" v-if="menu.value">
              <text class="text-grey text-sm">{{ menu.value }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="margin flex flex-direction" v-if="showSignBtn"><button class="cu-btn line-blue lg block" :disabled="false" @click="handleSignOut">退出登录</button></view>
  </view>
</template>

<script>
import { tool } from '@/utils';
import { mapGetters, mapActions } from 'vuex';
import { EnvDiffInH5 } from '@/libs/interface';
export default {
  data() {
    return {
      showSignBtn: true
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    avatar() {
      return this.userInfo.avatar || require('@/static/images/signin/photo.png');
    },
    menuList() {
      return [{ id: '1', iconClass: 'cuIcon-safe text-blue', label: '我的测试', url: '/pages/test/index' }];
    }
  },
  mounted() {
    // #ifdef H5
    this.initSignBtn();
    // #endif
  },
  methods: {
    ...mapActions(['signOut']),
    onTapEditor(){},
    // 判断环境初始化登录按钮
    initSignBtn() {
      const that = this;
      class IsShowSignBtn extends EnvDiffInH5 {
        notInDingTalk() {
          that.showSignBtn = true;
        }
        dd() {
          that.showSignBtn = false;
        }
      }
      let isShowSignBtn = new IsShowSignBtn();
      isShowSignBtn[this.$dd.env.platform]();
    },
    handleSignOut() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗?',
        success: ({ confirm }) => {
          if (confirm) {
            tool.routerUtil.goAuthPage(() => {
              this.signOut();
            });
          }
        }
      });
    },
    onTapMenuItem(menu) {
      if (menu.url) {
        uni.navigateTo({ url: menu.url });
      } else if (menu.clickHandle) {
        menu.clickHandle();
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  .bg-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 30vh;
    border-bottom-left-radius: 65% 10%;
    border-bottom-right-radius: 65% 10%;
  }
  .card-box {
    margin-top: -10vh;
    position: relative;
    z-index: 10;
    overflow: visible !important;
  }
  .user-card-wrap {
    min-height: 218rpx;
    display: flex;
    justify-content: center;
    overflow: visible !important;
    .user-card {
      border: 1rpx solid transparent;
      text-align: center;
      max-width: 100%;
      /* #ifdef H5 */
      margin-top: -70rpx;
      /* #endif */
      /* #ifndef H5 */
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: -84rpx;
      /* #endif */
      .cu-avatar {
        border: 2px solid $uni-bg-color-grey;
        margin-bottom: 20rpx;
        width: 71px;
        height: 71px;
      }
      .cu-username {
        margin: auto;
        text-align: center;
        line-height: 1;
        font-size: 32rpx;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
