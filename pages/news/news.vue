<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="bB-e1 p-s top-0">
			<view class="list z10">
				<view class="li" :class="liCurr==0?'on1':''" @click="changeLi(0)">点赞</view>
				<view class="li" :class="liCurr==1?'on1':''" @click="changeLi(1)">评论</view>
				<view class="li" :class="liCurr==2?'on1':''" @click="changeLi(2)">收藏</view>
				<view class="li" :class="liCurr==3?'on1':''" @click="changeLi(3)">打赏</view>
			</view>
		</view>
		
		<!-- 点赞 、收藏、打赏-->
		<view v-show="liCurr!=1">
			<view class="d-flex pt-3 px-3" v-for="(item,index) in mainData" :key="index">
				<image style="overflow: hidden;border-radius: 50%;" :src="item.userInfo&&item.userInfo.mainImg&&item.userInfo.mainImg[0]?item.userInfo.mainImg[0].url:''" class="wh80"></image>
				<view class="flex-1 ml-2 pb-3 bB-e1">
					<view class="">
						<view class="font-30 line-h pt-1" v-show="liCurr==0">
							<text class="color pr-2">{{item.userInfo?item.userInfo.name:''}}</text> 赞了这条视频
						</view>
						<view class="font-30 line-h pt-1" v-show="liCurr==2">
							<text class="color pr-2">{{item.userInfo?item.userInfo.name:''}}</text> 收藏了这条视频
						</view>
						<view class="font-30 line-h pt-1" v-show="liCurr==3">{{item.userInfo?item.userInfo.name:''}}</view>
						<view class="font-24 color6 pt-2 line-h">{{item.create_time?Utils.formatMsgTime(item.create_time):''}}</view>
					</view>
					<view class="font-30 pt-3" v-show="liCurr==3">通过该视频向您打赏了 <text class="colorR">{{item.relationOrder?item.relationOrder.price:''}}元</text></view>
					<view class="bg-f7 mt-2 flex"  @click="Router.navigateTo({route:{path:'/pages/detail/detail?id='+item.relationArt.id}})">
						<image mode="aspectFill" :src="item.relationArt&&item.relationArt.mainImg&&item.relationArt.mainImg[0]?item.relationArt.mainImg[0].url:''" class="wh140"></image>
						<view class="px-2 py-3 flex-1 avoidOverflow2">
							{{item.relationArt?item.relationArt.title:''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论 -->
		<view v-show="liCurr==1">
			<view class="d-flex pt-3 px-3" v-for="(item,index) in mainData" :key="index"
			>
				<image style="overflow: hidden;border-radius: 50%;" :src="item.userInfo&&item.userInfo.mainImg&&item.userInfo.mainImg[0]?item.userInfo.mainImg[0].url:''" class="wh80"></image>
				<view class="flex-1 ml-2 pb-3 bB-e1">
					<view class="flex1">
						<view class="flex-1">
							<view class="font-30 line-h pt-1">{{item.userInfo?item.userInfo.name:''}}</view>
							<view class="font-24 color6 pt-2 line-h">{{item.create_time?Utils.formatMsgTime(item.create_time):''}}</view>
						</view>
						<view class="btn60-M" @click="Router.navigateTo({route:{path:'/pages/newsReply/newsReply?artId='+item.relation_id+'&messageId='+item.result+'&name='+item.userInfo.name}})">回复</view>
					</view>
					<view class="font-30 pt-3">{{item.relationMessage?item.relationMessage.description:''}}</view>
					<view class="bg-f7 flex mt-2" @click="Router.navigateTo({route:{path:'/pages/detail/detail?id='+item.relationArt.id}})">
						<image :src="item.relationArt&&item.relationArt.mainImg&&item.relationArt.mainImg[0]?item.relationArt.mainImg[0].url:''" class="wh140"></image>
						<view class="px-2 py-3 flex-1 avoidOverflow2">
							{{item.relationArt?item.relationArt.title:''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view style="height: 100rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/square/square'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar3-a.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<image src="../../static/images/nabar4.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				searchItem:{
					thirdapp_id:2,
					type:1,
					user_type:0
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
			
			changeLi(i){
				const self = this;
				if(self.liCurr!=i){
					self.liCurr = i;
					if(self.liCurr==0){
						self.searchItem.type = 1
					}else if(self.liCurr==1){
						self.searchItem.type = 4
					}else if(self.liCurr==2){
						self.searchItem.type = 2
					}else if(self.liCurr==3){
						self.searchItem.type = 5
					};
					self.getMainData(true)
				}
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
				postData.searchItem.user_no = ['not in',[uni.getStorageSync('user_info').user_no]];
				postData.getAfter = {
					userInfo:{
						
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1
						},
						condition:'=',
						info:['mainImg','name']
					},
					relationArt:{
						
						tableName:'Article',
						middleKey:'relation_id',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'=',
						info:['title','mainImg','id']
					},
					relationMessage:{
						tableName:'Message',
						middleKey:'result',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'=',
						info:['description']
					},
					relationOrder:{
						
						tableName:'Order',
						middleKey:'passage',
						key:'id',
						searchItem:{
							//user_type:0,
							status:1
						},
						condition:'=',
						info:['price']
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

<style scoped>
.li{font-size: 32rpx;padding: 0;line-height: 1;width: 25%;line-height: 100rpx;}
.list{padding: 0 125rpx;}
.list .on1{font-size: 36rpx;font-weight: bold;}

.btn60-M{border-color: #e1e1e1;border-radius: 30rpx;width: 100rpx;margin: 0;}
</style>
