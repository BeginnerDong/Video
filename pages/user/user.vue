<template>
	<view>
		
		<view style="height:var(--status-bar-height)"></view>
		<view class="p-s top-0">
			<image src="../../static/images/my-icon.png" class="cd-icon m-3" @click="isShow"></image>
		</view>
		
		<view class="flex mx-3 bB-e1 py-3">
			<image src="../../static/images/fans-img.png" class="wh120 radius-5"></image>
			<view class="flex-1 pl-2">
				<view class="flex pb-1">
					<view class="font-32 pr-1">竹蜻蜓</view>
					<view class="font-20 vip flex0">
						<image src="../../static/images/my-icon1.png" class="vip-icon mr"></image>
						<view>会员</view>
					</view>
				</view>
				<view class="font-22 color9 avoidOverflow2">让一个人置身于变幻无穷的环境之中，让她与数不尽或近或远的任务</view>
			</view>
		</view>
		
		<view class="font-24 color9 flex2 line-h py-3">
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/follow/follow'}})">
				<view class="font-32 color2 font-w pb-2">55</view>
				<view>关注</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/fans/fans'}})">
				<view class="font-32 color2 font-w pb-2">55</view>
				<view>粉丝</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/collection/collection'}})">
				<view class="font-32 color2 font-w pb-2">55</view>
				<view>收藏</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view>
			<view class="font-32 px-3 line-h pt-3 pb-2">我的作品（3）</view>
			
			<view class="flex1 px-2">
				
				<view class="radius10 overflow-h bB-e1 mb-2 box" v-for="v in 3" :key='v'
				@click="Router.navigateTo({route:{path:'/pages/detail/detail'}})">
					<view class="p-r">
						<image src="../../static/images/home-img1.png" class="img"></image> 
						<view class="colorf font-20 p-1 flex p-aX txt">
							<image src="../../static/images/home-icon4.png" class="sp-icon"></image>
							<view class="flex-1 px-1">1.3万</view>
							<view>2:40</view>
						</view>
					</view>
					<view class="px-1 py-2">
						<view class="avoidOverflow2">带你进去古色古香的世界，林略世界的美</view>
						<view class="flex font-26 color6 pt-3">
							<image src="../../static/images/home-img.png" class="wh44 radius-5 mr-1"></image>
							<view>哆啦A梦</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<!-- 侧边栏 -->
		<view class="bg-mask flex" v-show="is_show">
			<view class="bg-white h-100 pt-5 px-3 maskBox animated" :class="is_show?'fadeInLeft':''">
				<view style="height:var(--status-bar-height)"></view>
				<view class="flex bB-e1 py-3">
					<image src="../../static/images/fans-img.png" class="wh120 radius-5"></image>
					<view class="flex-1 pl-2">
						<view class="flex pb-1">
							<view class="font-32 pr-1">竹蜻蜓</view>
							<view class="font-20 vip flex0">
								<image src="../../static/images/my-icon1.png" class="vip-icon mr"></image>
								<view>会员</view>
							</view>
						</view>
						<view class="font-22 color9 avoidOverflow2">让一个人置身于变幻无穷的环境之中，让她与数不尽或近或远的任务</view>
					</view>
				</view>
				<view class="ye font-w colorf py-3 px-2 mb-3 radius10-T flex1"
				@click="Router.navigateTo({route:{path:'/pages/balance/balance'}})">
					<image src="../../static/images/my-icon2.png" class="ye-icon"></image>
					<view class="flex-1 px-1">余额：<text class="font-32">2562.00</text></view>
					<image src="../../static/images/my-icon3.png" class="R mr-1"></image>
				</view>
				
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/information/information'}})">
					<image src="../../static/images/my-icon7.png" class="icon1"></image>
					<view class="flex-1 font-30 px-3">个人资料</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/aboutUs/aboutUs'}})">
					<image src="../../static/images/my-icon4.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">关于我们</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/idea/idea'}})">
					<image src="../../static/images/my-icon6.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">意见反馈</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
				<view class="flex1 py-3 line-h"
				@click="Router.navigateTo({route:{path:'/pages/agreement/agreement'}})">
					<image src="../../static/images/my-icon5.png" class="wh36"></image>
					<view class="flex-1 font-30 px-3">平台协议</view>
					<image src="../../static/images/release-icon1.png" class="R-icon mr-1"></image>
				</view>
			</view>
			<view class="flex-1 h-100" @click="isShow"></view>
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
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/news/news'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar4-a.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show:false
			}
		},
		methods: {
			
			isShow(){
				const self = this;
				self.is_show = !self.is_show;
			}
			
		}
	}
</script>

<style scoped>
.cd-icon{width: 44rpx;height: 34rpx;}
.vip-icon{width: 22rpx;height: 16rpx;}
.vip{line-height: 30rpx;background-color: #FFE650;width: 90rpx;border-radius: 15rpx;}

.maskBox{width: 650rpx;}
.ye{background-image: linear-gradient(to bottom,#3A3A3A,#141414);}
.ye-icon{width: 37rpx;height: 48rpx;}
.R{width: 13rpx;height: 20rpx;}
.icon1{width: 36rpx;height: 30rpx;}
</style>
