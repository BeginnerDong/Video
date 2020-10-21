<template>
	<view class="flex4" style="padding: 100rpx 75rpx;">
		
		<image src="../../static/images/withdrawal-icon.png" class="icon"></image>
		<view class="color8 pt-3">余额</view>
		<view class="font-60 font-w line-h py-5 mb-5">￥{{userInfoData.score?userInfoData.score:'0.00'}}</view>
		
		<input type="text" v-model="submitData.count" placeholder="请输入提现金额" />
		<view class="btn80-c Mgb colorf w-100"  @click="Utils.stopMultiClick(submit)">提现申请</view>
		
		<!-- <view class="flex font-24 color9 pt-5 pb-3">
			<image src="../../static/images/withdrawal-icon1.png" class="wh28 mr-1"></image>
			<view>满足50元即可提现，一个工作日内到账！</view>
		</view> -->
		<view class="font-24 text-c pt-5">
			<view class="content" style="padding:0" v-html="mainData.content">
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfoData:{},
				Utils:this.$Utils,
				mainData:{},
				submitData:{
					type:3,
					count:'',
					thirdapp_id:2,
					account:1,
					withdraw: 1,
					withdraw_status: '0',
					status: 1,
				},
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData','getMainData'], self);
		},
		methods: {
			
			submit() {
				const self = this;
				console.log(111)
				uni.setStorageSync('canClick', false);
				if(self.submitData.count==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入提现金额', 'none', 1000)
					return
				};
				self.flowLogAdd();
			},
			
			flowLogAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken'
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.data.count = - postData.data.count;
				const callback = (data) => {
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('申请成功', 'none', 1000)
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}
				};
				self.$apis.flowLogAdd(postData, callback);
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
					thirdapp_id: 2,
					type: 3,
					title:'提现说明'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.icon{width: 122rpx;height: 160rpx;margin: 0 auto;}
input{width: 100%;height: 80rpx;border-radius: 40rpx;border: 1px solid #e1e1e1;padding: 0;text-align: center;margin-bottom: 30rpx;}
</style>
