<template>
	<view>
		
		<view class="video p-r">
			<video id="myVideo"
			objectFit="cover" 
			@play="play"
			:src="mainData.bannerImg&&mainData.bannerImg[0]?mainData.bannerImg[0].url:''" controls v-if="mainData.bannerImg&&mainData.bannerImg.length>0"></video>
			<view class="p-aXY" v-if="mainData.bannerImg&&mainData.bannerImg.length==0">
				<image :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" mode=""></image>
			</view>
		</view>
		
		<view class="px-3">
			<view class="font-32 font-w py-4">{{mainData.name?mainData.name:''}}</view>
			
			<!-- 投视频 -->
			<view  v-if="type==0">
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">需求主题</view>
					</view>
					<view class="font-26 pb-4">
						{{mainData.description?mainData.description:''}}
					</view>
				</view>
				<view v-if="mainData.bannerImg&&mainData.bannerImg.length==0">
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon1.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">需求时间</view>
					</view>
					<view class="font-26 pb-4">
						{{Utils.timeto(mainData.start_time,'ymd')}} - {{Utils.timeto(mainData.end_time,'ymd')}}
					</view>
				</view>
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon2.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1" v-if="mainData.bannerImg&&mainData.bannerImg.length==0">创作激励</view>
						<view class="font-30 pl-1" v-if="mainData.bannerImg&&mainData.bannerImg.length>0">打赏</view>
					</view>
					<view class="font-26 pb-4" v-if="mainData.bannerImg&&mainData.bannerImg.length==0">
						选中视频将悬赏{{mainData.score}}灯泡
					</view>
					
					<view class="font-26 pb-4" v-if="mainData.bannerImg&&mainData.bannerImg.length>0">
						观看此视频需{{mainData.score}}灯泡
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="height: 120rpx;"></view>
		<!-- 投视频 -->
		<view class="px-3 py-2 bT-e1 p-fX bottom-0"
		v-if="mainData.end_time>now&&mainData.bannerImg&&mainData.bannerImg.length==0&&mainData.message&&mainData.message.length==0"
		
		@click="Router.navigateTo({route:{path:'/pages/upload/upload?id='+mainData.id}})"
		>
			<view class="btn80-c colorf Mgb">投视频</view>
		</view>
		<!-- 已报名 -->
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" 
		@click="Router.navigateTo({route:{path:'/pages/reward/reward?id='+mainData.id+'&type=act'}})"
		v-if="mainData.bannerImg&&mainData.bannerImg.length>0">
			<view class="btn80-c colorf Mgb">打赏</view>
		</view>
		
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-if="mainData.end_time>now&&mainData.bannerImg&&mainData.bannerImg.length==0&&mainData.message&&mainData.message.length>0">
			<view class="btn80-c bg-f5 color6">已报名</view>
		</view>
		
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-if="mainData.end_time<now&&mainData.bannerImg&&mainData.bannerImg.length==0">
			<view class="btn80-c bg-f5 color6">已结束</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				type:0,
				mainData:{},
				Utils:this.$Utils,
				now:''
			}
		},
		onLoad(options) {
			const self = this;
			self.now = Date.parse(new Date());
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		onShow() {
			const self = this;
			if(uni.getStorageSync('hasDs')){
				self.getMainData()
			}
		},
		methods: {
			
			play(){
				const self = this;
				//self.videoContext = uni.createVideoContext('myVideo')
				if(self.mainData.order.length==0){
					self.Router.navigateTo({route:{path:'/pages/reward/reward?id='+self.mainData.id+'&type=act'}})
				}else{
					self.videoContext.play()
				}
			},	
			
			getMainData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id:self.id
				};
				postData.getAfter = {
					message:{
						token:uni.getStorageSync('user_token'),
						tableName:'Message',
						middleKey:'id',
						key:'relation_id',
						searchItem:{
							status:1,
							type:1,
							user_no:uni.getStorageSync('user_info').user_no
						},
						condition:'='
					},
					order:{
						token:uni.getStorageSync('user_token'),
						tableName:'Order',
						middleKey:'id',
						key:'act_id',
						searchItem:{
							status:1,
							type:6,
							pay_status:1,
							user_no:uni.getStorageSync('user_info').user_no
						},
						condition:'='
					}
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if(self.mainData.bannerImg.length>0){
							self.videoContext = uni.createVideoContext('myVideo')
						}
					};
					uni.removeStorageSync('hasDs')
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.activityGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.video,video{width: 100%;height: 400rpx;}
.wh65{width: 60rpx;height: 50rpx;}
</style>
