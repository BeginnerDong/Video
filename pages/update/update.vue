<template>
	<view>
		
		<view class="p-3">
			<textarea value="" placeholder="添加合适的描述,作品能获得更多推荐~" />
			
			<view class="flexX">
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image">
					<image src="../../static/images/xiaoxi-img1.png"></image>
				</view>
				<view class="bg-f7 b-e1 radius10 font-26 color9 flex4 image">
					<image src="../../static/images/release-icon.png" class="xj-icon mb-3"></image>
					<view>视频/图片</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="pb-2 bg-f5" v-show="type==0">
			<view class="flex1 px-3 py-4 font-30 bg-white">
				<view>分类</view>
				<view class="color9 flex"
				@click="Router.navigateTo({route:{path:'/pages/updateClass/updateClass'}})">
					<view>选择分类</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
			</view>
		</view>
		
		<view class="p-3 font-24 color6" v-show="type==0">视频上传之后，将由后台进行审核，审核通过后进行发布</view>
		<view class="p-3 font-24 color6" v-show="type==1">视频上传之后，将由后台进行审核，审核通过后将得到悬赏金</view>
		
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-show="type==0">
			<view class="btn80-c colorf Mgb">发布</view>
		</view>
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-show="type==1">
			<view class="btn80-c colorf Mgb">确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				type:0
			}
		},
		onLoad(options) {
			const self = this;
			if(options.type){
				self.type = options.type;
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
textarea{width: 100%;height: 250rpx;padding: 0;}
.image{width: 180rpx;height: 260rpx;margin-right: 20rpx;flex-shrink: 0;}
</style>
