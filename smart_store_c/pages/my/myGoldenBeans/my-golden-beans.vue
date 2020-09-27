<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">我的金豆</block>
			<block slot="right">
				<text style="margin-right: 40upx;" @click="goDetail">兑换明细</text>
			</block>
		</cu-custom>

		<view class="content-box">
			<view class="golden-beans-detail">
				<view class="convertible-box">
					<image class="convertible-bg" src="/static/my/bg.png"></image>
					<view class="convertible-info">
						<text class="convertible-desp">可兑换金豆</text>
						<text class="convertible-golden-beans">{{ convertibleGoldenBeans }}</text>
					</view>
				</view>

				<view class="exchange-box">
					<view class="exchange">
						<image src="/static/my/yes.png"></image>
						<text>可兑换</text>
					</view>
					<view class="exchange">
						<image src="/static/my/yet.png"></image>
						<text style="color: #999999;">已兑换</text>
					</view>
				</view>

				<view class="golden-beans-list">
					<view class="list-item" v-for="(item, index) in goldenBeansList" :key="index">
						<view class="user-box">
							<radio :checked="item.checked" />
							<view class="user-info">
								<text class="item-user-name">{{ item.userName }}</text>
								<text class="item-time">{{ item.time }}</text>
							</view>
						</view>
						<text class="item-num">{{ item.num }}</text>
					</view>
				</view>
			</view>

			<view class="exchange-btn">
				<view class="exchange-btn-box">
					<radio :checked="selectAll" />
					<text class="select-all">全选</text>
				</view>

				<text class="exchange-text">兑换</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				convertibleGoldenBeans: "￥600.00",
				goldenBeansList: [{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					},
					{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					},
					{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					},
					{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					},
					{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					},
					{
						userName: "邀请18765000000用户",
						time: "2020-5-3 11:20:20",
						num: "+200.00",
						checked: false
					}
				],
				selectAll: false
			}
		},

		onLoad: function(options) {},

		methods: {
			goDetail() {
				uni.navigateTo({
					url: './detail-list'
				})
			}
		}

	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #F0F0F0;
		display: flex;
		flex-direction: column;

		.content-box {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;

			.golden-beans-detail {
				width: 100%;
				background-color: white;
				padding-top: 40upx;
				box-sizing: border-box;

				.convertible-box {
					height: 250upx;
					margin: 0 40upx;
					position: relative;

					.convertible-bg,
					.convertible-info {
						width: 100%;
						height: 100%;
						position: absolute;
					}

					.convertible-info {
						display: flex;
						flex-direction: column;
						justify-content: center;
						color: white;
						padding-left: 40upx;
						box-sizing: border-box;

						.convertible-desp {
							font-size: 40upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
						}

						.convertible-golden-beans {
							font-size: 60upx;
							font-family: PingFang-SC-Heavy, PingFang-SC;
							font-weight: 800;
							margin-top: 30upx;
						}
					}
				}

				.exchange-box {
					width: 100%;
					height: 128upx;
					display: flex;
					align-items: center;
					border-bottom: 2upx #F0F0F0 solid;

					.exchange {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;

						uni-image {
							width: 72upx;
							height: 72upx;
						}

						uni-text {
							font-size: 36upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-left: 16upx;
						}
					}
				}

				.golden-beans-list {
					width: 100%;
					max-height: calc(100vh - 640upx);
					overflow: auto;

					.list-item {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 48upx 98upx 36upx 40upx;
						box-sizing: border-box;
						border-bottom: 2upx #F0F0F0 solid;

						.user-box {
							display: flex;
							align-items: center;

							.user-info {
								display: flex;
								flex-direction: column;
								margin-left: 32upx;

								.item-user-name {
									font-size: 32upx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #333333;
								}

								.item-time {
									font-size: 28upx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
									margin-top: 16upx;
								}
							}
						}

						.item-num {
							font-size: 32upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #197BFD;
						}
					}
				}
			}

			.exchange-btn {
				width: 100%;
				height: 128upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40upx;
				box-sizing: border-box;

				.exchange-btn-box {
					display: flex;
					align-items: center;

					.select-all {
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
						margin-left: 40upx;
					}
				}

				.exchange-text {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #1879FD;
				}
			}
		}
	}
</style>
