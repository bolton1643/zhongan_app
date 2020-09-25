<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">在线支付</block>
		</cu-custom>

		<view class="content-box">
			<view class="count-down-box">
				<view class="count-down-text">
					支付剩余时间
				</view>
				<uni-countdown color="#FFFFFF" background-color="#333333" border-color="#333333" :minute="15" :second="0" :showDay="false"></uni-countdown>
			</view>

			<view class="pay-box">
				<view class="pay-select-box">
					<view class="pay-money-box">
						<text class="pay-money-box-title">需支付费用</text>
						<text class="pay-money-box-num">￥{{totalMoney || 0}}</text>
					</view>

					<view class="divide"></view>

					<view class="payment-method">
						支付方式
					</view>

					<view class="payment-method-box">
						<radio-group>
							<label class="uni-list-cell uni-list-cell-pd">
								<view class="payment-method-item">
									<image class="payment-img" src="../../../static/homepage/icon-zhifubao.png"></image>
									<text class="payment-text">支付宝支付</text>
								</view>
								<radio value="1" :checked="true" />
							</label>
							<label class="uni-list-cell uni-list-cell-pd">
								<view class="payment-method-item">
									<image class="payment-img" src="../../../static/homepage/icon-weixin.png"></image>
									<text class="payment-text">微信支付</text>
								</view>
								<radio value="2" />
							</label>

						</radio-group>
					</view>
				</view>

				<view class="btn-box">
					<button class="form-submit-btn" type="primary" @click="goPay">确认支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';

	export default {
		components: {
			uniCountdown
		},

		data() {
			return {
				applyId: "",
				totalMoney: 0
			}
		},

		onLoad: function(options) {
			console.log(options);
			this.applyId = options.applyId;
			this.totalMoney = options.totalMoney;
		},

		methods: {
			goPay() {
				uni.showLoading({
					title: '正在查询支付结果，请稍后',
				});

				this.$tui.request('/shop/pay', 'post', {
					applyId: this.applyId
				}, false, false, true).then((res) => {
					if (res.success) {
						setTimeout(() => {
							uni.hideLoading();
							uni.showToast({
								title: '支付成功!',
							})
							uni.setStorageSync('smart_c_shopList', [res.result]);
							setTimeout(() => {
								uni.navigateTo({
									url: './payResult?payStatus=1',
								});
							}, 1000)
						}, 3000);
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
				}).catch();
			},
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f0f0f0;

		.content-box {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;

			.count-down-box {
				width: 100%;
				padding: 32upx 0 84upx;
				box-sizing: border-box;

				.count-down-text {
					width: 100%;
					font-size: 24upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-top: 32upx;
					text-align: center;
				}

				.uni-countdown {
					width: 100%;
					justify-content: center;
					margin-top: 16upx;
				}
			}

			.pay-box {
				flex: 1;
				width: 100%;
				background-color: white;
				border-top-left-radius: 24upx;
				border-top-right-radius: 24upx;
				padding: 64upx 40upx 68upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.pay-select-box {
					width: 100%;

					.pay-money-box {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.pay-money-box-title {
							font-size: 36upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}

						.pay-money-box-num {
							font-size: 36upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: rgba(233, 50, 50, 1);
						}
					}

					.divide {
						width: 100%;
						height: 2upx;
						background-color: #E6E6E6;
						margin: 40upx 0;
					}

					.payment-method {
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}


					.payment-method-box {
						width: 100%;
						margin-top: 12upx;

						uni-radio-group {
							width: 100%;

							uni-label {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 28upx 0;
								box-sizing: border-box;

								.payment-method-item {
									display: flex;
									align-items: center;

									.payment-img {
										width: 60upx;
										height: 60upx;
									}

									.payment-text {
										font-size: 32upx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: rgba(51, 51, 51, 1);
										margin-left: 32upx;
									}
								}
							}
						}
					}
				}

				.btn-box {
					width: 100%;
					margin-top: 80upx;

					.form-submit-btn {
						width: 100%;
						height: 112upx;
						line-height: 112upx;
						background-color: #1676FE;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						border-radius: 56upx;
					}
				}
			}
		}
	}
</style>
