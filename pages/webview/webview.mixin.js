import {
  tool
} from '@/utils'
import Config from '@/config/index.js'

export default {
  onLoad(options) {
    /** 接收参数 */
    const {
      title,
      url,
      navbarTheme
    } = this.getRouteParams(options)
    console.log(navbarTheme, 'navbarTheme')
    this.title = title
    this.createWebView ? this.createWebView(url) : this.url = url
    if (navbarTheme) {
      this.navbarTheme = navbarThemes[navbarTheme]
    }
  },
  data() {
    return {
      wv: null,
      title: '',
      url: '',
      navbarTheme: {}
    }
  },
  computed: {
    navbarIconColor() {
      return this.navbarTheme.color ? this.navbarTheme.color : '#333333'
    },
  },
  methods: {
    setWebviewStyle() {
      const {
        statusBarHeight
      } = uni.getSystemInfoSync()
      // replacewebapi: 替换H5标准API
      // 尽量提前注入，拦截页面中网络js请求实现提前注入
      this.wv.setStyle({
        errorPage: '/hybrid/html/error.html',
        replacewebapi: 'auto',
        plusrequire: 'none',
        progress: {
          color: '#007aff'
        },
        disablePlus: true,
        top: statusBarHeight + 44,
        bottom: 0
      })

    },
    addWebviewEventListener() {
      // 监听
      // this.wv.addEventListener('titleUpdate', e => setTimeout(() => uni.setNavigationBarTitle({ title: this.title }), 0), false)
    },
    // 设置 导航栏 主题
    setNavigationBarTheme(theme) {
      const {
        navigationBar: navigationBarThemes
      } = Config
      console.log(navigationBarThemes[theme], 'navigationBarThemes[theme]')
      if (navigationBarThemes[theme]) {
        uni.setNavigationBarColor(navigationBarThemes[theme])
      }
    },
    // 获取参数
    getRouteParams(options) {
      console.log(tool.objDecode(options), 'objDecode(options)')
      const {
        url,
        title,
        navbarTheme,
        ...other
      } = tool.objDecode(options)
      return {
        url,
        title,
        navbarTheme,
        ...other
      }
    }
  }
}
