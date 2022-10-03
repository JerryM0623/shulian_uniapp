<template>
	<view class="container book-case-container">
		<u-navbar title="书架" safeAreaInsetTop fixed placeholder leftIcon=""></u-navbar>
		<view class="list">
			<view class="list-item" v-for="item in bookCaseList" :key="item.articleid">
				<view class="image-box">
					<u--image 
						radius="10" 
						:src="'https://www.facerome.com' + item.url_image"
						width="68px"
						height="86px"
					></u--image>
				</view>
				<view class="content">
					<u-text :lines="1" :text="item.articlename" size="16" class="title"></u-text>
					<u-text :lines="1" color="#99a0a9" size="14" lineHeight="14" class="last-update" :text="item.lastchapter"></u-text>
					<u-text :lines="1" color="#99a0a9" size="14" lineHeight="14" class="now-reading" :text="item.chaptername"></u-text>
				</view>
				<view class="icon">
					<u-icon size="20" name="more-circle" top="4"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getBaseUrl } from '../../utils/getBaseUrl'
	import { verifyIsLogin } from '../../utils/verifyIsLogin'
	export default {
		data() {
			return {
				bookCaseList: [],
				buttonsList: [{
					text: '查看详情',
					style: {
						backgroundColor: '#3c9cff'
					}
				}, {
					text: '移出书架',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				maxBookCaseNum: 0,
				nowBookCaseNum: 0
			}
		},
		methods: {
			async getBookImgUrl(bookId){
				return uni.request({
					url: `${ getBaseUrl() }/book`,
					method:'GET',
					data:{
						bookId
					}
				})
			},
			getBookCase(){
				uni.request({
					url:`${ getBaseUrl() }/bookcase/list`,
					method:'GET',
					data:{
						session: uni.getStorageSync('session'),
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						if(res.data.code === 200){
							let flag = 0;
							const a = res.data.data.bookCaseList;
							for(let p = 0; p < res.data.data.bookCaseList.length; p++){
								this.getBookImgUrl(a[p].articleid)
								.then(result => {
									const index = a.findIndex(item => item.articleid === result[1].data.data.articleid);
									const obj = a[index];
									obj.url_image = result[1].data.data.url_image;
									a[index] = obj;
									flag++;
									if(flag === res.data.data.bookCaseList.length){
										this.bookCaseList = a;
										this.maxBookCaseNum = res.data.data.maxBookCaseNum;
										this.nowBookCaseNum = res.data.data.nowBookCaseNum;
										console.log(this.bookCaseList)
									}
								})
								.catch(e => {
									console.log(e)
								})
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			
		},
		mounted() {
			if(!verifyIsLogin()){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			this.getBookCase();
		}
	}
</script>

<style lang="scss">
.book-case-container{
	.list{
		.list-item{
			display: flex;
			// height: 243.06rpx;
			margin-bottom: 48.61rpx;
			.image-box{
				width: 138.89rpx;
				height: 173.61rpx;
			}
			.content{
				margin-left: 20.83rpx;
				margin-right: 27.78rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
			}
			.icon{
				margin-left: auto;
				margin-right: 0;
				u-icon{
					margin-top: 2.78rpx;
				}
			}
		}
	}
}
</style>
