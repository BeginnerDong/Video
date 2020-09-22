<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="head flex1 pr-2 bB-e1 bg-white">
			<view class="px-2 py-3" @click="Router.back(1)">
				<image src="../../static/images/back.png" class="back"></image>
			</view>
			<view class="btn50-c Mgb colorf">完成</view>
		</view>
		
		<view class="p-3 flex flex-wrap">
			<block v-for="(item,index) in classData" :key="index">
				<view class="tag" :class="activeIndex==index?'on':''" @click="active(index)">{{item}}</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				activeIndex:0,
				classData:['电视剧','电影','漫画','美妆','游戏','舞蹈']
			}
		},
		methods: {
			
			active(index){
				const self = this;
				self.activeIndex = index;
			}
			
		}
	}
</script>

<style scoped>
.btn50-c{width: 100rpx;margin: 0;}
.tag{margin-bottom: 40rpx;width: 160rpx;text-align: center;padding: 0;margin-right: 19rpx;font-size: 24rpx;line-height: 72rpx;}
.tag:nth-child(4n){margin-right: 0;}
.on{background-color: #262626;color: #fff;}
</style>
