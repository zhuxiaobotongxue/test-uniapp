<template>
  <view class="container">
    <uni-nav-bar status-bar :fixed="true" :shadow="false" :border="false" :title="title">
      <block slot="left">
        <uni-icons type="back" size="30" color="#333333" @click="onGoBack"></uni-icons>
        <uni-icons type="closeempty" size="42" color="#333333" @click="onClose"></uni-icons>
      </block>
      <block slot="right"><uni-icons type="more-filled" size="30" @click="onTapMenu"></uni-icons></block>
    </uni-nav-bar>
    <web-view ref="webview" :src="url" :style="webviewStyle" @message="onPostMessage" />
  </view>
</template>

<script>
import { uniNavBar, uniIcons } from '@dcloudio/uni-ui';
import { pathToBase64 } from '@/libs/image-tools/index.js';
import { tool } from '@/utils';
import { mapGetters } from 'vuex';
import Config from '@/config/index.js';
import webviewMixin from './webview.mixin.js';

// const testUrl =
//   'http://aixy.xys12345.cn/aixy-api/app/oauth2/authorize?api=1243084344693567489&client_id=1255324692510846978&redirect_uri=https://aixy.xys12345.cn/aixy-agent/app/social/initializeUr&response_type=code&scope=aixyapi_auth&state=123#aixy_redirect'
export default {
  components: { uniNavBar, uniIcons },
  mixins: [webviewMixin],
  data() {
    return {
      wv: null,
      url: '',
      title: null,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    // navColor() {
    //   return { bg: 'transparent', text: '#FFFFFF' }
    // },
    webviewStyle() {
      const { statusBarHeight, windowWidth, windowHeight } = uni.getSystemInfoSync();
      return { width: windowWidth, height: windowHeight };
    },
    navbarBtns() {
      return [this.onGoBack, this.onClose, this.onTapMenu];
    },
  },
  onLoad(options) {
    const { url, title, navbarTheme } = this.getRouteParams(options);
    this.url = url;
    this.title = title;
    navbarTheme && this.setNavigationBarTheme(navbarTheme);
  },
  mounted() {
    const currentWebview = this.$mp.page.$getAppWebview();
    this.wv = currentWebview.children()[0];
    this.setWebviewStyle();
    this.addWebviewEventListener();
    // this.wv.loadURL(testUrl)
    // 绑定 webview 拦截器
    // effect: (String 类型 )拦截URL请求生效时机 "instant" - 表示立即生效 "touchstart" - 表示用户操作Webview窗口（触发touchstart事件）后生效
    // mode: (String 类型 )拦截模式
    // "allow"表示满足match属性定义的条件时不拦截url继续加载
    // "reject"表示满足match属性定义的提交时拦截url跳转并触发callback回调
    // match: (String 类型 )区配是否需要处理的URL请求
    // 支持正则表达式，默认值为对所有URL地址生效（相当于正则表达式“.*”）。 如果mode值为"allow"则允许区配的URL请求跳转，mode值为"reject"则拦截区配的URL请求。
    // exclude: (String 类型 )排除拦截处理请求类型
    // 不拦截处理指定类型的URL请求，直接使用系统默认处理逻辑。 可取值： "none"表示不排除任何URL请求（即拦截处理所有URL请求）； "redirect"表示排除拦截处理301/302跳转的请求
    this.wv.overrideUrlLoading({ effect: 'instant', mode: 'reject', match: Config.WvRegExp }, (e) => {
      console.log(`reject url: ${e.url}`);
      const currentURL = e.url;
      // 未实名认证
      if (currentURL.includes('noRealNameVer')) {
        this.$dialog.show(
          {
            title: '提示',
            con: '此服务需要实名认证,您还没有进行实名认证,是否立即认证?',
            okTitle: '去认证',
          },
          (e) => {
            uni.redirectTo({ url: '/pages/user/auth/index' });
          },
          (e) => this.onClose(),
        );
      } else if (currentURL.includes('authorize')) {
        const currentURLStrArr = currentURL.split('?');
        const newURL = `${currentURLStrArr[0]}?au=t&${currentURLStrArr[1]}`;
        console.log(newURL, 'newURL');
        this.wv.loadURL(newURL, { auident: this.userInfo.id });
      } else if (currentURL.includes('closeWindow')) {
        this.onClose();
      }
    });
  },
  // 监听导航栏按钮事件
  // onNavigationBarButtonTap({ index }) {
  //   // #ifdef H5
  //   index = index + 1
  //   // #endif
  //   const navbarBtnHandle = this.navbarBtns[index]
  //   if (navbarBtnHandle) return navbarBtnHandle()
  // },
  onBackPress({ from }) {
    // android 返回按键
    if (from === 'backbutton') {
      this.onGoBack();
      // 不执行默认返回
      return true;
    }
  },
  methods: {
    onGoBack() {
      this.wv.canBack(({ canBack }) => {
        if (canBack) {
          this.wv.back();
        } else {
          uni.navigateBack();
        }
      });
    },
    // 一次性关闭webview,而非回退
    onClose() {
      this.$mp.page.$getAppWebview().close();
      setTimeout(uni.navigateBack, 0);
      // const pages = getCurrentPages()
      // // uni.switchTab({
      // //   url: '/' + pages[pages.length - 2].route
      // // })
      // console.log(pages.length, '213243242343242342')
      // uni.navigateBack({
      //   delta: pages.length
      // })
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
    // 接收处理 网页发送的消息
    onPostMessage(e) {
      console.log(e, 'onPostMessage');
      console.log(`接收到的消息：${JSON.stringify(e.detail.data)}`);
      const { action, params } = e.detail.data[0];
      console.log(action, params);
      if (typeof this[action] === 'function') this[action](params);
    },
    actionSheet(params) {
      const { itemList = [] } = params;
      uni.showActionSheet({
        itemList,
      });
      // TODO 每个选项需要实现对应的函数
    },
    // 预览图片
    previewImage(params) {
      console.log(params, 'previewImage--params');
      // const options = JSON.parse(params)
      uni.previewImage({
        ...params,
        indicator: 'number',
        success(data) {
          console.log(data, '------');
        },
        fail(err) {
          console.log(err.errMsg);
        },
      });
    },
    // 选择图片
    chooseImage(params) {
      const { fnIndex } = params;
      uni.chooseImage({
        count: 6, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        success: async (res) => {
          try {
            const base64Images = await Promise.all(res.tempFilePaths.map((path) => pathToBase64(path)));
            const imageFiles = base64Images.map((item, index) => ({ tempPath: res.tempFilePaths[index], base64: item }));
            const imageStr = JSON.stringify(imageFiles);
            // #ifdef APP-PLUS
            // this.$refs.webview.evalJs(`window.ixy.callbacks[${fnIndex}]('${imageStr}')`)
            this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${imageStr}')`);
            // #endif
          } catch (e) {
            console.log(e, 'error');
          }
        },
      });
    },
    // 获取地理位置信息
    getLocation(params) {
      const { fnIndex } = params;
      uni.getLocation({
        type: 'wgs84',
        success: (res) => {
          const resultStr = JSON.stringify(res);
          // #ifdef APP-PLUS
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
        // fail: err => {
        // 	const resultStr = JSON.stringify(err)
        // 	// #ifdef APP-PLUS
        // 	this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`)
        // 	// #endif
        // }
      });
    },
    // 打开地理位置信息
    openLocation(params) {
      const { latitude, longitude, fnIndex } = params; // 需要gcj02格式的坐标
      console.log('latitude', params, latitude, longitude, typeof latitude, typeof longitude);
      uni.openLocation({
        latitude,
        longitude,
        success: (res) => {
          const resultStr = JSON.stringify(res);
          // #ifdef APP-PLUS
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
        fail: (err) => {
          const resultStr = JSON.stringify(err);
          // #ifdef APP-PLUS
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
      });
    },
    // 使用内置地图选择位置
    chooseLocation(params) {
      const { fnIndex } = params;
      uni.chooseLocation({
        success: (res) => {
          const resultStr = JSON.stringify(res);
          // #ifdef APP-PLUS
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
        // fail: err => {
        // 	const resultStr = JSON.stringify(err)
        // 	// #ifdef APP-PLUS
        // 	this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`)
        // 	// #endif
        // }
      });
    },
    // 扫码
    scanQRCode(params) {
      const { fnIndex } = params;
      uni.scanCode({
        success: (res) => {
          const resultStr = JSON.stringify(res);
          // #ifdef APP-PLUS
          // this.wv.evalJS(`window.ixy.cbs[${action}].success('${resultStr}')`)
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
        // fail: err => {
        // 	const resultStr = JSON.stringify(err)
        // 	// #ifdef APP-PLUS
        // 	this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`)
        // 	// #endif
        // }
      });
    },
    // 获取网络状态
    getNetworkType(params) {
      const { fnIndex } = params;
      uni.getNetworkType({
        success: (res) => {
          const resultStr = JSON.stringify(res);
          // #ifdef APP-PLUS
          this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
          // #endif
        },
        // fail: err => {
        // 	const resultStr = JSON.stringify(err)
        // 	// #ifdef APP-PLUS
        // 	this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`)
        // 	// #endif
        // }
      });
    },
    // 获取系统信息
    getSystemInfo(params) {
      const { fnIndex } = params;
      const info = uni.getSystemInfoSync();
      // #ifdef APP-PLUS
      const resultStr = JSON.stringify(info);
      this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${resultStr}')`);
      // #endif
    },
    // 获取环境
    getEnv(params) {
      const { fnIndex } = params;
      const { platform } = this.$currentAppInfo;
      // #ifdef APP-PLUS
      this.wv.evalJS(`window.ixy.callbacks[${fnIndex}]('${platform}')`);
      // #endif
    },
    // 关闭当前页面
    closeWindow() {
      this.onClose();
    },
  },
};
</script>

<style></style>
