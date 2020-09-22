<template>
	<view class="bT-e1">
		<view style="height:var(--status-bar-height)"></view>
		<view class="head flex1 pr-2 bB-e1 bg-white">
			<view class="px-2 py-3" @click="Router.back(1)">
				<image src="../../static/images/back.png" class="back"></image>
			</view>
			<view class="btn50-c Mgb colorf">完成</view>
		</view>
		
		<view class="mx-2" v-show="type==0">
			<input type="text" value="竹蜻蜓" placeholder="输入昵称" placeholder-style="color:#222;"/>
			<view class="font-24 color9 py-2">好名字会让你的朋友更容易记住你</view>
		</view>
		
		<view class="mx-2" v-show="type==1">
			<input type="text" value="" placeholder="输入你的个性签名" placeholder-style="color:#222;"/>
			<view class="font-24 color9 py-2">好的个性签名会让你的朋友更容易记住你</view>
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
			if(options){
				self.type = options.type;
			}
		},
		methods: {
			
		}
	}
</script>
<style>page{background-color: #fff;}</style>
<style scoped>
input{padding: 40rpx 0;border-bottom: 1px solid #e1e1e1;font-size: 28rpx;line-height: 1;}
.btn50-c{width: 110rpx;margin: 0;}
</style>
