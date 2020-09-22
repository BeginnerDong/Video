<template>
	<view>
		
		<video src="" controls></video>
		
		<view class="px-3">
			<view class="py-3 flex1">
				<image src="../../static/images/details-img1.png" class="wh70 radius-5"></image>
				<view class="flex-1 pl-2">
					<view class="font-26">喜洋洋</view>
					<view class="font-22 color9">2020.08.23 12:09:09</view>
				</view>
				<view class="btn60-c Mgb flex0">
					<image src="../../static/images/fans-icon.png" class="wh24 mr-1"></image>
					<view>关注</view>
				</view>
			</view>
			<view class="font-32">今日，一段“萌娃气的落泪”的视频萌翻了无数网友，用表情演绎了什么是咬牙切齿</view>
			<view class="flex pt-1">
				<view class="sign">电视剧</view>
				<view class="color8 font-20 p-1 flex pl-2">
					<image src="../../static/images/details-icon3.png" class="sp-icon"></image>
					<view class="flex-1 px-1">1.3万</view>
				</view>
			</view>
			<view class="font-20 color9 line-h flex2 pt-3 bB-e1 pb-4">
				<view class="flex4">
					<image src="../../static/images/details-icon7.png" class="icon1"></image>
					<view class="pt-2">4.1万</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/details-icon6.png" class="icon2"></image>
					<view class="pt-2">1200</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/details-icon5.png" class="icon2"></image>
					<view class="pt-2">120</view>
				</view>
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/reward/reward'}})">
					<image src="../../static/images/details-icon4.png" class="icon3"></image>
					<view class="pt-2">打赏</view>
				</view>
			</view>
			<view class="py-3 flexX">
				<view class="tag">电视剧</view>
				<view class="tag">电影</view>
				<view class="tag">漫画</view>
				<view class="tag">专栏</view>
				<view class="tag">娱乐</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<!-- 评论 -->
		<view class="px-3 pb-3 font-26">
			
			<view class="d-flex pt-3">
				<image src="../../static/images/details-img1.png" class="wh80"></image>
				<view class="flex-1 pl-2 bB-e1">
					<view class="color6">大金子</view>
					<view class="font-30 pt-2 line-h">武汉的藕塘真的是一绝</view>
					<view class="p-2 bg-f7 mt-2">
						<view>
							<text class="color">长歌2571</text>：
							武汉的藕塘真的是一绝武汉的藕塘真的是一绝武汉的藕塘真的是一绝武汉的藕塘真的是一绝
						</view>
						<view class="color pt-1"
						@click="Router.navigateTo({route:{path:'/pages/reply/reply'}})">共4条回复 ></view>
					</view>
					<view class="flex1 font-24 color9 py-3">
						<view>7-26 08:17</view>
						<image src="../../static/images/details-icon8.png" class="pl-icon"></image>
					</view>
				</view>
			</view>
			<view class="d-flex pt-3">
				<image src="../../static/images/details-img1.png" class="wh80"></image>
				<view class="flex-1 pl-2 bB-e1">
					<view class="color6">大金子</view>
					<view class="font-30 pt-2 line-h">武汉的藕塘真的是一绝</view>
					<view class="flex1 font-24 color9 py-3">
						<view>7-26 0 8:17</view>
						<image src="../../static/images/details-icon8.png" class="pl-icon"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
video{width: 100%;height: 400rpx;}
.btn60-c{width: 130rpx;margin: 0;}

.icon1{width: 40rpx;height: 42rpx;}
.icon2{width: 42rpx;height: 40rpx;}
.icon3{width: 37rpx;height: 42rpx;}


</style>
