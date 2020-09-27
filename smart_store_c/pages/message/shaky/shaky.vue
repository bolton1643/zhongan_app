<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">活动通知</block>
		</cu-custom>
		<view class="content">
			<view class="content-view-title" v-text="info.time"></view>
			<view class="content-view">
				<view class="content-view-info">
					<view class="content-view-info-section">
						<text class="content-view-info-title" v-text="info.title"></text>
						<text class="content-view-info-text" v-text="info.text"></text>

					</view>
					<view class="content-next" @click="getNext">
						<view class="content-next-info">
							<text>查看更多</text>
							<uni-icons type="arrowright"></uni-icons>
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
				info: {
					time: '11',
					title: '您有新的金豆进账',
					text: '你邀请王小二开通安保服务的奖励金豆已到账，可以直接兑换哦~',
				}
			}
		},
		methods: {
			getNext() {
				uni.navigateTo({
					url: './shakyDetail',
				})
			},
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: white;
		display: flex;
		flex-direction: column;
		background-color: #F0F0F0;

		.content {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.content-view-title {
				height: 72upx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999999;
				font-size: 28upx;
			}

			.content-view {
				width: 100%;
				padding: 0 40upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				.content-view-info {
					display: flex;
					flex-direction: column;
					background-color: #FFFFFF;
					border-radius: 16upx;

					.content-view-info-section {
						padding: 32upx 40upx;
						box-sizing: border-box;

						.content-view-info-title {
							font-size: 32upx;
							color: #333333;
							font-weight: 500;
							line-height: 40upx;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.content-view-info-text {
							margin-top: 16upx;
							font-size: 28upx;
							color: #999999;
							line-height: 40upx;
						}

					}

					.content-next {
						padding: 0 40upx;
						width: 100%;
						box-sizing: border-box;

						.content-next-info {
							border-top: 2upx dashed #979797;
							height: 100upx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}
		}
	}
</style>
