<template>
	<view class="container login-container">
		<u-notify message="Hi uView" :show="show" ref="uNotify"></u-notify>
		<view class="title">登 录</view>
		<view class="input-box">
			<u-input class="username input-item" type="text" v-model="userInfo.username" placeholder="请输入手机号"></u-input>
			<u-input class="password input-item" type="password" v-model="userInfo.password" placeholder="请输入密码"></u-input>
		</view>
		<view class="buttons-box">
			<u-button class="loginBtn" :class="{ active: !isDisable }" :disabled="isDisable" @click="login">登 录</u-button>
		</view>
	</view>
</template>

<script>
	import { verifyUsername } from '../../utils/verifyUsername.js';
	import { showSuccessNotify, showWarningNotify, showErrorNotify } from '../../utils/showNotify.js';
	import { getBaseUrl } from '../../utils/getBaseUrl.js';
	export default {
		data() {
			return {
				userInfo: {
					username: "",
					password: ""
				},
				isDisable: true,
				show: true,
				notifyObj: null
			};
		},
		onReady() {
			this.notifyObj = this.$refs.uNotify;
		},
		methods:{
			login(){
				const { username, password } = this.userInfo;
				if (username.length > 0 && password.length > 0){
					if (verifyUsername(username)){
						// 请求服务器
						uni.request({
							url: `${ getBaseUrl() }/login`,
							method: "POST",
							data:{
								username: this.userInfo.username,
								password: this.userInfo.password
							},
							success: (res) => {
								if(res.statusCode === 200 && res.data.code === 200){
									showSuccessNotify(this.notifyObj, "登陆成功");
									// 保存数据
									uni.setStorageSync("session", res.data.data["jieqi_sessionid"]);
									uni.setStorageSync("token", res.data.data["jieqi_token"]);
									uni.setStorageSync("userinfo", JSON.stringify({
										userid: res.data.data["jieqi_userid"],
										username: res.data.data["jieqi_username"],
										useruname: res.data.data["jieqi_useruname"]
									}))
									// 返回前面的页面
									uni.navigateBack();
								}else{
									showErrorNotify(this.notifyObj, "登录失败，请稍后重试")
								}
							},
							fail: (err) => {
								showErrorNotify(this.notifyObj, "登录失败，请稍后重试")
							}
						})
					}else{
						showWarningNotify(this.notifyObj, "手机号不正确");
					}
				}else{
					showWarningNotify(this.notifyObj, "请输入手机号和密码");
				}
				return;
			}
		},
		watch: {
			userInfo: {
				deep: true,
				handler(value){
					this.isDisable = !(value.username.length > 0 && value.password.length > 0);
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	.title{
		margin-top: 208.33rpx;
		margin-bottom: 76rpx;
		text-align: center;
		font-size: 50rpx;
		font-weight: 700;
	}
	.input-box{
		.input-item{
			margin-bottom: 30rpx;
			border-radius: 16rpx;
		}
	}
	.buttons-box{
		/* 默认不激活状态下的样子 */
		.loginBtn{
			background-color: #ecbdbc;
			font-size: 25rpx;
			color: white;
			border-radius: 16rpx;
		}
		/* 激活状态下的样子 */
		.active{
			background-color: #ff5850;
		}
	}
}
</style>
