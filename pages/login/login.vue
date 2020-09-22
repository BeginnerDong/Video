<template>
	<view class="px-5 line-h">
		
		<view class="font-80 one">您好,</view>
		<view class="font-40">欢迎使用xxx</view>
		
		<image src="../../static/images/thelogin-img.png" class="loginImg"></image>
		
		<view class="btn100-c flex0" :class="choose==0?'Mgb colorf':'color9'" @click="chooseShow(0)">
			<image src="../../static/images/thelogin-icon.png" class="wx-icon mr-2" v-if="choose==0"></image>
			<image src="../../static/images/thelogin-icon2.png" class="wx-icon mr-2" v-else></image>
			<view>微信一键登录</view>
		</view>
		<view class="btn100-c flex0" :class="choose==1?'Mgb colorf':'color9'" @click="chooseShow(1)">
			<image src="../../static/images/thelogin-icon3.png" class="qq-icon mr-2" v-if="choose==1"></image>
			<image src="../../static/images/thelogin-icon1.png" class="qq-icon mr-2" v-else></image>
			<view>QQ登录</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				choose:0
			}
		},
		methods: {
			
			chooseShow(i){
				const self = this;
				self.choose = i;
				self.Router.navigateTo({route:{path:'/pages/index/index'}});
			}
			
		}
	}
</script>

<style scoped>
.one{padding: 175rpx 0 44rpx;}
.loginImg{width: 330rpx;height: 530rpx;margin: 80rpx auto 130rpx;}
.btn100-c{margin-bottom: 30rpx;}
</style>
