<template>
	<view>
		<view style="height:var(--status-bar-height)"></view>
		<view class="flex1 m-3">
			<view class="h60 flex-1 radius30 bB-e1 mr-4 flex px-3"
			@click="Router.navigateTo({route:{path:'/pages/search/search'}})">
				<image src="../../static/images/home-icon5.png" class="wh28 mr-1"></image>
				<view class="font-26 color9 flex-1">搜索感兴趣的视频</view>
			</view>
			<image src="../../static/images/home-icon6.png" class="fs-icon"
			@click="Router.navigateTo({route:{path:'/pages/update/update'}})"></image>
		</view>
		
		<!-- banner -->
		<view>
		    <customSwiper :swiper-list="swiperList" />
		</view>
		
		<!-- 金刚区 -->
		<view class="font-26 line-h flex2 py-3">
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/classify/classify?type=0'}})">
				<image src="../../static/images/home-icon3.png" class="icon1"></image>
				<view class="pt-3">推荐视频</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/classify/classify?type=1'}})">
				<image src="../../static/images/home-icon2.png" class="icon2"></image>
				<view class="pt-3">热门视频</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/classify/classify?type=3'}})">
				<image src="../../static/images/home-icon1.png" class="icon3"></image>
				<view class="pt-3">优享视频</view>
			</view>
			<view class="flex4"
			@click="Router.navigateTo({route:{path:'/pages/classify/classify?type=03'}})">
				<image src="../../static/images/home-icon.png" class="icon4"></image>
				<view class="pt-3">类别视频</view>
			</view>
		</view>
		
		<!-- 列表 -->
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
		
		
		
		<view style="height: 100rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item on">
				<image src="../../static/images/nabar1-a.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/square/square'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/news/news'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<image src="../../static/images/nabar4.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import customSwiper from '../../components/blackmonth-swiper/index'
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show: false,
				swiperList: [{
				                type: 'image',
				                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				            }, {
				                type: 'image',
				                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				            }, {
				                type: 'image',
				                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				            }]
				
			}
		},
		components:{
			customSwiper
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				self.$apis.orderGet(postData, callback);
			}
		}
	};
</script>

<style scoped>
.icon1{width: 66rpx;height: 65rpx;}
.icon2{width: 66rpx;height: 62rpx;}
.icon3{width: 70rpx;height: 60rpx;}
.icon4{width: 65rpx;height: 61rpx;}
</style>