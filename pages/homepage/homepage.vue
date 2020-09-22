<template>
	<view>
		
		<view class="flex p-3">
			<image src="../../static/images/fans-img.png" class="wh120 radius-5"></image>
			<view class="flex-1 pl-2">
				<view class="font-32 pb-1">竹蜻蜓</view>
				<view class="font-22 color9 avoidOverflow2">让一个人置身于变幻无穷的环境之中，让她与数不尽或近或远的任务</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view>
			<view class="font-32 px-3 line-h pt-3 pb-2">TA的作品（3）</view>
			
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
					<view class="px-1 py-2 bg-white">
						<view class="avoidOverflow2">带你进去古色古香的世界，林略世界的美</view>
						<view class="flex font-26 color6 pt-3">
							<image src="../../static/images/home-img.png" class="wh44 radius-5 mr-1"></image>
							<view>哆啦A梦</view>
						</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{background-image: linear-gradient(to bottom,#fff,#fafafa);}
</style>
