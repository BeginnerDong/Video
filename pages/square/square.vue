<template>
	<view class="pb-3">
		
		<view style="height:var(--status-bar-height)" class="bg-white"></view>
		<view class="head flex1 pr-2 px-3 py-2 bg-white">
			<view class="font-34">创作广场</view>
			<view class="btn50-c Mgb wh50 flex0"
			@click="Router.navigateTo({route:{path:'/pages/publish/publish'}})">
				<image src="../../static/images/fans-icon.png" class="wh24"></image>
			</view>
		</view>
		
		<view class="bg-white mx-3 mt-3 radius10 p-3 bB-e1"
			v-for="(item,index) in mainData"
			:key="index" 
		>
			<view class="flex" 
			:data-id = "item.id"
			@click="Router.navigateTo({route:{path:'/pages/squareMore/squareMore?id='+$event.currentTarget.dataset.id}})"
			>
				<image mode="aspectFill" :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="wh240 radius10"></image>
				<view class="pl-3 py-2 flex-1 flex5 txtBox">
					<view class="font-32 font-w avoidOverflow2">{{item.name?item.name:''}}</view>
					<view class="font-24 color9 pl-2 p-r time">{{Utils.timeto(item.start_time,'ymd')}}~{{Utils.timeto(item.end_time,'ymd')}}</view>
				</view>
			</view>
			<view class="flex1 pt-3">
				<view class="font-24 flex">
					<image src="../../static/images/square-icon1.png" class="icon mr-2"></image>
					<view>创作激励： <text class="colorR">{{item.score}}灯泡</text></view>
				</view>
				<view class="btn70-c Mgb colorf" v-if="item.end_time>now&&item.bannerImg&&item.bannerImg.length==0&&item.message&&item.message.length==0"
				:data-id = "item.id"
				@click="Router.navigateTo({route:{path:'/pages/upload/upload?id='+$event.currentTarget.dataset.id}})">投视频</view>
				<view class="btn70-c Mgb colorf"
				 :data-id = "item.id"
				 @click="Router.navigateTo({route:{path:'/pages/squareMore/squareMore?id='+$event.currentTarget.dataset.id}})"
				 v-if="item.bannerImg.length>0">去观看</view>
				<view class="btn70-c bg-f5 color6" v-if="item.end_time>now&&item.bannerImg&&item.bannerImg.length==0&&item.message&&item.message.length>0">已报名</view>
				<view class="btn70-c bg-f5 color6" v-if="item.end_time<now&&item.bannerImg&&item.bannerImg.length==0">已结束</view>
			</view>
			<!-- <view class="flex1 pt-3">
				<view class="font-24 flex">
					<image src="../../static/images/square-icon2.png" class="wh24 mr-2"></image>
					<view>创作激励： <text class="colorR">500充值币</text></view>
				</view>
				<view class="btn70-c bg-f5 color6">去观看</view>
			</view> -->
		</view>
		
		<!-- <view class="bg-white mx-3 mt-3 radius10 p-3 bB-e1">
			<view class="flex"
			@click="Router.navigateTo({route:{path:'/pages/squareDetail/squareDetail?type=1'}})">
				<image src="../../static/images/square-img.png" class="wh240 radius10"></image>
				<view class="pl-3 py-2 flex-1 flex5 txtBox">
					<view class="font-32 font-w avoidOverflow2">爱上学习季 快闪CPx心动狙击</view>
					<view class="font-24 color9 pl-2 p-r time">2020年8月12日~8月15日</view>
				</view>
			</view>
			<view class="flex1 pt-3">
				<view class="font-24 flex">
					<image src="../../static/images/square-icon2.png" class="wh24 mr-2"></image>
					<view>创作激励： <text class="colorR">500充值币</text></view>
				</view>
				<view class="btn70-c bg-f5 color6"
				@click="Router.navigateTo({route:{path:'/pages/reward/reward'}})">去观看</view>
				<view class="btn70-c bg-f5 color6"
				@click="Router.navigateTo({route:{path:'/pages/reward/reward'}})">已报名</view>
			</view>
		</view> -->
		
		
		
		
		<view style="height: 100rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar2-a.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/news/news'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
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
				mainData:[],
				Utils:this.$Utils,
				now:''
			}
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.now = Date.parse(new Date());
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
				};
				postData.order = {
					create_time: 'desc'
				};
				//postData.getLimit = ['bannerImg'];
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
					}
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.activityGet(postData, callback);
			},
			
		}
	}
</script>
<style>page{background-color: #FAFAFA;}</style>
<style scoped>
.btn50-c{margin: 0;}
.txtBox{height: 240rpx;}
.time::before{content: '';background-color: #32B16C;width: 8rpx;height: 8rpx;border-radius: 50%;position: absolute;left: 0;top: 50%;margin-top: -4rpx;}
.icon{width: 22rpx;height: 29rpx;}
.btn70-c{line-height: 66rpx;width: 170rpx;margin: 0;}
</style>
