<template>
	<view>
		
		<view class="head pr-2 bg-white p-s top-0">
			<view style="height:var(--status-bar-height)"></view>
			<view class="p-r py-3">
				<view class="p-3 p-a z100 top-0" @click="Router.back(1)">
					<image src="../../static/images/back.png" class="back"></image>
				</view>
				<view class="flexX list z10 p-aXY bottom-0">
					<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">推荐</view>
					<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">热门</view>
					<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">优享</view>
					<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">类别</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="flex1 px-2 mt-2" v-show="liCurr != 3">
			
			<view class="radius10 overflow-h bB-e1 mb-2 p-r box" v-for="v in 3" :key='v'
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
				<view class="boxMask p-aXY flex4">
					<image src="../../static/images/classification-icon.png" class="gb-icon mb-4"></image>
					<view class="btn50-c bg-white">购买会员</view>
				</view>
			</view>
			
		</view>
		
		
		<!-- 类别 -->
		<view class="flex flex-wrap font-26 color8" v-show="liCurr == 3">
			<view class="flex4 py-4 classItem" v-for="(item,index) in mainData" :key="index"
			@click="Router.navigateTo({route:{path:'/pages/category/category'}})">
				<image :src="item.url" class="classIcon mb-1"></image>
				<view>{{item.title}}</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				mainData:[
					{url:'../../static/images/category-icon6.png',title:'电视剧'},
					{url:'../../static/images/category-icon7.png',title:'电影'},
					{url:'../../static/images/category-icon8.png',title:'漫画'},
					{url:'../../static/images/category-icon11.png',title:'专栏'},
					{url:'../../static/images/category-icon10.png',title:'直播'},
					{url:'../../static/images/category-icon5.png',title:'课堂'},
					{url:'../../static/images/category-icon9.png',title:'音乐'},
					{url:'../../static/images/category-icon2.png',title:'舞蹈'},
					{url:'../../static/images/category-icon4.png',title:'游戏'},
					{url:'../../static/images/category-icon3.png',title:'数码'},
					{url:'../../static/images/category-icon1.png',title:'生活'},
					{url:'../../static/images/category-icon.png',title:'娱乐'}
				]
			}
		},
		onLoad(options) {
			const self = this;
			if(options){
				self.liCurr = options.type;
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
.li{font-size: 32rpx;padding: 0;line-height: 1;width: 25%;}
.list{padding: 0 168rpx;}
.list .on{font-size: 42rpx;font-weight: bold;}
.list .on::before{width: 0;height: 0;}

.classItem{width: 25%;}
.classIcon{width: 66rpx;height: 60rpx;}

.btn50-c{width: 180rpx;color: #222;margin-top: 40rpx;font-size: 28rpx;}
</style>
