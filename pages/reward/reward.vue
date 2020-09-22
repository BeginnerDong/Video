<template>
	<view>
		
		<view class="bg-f5 flex4 py-5">
			<image src="../../static/images/exceptional-img.png" class="wh120 raius-5"></image>
			<view class="font-30 pt-3">视频播放平台</view>
		</view>
		
		<view class="mx-2 bg-white line-h bB-f5 pt-6">
			<view class="flex1 pb-2">打赏金额</view>
			<view class="flex pt-4 font-w">
				<view class="font-60 font-w">￥</view>
				<input type="text" value="" />
			</view>
		</view>
		
		<view class="mt-2 bg-white px-2 pt-3">
			<view class="flex1 pb-4">
				<image src="../../static/images/exceptional-icon3.png" class="wh40"></image>
				<view class="flex-1 px-2">微信支付</view>
				<image src="../../static/images/exceptional-icon.png" class="wh36"></image>
				<!-- <image src="../../static/images/exceptional-icon1.png" class="wh36"></image> -->
			</view>
			<view class="flex1 pb-4">
				<image src="../../static/images/exceptional-icon2.png" class="wh40"></image>
				<view class="flex-1 px-2">支付宝支付</view>
				<!-- <image src="../../static/images/exceptional-icon.png" class="wh36"></image> -->
				<image src="../../static/images/exceptional-icon1.png" class="wh36"></image>
			</view>
			<view class="flex1 pb-4">
				<image src="../../static/images/exceptional-icon4.png" class="wh40"></image>
				<view class="flex-1 px-2">余额支付</view>
				<!-- <image src="../../static/images/exceptional-icon.png" class="wh36"></image> -->
				<image src="../../static/images/exceptional-icon1.png" class="wh36"></image>
			</view>
		</view>
		
		<view class="btn80-c Mgb"
		@click="Router.navigateTo({route:{path:'/pages/deal-voucher/deal-voucher'}})">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				itemIndex:0
			}
		},
		methods: {
			 
			changeItem(index){
				const self = this;
				self.itemIndex = index;
			},
			
		}
	}
</script>
<style scoped>

.pt-6{padding-top: 60rpx; }
input{font-size: 80rpx;flex: 1;}
.item{width: 160rpx;line-height: 70rpx;text-align: center;margin-bottom: 20rpx;margin-right: 20rpx;}
.item:nth-child(4n){margin-right: 0;}
.btn80-c{margin: 100rpx 30rpx 0;}
</style>
