<template>
	<view>
		
		<view class="py-4 mx-3 flex font-30 bB-f5">
			<image src="../../static/images/aboutus-icon1.png" class="phone mr-3"></image>
			<view>{{mainData.phone}}</view>
		</view>
		<view class="py-4 mx-3 flex font-30">
			<image src="../../static/images/aboutus-icon.png" class="phone mr-3"></image>
			<view>{{mainData.description}}</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3">
			<view class="font-30 py-3 color9">公司简介</view>
			<view class="content" style="padding:0" v-html="mainData.content">
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:{}
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.phone{width: 28rpx;height: 33rpx;}
</style>
