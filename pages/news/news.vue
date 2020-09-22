<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="bB-e1 p-s top-0">
			<view class="list z10">
				<view class="li" :class="liCurr==0?'on1':''" @click="changeLi(0)">点赞</view>
				<view class="li" :class="liCurr==1?'on1':''" @click="changeLi(1)">评论</view>
				<view class="li" :class="liCurr==2?'on1':''" @click="changeLi(2)">收藏</view>
				<view class="li" :class="liCurr==3?'on1':''" @click="changeLi(3)">打赏</view>
			</view>
		</view>
		
		<!-- 点赞 、收藏、打赏-->
		<view v-show="liCurr!=1">
			<view class="d-flex pt-3 px-3" v-for="(item,index) in 2" :key="index"
			@click="Router.navigateTo({route:{path:'/pages/newsReply/newsReply'}})">
				<image src="../../static/images/details-img1.png" class="wh80"></image>
				<view class="flex-1 ml-2 pb-3 bB-e1">
					<view class="">
						<view class="font-30 line-h pt-1" v-show="liCurr==0">
							<text class="color pr-2">竹蜻蜓</text> 赞了这条视频
						</view>
						<view class="font-30 line-h pt-1" v-show="liCurr==2">
							<text class="color pr-2">竹蜻蜓</text> 收藏了这条视频
						</view>
						<view class="font-30 line-h pt-1" v-show="liCurr==3">竹蜻蜓</view>
						<view class="font-24 color6 pt-2 line-h">2020.08.23 21:09</view>
					</view>
					<view class="font-30 pt-3" v-show="liCurr==3">通过该视频向您打赏了 <text class="colorR">10元</text></view>
					<view class="bg-f7 mt-2 flex">
						<image src="../../static/images/details-img2.png" class="wh140"></image>
						<view class="px-2 py-3 flex-1 avoidOverflow2">
							带你走进古色古香的世界，领略世界的美
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论 -->
		<view v-show="liCurr==1">
			<view class="d-flex pt-3 px-3" v-for="(item,index) in 2" :key="index"
			@click="Router.navigateTo({route:{path:'/pages/newsReply/newsReply'}})">
				<image src="../../static/images/details-img1.png" class="wh80"></image>
				<view class="flex-1 ml-2 pb-3 bB-e1">
					<view class="flex1">
						<view class="flex-1">
							<view class="font-30 line-h pt-1">竹蜻蜓</view>
							<view class="font-24 color6 pt-2 line-h">2020.08.23 21:09</view>
						</view>
						<view class="btn60-M">回复</view>
					</view>
					<view class="font-30 pt-3">愿每天都有人爱，有所期待</view>
					<view class="bg-f7 flex mt-2">
						<image src="../../static/images/details-img2.png" class="wh140"></image>
						<view class="px-2 py-3 flex-1 avoidOverflow2">
							带你走进古色古香的世界，领略世界的美
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view style="height: 100rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/square/square'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar3-a.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<image src="../../static/images/nabar4.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0
			}
		},
		methods: {
			
			changeLi(i){
				const self = this;
				self.liCurr = i;
			}
			
		}
	}
</script>

<style scoped>
.li{font-size: 32rpx;padding: 0;line-height: 1;width: 25%;line-height: 100rpx;}
.list{padding: 0 125rpx;}
.list .on1{font-size: 36rpx;font-weight: bold;}

.btn60-M{border-color: #e1e1e1;border-radius: 30rpx;width: 100rpx;margin: 0;}
</style>
