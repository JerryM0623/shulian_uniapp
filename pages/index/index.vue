<template>
	<view class="container index-container">
		<u-notify ref="uNotify"></u-notify>
		<view class="search" @click="gotoOtherPage(`/pages/search/search?placeholder=${placeholder}`)">
			<u-search :showAction="false" bgColor="#f5f5f5" shape="round" :placeholder="placeholder" inputAlign="center"
				:disabled="true" searchIconColor="#656565" color="#000000"></u-search>
		</view>
		<view class="swiper">
			<u-swiper :list="swiperList" indicator indicatorMode="line" circular autoplay height="90" radius="10"></u-swiper>
		</view>
		<view class="buttons">
			<view class="item category" @click="gotoBookCity">
				<image src="../../static/icons/category.png"></image>
				<text>分类查询</text>
			</view>
			<view class="item hot" @click="gotoOtherPage('/pages/templatePage/templatePage?title=热门排行')">
				<image src="../../static/icons/hot.png"></image>
				<text>热门排行</text>
			</view>
			<view class="item finish" @click="gotoOtherPage('/pages/templatePage/templatePage?title=完结小说')">
				<image src="../../static/icons/finish.png"></image>
				<text>完结小说</text>
			</view>
			<view class="item new" @click="gotoOtherPage('/pages/templatePage/templatePage?title=最近更新')">
				<image src="../../static/icons/new.png"></image>
				<text>最近更新</text>
			</view>
		</view>
		<view class="recommend">
			<view class="title">潜力好书</view>
			<list-item :dataList="recommendList"></list-item>
			<view class="tip">暂时没有更多哦...</view>
		</view>
	</view>
</template>

<script>
	import { getBaseUrl } from '../../utils/getBaseUrl.js';
	import { showSuccessNotify, showErrorNotify } from '../../utils/showNotify.js';
	import { getHotKeyWords } from '../../request/getHotKeyWords.js';
	import ListItem from '../../component/ListItem.vue';
	export default {
		data() {
			return {
				title: 'Hello',
				swiperList: [],
				recommendList:[],
				hotKeyWordsList: [],
				session: "",
				token: "",
				notifyObj: "",
				timer: null,
				placeholder: ""
			}
		},
		components: {
			ListItem
		},
		methods:{
			getSessionAndToken(){
				this.session = uni.getStorageSync('session');
				this.token = uni.getStorageSync('token');
			},
			getSwiperList(){
				uni.request({
					url:`${ getBaseUrl() }/main/swiper`,
					method:"GET",
					success: (res) => {
						if (res.statusCode === 200 && res.data.code ===200){
							this.swiperList = res.data.data.content.articlerows.map(row => {
								return "https://www.facerome.com" + row.url_limage;
							});
						}else{
							showErrorNotify(this.notifyObj, "获取轮播图失败");
						}
					},
					fail: (err) => {
						showErrorNotify(this.notifyObj, "获取轮播图失败");
					}
				})
			},
			getRecommendList(){
				uni.request({
					url:`${ getBaseUrl() }/main/recommend`,
					method:"GET",
					success: (res) => {
						if (res.statusCode === 200 && res.data.code ===200){
							this.recommendList = res.data.data.content.articlerows;
						}else{
							showErrorNotify(this.notifyObj, "信息获取失败");
						}
					},
					fail: (err) => {
						showErrorNotify(this.notifyObj, "信息获取失败");
					}
				})
			},
			async getHotKeyWords_index(){
				const res = await getHotKeyWords();
				if (res[1]){
					this.hotKeyWordsList = res[1].data.data;
					this.placeholder = this.hotKeyWordsList[Math.floor(Math.random() * this.hotKeyWordsList.length)].articlename;
					this.timer = setInterval(() => {
						this.placeholder = this.hotKeyWordsList[Math.floor(Math.random() * this.hotKeyWordsList.length)].articlename;
					}, 5000)
				}else{
					showErrorNotify(this.notifyObj, "信息获取失败")
				}
			},
			gotoOtherPage(url){
				uni.navigateTo({
					url
				})
			},
			gotoBookCity(){
				uni.switchTab({
					url:"/pages/bookCity/bookCity"
				})
			}
		},
		onReady() {
			this.getSessionAndToken();
			this.notifyObj = this.$refs.uNotify;
			this.getSwiperList();
			this.getRecommendList();
			this.getHotKeyWords_index();
		},
		beforeDestroy(){
			this.timer = undefined;
		}
	}
</script>

<style lang="scss">
	.index-container{
		.search{
			margin-bottom: 52.08rpx;
		}
		.buttons{
			display: flex;
			.item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 170.5rpx;
				height: 170.5rpx;
				image{
					width: 56.25rpx;
					height: 56.25rpx;
					margin-bottom: 20rpx;
				}
				text{
					font-size: 24.31rpx;
				}
			}
		}
		.recommend{
			.title{
				font-size: 34.72rpx;
				font-weight: 700;
				margin-bottom: 41.67rpx;
			}
			.tip{
				color: #999999;
				font-size: 13.89rpx;
				text-align: center;
				padding-bottom: 10rpx;
			}
		}
	}
</style>
