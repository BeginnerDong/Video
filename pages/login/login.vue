<template>
	<view >
		<view class="p-aXY">
			<image src="../../static/images/bg.jpg">
		</view>
		<view class="px-5 line-h p-r">
			<view class="font-80 one">您好,</view>
			<view class="font-40">欢迎使用 tree hole</view>
			
			<!-- <image src="../../static/images/thelogin-img.png" class="loginImg"></image> -->
			
			
		</view>
		
		<view style="bottom: 0;position: fixed;width: 100%;">
			<view class="d-flex px-5">
				<view class="font-32 pr-1"  style="line-height: 70rpx;">账号</view>
				<input class="font-32" placeholder="请输入" v-model="submitData.login_name" type="text"/>
			</view>
			<view class="d-flex px-5" style="margin-top:20rpx;">
				<view class="font-32 pr-1"  style="line-height: 70rpx;">密码</view>
				<input class="font-32" placeholder="请输入" v-model="submitData.password" type="password"/>
			</view>
			<view class="d-flex a-center j-sb" style="margin-top:100rpx;">
				<view class="btn100-c flex0  colorf"  style="background-color: #8394FF;" @click="submit">
					
					<view >登录</view>
				</view>
				
				<view class="btn100-c flex0  colorf" style="background-color: #9CBBFE;" @click="register">
					
					<view>注册</view>
				</view>
			</view>
		</view>
		<!-- <view class="btn100-c flex0" :class="choose==0?'Mgb colorf':'color9'" @click="chooseShow(0)">
			<image src="../../static/images/thelogin-icon.png" class="wx-icon mr-2" v-if="choose==0"></image>
			<image src="../../static/images/thelogin-icon2.png" class="wx-icon mr-2" v-else></image>
			<view>微信一键登录</view>
		</view>
		<view class="btn100-c flex0" :class="choose==1?'Mgb colorf':'color9'" @click="chooseShow(1)">
			<image src="../../static/images/thelogin-icon3.png" class="qq-icon mr-2" v-if="choose==1"></image>
			<image src="../../static/images/thelogin-icon1.png" class="qq-icon mr-2" v-else></image>
			<view>QQ登录</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				choose:0,
				submitData:{
					login_name:'',
					password:''
				}
			}
		},
		onLoad() {
			const self = this;
			uni.hideLoading()
		},
		methods: {
			
			chooseShow(i){
				const self = this;
				self.choose = i;
				self.Router.navigateTo({route:{path:'/pages/index/index'}});
			},
			submit() {
				const self = this;
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				const postData = {
					login_name: self.submitData.login_name,
					password:self.submitData.password,
					noLoading:true
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					
					const callback = (res) => {
						if (res.solely_code == 100000) {
							console.log(res);
							uni.setStorageSync('user_token', res.token);
							uni.setStorageSync('user_info', res.info);
							if(res.info.info.deadline>Date.parse(new Date())/1000){
								getApp().globalData.isMember = true
							}else{
								getApp().globalData.isMember = false
							};
							uni.redirectTo({
								url: '/pages/index/index'
							}) 
						} else {
							self.$Utils.showToast(res.msg,'none')
						}
					}
					self.$apis.loginByUser(postData, callback);
				} else {
					self.$Utils.showToast('请补全登录信息', 'none')
				};
			},
			
			register() {
				const self = this;
				uni.showLoading({
					title: '注册中...',
					mask: true
				})
				const postData = {
					data:{
						login_name: self.submitData.login_name,
						password:self.submitData.password,
					},
					noLoading:true
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					
					const callback = (res) => {
						if (res.solely_code == 100000) {
							self.submitData.login_name = '';
							self.submitData.password = '';
							self.$Utils.showToast('注册成功', 'none')
						} else {
							self.$Utils.showToast(res.msg,'none')
						}
					}
					self.$apis.register(postData, callback);
				} else {
					self.$Utils.showToast('请补全注册', 'none')
				};
			},
			
		}
	}
</script>

<style scoped>
.one{padding: 160rpx 0 44rpx;}
.loginImg{width: 330rpx;height: 530rpx;margin: 80rpx auto 80rpx;}
.btn100-c{width: 50%;line-height: 80rpx;border-radius: 0;}
input{height: 70rpx;}
</style>
