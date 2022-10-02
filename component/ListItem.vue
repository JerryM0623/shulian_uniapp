<template>
	<view class="list">
		<view class="list-item" v-for="item in dataList" :key="item.id">
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
</template>

<script>
	export default {
		name: 'ListItem',
		props: ['dataList'],
		data(){
			return {}
		},
		methods:{}
	}
</script>

<style lang="scss">
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
</style>