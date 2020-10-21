<template>
	<view>
		
		<view class="p-3">
			<textarea v-model="submitData.description" placeholder="添加合适的描述,让作品满足需求~" />
			
			<view class="flexX">
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image" v-if="submitData.mainImg.length>0">
					<video style="width: 100%;height: 100%;" :src="submitData.mainImg&&submitData.mainImg[0]?submitData.mainImg[0].url:''"></video>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image"  @click="upLoadVideo('mainImg')" v-if="submitData.mainImg.length==0">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-3"></image>
					<view>视频</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		
		<view class="p-3 font-24 color6">视频上传之后，将由后台进行审核，审核通过后将得到悬赏金</view>

		<view class="px-3 py-2 bT-e1 p-fX bottom-0" @click="Utils.stopMultiClick(submit)">
			<view class="btn80-c colorf Mgb">确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					description:'',
					mainImg:[],
					relation_table:'Activity',
					type:1,
					relation_id:'',
					behavior:0
				},
				Utils:this.$Utils
			}
		},
		onLoad(options) {
			const self = this;
			self.submitData.relation_id = options.id
		},
		methods: {
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(self.submitData.description == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写描述', 'none')
					return
				};
				
				if(self.submitData.mainImg.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传视频', 'none')
					return
				};
				
				self.messageAdd();
			},
			
			messageAdd(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getUserToken';
				
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (res) => {
					if (res.solely_code==100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('投稿成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.messageAdd(postData, callback);
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
						console.log(222)
						uni.hideLoading();
					},			
				})			
			},
			
		}
	}
</script>

<style scoped>
textarea{width: 100%;height: 250rpx;padding: 0;}
.image{width: 180rpx;height: 260rpx;margin-right: 20rpx;flex-shrink: 0;}
</style>
