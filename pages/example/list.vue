<template>
  <view class="container">
    <view class="banner" @click="goDetail(info)">
      <image class="banner-img" :src="info.img"></image>
      <view class="banner-title">{{ info.title }}</view>
    </view>
    <view class="uni-list">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, key) in list.data" :key="key" @click="goDetail(item)">
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.img"></image>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{ item.title }}</view>
            <view class="uni-media-list-text-bottom">
              <text>{{ item.name }}</text>
              <text>{{ item.date }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more :status="list.load.status" :icon-size="16" :content-text="list.load.text" />
  </view>
</template>

<script>
import { uniLoadMore } from '@dcloudio/uni-ui'
import { testApis } from '@/apis'
import { tool } from '@/utils'
export default {
  components: {
    uniLoadMore
  },
  data() {
    return {
      info: {},
      list: {
        params: {
          pageNumber: 1,
          pageSize: 20,
          searchText: ''
        },
        data: [],
        load: {
          status: 'more', // more（loading前）、loading（loading中）、noMore（没有更多了）
          text: {
            contentdown: '上拉加载更多',
            contentrefresh: '加载中',
            contentnomore: '没有更多了'
          }
        }
      }
    }
  },
  onLoad() {
    this.init()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.refreshList()
  },
  // 触底加载更多
  onReachBottom() {
    if (this.list.load.status !== 'noMore') {
      this.list.load.status = 'more'
      this.fetchList()
    }
  },
  methods: {
    init() {
      this.fetchInfo()
      this.fetchList()
    },
    // 刷新：还原请求参数，并重新请求渲染
    refreshList() {
      this.list.params = Object.assign(this.list.params, {
        pageNumber: 1,
        searchText: ''
      })
      this.init()
    },
    // 获取列表数据
    async fetchList() {
      const _isLoadfirst = this.list.params.pageNumber === 1
      if (!_isLoadfirst) {
        this.list.load.status = 'loading'
      }
      const { code, data } = await testApis.loadMockList(this.list.params)
      if (code === 200) {
        let _arr = data.arr // 适配
        this.list.data = _isLoadfirst ? _arr : this.list.data.concat(_arr)
        if (_arr.length < this.list.params.pageSize) {
          this.list.load.status = 'noMore'
        } else {
          this.list.params.pageNumber++
        }
      } else {
        this.$showErr('列表请求异常！')
      }
    },
    // 获取对象信息
    async fetchInfo() {
      const { code, data } = await testApis.loadMockInfo()
      if (code === 200) {
        this.info = data.obj
        uni.stopPullDownRefresh() // 停止下拉加载
      } else {
        this.$showErr('对象数据请求异常！')
      }
    },
    // 前往详情页
    goDetail(param) {
      if (param.id) {
        tool.routerUtil.navigateTo({ url: './detail', params: { id: param.id } })
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

.uni-media-list {
  &-logo {
    width: 180rpx;
    height: 140rpx;
  }
  &-body {
    height: auto;
    justify-content: space-around;
  }
  &-text {
    &-top {
      height: 74rpx;
      font-size: 28rpx;
      overflow: hidden;
    }
    &-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
