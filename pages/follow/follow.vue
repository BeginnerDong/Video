<template>
	<view class="px-3">
		
		<view class="bB-f5 py-3 flex"
		v-for="(item,index) in mainData"
		:key="index"
		:data-user_no = "item.relation_user"
		@click="Router.navigateTo({route:{path:'/pages/homepage/homepage?user_no='+$event.currentTarget.dataset.user_no}})">
			<image :src="item.relationUser&&item.relationUser.mainImg&&item.relationUser.mainImg[0]?item.relationUser.mainImg[0].url:''" class="wh90 radius-5"></image>
			<view class="pl-2 flex-1">{{item.relationUser?item.relationUser.name:''}}</view>
			<view class="btn60-c colorf Mgb" @click="updateFollowLog(index)">取消关注</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				searchItem:{
					type:3
				},
				mainData:[]
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
			
			updateFollowLog(index) {
				const self = this;
			
				const postData = {
					searchItem: {
						id: self.mainData[index].id
					},
					data: {
						status: -self.mainData[index].status
					}
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.mainData.splice(index,1)
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
				};
				self.$apis.logUpdate(postData, callback);
			},
			
			getMainData(isNew) {
				var self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					}
				};
				var postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no;
				
				postData.getAfter = {
					relationUser:{
						tableName:'UserInfo',
						middleKey:'relation_user',
						key:'user_no',
						searchItem:{
							status:1
						},
						condition:'=',
						info:['mainImg','name']
					},
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.logGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.btn60-c{width: 130rpx;}
</style>
