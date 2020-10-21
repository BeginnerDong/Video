<script>
	
	export default {
		// #ifdef H5
		data() {
			return {
				before: '',
				afterstart: '',
				isBack: false,
				fromId: '0',
				startType: true
			};
		},
		onLaunch: function() {
			// 监听浏览器返回按钮
			window.addEventListener("popstate", (e) => {
				this.isBack = true;
			}, false);
			this.show()
			this.$router.beforeEach((toPage, fromPage, next) => {
				let type = this.startType
				this.before = type ? 'animation-before' : 'animation-before2';
				this.afterstart = type ? 'animation-afterstart' : 'animation-afterstart2';
				setTimeout(this.hide(next));
			})
			this.$router.afterEach(() => {
				this.isBack = false
				setTimeout(this.show, 50)
			});
		},
		watch: {
			$route(route) {
				if (this.fromId >= route.params.__id__) {
					this.startType = true
				} else {
					this.startType = false
				}
				this.fromId = route.params.__id__
			}
		},
		methods: {
			hide(callback) {
				setTimeout(() => {
					this.before = this.isBack ? 'animation-before2' : this.before;
					this.afterstart = this.isBack ? 'animation-afterstart2' : this.afterstart;
					const classList = document.querySelector('uni-page').classList
					classList.add(this.before, 'animation-leave')
					classList.remove('animation-show')
					setTimeout(() => {
						classList.remove(this.before, 'animation-leave')
						callback && callback();
					}, 300);
				}, 20)
			},
			show() { 
				const classList = document.querySelector('uni-page').classList
				classList.add(this.afterstart, 'animation-before')
				setTimeout(() => {
					classList.add('animation-enter', 'animation-after', 'animation-show')
					setTimeout(() => {
						classList.remove('animation-before', 'animation-after', 'animation-enter', this.afterstart)
					}, 300)
				}, 20);
			},
		},
		// #endif
	}
</script>
<style>
	uni-page {
		opacity: 0;
	}
	uni-page.animation-before {
		/* 在页面上使用 transform 会导致页面内的 fixed 定位渲染为 absolute，需要在动画完成后移除 */
		transform: translateX(-20px);
	}
	/* 返回 */
	uni-page.animation-before2 { 
		transform: translateX(20px);
	}
	
	uni-page.animation-leave {
		transition: all .3s ease;
	}
	
	uni-page.animation-enter {
		transition: all .3s ease;
	}
	
	uni-page.animation-show {
		opacity: 1;
	}
	uni-page.animation-afterstart {
		transform: translateX(20px);
	}
	/* 返回 */
	uni-page.animation-afterstart2 {
		transform: translateX(-20px);
	}
	uni-page.animation-after {
		/* 在页面上使用 transform 会导致页面内的 fixed 定位渲染为 absolute，需要在动画完成后移除 */
		transform: translateX(0);
	}
</style>