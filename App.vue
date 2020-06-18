<script>
  import {
    appApis
  } from '@/apis';
  export default {
    onLaunch: function() {
      // #ifdef H5
      // this.initDingConfig();
      // #endif
    },
    methods: {
      // 钉钉js_api鉴权
      initDingConfig() {
        try {
          const that = this;
          const dd = that.$dd;
          const callbackUrl = location.origin;
          if (!dd.other) {
            dd.ready(function() {
              appApis.getDingConfig(callbackUrl).then(res => {
                const {
                  resul
                } = res;
                dd.config({
                  agentId: result.agentId, // 必填，微应用ID
                  corpId: result.corpId, //必填，企业ID
                  timeStamp: result.timeStamp, // 必填，生成签名的时间戳
                  nonceStr: result.nonceStr, // 必填，生成签名的随机串
                  signature: result.signature, // 必填，签名
                  type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                  jsApiList: ['device.geolocation.get', 'device.geolocation.start',
                    'device.geolocation.stop'
                  ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                });
                dd.error(function(err) {
                  that.$showErr(err);
                });
              });
            });
          }
        } catch (err) {
          this.$showErr(err);
        }
      }
    }
  };
</script>
<style lang="scss">
  /* 解决头条小程序组件内引入字体不生效的问题 */
  /* #ifdef MP-TOUTIAO */
  @font-face {
    font-family: uniicons;
    src: url('/static/uni.ttf');
  }

  /* #endif */
  /* 引入ColorUI样式库，注意不支持NVUE的判断 */
  /* #ifndef APP-NVUE */
  @import 'styles/icon.css';
  @import 'styles/main.css';
  /* 引入自定义扩展通用样式库 */
  @import 'styles/common.scss';
  /* #endif */
</style>
