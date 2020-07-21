<template>
  <view class="container">
    <view class="banner" @click="goDetail(info)">
      <image class="banner-img" :src="info.img"></image>
      <view class="banner-title">{{ info.title }}</view>
    </view>
    <view class="uni-list">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, key) in listData" :key="key" @click="goDetail(item)">
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.cover"></image>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{ item.title }}</view>
            <view class="uni-media-list-text-bottom">
              <text>{{ item.author_name }}</text>
              <text>{{ item.published_at }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more :status="loadStatus" :icon-size="16" :content-text="contentText" />
  </view>
</template>

<script>
import { uniLoadMore } from '@dcloudio/uni-ui'
import { testApis } from '@/apis'
export default {
  components: {
    uniLoadMore
  },
  data() {
    return {
      info: {},
      listData: [],
      last_id: '',
      reload: false, // 控制加载效果
      loadStatus: 'more', // more（loading前）、loading（loading中）、noMore（没有更多了）
      contentText: {
        contentdown: '上拉加载更多',
        contentrefresh: '加载中',
        contentnomore: '没有更多了'
      }
    }
  },
  onLoad() {
    this.init()
  },
  onPullDownRefresh() {
    this.reload = true
    this.last_id = ''
    this.fetchInfo()
    this.getList()
  },
  onReachBottom() {
    this.status = 'more'
    this.getList()
  },
  methods: {
    init() {
      this.fetchInfo()
      this.getList()
    },
    async fetchInfo() {
      const { code, data } = await testApis.loadMockInfo()
      if (code === 200) {
        this.info = data.obj
        uni.stopPullDownRefresh() // 停止下拉加载
      } else {
        this.$showErr('请求异常！')
      }
    },
    getList() {
      var data = {
        column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
      }
      if (this.last_id) {
        //说明已有数据，目前处于上拉加载
        this.loadStatus = 'loading'
        data.minId = this.last_id
        data.time = new Date().getTime() + ''
        data.pageSize = 10
      }
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news',
        data: data,
        success: data => {
          if (data.statusCode == 200) {
            let list = this.setTime(data.data)
            this.listData = this.reload ? list : this.listData.concat(list)
            this.last_id = list[list.length - 1].id
            this.reload = false
          }
        },
        fail: (data, code) => {
          console.log('fail' + JSON.stringify(data))
        }
      })
    },
    goDetail: function(e) {
      // 				if (!/前|刚刚/.test(e.published_at)) {
      // 					e.published_at = dateUtils.format(e.published_at);
      // 				}
      let detail = {
        author_name: e.author_name,
        cover: e.cover,
        id: e.id,
        post_id: e.post_id,
        published_at: e.published_at,
        title: e.title
      }
      uni.navigateTo({
        url: './detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
      })
    },
    setTime: function(items) {
      var newItems = []
      items.forEach(e => {
        newItems.push({
          author_name: e.author_name,
          cover: e.cover,
          id: e.id,
          post_id: e.post_id,
          // dateUtils.format(e.published_at)
          published_at: '',
          title: e.title
        })
      })
      return newItems
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
