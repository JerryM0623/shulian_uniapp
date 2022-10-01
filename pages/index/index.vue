<template>
	<view class="container index-container">
		<u-notify ref="uNotify"></u-notify>
		<view class="search" @click="gotoSearch">
			<u-search :showAction="false" bgColor="#f5f5f5" shape="round" :placeholder="placeholder" inputAlign="center"
				:disabled="true" searchIconColor="#656565" color="#000000"></u-search>
		</view>
		<view class="swiper">
			<u-swiper :list="swiperList" indicator indicatorMode="line" circular autoplay height="90" radius="10"></u-swiper>
		</view>
		<view class="buttons">
			<view class="item category">
				<image src="../../static/icons/category.png"></image>
				<text>分类查询</text>
			</view>
			<view class="item hot">
				<image src="../../static/icons/hot.png"></image>
				<text>热门排行</text>
			</view>
			<view class="item finish">
				<image src="../../static/icons/finish.png"></image>
				<text>完结小说</text>
			</view>
			<view class="item new">
				<image src="../../static/icons/new.png"></image>
				<text>最近更新</text>
			</view>
		</view>
		<view class="recommend">
			<view class="title">潜力好书</view>
			<view class="list">
				<view class="list-item" v-for="item in recommendList" :key="item.id">
					<image class="book-image" :src="'https://www.facerome.com' + item.url_image" mode="aspectFill"></image>
					<view class="book-info">
						<view class="name-rate">
							<text class="name">{{ item.articlename }}</text>
							<text class="rate">{{ item.rateavg }}分</text>
						</view>
						<view class="summary">
							<u-text :lines="2" :text="item.intro"></u-text>
						</view>
						<view class="author">{{ item.author }}</view>
					</view>
				</view>
			</view>
			<view class="tip">暂时没有更多哦...</view>
		</view>
	</view>
</template>

<script>
	import { getBaseUrl } from '../../utils/getBaseUrl.js';
	import { showSuccessNotify, showErrorNotify } from '../../utils/showNotify.js';
	import { getHotKeyWords } from '../../request/getHotKeyWords.js';
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
			gotoSearch(){
				uni.navigateTo({
					url:`/pages/search/search?placeholder=${this.placeholder}`
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
			.list{
				.list-item{
					height: 206.94rpx;
					padding-bottom: 37.5rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.book-image{
						width: 150rpx;
						height: 206.94rpx;
						margin-right: 23.61rpx;
						border-radius: 6.94rpx;
					}
					.book-info{
						width: calc(682rpx - 173.61rpx);
						display: flex;
						flex-direction: column;
						.name-rate{
							height: 34.72rpx;
							margin-top: 15.28rpx;
							display: flex;
							justify-content: space-between;
							.name{
								font-size: 31.94rpx;
								color: #000000;
								font-weight: 700;
							}
							.rate{
								// width: 76.39rpx;
								font-size: 27.78rpx;
								color: #ff3b2d;
								font-weight: 700;
							}
						}
						.summary{
							margin-top: 25.69rpx;
							font-size: 26.39rpx;
							color: #676767;
						}
						.author{
							margin-top: 16.67rpx;
							color: #999999;
							font-size: 26.39rpx;
						}
					}
				}
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
