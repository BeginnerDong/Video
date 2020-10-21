<template>
	<view>
		
		<view class="flex1 px-2">
			
			<view class="radius10 overflow-h bB-e1 mb-2 box"
				v-for="(item,index) in mainData"
				:key="index" 
				:data-id="item.relationArt[0].id"
				@click="Router.navigateTo({route:{path:'/pages/detail/detail?id='+$event.currentTarget.dataset.id}})"
			>
				<view class="p-r">
					<image :src="item.relationArt&&item.relationArt[0]&&item.relationArt[0].mainImg&&item.relationArt[0].mainImg[0]?item.relationArt[0].mainImg[0].url:''" class="img"></image> 
					<view class="colorf font-20 p-1 flex p-aX txt">
						<image src="../../static/images/home-icon4.png" class="sp-icon"></image>
						<view class="flex-1 px-1">{{item.relationArt&&item.relationArt[0]?Utils.likeNum(item.relationArt[0].view_count):''}}</view>
						<view>{{item.relationArt&&item.relationArt[0]?item.relationArt[0].duration:''}}</view>
					</view>
				</view>
				<view class="px-1 py-2">
					<view class="avoidOverflow2" style="height: 76rpx;">{{item.relationArt&&item.relationArt[0]?item.relationArt[0].title:''}}</view>
					<view class="flex font-26 color6 pt-3" v-if="item.userInfo&&item.userInfo[0]&&item.userInfo[0].user_type==2">
						<image src="../../static/images/thelogin-img.png" class="wh44 radius-5 mr-1"></image>
						<view>官方平台</view>
					</view>
					<view class="flex font-26 color6 pt-3" v-else>
						<image :src="item.userInfo&&item.userInfo[0]&&item.userInfo[0].mainImg&&item.userInfo[0].mainImg[0]?item.userInfo[0].mainImg[0].url:''" class="wh44 radius-5 mr-1"></image>
						<view>{{item.userInfo&&item.userInfo[0]?item.userInfo[0].name:''}}</view>
					</view>
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
					type:2
				},
				mainData:[],
				Utils:this.$Utils
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
					relationArt:{
						tableName:'Article',
						middleKey:'relation_id',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'=',
					},
					userInfo:{
						tableName:'UserInfo',
						middleKey:['relationArt',0,'user_no'],
						key:'user_no',
						searchItem:{
							status:1
						},
						condition:'='
					}
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

<style>

</style>
