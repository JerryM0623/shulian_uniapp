<template>
	<view>
		
	</view>
</template>

<script>
import { verifyIsLogin } from '../../utils/verifyIsLogin'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			if(!verifyIsLogin()){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style>

</style>
