<template>
	<view>
		
		<view class="flex p-3">
			<image :src="userInfoData.mainImg&&userInfoData.mainImg[0]?userInfoData.mainImg[0].url:'../../static/images/about-img.png'" class="wh120 radius-5"></image>
			<view class="flex-1 pl-2">
				<view class="font-32 pb-1">{{userInfoData.user_no&&userInfoData.name?userInfoData.name:'用户'+userInfoData.user_no}}</view>
				<view class="font-22 color9 avoidOverflow2">{{userInfoData.passage1?userInfoData.passage1:''}}</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view>
			<view class="font-32 px-3 line-h pt-3 pb-2">TA的作品（{{mainData.length?mainData.length:0}}）</view>
			
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
					<view class="px-1 py-2 bg-white">
						<view class="avoidOverflow2"  style="height: 76rpx;">{{item.title?item.title:''}}</view>
						<view class="flex font-26 color6 pt-3">
							<image :src="userInfoData.mainImg&&userInfoData.mainImg[0]?userInfoData.mainImg[0].url:''" class="wh44 radius-5 mr-1"></image>
							<view>{{userInfoData.name?userInfoData.name:''}}</view>
						</view>
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
				userInfoData:{},
				mainData:[],
				Utils:this.$Utils
			}
		},
		onLoad(options) {
			const self = this;
			self.user_no = options.user_no;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserInfoData','getMainData'], self);
		},
		methods: {
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					user_no: self.user_no,
					user_type:0
				};
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
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
					user_no:self.user_no,
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
			
		}
	}
</script>

<style>
page{background-image: linear-gradient(to bottom,#fff,#fafafa);}
</style>
