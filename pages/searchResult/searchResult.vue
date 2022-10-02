<template>
	<view class="container search-result-container">
		<u-search :showAction="false" bgColor="#f5f5f5" shape="round" :placeholder="placeholder" inputAlign="center"
			:disabled="true" searchIconColor="#656565" color="#000000"></u-search>
		<view class="show-result">
			<list-item :dataList="bookResultList"></list-item>
		</view>
	</view>
</template>

<script>
	import { getBaseUrl } from '../../utils/getBaseUrl.js'
	import ListItem from '../../component/ListItem.vue'
	export default {
		name: 'searchResult',
		data() {
			return {
				placeholder: "",
				currentPage: 1,
				totalPageNum: 0,
				totalResNum: 0,
				bookResultList: []
			}
		},
		components:{
			ListItem
		},
		methods: {
			getBookResult() {
				uni.request({
					url: `${ getBaseUrl() }/search/book`,
					method:"POST",
					data:{
						keyWord: this.placeholder
					},
					success: (res) => {
						if (res.data.code === 200){
							if(res.data.data.totalPageNum && res.data.data.totalResNum){
								this.totalPageNum = res.data.data.totalPageNum;
								this.totalResNum = res.data.data.totalResNum;
								this.bookResultList = res.data.data.results;
							}else{
								this.totalPageNum = 1;
								this.totalResNum = 1;
								this.bookResultList.push(res.data.data);
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			getNextPage(page){
				uni.request({
					url: `${ getBaseUrl() }/search/book/next`,
					method:"POST",
					data:{
						keyWord: this.placeholder,
						page
					},
					success: (res) => {
						if (res.data.code === 200){
							this.totalPageNum = res.data.data.totalPageNum;
							this.totalResNum = res.data.data.totalResNum;
							res.data.data.results.forEach(item => {
								this.bookResultList.push(item);
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
			this.placeholder = props.keyWord;
			this.getBookResult();
		},
		onReachBottom() {
			if(this.currentPage >= this.totalPageNum) return;
			this.currentPage ++;
			this.getNextPage(this.currentPage)
		}
	}
</script>

<style lang="scss">
	.search-result-container {
		.show-result{
			margin-top: 27.78rpx;
		}
	}
</style>
