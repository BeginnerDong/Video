<template>
	<view>
		
		<view class="card m-3 py-4 px-3 line-h colorf d-flex flex-column a-end">
			<view class="font-24 w-100">余额</view>
			<view class="font-60 font-w py-5 w-100">{{userInfoData.score?userInfoData.score:'0.00'}}</view>
			<!-- <view class="flex1 w-100">
				<view class="font-24">
					<view class="pb-2">有效期</view>
					<view>2020年8月20日-8月30日</view>
				</view>
				<view class="btn70-c bg-white flex0 color2"
				@click="Router.navigateTo({route:{path:'/pages/withdrawal/withdrawal'}})">
					<image src="../../static/images/thebalanceof-icon.png" class="wh32 mr-1"></image>
					<view>提现</view>
				</view>
			</view> -->
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
			v-for="(item,index) in mainData" :key="index" @click="chooes(index)">
				<view class="font-30 font-w">{{item.title?item.title:''}}</view>
				<view class="font-30 font-w">{{item.price?item.price:''}}元</view>
				<view class="h100">
					<image src="../../static/images/thebalanceof-icon2.png" class="wh40 mt-4" v-show="chooesIndex==index"></image>
				</view>
				<view class="font-22 color8">送{{item.score?item.score:''}}个灯泡</view>
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
				chooesIndex:0,
				userInfoData:{},
				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData','getMainData'], self);
		},
		methods: {
			
			chooes(index){
				const self = this;
				self.chooesIndex = index;
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					user_no: uni.getStorageSync('user_info').user_no
				};
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id:2
				};
				postData.getBefore = {
					product:{
						tableName:'Label',
						middleKey:'category_id',
						key:'id',
						searchItem:{
							title:['in',['会员']]
						},
						condition:'in'
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data;
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
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
