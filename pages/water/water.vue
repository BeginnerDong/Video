<template>
	<view>
		
		<view class="p-3 line-h bB-f5" v-for="(item,index) in mainData" :key="index">
			<view class="flex1">
				<view class="font-32">{{item.trade_info}}</view>
				<view class="font-24 color6">{{item.create_time}}</view>
			</view>
			<view class="flex1 pt-2">
				<view class="font-24"></view>
				<!-- <view class="font-24">悬赏:256.00</view> -->
				<!-- <view class="font-24">余额:256.00</view> -->
				<view class="font-30 font-w">{{item.count}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:[],
				searchItem:{
					thirdapp_id:2,
					type:3,
					count:['not in',[0]]
				}
			}
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self);
		},
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		methods: {
			

			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						/* for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].score = parseInt(self.mainData[i].score)
						} */
					}
					self.$Utils.finishFunc('getMainData');
			
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
		}
	}
</script>

<style>

</style>
