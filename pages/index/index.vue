<template>
	<view class="container index-container">
		<view class="search">
			<u-search :showAction="false" bgColor="#f5f5f5" shape="round" placeholder="" inputAlign="center"
				:disabled="true" searchIconColor="#656565" color="#000000"></u-search>
		</view>
		<view class="swiper">
			<u-swiper :list="list1" indicator indicatorMode="line" circular autoplay heig ht="90" radius="10"></u-swiper>
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
				<view class="list-item" v-for="item in list2" :key="item.id">
					<image class="book-image" :src="item.imgUrl" mode="aspectFill"></image>
					<view class="book-info">
						<view class="name-rate">
							<text class="name">{{ item.name }}</text>
							<text class="rate">{{ item.rate }}分</text>
						</view>
						<view class="summary">
							<u-text :lines="2" :text="item.summary"></u-text>
						</view>
						<view class="author">{{ item.author }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list1: [
					'../../static/test_images/111.bmp',
					'../../static/test_images/222.jpg',
					'../../static/test_images/333.png',
					'../../static/test_images/444.bmp',
					'../../static/test_images/555.jpg',
					'../../static/test_images/666.jpg',
				],
				list2:[
					{ id:1, imgUrl: '../../static/test_images/111.bmp', name: "春江花月夜", summary: "你拍一，我拍一，我们一起做游戏,你拍一，我拍一，我们一起做游戏,你拍一，我拍一，我们一起做游戏", author: "111222333", rate: "8.5" },
					{ id:1, imgUrl: '../../static/test_images/222.jpg', name: "城春草木深", summary: "你拍二，我拍二，我们大家都不二,你拍二，我拍二，我们大家都不二,你拍二，我拍二，我们大家都不二", author: "aaabbbddd", rate: "9.3" },
					{ id:1, imgUrl: '../../static/test_images/111.bmp', name: "感时花溅泪", summary: "你拍三，我拍三，三三喵口跑第三,你拍三，我拍三，三三喵口跑第三,你拍三，我拍三，三三喵口跑第三", author: "熊熊熊子路", rate: "7.6" },
					{ id:1, imgUrl: '../../static/test_images/222.jpg', name: "床前明月光", summary: "你拍四，我拍四，大家一起去考试,你拍四，我拍四，大家一起去考试,你拍四，我拍四，大家一起去考试", author: "落日国人", rate: "7.7" },
					{ id:1, imgUrl: '../../static/test_images/111.bmp', name: "锄禾日当午", summary: "你拍五，我拍五，一起去当王老五,你拍五，我拍五，一起去当王老五,你拍五，我拍五，一起去当王老五", author: "罗马假日", rate: "8.0" },
					{ id:1, imgUrl: '../../static/test_images/222.jpg', name: "从你的世界刷过", summary: "你拍六，我拍六，这辈子不会很溜,你拍六，我拍六，这辈子不会很溜,你拍六，我拍六，这辈子不会很溜", author: "流浪地球", rate: "2.6" },
				]
			}
		},
		onLoad() {

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
			margin-bottom: 41.67rpx;
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
					margin-bottom: 37.5rpx;
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
		}
	}
</style>
