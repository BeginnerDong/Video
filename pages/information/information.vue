<template>
	<view class="px-3">
		
		<view class="py-3 flex bB-f5">
			<view class="flex-1 color6">头像</view>
			<image @click="upLoadImg('mainImg')" v-if="submitData.mainImg.length>0" :src="submitData.mainImg[0].url" class="wh80 mx-2"></image>
			<image @click="upLoadImg('mainImg')" v-else src="../../static/images/about-img.png" class="wh80 mx-2"></image>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5">
			<view class="color6">昵称</view>
			<!-- <view class="flex-1 text-r px-2">喷火娃</view> -->
			<input class="flex-1 text-r px-2 font-28" v-model="submitData.name" placeholder="请输入" @confirm="userInfoUpdate"/>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5">
			<view class="color6">电话</view>
			<input class="flex-1 text-r px-2 font-28" v-model="submitData.phone" placeholder="请输入" @confirm="userInfoUpdate"/>
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		<view class="py-4 flex bB-f5">
			<view class="color6">个性签名</view>
			<input class="flex-1 text-r px-2 font-28" v-model="submitData.passage1" placeholder="请输入" @confirm="userInfoUpdate"/>
			<!-- <view class="flex-1 text-r px-2">请输入</view> -->
			<image src="../../static/images/release-icon1.png" class="R-icon"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					mainImg:[],
					name:'',
					passage1:'',
					phone:''
				},
			}
		},
		
		onLoad() {
			const self = this;
			self.getUserInfoData();
		},
		
		methods: {
			
			
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					user_no: uni.getStorageSync('user_info').user_no
				};
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						self.submitData.mainImg = self.userInfoData.mainImg;
						self.submitData.name = self.userInfoData.name;
						self.submitData.passage1 = self.userInfoData.passage1;
						self.submitData.phone = self.userInfoData.phone;
					};
				};
				self.$apis.userInfoGet(postData, callback);
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
						console.log(self.submitData)
						self.userInfoUpdate()
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						for (var i = 0; i < tempFilePaths.length; i++) {
							var file = res.tempFiles[i];
							console.log('res.tempFiles[i].path',res.tempFiles[i].path)
							var obj = res.tempFiles[i].path.lastIndexOf(".");
							var ext = 'jpg';
							console.log(callback)
							self.$Utils.uploadFile(tempFilePaths[i], 'file', {
								tokenFuncName: 'getUserToken',ext:ext,md5:'md5',totalSize:file.size,start:0,chunkSize:file.size,originName:'headImg'
							}, callback)
						}
					},
					fail: function(err) {
						uni.hideLoading();
					},			
				})			
			},
			
			
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.noLoading = true;
				const callback = (data) => {
					uni.hideKeyboard();
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('更新成功', 'none', 1000)
						setTimeout(function() {
							self.getUserInfoData()
						}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
		}
	}
</script>

<style scoped>

</style>
