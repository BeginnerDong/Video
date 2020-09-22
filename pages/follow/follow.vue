<template>
	<view class="px-3">
		
		<view class="bB-f5 py-3 flex"
		@click="Router.navigateTo({route:{path:'/pages/homepage/homepage'}})">
			<image src="../../static/images/fans-img.png" class="wh90 radius-5"></image>
			<view class="pl-2 flex-1">世界摄影大师</view>
			<view class="btn60-c colorf bg-c9">已关注</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.btn60-c{width: 130rpx;}
</style>
