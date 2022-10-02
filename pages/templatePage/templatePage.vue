<template>
	<view class="container top-ranking-container">
		<u-navbar :title="title" left-text="返回" safeAreaInsetTop fixed placeholder :autoBack="true"></u-navbar>
		<u-back-top :scroll-top="scrollTop" top="600"></u-back-top>
		<list-item :dataList="showList"></list-item>
	</view>
</template>

<script>
	import ListItem from '../../component/ListItem.vue';
	import { getBaseUrl } from '../../utils/getBaseUrl.js';
	export default {
		data() {
			return {
				showList: [],
				currentPage: 1,
				scrollTop: 0,
				title: ""
			};
		},
		components:{
			ListItem
		},
		methods:{
			getTopRanking(page){
				uni.request({
					url:`${ getBaseUrl() }/main/topranking`,
					method:'GET',
					data:{
						page
					},
					success: (res) => {
						if(res.data.code === 200){
							res.data.data.forEach(item => {
								this.showList.push(item);
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			getFinish(page){
				uni.request({
					url:`${ getBaseUrl() }/main/finish`,
					method:'GET',
					data:{
						page
					},
					success: (res) => {
						if(res.data.code === 200){
							res.data.data.forEach(item => {
								this.showList.push(item);
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			getUpdate(page){
				uni.request({
					url:`${ getBaseUrl() }/main/lastupdate`,
					method:'GET',
					data:{
						page
					},
					success: (res) => {
						if(res.data.code === 200){
							res.data.data.forEach(item => {
								this.showList.push(item);
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		onLoad(props) {
			this.title = props.title;
			if(this.title === "热门排行"){
				this.getTopRanking(this.currentPage);
			}else if(this.title === "完结小说"){
				this.getFinish(this.currentPage);
			}else{
				this.getUpdate(this.currentPage);
			}
		},
		onReachBottom() {
			this.currentPage ++;
			if(this.title === "热门排行"){
				this.getTopRanking(this.currentPage);
			}else if(this.title === "完结小说"){
				this.getFinish(this.currentPage);
			}else{
				this.getUpdate(this.currentPage);
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss">

</style>
