<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
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
