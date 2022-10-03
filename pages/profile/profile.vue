<template>
	<view class="container profile-container">
		<u-navbar title="我的" safeAreaInsetTop fixed placeholder leftIcon=""></u-navbar>
		<view class="name-avatar">
			<u-avatar size="60" :src="avatarUrl"></u-avatar>
			<view class="name-edit">
				<view class="name">{{ profile.name ? profile.name : "请登录账号" }}</view>
				<view class="edit">编辑个人信息</view>
			</view>
			<u-icon class="icon" name="edit-pen" color="#98a0aa" size="30"></u-icon>
		</view>
		<view class="emoney">
			<view class="item">
				<image src="../../static/profile/emony.png"></image>
				<text class="title">书连币</text>
				<text class="detail">{{ profile.emoney ? profile.emoney : 0 }}</text>
			</view>
			<view class="item">
				<image src="../../static/profile/vip.png"></image>
				<text class="title">账户身份</text>
				<text class="detail">{{ profile.viptype ? profile.viptype : "非VIP账户" }}</text>
			</view>
			<view class="item">
				<image src="../../static/profile/time.png"></image>
				<text class="title">阅历</text>
				<text class="detail">{{ registTime }}年</text>
			</view>
		</view>
		<view class="history-setting">
			<view class="item">
				<image src="../../static/profile/history.png"></image>
				<text class="title">最近阅读</text>
				<view class="detail">
					<u-icon name="arrow-right" size="12" color="#333333"></u-icon>
				</view>
			</view>
			<view class="item">
				<image src="../../static/profile/setting.png"></image>
				<text class="title">设置</text>
				<view class="detail">
					<u-icon name="arrow-right" size="12" color="#333333"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getBaseUrl } from '../../utils/getBaseUrl.js'
import { verifyIsLogin } from '../../utils/verifyIsLogin.js'
	export default {
		data() {
			return {
				profile: {}
			}
		},
		methods: {
			getProfile(){
				uni.request({
					url:`${ getBaseUrl() }/profile`,
					method:'GET',
					data:{
						session: uni.getStorageSync('session'),
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.code === 200){
							this.profile = res.data.data;
							uni.setStorageSync("userInfo", JSON.stringify({
								userid: res.data.data["uid"],
								username: res.data.data["name"],
								useruname: res.data.data["uname"]
							}))
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		computed:{
			registTime(){
				const regTime = parseInt(this.profile.regdate);
				const nowTime = parseInt((Date.now() / 1000).toFixed(0));
				const yearSeconds = 365 * 24 * 60 * 60;
				return (( nowTime - regTime ) / yearSeconds).toFixed(1);
			},
			avatarUrl(){
				return "https://www.facerome.com" + this.profile.url_avatar;
			}
		},
		onLoad() {
			if(!verifyIsLogin()){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}else{
				this.getProfile()
			}
		}
	}
</script>

<style lang="scss">
.profile-container{
	background-color: #f4f5f7;
	.name-avatar{
		display: flex;
		margin-bottom: 33.33rpx;
		.name-edit{
			margin-left: 20.83rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.name{
				font-weight: 700;
				font-size: 41.67rpx;
			}
			.edit{
				font-size: 20.83rpx;
				color: #9aa0a8;
			}
		}
		.icon{
			margin-left: auto;
			margin-right: 13.89rpx;
		}
	}
	.emoney,
	.history-setting{
		background-color: white;
		border-radius: 27.78rpx;
		margin-bottom: 33.33rpx;
		.item{
			display: flex;
			align-items: center;
			padding: 27.78rpx 20.83rpx;
			image{
				width: 38.19rpx;
				height: 38.19rpx;
			}
			.title{
				margin-left: 13.89rpx;
			}
			.detail{
				margin-left: auto;
				margin-right: 0;
			}
		}
	}
}
</style>
