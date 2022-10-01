<template>
	<view class="container login-container">
		<view class="title">登 录</view>
		<view class="input-box">
			<u-input class="username input-item" type="text" v-model="userInfo.username" placeholder="请输入手机号"></u-input>
			<u-input class="password input-item" type="password" v-model="userInfo.password" placeholder="请输入密码"></u-input>
		</view>
		<view class="buttons-box">
			<u-button class="loginBtn" :class="{ active: !isDisable }" :disabled="isDisable">登 录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					username: "",
					password: ""
				},
				isDisable: true
			};
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
