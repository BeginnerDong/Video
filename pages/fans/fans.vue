<template>
	<view class="px-3">
		
		<view class="bB-f5 py-3 flex"
		v-for="(item,index) in mainData"
		:key="index"
		:data-user_no = "item.user_no"
		@click="Router.navigateTo({route:{path:'/pages/homepage/homepage?user_no='+$event.currentTarget.dataset.user_no}})">
			<image :src="item.relationUser&&item.relationUser.mainImg&&item.relationUser.mainImg[0]?item.relationUser.mainImg[0].url:''" class="wh90 radius-5"></image>
			<view class="pl-2 flex-1">{{item.relationUser?item.relationUser.name:''}}</view>
			<view class="btn60-c colorf Mgb" @click="clickFollow(index)">
				
				<view v-if="item.isFollow&&item.isFollow.length>0&&item.isFollow[0].status==1">取消关注</view>
				
				<view class="flex0" v-else>
					<image src="../../static/images/fans-icon.png" class="wh24 mr-1"></image>
					<view>关注</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				searchItem:{
					type:3,
					user_type:0
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
			
			clickFollow(index) {
				const self = this;
				if(getApp().globalData.checkInfo){
					uni.setStorageSync('canClick', false);
					if (self.mainData.isFollow.length == 0) {
						self.addFollowLog(index)
					} else {
						self.updateFollowLog(index)
					};
				}else{
					self.showModel()
				}
			},
			
			addFollowLog(index) {
				const self = this;
				const postData = {};
				postData.data = {
					type: 3,
					title: '关注成功',
					relation_table:'User',
					user_no: uni.getStorageSync('user_info').user_no,
					relation_user:self.mainData[index].user_no
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData.isFollow.push({
							status: 1,
							id: res.info.id
						});
					} else {
						self.$Utils.showToast('关注失败', 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.logAdd(postData, callback);
			},
			
			
			updateFollowLog() {
				const self = this;
				const postData = {
					searchItem: {
						id: self.mainData[index].isFollow[0].id
					},
					data: {
						status: -self.mainData[index].isFollow[0].status
					}
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.mainData[index].isFollow[0].status = -self.mainData[index].isFollow[0].status;
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
				postData.searchItem.relation_user = uni.getStorageSync('user_info').user_no;
				
				postData.getAfter = {
					relationUser:{
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1
						},
						condition:'=',
						info:['mainImg','name']
					},
					isFollow:{
						tableName:'Log',
						middleKey:'relation_user',
						key:'user_no',
						searchItem:{
							status:1,
							type:3,
							status:['in',[1,-1]]
						},
						condition:'=',
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
