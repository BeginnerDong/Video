<template>
	<view class="px-3">
		
		<view class="bB-f5 py-3 flex"
		@click="Router.navigateTo({route:{path:'/pages/homepage/homepage'}})">
			<image src="../../static/images/fans-img.png" class="wh90 radius-5"></image>
			<view class="pl-2 flex-1">世界摄影大师</view>
			<view class="btn60-c colorf" :class="follow?'bg-c9':'Mgb'">
				<view class="flex0" v-if="!follow">
					<image src="../../static/images/fans-icon.png" class="wh24 mr-1"></image>
					<view>关注</view>
				</view>
				<view v-else>已关注</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				follow:true
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.btn60-c{width: 130rpx;}
</style>
