<template>
	<view>
		
		<view class="video p-r">
			<video src="" controls></video>
			<view class="p-aXY">
				<image src="../../static/images/squaredetails-img.png" mode=""></image>
			</view>
		</view>
		
		<view class="px-3">
			<view class="font-32 font-w py-4">KK全民挑战：第七届老师校园青歌赛</view>
			
			<!-- 投视频 -->
			<view  v-if="type==0">
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">需求主题</view>
					</view>
					<view class="font-26 pb-4">
						写出你上导航打发时间到时看是看大V顺丰速递卡的很科学从
					</view>
				</view>
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon1.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">需求时间</view>
					</view>
					<view class="font-26 pb-4">
						2020年8月30日 10点-2020年8月31日 10点
					</view>
				</view>
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon2.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">创作激励</view>
					</view>
					<view class="font-26 pb-4">
						选中视频将悬赏500灯泡
					</view>
				</view>
			</view>
			
			<!-- 已报名 -->
			<view v-else>
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">主题</view>
					</view>
					<view class="font-26 pb-4">
						写出你上导航打发时间到时看是看大V顺丰速递卡的很科学从写出你上导航打发时间到时看是看大V顺丰速递卡的很科学从写出你上导航打发时间
					</view>
				</view>
				<view>
					<view class="flex py-2">
						<view class="wh65 flex4 radius-5 shadowM">
							<image src="../../static/images/squaredetails-icon2.png" class="wh30"></image>
						</view>
						<view class="font-30 pl-1">打赏</view>
					</view>
					<view class="font-26 pb-4">
						观看次视频500灯泡
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="height: 120rpx;"></view>
		<!-- 投视频 -->
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-if="type==0">
			<view class="btn80-c colorf Mgb"
			@click="Router.navigateTo({route:{path:'/pages/update/update?type=1'}})">投视频</view>
		</view>
		<!-- 已报名 -->
		<view class="px-3 py-2 bT-e1 p-fX bottom-0" v-else>
			<view class="btn80-c colorf Mgb"
			@click="Router.navigateTo({route:{path:'/pages/reward/reward'}})">打赏</view>
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
.video,video{width: 100%;height: 400rpx;}
.wh65{width: 60rpx;height: 50rpx;}
</style>
