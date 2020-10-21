<template>
	<view>
		
		<textarea v-model="content" placeholder="请描述你遇到的问题或者给我们的建议..." />
		<view class="f5Bj-H20"></view>
		
		<view class="px-3 py-2 p-fX bottom-0 bT-e1" @click="messageAdd()">
			<view class="btn80-c Mgb colorf">确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		methods: {
			
			
			messageAdd() {
				var self = this;
				if(self.content==''){
					self.$Utils.showToast('请填写...','none');
					return
				};
				var postData = {};
				postData.tokenFuncName = 'getUserToken';
				postData.data  = {
					type:3,
					content:self.content,
					user_no:uni.getStorageSync('user_info').user_no
				};
				var callback = function(res) {
					if (res.solely_code == 100000) {
						self.$Utils.showToast('提交成功','none');
						self.content = ''
					};
				};
				self.$apis.messageAdd(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
textarea{height: 530rpx;width: 100%;font-size: 28rpx;padding: 30rpx;}
</style>
