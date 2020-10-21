<template>
	<view>
		
		<view class="head pr-2 bg-white p-s top-0">
			<view style="height:var(--status-bar-height)"></view>
			<view class="p-r py-3">
				<view class="p-3 p-a z100 top-0" @click="Router.back(1)">
					<image src="../../static/images/back.png" class="back"></image>
				</view>
				<view class="flexX list z10 p-aXY bottom-0">
					<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">推荐</view>
					<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">热门</view>
					<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">优享</view>
					<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">类别</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="flex1 px-2 mt-2" v-show="liCurr != 3">
			
			<view class="radius10 overflow-h bB-e1 mb-2 p-r box" v-for="(item,index) in mainData"
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
				<view class="boxMask p-aXY flex4" v-if="item.vip==1&&!isMember" @click.stop="Router.navigateTo({route:{path:'/pages/VIP/VIP'}})">
					<image src="../../static/images/classification-icon.png" class="gb-icon mb-4"></image>
					<view class="btn50-c bg-white">购买会员</view>
				</view>
			</view>
			
		</view>
		
		
		<!-- 类别 -->
		<view class="flex flex-wrap font-26 color8" v-show="liCurr == 3">
			<view class="flex4 py-4 classItem" v-for="(item,index) in labelData" :key="index"
			:data-id = "item.id"
			:data-name = "item.title"
			@click="Router.navigateTo({route:{path:'/pages/category/category?id='+$event.currentTarget.dataset.id+'&name='+$event.currentTarget.dataset.name}})">
				<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="classIcon mb-1"></image>
				<view>{{item.title}}</view>
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
				mainData:[
					
				],
				labelData:[],
				searchItem:{
					thirdapp_id:2,
					//top:1
					check_status:1
				},
				isMember:getApp().globalData.isMember
			}
		},
		onLoad(options) {
			const self = this;
			if(options){
				self.liCurr = options.type;;
				if(self.liCurr==0){
					self.searchItem.top = 1
				}else if(self.liCurr==1){
					self.searchItem.hot = 1
				}else if(self.liCurr==2){
					self.searchItem.select = 1
				}
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData','getLabelData'], self);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')&&self.liCurr!=3) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			changeLi(i){
				const self = this;
				if(i!=self.liCurr){
					self.liCurr = i;
					if(self.liCurr!=3){
						if(self.liCurr==0){
							self.searchItem.top = 1
							delete self.searchItem.hot
							delete self.searchItem.select
						}else if(self.liCurr==1){
							self.searchItem.hot = 1
							delete self.searchItem.top
							delete self.searchItem.select
						}else if(self.liCurr==2){
							self.searchItem.select = 1
							delete self.searchItem.top
							delete self.searchItem.hot
						};
						self.getMainData(true)
					}
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
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
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
			
			getLabelData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2
				};
				postData.order = {
					listorder: 'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.labelData = res.info.data
					};
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.li{font-size: 32rpx;padding: 0;line-height: 1;width: 25%;}
.list{padding: 0 168rpx;}
.list .on{font-size: 42rpx;font-weight: bold;}
.list .on::before{width: 0;height: 0;}

.classItem{width: 25%;}
.classIcon{width: 66rpx;height: 60rpx;}

.btn50-c{width: 180rpx;color: #222;margin-top: 40rpx;font-size: 28rpx;}
</style>
