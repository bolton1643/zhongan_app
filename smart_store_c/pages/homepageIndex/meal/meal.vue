<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">我的套餐</block>
		</cu-custom>
		<view class="content">
			<view class="content-info mb16">
				<view class="content-info-item mb16">
					<text class="text">开始时间</text>
					<text class="data">2020-5-3</text>
				</view>
				<view class="content-info-item mb16">
					<text class="text">结束时间</text>
					<text class="data">2021-5-2</text>
				</view>
				<view class="content-info-item mb16">
					<text class="text">套餐价格</text>
					<text class="data">￥1199</text>
				</view>
				<view class="content-info-item mb8">
					<text class="text">设备</text>
					<text class="data">￥439</text>
				</view>
				<view class="content-info-item-sub mb16">华为好望AI摄像头(含安装费) *1</view>
				<view class="content-info-item mb8">
					<text class="text">服务费</text>
					<text class="data">￥450</text>
				</view>
				<view class="content-info-item-sub space mb8">10万保额保险一年</view>
				<view class="content-info-item-sub space mb8">出警服务一年</view>
				<view class="content-info-item-sub space">设备维修服务一年</view>
			</view>
			<view class="content-info">
				<view class="content-info-item mb8">
					<text class="text">保险</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">保障开始时间</text>
					<text class="data">2020-5-4 00:00:00</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">保障结束时间</text>
					<text class="data">2020-5-3 00:00:00</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">投保人</text>
					<text class="data">王小二</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">被保人</text>
					<text class="data">王小二</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">受益人</text>
					<text class="data">王小二</text>
				</view>
				<view class="content-info-item-sub space mb8">
					<text class="text">保额</text>
					<text class="data">￥10,000</text>
				</view>
			</view>
			<view class="content-message mb16">
				<text class="text">电子保单</text>
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<template v-if="show">
				<view class="content-message bold">
					<text class="text">增加设备或提高保额</text>
					<view class="info">
						<text class="info-text">增加设备或提高保额</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="content-message bold">
					<text class="text">变更套餐</text>
					<view class="info">
						<text class="info-text">次年从新选择套餐</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="content-message bold" @click="handle">
					<text class="text">直接续费</text>
					<view class="info">
						<text class="info-text">次年套餐不变，直接续费</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="content-result">
					<view class="download">
						<text>下载电子保单</text>
					</view>
					<view class="download-info">
						<image src="../../../static/homepage/meal/danger.png"></image>
						<text class="text">本页面仅供参考，实际保单信息以保险公司官方内容为准</text>
					</view>
					<button type="primary" class="primary" @click="getText">我要发起</button>
				</view>
			</template>
		</view>
		<view class="cu-modal show meal-modal" v-if="showModal">
			<view class="cu-dialog">
				<text class="modal-text">您确定要发起吗</text>
				<view class="modal-content">
					<image src="../../../static/homepage/meal/submit.png"></image>
				</view>
				<view class="modal-btn-box">
					<button type="default" class="default" @click="cancel">取消</button>
					<button type="primary" class="submit" @click="submit">确定</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal show meal-pay-modal" v-if="showPayModal">
			<view class="cu-dialog">
				<view class="modal-content">
					<image src="../../../static/homepage/meal/submit.png"></image>
				</view>
				<text class="modal-text">您有一个待支付任务</text>
				<view class="modal-btn-box">
					<button type="primary" class="submit" @click="submitPay">去支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mealInfo: {},
				show: false,
				showModal: false,
				showPayModal: true,
			}
		},
		methods: {
			// 取消发起
			cancel() {
				this.showModal = false;
			},
			
			// 确定发起
			submit() {
				this.cancel();
				uni.showLoading({
					title: '正在提交'
				});
				setTimeout(() => {
					uni.showToast({
						title: '提交成功'
					})
				}, 3000);
			},
			
			getText() {
				this.showModal = true;
			},
			
			handle() {
				uni.navigateTo({
					
				})
			},
			
			submitPay() {
				uni.navigateTo({
					url: './mealInfo',
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
			width: 100%;

			.content {
				width: 100%;
				margin-top: 40upx;

				.mb16 {
					margin-bottom: 32upx;
				}

				.mb8 {
					margin-bottom: 16upx;
				}

				.content-info {
					width: 100%;
					background: #FFFFFF;
					border: 2upx solid #E6E6E6;
					box-sizing: border-box;
					padding: 32upx 40upx 40upx;

					.content-info-item {
						display: flex;
						height: 40upx;
						align-items: center;
						justify-content: space-between;
						font-size: 32upx;
						font-weight: 500;

						.text {
							color: #333333;
						}

						.data {
							color: #999999;
						}
					}

					.content-info-item-sub {
						width: 300upx;
						font-size: 32upx;
						font-weight: 500;
						color: #999999;
						line-height: 48upx;

						&.space {
							display: flex;
							height: 40upx;
							align-items: center;
							justify-content: space-between;
							line-height: 40upx;
							width: 100%;
						}
					}
				}

				.content-message {
					width: 100%;
					height: 112upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 40upx;
					box-sizing: border-box;
					background-color: #FFFFFF;
					color: #999999;

					&.bold {
						border-bottom: 2upx solid #e6e6e6;
						box-sizing: border-box;

						.text {
							color: #333333;
						}

						.info {
							display: flex;
							align-items: center;
							justify-content: flex-start;

							.info-text {
								margin-right: 16upx;
							}
						}
					}
				}

				.content-result {
					width: 100%;
					height: 392upx;
					padding: 56upx 40upx 64upx;
					box-sizing: border-box;
					background-color: #FFFFFF;

					.download {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 40upx;
						margin-bottom: 34upx;

						text {
							font-size: 32upx;
							color: #1676FE;
							text-decoration: underline;
						}
					}

					.download-info {
						height: 28upx;
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 54upx;

						image {
							width: 24upx;
							height: 24upx;
							margin-right: 16upx;
						}

						.text {
							font-size: 24upx;
							color: #999999;
						}
					}

					.primary {
						height: 112upx;
						border-radius: 56upx;
						font-size: 36upx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}

	.meal-modal, .meal-pay-modal {
		.cu-dialog {
			width: 590upx;
			border-radius: 20upx;
	
			.modal-text {
				height: 52upx;
				display: flex;
				align-items: center;
				color: #333;
				font-weight: 500;
				margin-top: 64upx;
				font-size: 44upx;
				justify-content: center;
			}
	
			.modal-content {
				color: #777777;
				font-size: 28upx;
				padding: 0 40upx;
				box-sizing: border-box;
				line-height: 46upx;
				text-align: left;
				margin-top: 64upx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				image {
					width: 148upx;
					height: 162upx;
				}
			}
	
			.modal-btn-box {
				height: 96upx;
				color: #007AFF;
				font-size: 32upx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin: 112upx 0 80upx;
				
				button {
					height: 96upx;
					width: 212upx;
					border-radius: 48upx;
				}
				
				.default {
					border: 2upx solid #999999;
					color: #999999;
					box-sizing: border-box;
				}
			}
		}
	}
	
	.meal-pay-modal {
		.modal-text {
			color: #999999 !important;
			font-size: 36upx !important;
		}
		
		button {
			width: 350upx !important;
			border-radius: 48upx;
		}
	}
	
</style>
