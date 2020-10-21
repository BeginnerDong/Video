<template>
	<view>
		<view style="height:var(--status-bar-height)"></view>
		<view class="flex1 m-3">
			<view class="h60 flex-1 radius30 bB-e1 mr-4 flex px-3" @click="Router.navigateTo({route:{path:'/pages/search/search'}})">
				<image src="../../static/images/home-icon5.png" class="wh28 mr-1"></image>
				<view class="font-26 color9 flex-1">搜索感兴趣的视频</view>
			</view>
			<image src="../../static/images/home-icon6.png" class="fs-icon" style="transition: all 0.2s linear" @click="Router.navigateTo({route:{path:'/pages/update/update'}})"></image>
		</view>

		<!-- banner -->
		<view  style="height: 340rpx;">
			<view v-if="swiperList.length">
				<customSwiper @change="change" @clickItem="toDetail()"  :swiper-list="swiperList" />
			</view>
		</view>
		

		<!-- 金刚区 -->
		<view class="font-26 line-h flex2 py-3">
			<view class="flex4" @click="Router.navigateTo({route:{path:'/pages/classify/classify?type=0'}})">
				<image src="../../static/images/home-icon3.png" class="icon1"></image>
				<view class="pt-3">推荐视频</view>
			</view>
			<view class="flex4" @click="Router.navigateTo({route:{path:'/pages/classify/classify?type=1'}})">
				<image src="../../static/images/home-icon2.png" class="icon2"></image>
				<view class="pt-3">热门视频</view>
			</view>
			<view class="flex4" @click="Router.navigateTo({route:{path:'/pages/classify/classify?type=2'}})">
				<image src="../../static/images/home-icon1.png" class="icon3"></image>
				<view class="pt-3">优享视频</view>
			</view>
			<view class="flex4" @click="Router.navigateTo({route:{path:'/pages/classify/classify?type=3'}})">
				<image src="../../static/images/home-icon.png" class="icon4"></image>
				<view class="pt-3">类别视频</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="flex1 px-2">
		
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
						<view class="flex-1 px-1">{{Utils.likeNum(item.view_count)}}</view>
						<view>{{item.duration?item.duration:''}}</view>
					</view>
				</view>
				<view class="px-1 py-2">
					<view class="avoidOverflow2" style="height: 76rpx;">{{item.title?item.title:''}}</view>
					<view class="flex font-26 color6 pt-3" v-if="item.userInfo&&item.userInfo[0]&&item.userInfo[0].user_type==2">
						<image src="../../static/images/thelogin-img.png" class="wh44 radius-5 mr-1"></image>
						<view>官方平台</view>
					</view>
					<view class="flex font-26 color6 pt-3" v-else>
						<image :src="item.userInfo&&item.userInfo[0]&&item.userInfo[0].mainImg&&item.userInfo[0].mainImg[0]?item.userInfo[0].mainImg[0].url:''" class="wh44 radius-5 mr-1"></image>
						<view>{{item.userInfo&&item.userInfo[0]?item.userInfo[0].name:''}}</view>
					</view>
				</view>
				<view class="boxMask p-aXY flex4" @click.stop="Router.navigateTo({route:{path:'/pages/VIP/VIP'}})" v-if="item.vip==1&&!isMember">
					<image src="../../static/images/classification-icon.png" class="gb-icon mb-4"></image>
					<view class="btn50-c bg-white">购买会员</view>
				</view>
			</view>

		</view>



		<view style="height: 100rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item on">
				<image src="../../static/images/nabar1-a.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/square/square'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
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
	import customSwiper from '../../components/blackmonth-swiper/index'
	export default {
		data() {
			return {
				Router: this.$Router,
				Utils:this.$Utils,
				is_show: false,
				swiperList: [],
				mainData:[],
				isMember:getApp().globalData.isMember
			}
		},
		components: {
			customSwiper
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData','getSliderData','getUserInfoData'], self);
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
			change(e){
				const self = this;
				console.log(e)
				self.currentId = self.sliderData[e].passage1
				
			},
			
			toDetail(){
				const self = this;
				if(self.currentId){
					self.Router.navigateTo({route:{path:'/pages/detail/detail?id='+self.currentId}})
				}
				
			},
			
			getUserInfoData() {
				var self = this;
				var postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				var callback = function(res) {
					if (res.solely_code==100000) {
						if(res.info.data[0].name==''){
							getApp().globalData.checkInfo = false
						}else{
							getApp().globalData.checkInfo = true
						}
						
						if(res.info.data[0].deadline>Date.parse(new Date())/1000){
							getApp().globalData.isMember = true
						}else{
							getApp().globalData.isMember = false
						}
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getSliderData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 4
				};
				postData.order = {
					listorder: 'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.sliderData = res.info.data;
						for (var i = 0; i < res.info.data.length; i++) {
							self.swiperList.push(res.info.data[i].mainImg[0])
						}
						console.log('self.swiperList',self.swiperList)
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.articleGet(postData, callback);
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
	};
</script>

<style scoped>
	.btn50-c{width: 180rpx;color: #222;margin-top: 40rpx;font-size: 28rpx;}
	.icon1 {
		width: 66rpx;
		height: 65rpx;
	}

	.icon2 {
		width: 66rpx;
		height: 62rpx;
	}

	.icon3 {
		width: 70rpx;
		height: 60rpx;
	}

	.icon4 {
		width: 65rpx;
		height: 61rpx;
	}
</style>
