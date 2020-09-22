<template>
	<view class="px-3">
		
		<view class="py-3 flex bB-f5">
			<view class="flex-1 color6">头像</view>
			<image src="../../static/images/xiaoxi-img.png" class="wh80 mx-2"></image>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5"
		@click="Router.navigateTo({route:{path:'/pages/modify/modify?type=0'}})">
			<view class="color6">昵称</view>
			<view class="flex-1 text-r px-2">喷火娃</view>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5"
		@click="Router.navigateTo({route:{path:'/pages/phone/phone'}})">
			<view class="color6">电话</view>
			<view class="flex-1 text-r px-2">15684258569</view>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5"
		@click="Router.navigateTo({route:{path:'/pages/modify/modify?type=1'}})">
			<view class="color6">个性签名</view>
			<view class="flex-1 text-r px-2">请输入</view>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
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

</style>
