<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="head flex1 pr-2 bB-e1 bg-white">
			<view class="px-2 py-3" @click="Router.back(1)">
				<image src="../../static/images/back.png" class="back"></image>
			</view>
			<view class="btn50-c Mgb colorf" @click="set">完成</view>
		</view>
		
		<view class="p-3 flex flex-wrap">
			<block v-for="(item,index) in mainData" :key="index">
				<view class="tag" 
				:class="Utils.inArray(item.id,chooseId)!=-1?'on':''"
				@click="choose(index)"
				>{{item.title}}</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				chooseId:[],
				chooseText:[],
				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			if(uni.getStorageSync('chooseId')){
				self.chooseId = uni.getStorageSync('chooseId');
				self.chooseId = uni.getStorageSync('chooseText');
			}
			
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			set(){
				const self = this;
				uni.setStorageSync('chooseId',self.chooseId);
				uni.setStorageSync('chooseText',self.chooseText);
				uni.navigateBack({
					delta:1
				})
			},
			
			choose(index) {
				const self = this;
				
				var position = self.chooseId.indexOf(self.mainData[index].id);
				if (position >= 0) {
					self.chooseId.splice(position, 1);
					self.chooseText.splice(position, 1);
				} else {
					self.chooseId.push(self.mainData[index].id);
					self.chooseText.push(self.mainData[index].title);
					//self['choose'+type+'Title'].push(self[type+'Data'][index].title);
				};
				console.log(self.chooseId)
			},
			
			active(index){
				const self = this;
				self.activeIndex = index;
			},
			
			getMainData() {
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
						self.mainData = res.info.data
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.btn50-c{width: 100rpx;margin: 0;}
.tag{margin-bottom: 40rpx;width: 160rpx;text-align: center;padding: 0;margin-right: 16rpx;font-size: 24rpx;line-height: 72rpx;}
.tag:nth-child(4n){margin-right: 0;}
.on{background-color: #262626;color: #fff;}
</style>
