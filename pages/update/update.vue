<template>
	<view>
		
		<view class="p-3">
			<textarea v-model="submitData.title" placeholder="添加合适的描述,作品能获得更多推荐~" />
			
			<view class="flexX">
				<!-- <view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image" @click="ViewImage('../../static/images/xiaoxi-img1.png')">
					<image src="../../static/images/xiaoxi-img1.png" ></image>
				</view> -->
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image" @click="upLoadVideo('video')" v-if="submitData.video.length==0">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-3"></image>
					<view>视频</view>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image"  v-if="submitData.video.length>0">
					<video style="width: 100%;height: 100%;" :src="submitData.video&&submitData.video[0]?submitData.video[0].url:''"></video>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image" @click="upLoadImg('mainImg')" v-if="submitData.mainImg.length==0">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-3"></image>
					<view>封面图</view>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image"  v-if="submitData.mainImg.length>0">
					<image style="width: 100%;height: 100%;" :src="submitData.mainImg&&submitData.mainImg[0]?submitData.mainImg[0].url:''"></image>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="pb-2 bg-f5">
			<view class="flex1 px-3 py-4 font-30 bg-white">
				<view>分类</view>
				<view class="color9 flex"
				@click="Router.navigateTo({route:{path:'/pages/updateClass/updateClass'}})">
					<view>{{chooseText!=''?chooseText:'选择分类'}}</view>
					<image src="../../static/images/release-icon1.png"  class="R-icon ml-2"></image>
				</view>
			</view>
		</view>
		
		<view class="p-3 font-24 color6">视频上传之后，将由后台进行审核，审核通过后进行发布</view>
		
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
					type:1,
					title:'',
					menu_id:1,
					mainImg:[],
					video:[],
					tag:[],
					check_status:0
				},
				chooseText:''
			}
		},
		onLoad(options) {
			const self = this;
			
		},
		onShow() {
			const self = this;
			if(uni.getStorageSync('chooseId')){
				self.submitData.tag = uni.getStorageSync('chooseId')
				self.chooseText = uni.getStorageSync('chooseText').join(',')
			}
		},
		methods: {
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(self.submitData.title == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写标题', 'none')
					return
				};
				if(self.submitData.mainImg.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传封面图', 'none')
					return
				};
				if(self.submitData.video.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传视频', 'none')
					return
				};
				if(self.submitData.tag.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择标签', 'none')
					return
				};
				self.articleAdd();
			},
			
			articleAdd(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (res) => {
					if (res.solely_code==100000) {
						uni.setStorageSync('canClick', true);
						uni.removeStorageSync('chooseId');
						uni.removeStorageSync('chooseText');
						self.$Utils.showToast('发布成功，系统审核后展示', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.articleAdd(postData, callback);
			},
			
			upLoadVideo(type) {
				const self = this;			
				
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						self.submitData[type] = [];
						self.submitData[type].push({url:res.info.url,type:'vedio'})
						uni.hideLoading();
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				uni.chooseVideo({
					count: 1,
					success: function(res) {
						var tempFilePath = res.tempFilePath;
						console.log('res11',res)
						
						var file = res;
						var ext = 'mp4';
						console.log(callback)
						self.$Utils.uploadFile(tempFilePath, 'file', {
							tokenFuncName: 'getUserToken',ext:ext,md5:'md5',totalSize:file.size,start:0,chunkSize:file.size,originName:''
						}, callback)
						
					},
					fail: function(err) {
						uni.hideLoading();
					},			
				})			
			},
			
			upLoadImg(type) {
				const self = this;			
				uni.showLoading({
					mask: true,
					title: '上传中',
				});
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
			
			ViewImage(url){
				const self = this;
				console.log(222)
				uni.previewImage({
					urls:[url],
					current:url
				})
			},
		}
	}
</script>

<style scoped>
textarea{width: 100%;height: 250rpx;padding: 0;}
.image{width: 180rpx;height: 260rpx;margin-right: 20rpx;flex-shrink: 0;}
</style>
