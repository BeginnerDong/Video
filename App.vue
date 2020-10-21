
<script>
	import api from "./apis/index.js"
	import token from "./common/token.js"
	// #ifdef H5 || APP-PLUS
	import pageAnimation from './components/y-pageAnimation/index.vue'
	
	// #endif
	export default {
		// #ifdef H5 || APP-PLUS
		mixins: [pageAnimation],
		// #endif
		onLaunch: function() {	
			token.getUserToken()
		},
		onShow: function() {
			console.log('App Show')

			var postData = {};
			postData.tokenFuncName = 'getUserToken';
			postData.noLoading = true;
			var callback = function(res) {
				uni.setStorageSync('canClick', true);
				if (res.solely_code==100000) {
					if(res.info.data[0].name==''){
						getApp().globalData.checkInfo = false
					}else{
						getApp().globalData.checkInfo = true
					}
					
					if(res.info.data[0].deadline>Date.parse(new Date())/1000){
						getApp().globalData.isMember = true
					}else{
						getApp().globalData.isMember = false
					}
				};
			};
			api.userInfoGet(postData, callback);
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 富文本样式 */
	@import "/assets/style/quill.css";
	
	
	/* 公共样式 */
	@import "/common/css/common.css";
	/* 公共样式 */
	@import "/common/css/main.css";
	@import "/common/css/animate.css";
	@font-face {
		font-family: 'AliR';
		src: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-matchbox/a003f470-a6fa-11ea-a30b-e311646dfaf2.otf);
	}
	uni-swiper .uni-swiper-dots-horizontal{line-height: 16rpx;bottom: 5px;}
	
	uni-tabbar .uni-tabbar__icon{width: 44rpx;height: 44rpx;}
	uni-page-head .uni-page-head__title{font-weight: normal;}
	/* uni-swiper .uni-swiper-dot{width: 12rpx;height: 6rpx;border-radius: 6rpx;background-color: #c5c5c5;}
	uni-swiper .uni-swiper-dot-active{width: 20rpx;} */
	.ql-editor img{max-width: 100%;margin: 0 auto;}
	.detailBanner .uni-swiper-dots{bottom: 30rpx;}
	/* uni-page-body{min-height: 100%;} */
</style>
