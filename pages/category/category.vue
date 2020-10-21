<template>
	<view>
		
		<view class="flex1 px-2 mt-2">
			
			<view class="radius10 overflow-h bB-e1 mb-2 p-r box" 
				v-for="(item,index) in mainData"
				:key="index" 
				:data-id="item.id"
				@click="Router.navigateTo({route:{path:'/pages/detail/detail?id='+$event.currentTarget.dataset.id}})"
			>
				<view class="p-r">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="img"></image> 
					<view class="colorf font-20 p-1 flex p-aX txt">
						<image src="../../static/images/home-icon4.png" class="sp-icon"></image>
						<view class="flex-1 px-1">{{item.view_count?item.view_count:0}}</view>
						<view>{{item.duration?item.duration:''}}</view>
					</view>
				</view>
				<view class="px-1 py-2">
					<view class="avoidOverflow2"  style="height: 76rpx;">{{item.title?item.title:''}}</view>
					
					<view class="flex font-26 color6 pt-3" v-if="item.userInfo&&item.userInfo[0]&&item.userInfo[0].user_type==2">
						<image src="../../static/images/thelogin-img.png" class="wh44 radius-5 mr-1"></image>
						<view>官方平台</view>
					</view>
					<view class="flex font-26 color6 pt-3" v-else>
						<image :src="item.userInfo&&item.userInfo[0]&&item.userInfo[0].mainImg&&item.userInfo[0].mainImg[0]?item.userInfo[0].mainImg[0].url:''" class="wh44 radius-5 mr-1"></image>
						<view>{{item.userInfo&&item.userInfo[0]?item.userInfo[0].name:''}}</view>
					</view>
				</view>
				<!-- 非会员 -->
				<view class="boxMask p-aXY flex4" v-if="!isMember&&item.vip==1" @click.stop="Router.navigateTo({route:{path:'/pages/VIP/VIP'}})">
					<image src="../../static/images/classification-icon.png" class="gb-icon mb-4"></image>
					<view class="btn50-c bg-white">购买会员</view>
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
				mainData:[],
				isMember:getApp().globalData.isMember
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			console.log('options',options)
			if(options.name){
				uni.setNavigationBarTitle({
					title:options.name
				})
			};
			self.id = options.id;
			self.getBefore = {
				test:{
					tableName:'Relation',
					middleKey:'id',
					key:'relation_one',
					searchItem: {
						relation_two: ['in', [self.id]]
					},
					condition: 'in'
				}
			}
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
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: 2,
					type: 1,
					check_status:1
				};
				postData.order = {
					create_time: 'desc'
				};
				postData.getLimit = ['video'];
				postData.getBefore = self.$Utils.cloneForm(self.getBefore);
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
					}
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.btn50-c{width: 180rpx;color: #222;margin-top: 40rpx;font-size: 28rpx;}
</style>
