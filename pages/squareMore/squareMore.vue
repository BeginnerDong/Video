<template>
	<view>
		
		<view class="video p-r px-3 mt-2" v-for="(item,index) in mainData" :key="index">
			<!-- <video id="myVideo"
			objectFit="cover" 
			show-play-btn="false"
			show-center-play-btn="false"
			
			@play="play"
			:src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" controls v-if="item.mainImg&&item.mainImg.length>0"></video> -->
			<view class="p-aXY px-3 z100 o5" :data-index = "index"
				@click="Router.navigateTo({route:{path:'/pages/squareDetail/squareDetail?index='+$event.currentTarget.dataset.index+'&id='+actData.id}})">
				
				<image :src="actData.mainImg&&actData.mainImg[0]?actData.mainImg[0].url:''" mode=""></image>
			</view>
			<view class="p-aXY z100" style="left:43%;top: 41%;" :data-index = "index"
				@click="Router.navigateTo({route:{path:'/pages/squareDetail/squareDetail?index='+$event.currentTarget.dataset.index+'&id='+actData.id}})">
				<image src="../../static/images/details-icon910.png" style="width: 100rpx;height: 100rpx;"></image>
			</view>
			<view class="px-2 z100 flex" style="position: absolute;bottom: 0;background-color: #000000;opacity: 0.5;box-sizing: border-box;width: 92%;">
				<image :src="item.user&&item.user[0]&&item.user[0].mainImg&&item.user[0].mainImg[0]?item.user[0].mainImg[0].url:''" 
				style="width: 50rpx;height: 50rpx;border-radius: 50%;"></image>
				<view class="pl-1 colorf py-2">{{item.user&&item.user[0]&&item.user[0]?item.user[0].name:''}}</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				type:0,
				mainData:[],
				Utils:this.$Utils,
				now:'',
				actData:{}
			}
		},
		onLoad(options) {
			const self = this;
			self.now = Date.parse(new Date());
			self.id = options.id;
			self.$Utils.loadAll(['getMainData','getActData'], self);
		},
		
		methods: {
			
			
			getActData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id:self.id
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.actData = res.info.data[0];
					};
					self.$Utils.finishFunc('getActData');
				};
				self.$apis.activityGet(postData, callback);
			},
			
			
			
			getMainData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					relation_id:self.id,
					type:1,
					behavior:1,
					user_type:0
				};
				postData.tokenFuncName = 'getUserToken';
				postData.getAfter = {
					user:{
						tableName:'UserInfo',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
						},
						condition:'='
					},
					
				};
				postData.order = {
					top:'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data;
						/* if(self.mainData.bannerImg.length>0){
							self.videoContext = uni.createVideoContext('myVideo')
						} */
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.video,video{width: 100%;height: 400rpx;}
.wh65{width: 60rpx;height: 50rpx;}
</style>
