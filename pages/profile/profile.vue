<template>
	<view>
		
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

<style>

</style>
