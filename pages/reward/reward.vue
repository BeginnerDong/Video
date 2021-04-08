<template>
	<view>
		
		<view class="bg-f5 flex4 py-5" v-if="type=='art'">
			<image style="overflow: hidden;border-radius: 50%;" :src="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:''" class="wh120 raius-5"></image>
			<view class="font-30 pt-3">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}}</view>
		</view>
		<view class="bg-f5 flex4 py-5" v-if="type=='act'">
			<image src="../../static/images/thelogin-img.png" class="wh120 raius-5"></image>
			<view class="font-30 pt-3">官方平台</view>
		</view>
		<view class="mx-2 bg-white line-h bB-f5 pt-6">
			<view class="flex1 pb-2">打赏金额</view>
			<view class="flex pt-4 font-w">
				<view class="font-60 font-w">￥</view>
				<input type="text" v-model="price" />
			</view>
		</view>
		
		<view class="mt-2 bg-white px-2 pt-3">
			<view class="flex1 pb-4" @click="changeItem(0)">
				<image src="../../static/images/exceptional-icon3.png" class="wh40"></image>
				<view class="flex-1 px-2">微信支付</view>
				<image :src="itemIndex==0?'../../static/images/exceptional-icon.png':'../../static/images/exceptional-icon1.png'" class="wh36"></image>
				
			</view> 
			<view class="flex1 pb-4" @click="changeItem(1)">
				<image src="../../static/images/exceptional-icon2.png" class="wh40"></image>
				<view class="flex-1 px-2">支付宝支付</view>
				<image :src="itemIndex==1?'../../static/images/exceptional-icon.png':'../../static/images/exceptional-icon1.png'" class="wh36"></image>
			</view>
			<view class="flex1 pb-4" @click="changeItem(2)">
				<image src="../../static/images/exceptional-icon4.png" class="wh40"></image>
				<view class="flex-1 px-2">余额支付</view>
				<image :src="itemIndex==2?'../../static/images/exceptional-icon.png':'../../static/images/exceptional-icon1.png'" class="wh36"></image>
			</view>
		</view>
		
		<view class="btn80-c Mgb colorf" @click="addOrder">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				itemIndex:2,
				price:'',
				type:'',
				mainData:{}
			}
		},
		onLoad(options) {
			const self = this;
			if(options.id){
				self.id = options.id;
				self.$Utils.loadAll(['getMainData'], self);
			};
			if(options.user_no){
				self.user_no= options.user_no
			};
			self.type = options.type;
			console.log('self.type',self.type)
			
		},
		methods: {
			
			addOrder() {
				const self = this;
				uni.showLoading({
					title:'支付中'
				});
				uni.setStorageSync('canClick', false);
				if(self.itemIndex<2){
					self.$Utils.showToast('暂不支持支付方式', 'none');
					return
				};
				if(self.price==''){
					self.$Utils.showToast('请输入打赏金额', 'none');
					return
				};
				const postData = {};
				postData.noLoading = true;
				postData.tokenFuncName = 'getUserToken';
				postData.data = {
					price: parseFloat(self.price).toFixed(2),
					type: 6,
					level:1,
					
				};
				if(self.type=='art'){
					postData.data.art_id = self.id
					postData.data.relation_user = self.mainData.user_no
					
				}
				console.log('post',postData)
				//return
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.pay()
					} else {
						self.$Utils.showToast(res.msg, 'none')
					}
				};
				self.$apis.addVirtualOrder(postData, callback);
			},
			
			
			pay() {
				const self = this;
				uni.setStorageSync('canClick', false);
				const postData = {};
				postData.score = {
					price: parseFloat(self.price).toFixed(2),
				};
				postData.noLoading = true;
				postData.tokenFuncName = 'getUserToken',
				postData.searchItem = {
					id: self.orderId
				};
				if(self.type=='act'){
					postData.payAfter = [{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							type: 3,
							relation_id: self.id,
							relation_table:'Article',
							user_no:self.mainData.user_no,
							thirdapp_id:2,
							count:parseFloat(self.price).toFixed(2),
							account:1,
							trade_info:'打赏收益'
						}
					},
					{
						tableName: 'Log',
						FuncName: 'add',
						data: {
							type: 5,
							relation_id: self.id,
							relation_table:'Article',
							relation_user:self.mainData.user_no,
							user_no:uni.getStorageSync('user_info').user_no,
							//res:{passage:'id'},
							passage:self.orderId,
							thirdapp_id:2
						}
					}
					];
				}else{
					postData.payAfter = [{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							type: 3,
							relation_table:'Message',
							user_no:self.user_no,
							thirdapp_id:2,
							count:parseFloat(self.price).toFixed(2),
							account:1,
							trade_info:'创作打赏收益'
						}
					}];
				};
				const callback = (res) => {
					uni.hideLoading();
					if (res.solely_code == 100000) {
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									self.$Utils.showToast('打赏成功', 'none');
									if(self.type=='act'){
										uni.setStorageSync('hasDs',true)
									};
									
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										});
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									self.$Utils.showToast('打赏失败', 'none');
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('打赏成功', 'none');
							if(self.type=='act'){
								uni.setStorageSync('hasDs',true)
							};
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(res.msg, 'none');
					};
				};
				self.$apis.pay(postData, callback);
			},
			 
			changeItem(index){
				const self = this;
				self.itemIndex = index;
			},
			
			getMainData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 1,
					id:self.id
				};
				postData.getAfter = {
					userInfo:{
						token:uni.getStorageSync('user_token'),
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1
						},
						condition:'='
					},
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
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
