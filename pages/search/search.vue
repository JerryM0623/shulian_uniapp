<template>
	<view class="container search-container">
		<u-notify ref="uNotify"></u-notify>
		<view class="search">
			<u-search :placeholder="placeholder" v-model="keyWord" :showAction="false" inputAlign="center" @search="search"></u-search>
		</view>
		<view class="search-history" v-if="history.length > 0">
			<view class="topbar">
				<text class="title">搜索历史</text>
			</view>
			<view class="list">
				<view class="list-item" @click="searchHistory(item)" v-for="(item, index) in history" :key="index">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getHotKeyWords } from '../../request/getHotKeyWords.js';
import { getBaseUrl } from '../../utils/getBaseUrl.js';
	import { showErrorNotify } from '../../utils/showNotify.js';
	export default {
		data() {
			return {
				placeholder: "",
				keyWord: "",
				hotKeyWordsList: [],
				timer: null,
				notifyObj: null,
				history: []
			};
		},
		methods:{
			async getHotKeyWords_search(){
				const res = await getHotKeyWords();
				if (res[1]){
					this.hotKeyWordsList = res[1].data.data;
					this.timer = setInterval(() => {
						this.placeholder = this.hotKeyWordsList[Math.floor(Math.random() * this.hotKeyWordsList.length)].articlename;
					}, 5000)
				}else{
					showErrorNotify()
				}
			},
			search(){
				if (this.keyWord === ""){
					this.keyWord = this.placeholder
				}
				if (this.history.find(ele => ele === this.keyWord) === undefined){
					this.history.push(this.keyWord);
				}
				uni.setStorageSync('searchHistory', this.history);
				uni.navigateTo({
					url: `/pages/searchResult/searchResult?keyWord=${ this.keyWord }`
				})		
			},
			searchHistory(item){
				uni.navigateTo({
					url: `/pages/searchResult/searchResult?keyWord=${ item }`
				})
			}
		},
		onLoad(props) {
			this.placeholder = props.placeholder;
			this.getHotKeyWords_search();
		},
		onReady() {
			this.notifyObj = this.$refs.uNotify;
			this.history = uni.getStorageSync('searchHistory') !== "" ? uni.getStorageSync('searchHistory') : [];
		},
		beforeDestroy() {
			this.timer = undefined;
		}
	}
</script>

<style lang="scss">
.search-container{
	.search{
		margin-bottom: 27.78rpx;
	}
	.search-history{
		.topbar{
			margin-bottom: 27.78rpx;
			display: flex;
			justify-content: space-between;
			.title{
				font-size: 41.67rpx;
				font-weight: 700;
				color: black;
			}
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 27.78rpx;
			overflow: hidden;
			.list-item{
				padding: 13.89rpx 27.78rpx;
				background-color: #dddddd;
				color: black;
				margin-right: 13.89rpx;
				margin-bottom: 13.89rpx;
				border-radius: 10.42rpx;
				font-size: 18.06rpx;
			}
		}
	}
}
</style>
