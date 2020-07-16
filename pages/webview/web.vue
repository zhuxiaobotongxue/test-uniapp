<template>
  <view class="container">
    <!-- navbarTheme -->
    <uni-nav-bar status-bar :fixed="true" :shadow="false" :border="false" :title="title">
      <block slot="left">
        <uni-icons type="back" size="30" :color="navbarIconColor" @click="onGoBack"></uni-icons>
        <view style="width: 40rpx;"></view>
        <uni-icons type="closeempty" size="30" :color="navbarIconColor" @click="onClose"></uni-icons>
      </block>
      <block slot="right"><uni-icons type="more-filled" size="30" @click="onTapMenu" :color="navbarIconColor"></uni-icons></block>
    </uni-nav-bar>
  </view>
</template>

<script>
// 自定义 navbar
import { uniNavBar, uniIcons } from '@dcloudio/uni-ui';
import { objDecode } from '@/utils';
import webviewMixin from './webview.mixin.js';

const navbarThemes = {
  dark: {
    color: 'white',
    'background-color': 'black',
  },
};
export default {
  mixins: [webviewMixin],
  components: {
    uniNavBar,
    uniIcons,
  },
  onLoad(options) {
    /** 接收参数 */
    const { title, url, navbarTheme } = this.getRouteParams(options);
    console.log(navbarTheme, 'navbarThemenavbarThemenavbarThemenavbarThemenavbarThemenavbarThemenavbarTheme');
    // uni.setNavigationBarTitle({
    //   title,
    //   success: () => {
    //     console.log(url)
    //     this.createWebView(url)
    //   }
    // })
    this.title = title;
    this.createWebView(url);
    if (navbarTheme) {
      this.navbarTheme = navbarThemes[navbarTheme];
    }
    // title && uni.setNavigationBarTitle({ title })
    // navbarTheme && this.setNavigationBarTheme(navbarTheme)
  },
  data() {
    return {
      wv: null,
      title: '',
      navbarTheme: {},
    };
  },
  methods: {
    createWebView(loadURL) {
      /** 创建webview */
      // #ifdef APP-PLUS
      // 获取设备信息
      const { statusBarHeight } = uni.getSystemInfoSync();
      this.wv = plus.webview.create(loadURL, 'custom-webview', {
        // 禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
        // plusrequire: 'none',
        // 不加载uni-app渲染层框架，避免样式冲突
        'uni-app': 'none',
        top: statusBarHeight + 44,
        bottom: 0,
      });
      this.setWebviewStyle();
      uni.showNavigationBarLoading();
      // 监听渲染完成
      this.wv.checkRenderedContent({}, this.webviewRendered, this.webviewRendered);
      // this.wv.loadURL(loadURL)
      // 获取当前页面的webview对象
      // 此对象相当于html5plus里的plus.webview.currentWebview()。
      // 在uni-app里，直接使用plus.webview.currentWebview()无效
      const currentWebview = this.$mp.page.$getAppWebview();
      // 一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
      currentWebview.append(this.wv);
      // #endif
    },
    webviewRendered() {
      uni.hideNavigationBarLoading();
    },
    // 设置 导航栏 主题
    setNavigationBarTheme(theme) {
      const { navigationBar: navigationBarThemes } = Config;
      console.log(navigationBarThemes[theme], 'navigationBarThemes[theme]');
      if (navigationBarThemes[theme]) {
        uni.setNavigationBarColor(navigationBarThemes[theme]);
      }
    },
    onGoBack() {
      this.wv.canBack(({ canBack }) => {
        if (canBack) {
          this.wv.back();
        } else {
          uni.navigateBack();
        }
      });
    },
    onClose() {
      uni.navigateBack();
    },
    onTapMenu() {
      const _this = this;
      uni.showActionSheet({
        itemList: ['刷新', '取消'],
        success({ tapIndex }) {
          switch (tapIndex) {
            case 0:
              return _this.wv.reload();
            default:
              break;
          }
        },
      });
    },
  },
  computed: {
    navbarIconColor() {
      return this.navbarTheme.color ? this.navbarTheme.color : '#333333';
    },
    navbarBtns() {
      return [this.onGoBack, this.onClose, this.onTapMenu];
    },
  },
  // 监听导航栏按钮事件
  onNavigationBarButtonTap({ index }) {
    // #ifdef H5
    index += 1;
    // #endif
    const navbarBtnHandle = this.navbarBtns[index];
    if (navbarBtnHandle) return navbarBtnHandle();
  },
  onBackPress({ from }) {
    //  android 返回按键
    if (from === 'backbutton') {
      this.onGoBack();
      // 不执行默认返回
      return true;
    }
  },
};
</script>

<style></style>
