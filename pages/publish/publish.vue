<template>
	<view>
		
		<view class="font-30 mx-3 py-4 bB-f5 flex1">
			<view>标题</view>
			<input type="text" value="" placeholder="输入标题" />
		</view>
		
		<view class="p-3">
			<textarea value="" placeholder="输入你的创作需求..." />
			
			<view class="flexX">
				<view class="bg-f7 b-e1 radius10 font-26 color9 wh160 flex4 image">
					<image src="../../static/images/xiaoxi-img1.png"></image>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 wh160 flex4 image">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-1"></image>
					<view>视频/图片</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<picker mode="time">
			<view class="flex1 bB-f5 mx-3 py-4 font-30">
				<view>开始时间</view>
				<view class="color9 flex">
					<view>选择时间</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
			</view>
		</picker>
		<picker mode="time">
			<view class="flex1 bB-f5 mx-3 py-4 font-30">
				<view>结束时间</view>
				<view class="color9 flex">
					<view>选择时间</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
			</view>
		</picker>
		<view class="flex1 bB-f5 mx-3 py-4 font-30">
			<view>虚拟充值币</view>
			<input type="text" value="" placeholder="输入虚拟充值币" placeholder-style="color:#999;" />
		</view>
		
		
		<view class="px-3 py-2 bT-e1 p-fX bottom-0">
			<view class="btn80-c colorf Mgb">发布</view>
		</view>
		
		
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
input{flex: 1;font-size: 30rpx;text-align: right;}
textarea{width: 100%;height: 250rpx;padding: 0;}
.image{margin-right: 20rpx;flex-shrink: 0;}
</style>
