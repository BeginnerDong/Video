<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="p-s top-0">
			<image src="../../static/images/my-icon.png" class="cd-icon m-3" @click="isShow"></image>
		</view>
		
		<view class="flex mx-3 bB-e1 py-3">
			<image :src="userInfoData.mainImg&&userInfoData.mainImg[0]?userInfoData.mainImg[0].url:'../../static/images/about-img.png'" class="wh120 radius-5"></image>
			<view class="flex-1 pl-2">
				<view class="flex">
					<view class="font-32 pr-1">{{userInfoData.user_no&&userInfoData.name?userInfoData.name:'用户'+user_no}}</view>
					<view class="font-20 vip flex0" v-if="userInfoData.deadline>now">
						<image src="../../static/images/my-icon1.png" class="vip-icon mr"></image>
						<view style="line-height: 1;padding-top:8rpx;">会员</view>
						
					</view>
					
				</view>
				<view class="font-22 color9 avoidOverflow1 pt-1">{{userInfoData.passage1?userInfoData.passage1:''}}</view>
				<view class="font-20 pt-1" v-if="userInfoData.deadline>now">会员到期日：{{userInfoData.deadline?Utils.timeto(userInfoData.deadline*1000,'ymd'):''}}</view>
			</view>
		</view>
		
		<view class="font-24 color9 flex2 line-h py-3">
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/follow/follow'}})">
				<view class="font-32 color2 font-w pb-2">{{userInfoData.follow?userInfoData.follow.count:0}}</view>
				<view>关注</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/fans/fans'}})">
				<view class="font-32 color2 font-w pb-2">{{userInfoData.fans?userInfoData.fans.count:0}}</view>
				<view>粉丝</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/collection/collection'}})">
				<view class="font-32 color2 font-w pb-2">{{userInfoData.collect?userInfoData.collect.count:0}}</view>
				<view>收藏</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view>
			<view class="font-32 px-3 line-h pt-3 pb-2">我的作品（{{mainData.length?mainData.length:0}}）</view>
			
			<view class="flex1 px-2">
				
				<view class="radius10 overflow-h bB-e1 mb-2 box"
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
						<view class="avoidOverflow2">{{item.title?item.title:''}}</view>
						<view class="flex font-26 color6 pt-3">
							<image :src="userInfoData.mainImg&&userInfoData.mainImg[0]?userInfoData.mainImg[0].url:''" class="wh44 radius-5 mr-1"></image>
							<view>{{userInfoData.name?userInfoData.name:''}}</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<!-- 侧边栏 -->
		<view class="bg-mask flex" v-show="is_show">
			<view class="bg-white h-100 pt-5 px-3 maskBox animated" :class="is_show?'fadeInLeft':''">
				<view style="height:var(--status-bar-height)"></view>
				<view class="flex bB-e1 py-3">
					<image :src="userInfoData.mainImg&&userInfoData.mainImg[0]?userInfoData.mainImg[0].url:'../../static/images/about-img.png'" class="wh120 radius-5"></image>
					<view class="flex-1 pl-2">
						<view class="flex pb-1">
							<view class="font-32 pr-1" v-cloak>{{userInfoData.name?userInfoData.name:'用户'+user_no}}</view>
							<view class="font-20 vip flex0" v-if="userInfoData.deadline>now">
								<image src="../../static/images/my-icon1.png" class="vip-icon mr"></image>
								<view style="line-height: 1;padding-top:8rpx;">会员</view>
							</view>
						</view>
						<view class="font-22 color9 avoidOverflow2">{{userInfoData.passage1?userInfoData.passage1:''}}</view>
					</view>
				</view>
				<view class="ye font-w colorf py-3 px-2 mb-3 radius10-T flex1"
				@click="Router.navigateTo({route:{path:'/pages/VIP/VIP'}})">
					<image src="../../static/images/my-icon2.png" class="ye-icon"></image>
					<view class="flex-1 px-1">余额：<text class="font-32">{{userInfoData.score}}</text></view>
					<image src="../../static/images/my-icon3.png" class="R mr-1"></image>
				</view>
				
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/information/information'}})">
					<image src="../../static/images/my-icon7.png" class="icon1"></image>
					<view class="flex-1 font-30 px-3">个人资料</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/aboutUs/aboutUs'}})">
					<image src="../../static/images/my-icon4.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">关于我们</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/idea/idea'}})">
					<image src="../../static/images/my-icon6.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">意见反馈</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/agreement/agreement'}})">
					<image src="../../static/images/my-icon5.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">平台协议</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="ye colorf" @click="loginOff" style="height: 80rpx;line-height: 80rpx;text-align: center;width: 400rpx;margin: 50rpx auto;">退出登录</view>
			</view>
			<view class="flex-1 h-100" @click="isShow"></view>
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
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/news/news'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar4-a.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show:false,
				userInfoData:{},
				now:0,
				mainData:[],
				Utils:this.$Utils,
				user_no:''
			}
		},
		onLoad(options) {
			const self = this;
			self.now = Date.parse(new Date())/1000;
			
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserInfoData','getMainData'], self);
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
			
			loginOff(){
				const self = this;
				uni.removeStorageSync('user_token');
				uni.removeStorageSync('user_info');
				uni.redirectTo({
				  url: '/pages/login/login'
				});
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
					user_no:uni.getStorageSync('user_info').user_no,
					check_status:1
				};
				postData.order = {
					create_time: 'desc'
				};
				postData.getLimit = ['video'];
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			isShow(){
				const self = this;
				self.is_show = !self.is_show;
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					user_no: uni.getStorageSync('user_info').user_no
				};
				postData.noLoading = true;
				postData.getAfter = {
					follow: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:3,
						},
						middleKey: 'user_no',
						key: 'user_no',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						      type:3,
							  user_no: uni.getStorageSync('user_info').user_no
						    }
						  ]
						},
					},
					fans: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:3,
						},
						middleKey: 'user_no',
						key: 'relation_user',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						      type:3,
							  relation_user: uni.getStorageSync('user_info').user_no
						    }
						  ]
						},
					},
					collect: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:2,
						},
						middleKey: 'user_no',
						key: 'user_no',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						      type:2,
							  user_no: uni.getStorageSync('user_info').user_no
						    }
						  ]
						},
					},
				}
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						self.user_no = self.userInfoData.user_no
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.cd-icon{width: 44rpx;height: 34rpx;}
.vip-icon{width: 40rpx;height: 30rpx;}
.vip{height: 44rpx;background-color: #FFE650;width: 120rpx;border-radius: 15rpx;}

.maskBox{width: 650rpx;}
.ye{background-image: linear-gradient(to bottom,#3A3A3A,#141414);}
.ye-icon{width: 37rpx;height: 48rpx;}
.R{width: 13rpx;height: 20rpx;}
.icon1{width: 36rpx;height: 30rpx;}
</style>
