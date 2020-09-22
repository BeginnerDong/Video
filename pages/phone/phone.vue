<template>
	<view class="bT-e1">
		
		<!-- 已有手机号 -->
		<view v-if="state">
			<image src="../../static/images/replace-icon1.png" class="phone2"></image>
			
			<view class="text-c pb-3">绑定手机号：15628645824</view>
			
			<view class="btn80-c Mgb colorf" @click="changeState">更换手机号</view>
		</view>
		
		<!-- 更换手机号 -->
		<view v-else>
			<image src="../../static/images/replace-icon.png" class="phone1"></image>
			
			<input type="text" value="" placeholder="请输入手机号" />
			<view class="flex1 colorM yzm">
				<input type="text" value="" placeholder="请输入验证码" />
				<view class="pt-3 font-w font-30">获取验证码</view>
			</view>
			
			<view class="btn80-c Mgb colorf" @click="changeState">确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:true
			}
		},
		methods: {
			
			changeState(i){
				const self = this;
				self.state = !self.state;
			}
			
		}
	}
</script>
<style>page{background-color: #fff;}</style>
<style scoped>
.phone1{width: 138rpx;height: 222rpx;margin: 100rpx auto 70rpx;}
.phone2{width: 174rpx;height: 222rpx;margin: 100rpx auto 70rpx;}
input{padding: 0;padding: 44rpx 0 30rpx;border-bottom: 1px solid #f5f5f5;font-size: 26rpx;margin: 0 60rpx;}
.btn80-c{margin-top: 100rpx;margin: 50rpx 60rpx;}
.yzm{border-bottom: 1px solid #f5f5f5;margin: 0 60rpx;}
.yzm input{border: none;margin: 0;}
</style>
