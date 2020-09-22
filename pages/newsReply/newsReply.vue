<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="z100 px-3 py-2 bB-f5 bg-white p-s top-0 flex1">
			<view class="w110" @click="Router.back(1)">取消</view>
			<view class="font-38">回复评论</view>
			<view class="btn60-c Mgb colorf">发送</view>
		</view>
		
		<textarea value="" placeholder="回复@竹蜻蜓" />
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.w110{width: 110rpx;}
.btn60-c{width: 110rpx;margin: 0;}

textarea{width: 100%;height: 1000rpx;padding: 40rpx 30rpx;font-size: 26rpx;}
</style>
