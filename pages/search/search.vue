<template>
	<view>
		
		<view class="flex1 m-3"
		@click="Router.navigateTo({route:{path:'/pages/search/search'}})">
			<view class="h60 flex-1 radius30 bB-e1 mr-4 flex px-3">
				<image src="../../static/images/home-icon5.png" class="wh28 mr-1"></image>
				<input type="text" value="" placeholder="搜索感兴趣的视频" />
			</view>
			<view class="font-30 font-w">搜索</view>
		</view>
		
		
		
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

<style scoped>
input{padding: 0;flex: 1;}
</style>
