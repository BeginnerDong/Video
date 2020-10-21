<template>
	<view class="bT-e1 this">
		
		<view class="d-flex pt-3 px-3 bg-white">
			<image style="overflow: hidden;border-radius: 50%;" :src="orginData.headImgUrl&&orginData.headImgUrl[0]?orginData.headImgUrl[0].url:''" class="wh80"></image>
			<view class="flex-1 pl-2">
				<view :class="orginData.member==1?'colorO':''">{{orginData.name?orginData.name:''}}</view>
				<view class="font-24 color9 pt-1">{{orginData.create_time?Utils.formatMsgTime(orginData.create_time):''}}</view>
				<view class="font-30 py-3 line-h">{{orginData.description?orginData.description:''}}</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="d-flex pt-3 px-4" v-for="(item,index) in mainData" :key="index">
			<image :src="item.headImgUrl&&item.headImgUrl[0]?item.headImgUrl[0].url:''" style="overflow: hidden;border-radius: 50%;" class="wh70"></image>
			<view class="flex-1 pl-2 bB-e1">
				<view :class="item.member==1?'colorO':''">{{item.name?item.name:''}}</view>
				<view class="font-24 color9 pt-1">{{item.create_time?Utils.formatMsgTime(item.create_time):''}}</view>
				<view class="font-30 py-3 line-h" v-if="item.relation_name"  @click="replay(index)">
					回复 <text class="color">@{{item.relation_name}}</text>：{{item.description?item.description:''}}
				</view>
				<view v-else class="font-30 py-3 line-h" @click="replay(index)">{{item.description?item.description:''}}</view>
			</view>
		</view>
		
		<view style="height: 105rpx;"></view>
		<view style="position: fixed;bottom: 0;border-top: 1px solid #F5F5F5;height: 100rpx;width: 100%;background-color: #fff;">
			<view class="d-flex w-100 h-100">
				<input type="text" v-model="submitData.description" :placeholder="placeholderText" style="height: 100%;width: 80%;background: #fff;"  adjust-position="true" :focus="focus"/>
				<button style="width: 20%;line-height: 100rpx;text-align: center;background: #fff;" @click="addMessage()">发送</button>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orginData:{},
				mainData:[],
				Utils:this.$Utils,
				placeholderText:'写评论...',
				submitData:{
					type:2,
					description:'',
					relation_table:'Article',
					relation_id:'',
					relation_message:0,
					thirdapp_id:2,
					relation_user:''
				},
				focus:false
			}
		},
		onLoad(options) {
			const self = this;
			self.message_id = options.message_id;
			self.submitData.relation_message = self.message_id;
			self.art_id = options.art_id;
			self.submitData.relation_id = self.art_id;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getOrginData','getMainData'], self);
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
					/* postData.saveAfter = [
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
					];	 */
					const callback = (res) => {
						if (res.solely_code == 100000) {
							self.submitData.description = '';
							self.submitData.relation_user = '';
							self.placeholderText = '写评论...'
							self.getMainData(true)
						} else {
							self.$Utils.showToast(res.msg, 'none', 1000)
						};
						uni.setStorageSync('canClick', true);	
					};
					self.$apis.messageAdd(postData, callback);
				}else{
					self.showModel()
				}
			},
			
			replay(index){
				const self = this;
				self.focus = true;
				self.submitData.relation_user = self.mainData[index].user_no;
				console.log('self.mainData[index].id',self.mainData[index].id)
				self.placeholderText = '回复 '+self.mainData[index].name
			},
			
			getOrginData() {
				var self = this;
				var postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					id:self.message_id
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.orginData = res.info.data[0]
					};
					self.$Utils.finishFunc('getOrginData');
				};
				self.$apis.messageGet(postData, callback);
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
				postData.searchItem = {
					relation_message:self.message_id,
					//relation_user:['in',['']]
				};
				/* postData.getAfter = {
					child:{
						tableName:'Message',
						middleKey:'id',
						key:'relation_message',
						searchItem:{
							status:1
						},
						condition:'='
					}
				}; */
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
			},
			
		}
	}
</script>

<style>
page{background-color: #fafafa;}
</style>
<style scoped>
/* .this{background-color: #fafafa;min-height: 100%;} */
input{width: 100%;height: 60rpx;background-color: #fafafa;border-radius: 30rpx;}
</style>