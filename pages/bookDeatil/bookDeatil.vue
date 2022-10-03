<template>
	<view class="container book-detail-container">
		<view class="top book-show">
			<u-image radius="6px" width="100" height="150" :src="'https://www.facerome.com' + bookDetail.url_image"></u-image>
			<view class="name-athor">
				<u-text size="18" bold :text="bookDetail.articlename"></u-text>
				<u-text color="#a6a7a8" :text="bookDetail.author"></u-text>
				<u-text color="#a6a7a8" :text="summary"></u-text>
				<view class="tags">
					<u-tag v-if="bookDetail.isvip === 'VIP'" class="my-tag" text="VIP" size="mini"></u-tag>
					<u-tag v-if="bookDetail.firstflag === '本站首发'" class="my-tag" text="本站首发" size="mini"></u-tag>
					<u-tag v-if="bookDetail.permission === '独家作品'" class="my-tag" text="独家作品" size="mini"></u-tag>
				</view>
			</view>
		</view>
		<view class="middle book-info">
			<view class="jian-jie">
				<view class="title">简介</view>
				<view class="content">{{ bookDetail.intro || "暂无简介" }}</view>
			</view>
			<view class="guan-jian-ci">
				<view class="title">关键字</view>
				<view class="tags">
					<u-tag type="info" v-if="keyWords.length > 0 && keyWords[0] !== ''" v-for="item in keyWords" :key="item" class="my-tag" :text="item" shape="circle" size="mini"></u-tag>
					<view v-else>暂无分类</view>
				</view>
			</view>
			<view class="mu-lu">
				<view class="title">目录</view>
				<view class="last-chapter">{{ bookDetail.lastchapter }}</view>
				<view class="icon">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="bottom book-buttons"></view>
	</view>
</template>

<script>
import { getBaseUrl } from '../../utils/getBaseUrl';
	export default {
		data() {
			return {
				bookId: 0,
				bookDetail: {},
				keyWords: []
			};
		},
		methods:{
			getBookDetail(bookId){
				uni.request({
					url:`${ getBaseUrl() }/book`,
					method:'GET',
					data:{
						bookId
					},
					success: (res) => {
						if(res.data.code === 200){
							this.bookDetail = res.data.data;
							console.log(this.bookDetail);
							const list = this.bookDetail.keywords.split(' ');
							this.keyWords = list;
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		computed:{
			summary(){
				const typename = this.bookDetail.typename;
				const isFull = this.bookDetail.fullflag;
				const words = this.bookDetail.words;
				let wordsStr = "";
				if(words >= 10000){
					wordsStr = (words / 10000).toFixed(0).toString() + "万字"
				}else if(words >= 1000){
					wordsStr = (word / 1000).toFixed(0).toString() + "千字"
				}else{
					wordsStr = words + "字"
				}
				return `${ typename }·${ isFull }·${ wordsStr }`
			}
		},
		onLoad(props) {
			this.bookId = props.bookid
		},
		mounted() {
			// 获取书籍详细信息
			this.getBookDetail(this.bookId)
		}
	}
</script>

<style lang="scss">
.book-detail-container{
	background-color: #f4f5f7;
	.top,
	.middle{
		display: flex;
		padding: 27.78rpx;
		background-color: white;
		border-radius: 13.89rpx;
		margin-bottom: 20.83rpx;
		.name-athor{
			margin-left: 20.83rpx;
			margin-top: 34.72rpx;
			.u-text{
				margin-bottom: 13.89rpx !important;
			}
			.tags{
				display: flex;
				flex-wrap: wrap;
				.my-tag{
					margin-right: 6.94rpx;
					margin-bottom: 6.94rpx;
				}
			}
		}
	}
	.middle{
		flex-direction: column;
		margin-bottom: 0;
		.jian-jie{
			.title{
				margin-bottom: 13.89rpx;
				font-weight: 700;
			}
			.content{
				margin-bottom: 34.72rpx;
			}
		}
		.guan-jian-ci{
			.title{
				margin-bottom: 13.89rpx;
				font-weight: 700;
			}
			.tags{
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 34.72rpx;
				.my-tag{
					margin-right: 6.94rpx;
					margin-bottom: 6.94rpx;
				}
			}
		}
		.mu-lu{
			display: flex;
			align-items: center;
			.title{
				width: 90.28rpx;
				font-weight: 700;
			}
			.icon{
				margin-left: auto;
				margin-right: 13.89rpx;
			}
			.last-chapter{
				font-size: 27.78rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
