<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	uni-page-body{
		height: 100%;
	}
	.container{
		padding: 42rpx 34rpx 0 34rpx;
		width: 682rpx;
		height: calc(100% - 42rpx);
		font-family: -apple-system, 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB',
		  'Source Han Sans CN', 'Source Han Sans SC', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei,
		  'WenQuanYi Zen Hei Sharp', sans-serif;
	}
</style>
