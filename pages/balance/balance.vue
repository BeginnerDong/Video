<template>
	<view>
		
		<view class="card m-3 py-4 px-3 line-h colorf d-flex flex-column a-end">
			<view class="font-24 w-100">余额</view>
			<view class="font-60 font-w py-5 w-100">00.00</view>
			<view class="btn70-c bg-white flex0 color2"
			@click="Router.navigateTo({route:{path:'/pages/withdrawal/withdrawal'}})">
				<image src="../../static/images/thebalanceof-icon.png" class="wh32 mr-1"></image>
				<view>提现</view>
			</view>
			<view class="mx flex0 p-a font-26"
			@click="Router.navigateTo({route:{path:'/pages/water/water'}})">
				<image src="../../static/images/thebalanceof-icon1.png" class="dp-icon mr-1"></image>
				<view>流水明细</view>
			</view>
		</view>
		
		<view class="font-32 p-3 font-w">充值有礼（1灯泡=1元）</view>
		<view class="flex flex-wrap px-3">
			<view class="czBox p-3 b-f5 mb-3 radius10 flex5" :class="chooesIndex==index?'borderM':''"
			v-for="(item,index) in 4" :key="index" @click="chooes(index)">
				<view class="font-30 font-w">100元</view>
				<view class="h100">
					<image src="../../static/images/thebalanceof-icon2.png" class="wh40 mt-1" v-show="chooesIndex==index"></image>
				</view>
				<view class="font-22 color8">送6个灯泡+0个月优享会员</view>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		<view class="px-3 py-2 p-fX bottom-0 bT-e1">
			<view class="btn80-c Mgb colorf">充值</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				chooesIndex:0
			}
		},
		methods: {
			
			chooes(index){
				const self = this;
				self.chooesIndex = index;
			}
			
		}
	}
</script>

<style scoped>
.card{background: url(../../static/images/thebalanceof-img.png);height: 340rpx;background-size: 100% 100%;box-shadow: 0 0 20rpx 0 rgba(17,17,17,0.4);border-radius: 38rpx;}
.btn70-c{width: 170rpx;margin: 20rpx 0 0;}
.mx{background-color: #676767;width: 160rpx;height: 50rpx;border-radius: 25rpx 0 0 25rpx;right: 27rpx;top: 40rpx;}
.czBox{width: 210rpx;margin-right: 30rpx;}
.czBox:nth-child(3n){margin-right: 0;}
.h100{height: 100rpx;}
</style>
