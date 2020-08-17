<template>
  <view class="container">
    <view class="user">
      <view class="flex align-center">
        <view class="flex-sub text-center"><image class="user-avatar" :src="avatar" @click="open()"></image></view>
        <view class="flex-treble">
          <text class="text-xl text-black">{{ userInfo.name }}</text>
        </view>
      </view>
    </view>
    <!-- card-menu -->
    <view class="cu-list menu margin-top-xs margin-bottom-xl shadow-lg">
      <view v-for="menu in menuList" :key="menu.id" class="cu-item arrow" @click="handleMenu(menu)">
        <view class="content">
          <text :class="[menu.iconClass, 'text-lg']"></text>
          <text class="text-grey">{{ menu.label }}</text>
        </view>
        <view class="action" v-if="menu.value">
          <text class="text-grey text-sm">{{ menu.value }}</text>
        </view>
      </view>
    </view>
    <view class="margin flex flex-direction" v-if="showSignBtn"><button class="cu-btn line-blue lg block" :disabled="false" @click="handleSignOut">退出登录</button></view>
  </view>
</template>

<script>
import { tool } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { EnvDiffInH5 } from '@/interface'

export default {
  data() {
    return {
      showSignBtn: true
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    avatar() {
      return this.userInfo.avatar || require('@/static/images/signin/photo.png')
    },
    menuList() {
      return [
        {
          id: '9',
          iconClass: 'cuIcon-safe text-blue',
          label: '我的测试',
          url: '/pages/test/index',
          value: ''
        },
        {
          id: '10',
          iconClass: 'cuIcon-safe text-blue',
          label: '关于',
          url: '',
          value: ''
        }
      ]
    }
  },
  mounted() {
    console.color(this.userInfo)
    // #ifdef H5
    this.initSignBtn()
    // #endif
  },
  methods: {
    ...mapActions(['signOut']),
    handleMenu: tool.handleMenu,
    // 判断环境初始化登录按钮
    initSignBtn() {
      const that = this
      class IsShowSignBtn extends EnvDiffInH5 {
        notInDingTalk() {
          that.showSignBtn = true
        }

        dd() {
          that.showSignBtn = false
        }
      }
      const isShowSignBtn = new IsShowSignBtn()
      isShowSignBtn[this.$dd.env.platform]()
    },
    handleSignOut() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗?',
        success: ({ confirm }) => {
          if (confirm) {
            tool.routerUtil.goAuthPage(() => {
              this.signOut()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  .user {
    padding: 80rpx 40rpx 0;
    background-color: #ffffff;

    &-avatar {
      width: 130rpx;
      height: 130rpx;
      border: 5rpx solid #fff;
      border-radius: 50%;
    }
  }
}
</style>
