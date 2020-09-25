<template>
	<view class="homepage-no-container">
		<view class="homepage-no-title">
			<view class="title">轻照守望</view>
		</view>
		<view class="homepage-no-video">
			<video id="video" class="video" :src="videoUrl" :loop="false" :controls="true" :poster="imageUrl" objectFit="fill"></video>
		</view>
		<view class="btn-group">
			<button class="expand" type="default" @click="goDetails">了解更多服务详情</button>
		</view>
		<view class="btn-group fixed">
			<button class="apply" type="primary" @click="goApply">新用户特惠申请</button>
		</view>
	</view>
</template>

<script>
	const videoUrl = require('./video/movie.mp4');
	const imageUrl = require('./video/movie_bg.jpg')
	export default {
		data() {
			return {
				videoUrl: videoUrl,
				imageUrl,
				timer: null,
			}
		},

		onShow() {
			this.timer = setInterval(() => {
				this.getUnPayInfo();
			}, 1000 * 3);
		},

		mounted() {
			uni.$on('payment-reminder-modal', () => {
				uni.createVideoContext('video').pause();
			});
		},

		methods: {
			showPopup: function() {
				const subNvue = uni.getSubNVueById('payment-reminder-modal'); //获取 
				subNvue.show(); // 显示
			},

			goDetails: function() {
				uni.createVideoContext('video').pause();
				uni.navigateTo({
					url: "../homepage/serviceDetails"
				});
				this._clearInterval();
			},

			goApply: function() {
				uni.createVideoContext('video').pause();
				uni.navigateTo({
					url: "../homepage/newUserSpecialApplication"
				});
				this._clearInterval();
			},

			getUnPayInfo() {
				this.$tui.request('/shop/unpay', 'get', {}, false, false, true).then((res) => {
					if (res.success && res.result && res.result.length) {
						console.log(res.result[0].applyId);

						uni.setStorageSync('shopInfo', JSON.stringify(res.result[0]));

						this._clearInterval();

						// #ifdef APP-PLUS
						this.showPopup();
						// #endif
					}
				}).catch();
			},

			_clearInterval() {
				if (this.timer) clearInterval(this.timer);
				this.timer = null;
			}
		},

		beforeDestroy() {
			uni.$off("payment-reminder-modal");
			this._clearInterval();
		},

		onUnload() {
			uni.$off("payment-reminder-modal");
			this._clearInterval();
		}
	}
</script>

<style lang="less">
	.homepage-no-container {
		width: 100vw;
		height: 100vh;
		position: relative;
		background-color: #FFFFFF;

		.homepage-no-title {
			height: 404upx;
			width: 100%;
			padding: 32upx 40upx;
			box-sizing: border-box;
			position: relative;
			z-index: 0;
			overflow: hidden;

			&::after {
				content: '';
				width: 140%;
				height: 404upx;
				position: absolute;
				left: -20%;
				top: 0;
				z-index: 1;
				border-radius: 0 0 50% 50%;
				background-image: linear-gradient(270deg, #1150A9, #2873DE);
			}

			.title {
				height: 48upx;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				font-size: 20px;
				color: #FFFFFF;
				position: absolute;
				left: 40upx;
				top: 120upx;
				z-index: 10;
			}
		}

		.homepage-no-video {
			width: 100%;
			height: 364upx;
			padding: 0 40upx;
			box-sizing: border-box;
			margin-top: -196upx;
			z-index: 10;

			video {
				width: 100%;
				height: 100%;
				border-radius: 20upx;
			}
		}

		.btn-group {
			padding: 0 40upx;
			width: 100%;
			box-sizing: border-box;

			&.fixed {
				position: fixed;
				bottom: 40upx;
			}
		}

		.expand {
			margin-top: 40upx;
			width: 100%;
			border-radius: 16upx;
			height: 112upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666666;
			background-color: #E3E2E6;

			&::after {
				border: 0;
			}
		}

		.apply {
			width: 100%;
			border-radius: 56upx;
			height: 112upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
