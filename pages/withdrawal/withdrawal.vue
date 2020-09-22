<template>
	<view class="flex4" style="padding: 100rpx 75rpx;">
		
		<image src="../../static/images/withdrawal-icon.png" class="icon"></image>
		<view class="color8 pt-3">余额</view>
		<view class="font-60 font-w line-h py-5 mb-5">￥256</view>
		
		<input type="text" value="" placeholder="请输入提现金额" />
		<view class="btn80-c Mgb colorf w-100">提现申请</view>
		
		<view class="flex font-24 color9 pt-5 pb-3">
			<image src="../../static/images/withdrawal-icon1.png" class="wh28 mr-1"></image>
			<view>满足50元即可提现，一个工作日内到账！</view>
		</view>
		<view class="font-24 text-c">
			目前为人工提现，每次提现时，倾向视频的财务客服人员（微信号：dfec23565）发送：“小联你好，我要提现”的指令，即可很快到账。
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
.icon{width: 122rpx;height: 160rpx;margin: 0 auto;}
input{width: 100%;height: 80rpx;border-radius: 40rpx;border: 1px solid #e1e1e1;padding: 0;text-align: center;margin-bottom: 30rpx;}
</style>
