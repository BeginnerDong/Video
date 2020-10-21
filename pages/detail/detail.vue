<template>
	<view>
		
		<video :src="mainData.video&&mainData.video[0]?mainData.video[0].url:''" controls objectFit="cover"></video>
		
		<view class="px-3">
			<view 
			class="py-3 flex1" v-if="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].user_type==2">
				<image  src="../../static/images/thelogin-img.png" class="wh70 radius-5"></image>
				<view class="flex-1 pl-2">
					<view class="font-26">官方平台</view>
					<view class="font-22 color9">{{mainData.create_time?Utils.formatMsgTime(mainData.create_time):''}}</view>
				</view>
				<!-- <view class="btn60-c Mgb flex0">
					<image src="../../static/images/fans-icon.png" class="wh24 mr-1"></image>
					<view style="color: #fff;">关注</view>
				</view>	 -->
			</view>
			<view class="py-3 flex1" v-else>
				<image @click="Router.navigateTo({route:{path:'/pages/homepage/homepage?user_no='+mainData.userInfo[0].user_no}})" :src="mainData.userInfo&&mainData.userInfo[0]&&mainData.userInfo[0].mainImg&&mainData.userInfo[0].mainImg[0]?mainData.userInfo[0].mainImg[0].url:''" class="wh70 radius-5"></image>
				<view class="flex-1 pl-2" @click="Router.navigateTo({route:{path:'/pages/homepage/homepage?user_no='+mainData.userInfo[0].user_no}})">
					<view class="font-26">{{mainData.userInfo&&mainData.userInfo[0]?mainData.userInfo[0].name:''}}</view>
					<view class="font-22 color9">{{mainData.create_time?Utils.formatMsgTime(mainData.create_time):''}}</view>
				</view>
				<view class="btn60-c Mgb flex0" v-if="!isMe"  @click="Utils.stopMultiClick(clickFollow)">
					<image src="../../static/images/fans-icon.png" class="wh24 mr-1" v-if="mainData.isFollow&&mainData.isFollow.length==0"></image>
					<view style="color: #fff;">{{mainData.isFollow&&mainData.isFollow.length>0&&mainData.isFollow[0].status==1?'取消关注':'关注'}}</view>
				</view>	
			</view>
			<view class="font-32">{{mainData.title}}</view>
			<view class="flex pt-1">
				<view class="sign">{{mainData.taglist&&mainData.taglist[0]?mainData.taglist[0].title:''}}</view>
				<view class="color8 font-20 p-1 flex pl-2">
					<image src="../../static/images/details-icon3.png" class="sp-icon"></image>
					<view class="flex-1 px-1">{{Utils.likeNum(mainData.view_count)}}</view>
				</view>
			</view>
			<view class="font-20 color9 line-h flex2 pt-3 bB-e1 pb-4">
				<view class="flex4" @click="Utils.stopMultiClick(clickGood)">
					<image 
					 :src="mainData.goodMe&&mainData.goodMe.length>0&&mainData.goodMe[0].status==1?'../../static/images/details-icon7-a.png':'../../static/images/details-icon7.png'"
					 class="icon1"></image>
					<view class="pt-2">{{mainData.good&&mainData.good.count?Utils.likeNum(mainData.good.count):0}}</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/details-icon6.png" class="icon2"></image>
					<view class="pt-2">{{mainData.message&&mainData.message.count?Utils.likeNum(mainData.message.count):0}}</view>
				</view>
				<view class="flex4" @click="Utils.stopMultiClick(clickCollect)">
					<image :src="mainData.collectMe&&mainData.collectMe.length>0&&mainData.collectMe[0].status==1?'../../static/images/details-icon5-a.png':'../../static/images/details-icon5.png'" class="icon2"></image>
					<view class="pt-2">{{mainData.collect&&mainData.collect.count?Utils.likeNum(mainData.collect.count):0}}</view>
				</view>
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/reward/reward?id='+mainData.id+'&type=art'}})">
					<image src="../../static/images/details-icon4.png" class="icon3"></image>
					<view class="pt-2">打赏</view>
				</view>
			</view>
			<view class="py-3 flexX">
				<view class="tag" v-for="(item,index) in mainData.taglist" :key="index"
				:data-id = "item.id"
				:data-name = "item.title"
				@click="Router.navigateTo({route:{path:'/pages/category/category?id='+$event.currentTarget.dataset.id+'&name='+$event.currentTarget.dataset.name}})"
				>{{item.title}}</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<!-- 评论 -->
		<view class="px-3 pb-3 font-26">
			
			<view class="d-flex pt-3" v-for="(item,index) in messageData" :key="index">
				<image :src="item.headImgUrl&&item.headImgUrl[0]?item.headImgUrl[0].url:''" 
				:data-user_no = "item.user_no"
				@click="Router.navigateTo({route:{path:'/pages/homepage/homepage?user_no='+$event.currentTarget.dataset.user_no}})"
				class="wh80" style="overflow: hidden;border-radius: 50%;"></image>
				<view class="flex-1 pl-2 bB-e1">
					<view class="color6">{{item.name}}</view>
					<view class="font-30 pt-2 line-h">{{item.description}}</view>
					<view class="p-2 bg-f7 mt-2" v-if="item.child&&item.child.length>0" 
					:data-id = "item.id"
					
					@click="Router.navigateTo({route:{path:'/pages/reply/reply?message_id='+$event.currentTarget.dataset.id+'&art_id='+mainData.id}})">
						<view>
							<text class="color">{{item.child&&item.child[0]?item.child[0].name:''}}</text>：
							{{item.child&&item.child[0]?item.child[0].description:''}}
						</view>
						<view class="color pt-1"  v-if="item.child&&item.child.length>1"
						>共{{item.child.length}}条回复 ></view>
					</view>
					<view class="flex1 font-24 color9 py-3">
						<view>{{item.create_time?Utils.formatMsgTime(item.create_time):''}}</view>
						<image @click="replay(index)" src="../../static/images/details-icon8.png" class="pl-icon"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 105rpx;"></view>
		<view style="position: fixed;bottom: 0;border-top: 1px solid #F5F5F5;height: 100rpx;width: 100%;background-color: #fff;">
			<view class="d-flex w-100 h-100">
				<input type="text" v-model="submitData.description" :placeholder="placeholderText" style="height: 100%;width: 80%;"  adjust-position="true" :focus="focus"/>
				<button style="width: 20%;line-height: 100rpx;text-align: center;" @click="addMessage()">发送</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				mainData:{},
				messageData:[],
				focus:false,
				placeholderText:'写评论...',
				submitData:{
					type:2,
					description:'',
					relation_table:'Article',
					relation_id:'',
					relation_message:0,
					thirdapp_id:2
				},
				isMe:0
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.submitData.relation_id = self.id;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData','getMessageData'], self);
		},
		
		
		onShow() {
			const self = this;
			//self.checkInfo()
			console.log(getApp().globalData.checkInfo)
		},
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMessageData()
			};
		},
		
		methods: {
			
			clickFollow() {
				const self = this;
				if(getApp().globalData.checkInfo){
					uni.setStorageSync('canClick', false);
					if (self.mainData.isFollow.length == 0) {
						self.addFollowLog()
					} else {
						self.updateFollowLog()
					};
				}else{
					uni.setStorageSync('canClick', true);
					self.showModel()
				}
			},
			
			addFollowLog() {
				const self = this;
				const postData = {};
				postData.data = {
					type: 3,
					title: '关注成功',
					
					relation_table:'User',
					user_no: uni.getStorageSync('user_info').user_no,
					relation_user:self.mainData.user_no
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData.isFollow.push({
							status: 1,
							id: res.info.id
						});
					} else {
						self.$Utils.showToast('关注失败', 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.logAdd(postData, callback);
			},
			
			
			updateFollowLog() {
				const self = this;
			
				const postData = {
					searchItem: {
						id: self.mainData.isFollow[0].id
						
					},
					data: {
						status: -self.mainData.isFollow[0].status
					}
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.mainData.isFollow[0].status = -self.mainData.isFollow[0].status;

					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
				};
				self.$apis.logUpdate(postData, callback);
			},
			
			reset(){
				const self = this;
				
				console.log(23434)
			},
			
			addMessage(index) {
				const self = this;
				if(getApp().globalData.checkInfo){
					uni.setStorageSync('canClick', false);
					if(self.submitData.description==''){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('评论不能为空', 'none', 1000);
						return
					};
					const postData = {};
					postData.data = self.$Utils.cloneForm(self.submitData);
					postData.tokenFuncName = 'getUserToken';
					postData.saveAfter = [
						{
							tableName: 'Log',
							FuncName: 'add',
							data: {
								type: 4,
								relation_id: self.id,
								relation_table:'Article',
								relation_user:self.mainData.user_no,
								user_no:uni.getStorageSync('user_info').user_no,
								res:{result:'id'}
							}
						}
					];	
					const callback = (res) => {
						if (res.solely_code == 100000) {
							self.submitData.description = '';
							self.submitData.relation_message = 0;
							self.placeholderText = '写评论...'
							self.getMessageData(true)
						} else {
							self.$Utils.showToast(res.msg, 'none', 1000)
						};
						uni.setStorageSync('canClick', true);	
					};
					self.$apis.messageAdd(postData, callback);
				}else{
					uni.setStorageSync('canClick', true);
					self.showModel()
				}
			},
			
			showModel(){
				const self = this;
				uni.showModal({
					title:'温馨提示',
					content:'请补充您的昵称，头像等内容...',
					success(res) {
						if(res.confirm){
							self.Router.navigateTo({route:{path:'/pages/information/information'}})
						}
					}
				})
			},
			
			replay(index){
				const self = this;
				self.focus = true;
				self.submitData.relation_message = self.messageData[index].id;
				console.log('self.messageData[index].id',self.messageData[index].id)
				self.placeholderText = '回复 '+self.messageData[index].name
			},
			
			getMessageData(isNew) {
				var self = this;
				if (isNew) {
					self.messageData = [];
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
					type: 2,
					relation_id:self.id,
					relation_message:0
				};
				postData.order = {
					create_time: 'desc'
				};
				postData.getAfter = {
					child:{
						tableName:'Message',
						middleKey:'id',
						key:'relation_message',
						searchItem:{
							status:1
						},
						condition:'='
					}
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.messageData.push.apply(self.messageData, res.info.data);
					};
					self.$Utils.finishFunc('getMessageData');
				};
				self.$apis.messageGet(postData, callback);
			},
			
			clickCollect() {
				const self = this;
				if(getApp().globalData.checkInfo){
					uni.setStorageSync('canClick', false);
					if (self.mainData.collectMe.length == 0) {
						self.addCollectLog()
					} else {
						self.updateCollectLog()
					};
				}else{
					uni.setStorageSync('canClick', true);
					self.showModel()
				}
			},
			
			addCollectLog() {
				const self = this;
				const postData = {};
				postData.data = {
					type: 2,
					title: '收藏成功',
					relation_id: self.mainData.id,
					relation_table:'Article',
					user_no: uni.getStorageSync('user_info').user_no,
					relation_user:self.mainData.user_no
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData.collectMe.push({
							status: 1,
							id: res.info.id
						});
						self.mainData.collect.count++
					} else {
						self.$Utils.showToast('收藏失败', 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.logAdd(postData, callback);
			},
			
			
			updateCollectLog() {
				const self = this;
			
				const postData = {
					searchItem: {
						id: self.mainData.collectMe[0].id
						
					},
					data: {
						status: -self.mainData.collectMe[0].status
					}
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.mainData.collectMe[0].status = -self.mainData.collectMe[0].status;
						if(self.mainData.collectMe[0].status==1){
							self.mainData.collect.count++
						}else{
							self.mainData.collect.count--
						}
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
				};
				self.$apis.logUpdate(postData, callback);
			},
			
			clickGood() {
				const self = this;
				if(getApp().globalData.checkInfo){
					uni.setStorageSync('canClick', false);
					if (self.mainData.goodMe.length == 0) {
						self.addGoodLog()
					} else {
						self.updateGoodLog()
					};
				}else{
					uni.setStorageSync('canClick', true);
					self.showModel()
				}
				
			},
			
			addGoodLog(index) {
				const self = this;
				const postData = {};
				postData.data = {
					type: 1,
					title: '点赞成功',
					relation_id: self.mainData.id,
					relation_table:'Article',
					user_no: uni.getStorageSync('user_info').user_no,
					relation_user:self.mainData.user_no
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData.goodMe.push({
							status: 1,
							id: res.info.id
						});
						self.mainData.good.count++
						//self.$Utils.showToast('已收藏', 'none', 1000)
					} else {
						self.$Utils.showToast('点赞失败', 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.logAdd(postData, callback);
			},
			
			
			updateGoodLog() {
				const self = this;
			
				const postData = {
					searchItem: {
						id: self.mainData.goodMe[0].id
						
					},
					data: {
						status: -self.mainData.goodMe[0].status
					}
				};
				postData.tokenFuncName = 'getUserToken';
				postData.noLoading = true;
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.mainData.goodMe[0].status = -self.mainData.goodMe[0].status;
						if(self.mainData.goodMe[0].status==1){
							self.mainData.good.count++
						}else{
							self.mainData.good.count--
						}
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
				};
				self.$apis.logUpdate(postData, callback);
			},
			
			getMainData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 1,
					id:self.id
				};
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
					},
					goodMe: {
						token:uni.getStorageSync('user_token'),
						tableName: 'Log',
						searchItem: {
							status:['in',[1,-1]],
							type:1,
							user_no:wx.getStorageSync('user_info').user_no
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
					},
					good: {
						token:uni.getStorageSync('user_token'),
						tableName: 'Log',
						searchItem: {
							status:1,
							type:1,
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,type:1
						    }
						  ]
						},
					},
					collectMe: {
						token:uni.getStorageSync('user_token'),
						tableName: 'Log',
						searchItem: {
							status:['in',[1,-1]],
							type:2,
							user_no:wx.getStorageSync('user_info').user_no
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
					},
					collect: {
						token:uni.getStorageSync('user_token'),
						tableName: 'Log',
						searchItem: {
							status:1,
							type:2,
							user_type:0
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,type:2,user_type:0
						    }
						  ]
						},
					},
					message: {
						token:uni.getStorageSync('user_token'),
						tableName: 'Message',
						searchItem: {
							status:1,
							type:2,
							user_type:0
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  count:[
						    'count',
						    'count',
						    {
						      status:1,type:2,user_type:0
						    }
						  ]
						},
					},
					isFollow:{
						token:uni.getStorageSync('user_token'),
						tableName: 'Log',
						searchItem: {
							status:['in',[1,-1]],
							type:3,
							user_no:wx.getStorageSync('user_info').user_no
						},
						middleKey: 'user_no',
						key: 'relation_user',
						condition: 'in',
					}
				}
				postData.saveFunction = [{
					FuncName: 'viewArticle',
					searchItem:{
						id:self.id
					}
				}];
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if(self.mainData.user_no==uni.getStorageSync('user_info').user_no){
							self.isMe = true
						}else{
							self.isMe = false
						}
						console.log(self.isMe)
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
page{
	font-family: 'AliR'
}
video{width: 100%;height: 400rpx;}
.btn60-c{width: 130rpx;margin: 0;}

.icon1{width: 40rpx;height: 42rpx;}
.icon2{width: 42rpx;height: 40rpx;}
.icon3{width: 37rpx;height: 42rpx;}


</style>
