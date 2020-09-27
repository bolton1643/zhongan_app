<template>
	<view class="earn-money">
		<cu-custom class="earn-money-title" :isBack="true">
			<block slot="content">邀请好友</block>
		</cu-custom>
		<view class="earn-money-content">
			<view class="earn-text-invite">
				<image :src="inviteText"></image>
			</view>
			<view class="earn-text-join">
				<image :src="joinText"></image>
			</view>
			<view class="earn-main-image">
				<image :src="mainImage"></image>
			</view>
			<view class="invite-text">
				<text>邀请好友下载智慧门店并申请安保服务</text>
				<text>得666元现金红包</text>
			</view>
			<view class="earn-main-btn">
				<image :src="mainBtnImage"></image>
			</view>
			<view class="earn-main-btn-text">
				<text class="text">我要邀请<uni-icons style="margin-left: 8upx;" bgColor="white" type="arrowright"></uni-icons></text>
			</view>
		</view>
	</view>
</template>

<script>
	const inviteText = require('../../../static/my/earnMoney/invite.png');
	const joinText = require('../../../static/my/earnMoney/join.png');
	const mainImage = require('../../../static/my/earnMoney/mainImage.png');
	const mainBtnImage = require('../../../static/my/earnMoney/btn.png');

	export default {
		data() {
			return {
				inviteText,
				joinText,
				mainImage,
				mainBtnImage,
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;

		.earn-money {
			width: 100%;
			height: 100%;
			background-image: url('../../../static/my/earnMoney/bg.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;

			.earn-money-title {
				color: #FFFFFF;
			}

			.earn-money-content {
				display: flex;
				flex-direction: column;
				position: relative;
				flex: 1 0 0;

				.earn-text-invite {
					margin-top: 100upx;
					height: 68upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 484upx;
						height: 68upx;
					}
				}

				.earn-text-join {
					margin-top: 28upx;
					height: 100upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 562upx;
						height: 100upx;
					}
				}

				.earn-main-image {
					margin-top: 22upx;
					height: 460upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 100%;
						height: 460upx;
					}
				}

				.invite-text {
					margin-top: 38upx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					text {
						height: 50upx;
						font-size: 36upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						margin-top: 16upx;
						line-height: 50upx;
					}
				}

				.earn-main-btn {
					margin-top: 40upx;
					height: 120upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					bottom: 140upx;

					image {
						width: 670upx;
						height: 100%;
					}
				}

				.earn-main-btn-text {
					margin-top: 44upx;
					height: 44upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgba(255, 255, 255, 1);
					position: absolute;
					bottom: 40upx;

					text {
						font-size: 36upx;
						
						.uni-icons {
							color: #FFFFFF !important;
							font-size: 36upx !important;
						}
					}
				}
			}
		}
	}
</style>
