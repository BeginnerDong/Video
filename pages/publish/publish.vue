<template>
	<view>

		<view class="font-30 mx-3 py-4 bB-f5 flex1">
			<view>标题</view>
			<input type="text" v-model="submitData.name" value="" placeholder="输入标题" />
		</view>

		<view class="p-3">
			<textarea v-model="submitData.description" placeholder="输入你的创作需求..." />

			<view class="flexX">
				<view class="bg-f7 b-e1 radius10 font-26 color9 wh160 flex4 image" v-if="submitData.mainImg.length>0">
					<image :src="submitData.mainImg&&submitData.mainImg[0]?submitData.mainImg[0].url:''"></image>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 wh160 flex4 image" @click="upLoadImg('mainImg')" v-if="submitData.mainImg.length==0">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-1"></image>
					<view>图片</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<picker mode="date" @change="changeStart">
			<view class="flex1 bB-f5 mx-3 py-4 font-30">
				<view>开始时间</view>
				<view class="color9 flex">
					<view>{{start==''?'选择时间':start}}</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
			</view>
		</picker>
		<picker mode="date" @change="changeEnd" :start="today">
			<view class="flex1 bB-f5 mx-3 py-4 font-30">
				<view>结束时间</view>
				<view class="color9 flex">
					<view>{{end==''?'选择时间':end}}</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
			</view>
		</picker>
		<view class="flex1 bB-f5 mx-3 py-4 font-30">
			<view>虚拟充值币</view>
			<input type="text" v-model="submitData.score" placeholder="输入虚拟充值币" placeholder-style="color:#999;" />
		</view>
		
		
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" @click="Utils.stopMultiClick(submit)">
			<view class="btn80-c colorf Mgb">发布</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				submitData:{
					name:'',
					description:'',
					start_time:'',
					end_time:'',
					score:'',
					mainImg:[],
					choice_status:0,
					
				},
				today:'',
				start:'',
				end:''
			}
		},
		onLoad() {
			const self = this;
			var day2 = new Date();
			day2.setTime(day2.getTime());
			var today = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
		},
		methods: {
			
			changeStart(e){
				const self = this;
				console.log(e)
				self.start = e.detail.value;
				
				self.submitData.start_time = self.$Utils.timeToTimestamp(self.start)*1000
			},
			
			changeEnd(e){
				const self = this;
				console.log(e)
				self.end = e.detail.value;
				self.submitData.end_time = self.$Utils.timeToTimestamp(self.end)*1000
			},
			
			upLoadImg(type) {
				const self = this;			
				
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						self.submitData[type] = [];
						self.submitData[type].push({url:res.info.url,type:'image'})
						uni.hideLoading();
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						console.log('res11',res)
						for (var i = 0; i < tempFilePaths.length; i++) {
							var file = res.tempFiles[i];
							console.log('res.tempFiles[i].path',res.tempFiles[i].path)
							var obj = res.tempFiles[i].path.lastIndexOf(".");
							var ext = 'jpg';
							console.log(callback)
							self.$Utils.uploadFile(tempFilePaths[i], 'file', {
								tokenFuncName: 'getUserToken',ext:ext,md5:'md5',totalSize:file.size,start:0,chunkSize:file.size,originName:''
							}, callback)
						}
					},
					fail: function(err) {
						uni.hideLoading();
					},			
				})			
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(self.submitData.name == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写标题', 'none')
					return
				};
				if(self.submitData.description.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写需求', 'none')
					return
				};
				if(self.submitData.mainImg.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传封面图', 'none')
					return
				};
				if(self.submitData.start_time.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择开始时间', 'none')
					return
				};
				if(self.submitData.end_time.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择结束时间', 'none')
					return
				};
				if(self.submitData.score.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入悬赏金额', 'none')
					return
				};
				self.activityAdd();
			},
				
			activityAdd(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.saveAfter = [
					{
						tableName: 'FlowLog',
						FuncName: 'add',
						data: {
							type: 3,
							count:-self.submitData.score,
							trade_info:'发布活动',
							account:1,
							thirdapp_id:2,
							user_no:uni.getStorageSync('user_info').user_no
						}
					}
				];	
				const callback = (res) => {
					if (res.solely_code==100000) {
						uni.setStorageSync('canClick', true);
	
						self.$Utils.showToast('发布成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.activityAdd(postData, callback);
			},
				
		}
	}
</script>

<style scoped>
input{flex: 1;font-size: 30rpx;text-align: right;}
textarea{width: 100%;height: 250rpx;padding: 0;}
.image{margin-right: 20rpx;flex-shrink: 0;}
</style>
