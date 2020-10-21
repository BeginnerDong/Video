<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="z100 px-3 py-2 bB-f5 bg-white p-s top-0 flex1">
			<view class="w110" @click="Router.back(1)">取消</view>
			<view class="font-38">回复评论</view>
			<view class="btn60-c Mgb colorf" @click="addMessage">发送</view>
		</view>
		
		<textarea adjust-position="false" v-model="submitData.description" :placeholder="'回复@'+name" />
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					type:2,
					description:'',
					relation_table:'Article',
					relation_id:'',
					relation_message:0,
					thirdapp_id:2
				},
				name:''
			}
		},
		onLoad(options) {
			const self = this;
			self.submitData.relation_id = options.artId;
			self.submitData.relation_message = options.messageId;
			self.name = options.name;
		},
		methods: {
			
			addMessage(index) {
				const self = this;
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
						self.$Utils.showToast('回复成功', 'none', 1000);
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.messageAdd(postData, callback);
				
			},
			
		}
	}
</script>

<style scoped>
.w110{width: 110rpx;}
.btn60-c{width: 110rpx;margin: 0;}

textarea{width: 100%;height: 1000rpx;padding: 40rpx 30rpx;font-size: 26rpx;}
</style>
