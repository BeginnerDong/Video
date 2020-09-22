<template>
	<view>
		
		<view class="flex1 px-2 mt-2" v-show="liCurr != 3">
			
			<view class="radius10 overflow-h bB-e1 mb-2 p-r box" v-for="v in 3" :key='v'
			@click="Router.navigateTo({route:{path:'/pages/detail/detail'}})">
				<view class="p-r">
					<image src="../../static/images/details-img2.png" class="img"></image> 
					<view class="colorf font-20 p-1 flex p-aX txt">
						<image src="../../static/images/home-icon4.png" class="sp-icon"></image>
						<view class="flex-1 px-1">1.3万</view>
						<view>2:40</view>
					</view>
				</view>
				<view class="px-1 py-2">
					<view class="avoidOverflow2">带你进去古色古香的世界，林略世界的美</view>
					<view class="flex font-26 color6 pt-3">
						<image src="../../static/images/home-img.png" class="wh44 radius-5 mr-1"></image>
						<view>哆啦A梦</view>
					</view>
				</view>
				<!-- 非会员 -->
				<!-- <view class="boxMask p-aXY flex4">
					<image src="../../static/images/classification-icon.png" class="gb-icon mb-4"></image>
					<view class="btn50-c bg-white">购买会员</view>
				</view> -->
			</view>
			
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
.btn50-c{width: 180rpx;color: #222;margin-top: 40rpx;font-size: 28rpx;}
</style>
