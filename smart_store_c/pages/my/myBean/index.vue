<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">我的金豆</block>
			<block slot="right"><text @click="handleReLaunch('../myBean/detail')">兑换明细</text> </block>
		</cu-custom>
		<view class="content-wrapper">
			<view class="banner" @click="handleReLaunch('../myBean/intro')">
				<view>可兑换金豆</view>
				<view>￥600.00</view>
			</view>

			<view class="tab">
				<view class="current">
					<image src="../../../static/my/yes.png"></image>可兑换
				</view>
				<view>
					<image src="../../../static/my/yet.png"></image>已兑换
				</view>
			</view>

		</view>

		<view class="list">
			<view v-for="(item, index) in inviteMember" :key="index">
				<view>
					<label class="radio">
						<radio :value="item.value" :checked="item.checked" @click="radioChange(item)"></radio>
					</label>
				</view>
				<view class="viewGroup">
					<text>邀请18765000000用户</text>
					<text>2020-5-3 11:20:20</text>
				</view>
				<text>+200.00</text>
			</view>
		</view>

		<view class="btns">
			<view>
				<label class="radio">
					<radio value="all" :checked="allChecked" @click="radioChangeAll"></radio>
				</label>
				<text style="margin-left: 32upx; font-size: 32upx;">全选</text>
			</view>
			<text @click="getBean">兑换</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteMember: [{
						value: 'r1',
						checked: false
					},
					{
						value: 'r2',
						checked: false
					},
					{
						value: 'r3',
						checked: false
					},
				],
				allChecked: false,
			}
		},

		onLoad: function(options) {},

		mounted: function() {

		},

		methods: {
			handleReLaunch(url) {
				console.info(url)
				uni.reLaunch({
					url: `${url}`,
				})
			},

			radioChange({
				value,
				checked
			}) {
				this.inviteMember.filter(item => item.value === value)[0].checked = !checked;
				if (this.inviteMember.every(item => item.checked === true)) {
					 this.allChecked = true;
				} else {
					this.allChecked = false;
				}
				if (this.inviteMember.every(item => item.checked === false)) this.allChecked = false;
			},
			
			radioChangeAll() {
				this.allChecked = !this.allChecked;
				this.inviteMember.map(item => {
					item.checked = this.allChecked;
					return item;
				})
			},
			
			//兑换
			getBean() {
				if (this.inviteMember.some(item => item.checked === true)) {
					uni.showLoading({
						title: '正在兑换，请稍后',
					}).then(() => {
						setTimeout(() => {
							uni.hideLoading();
							uni.showToast({
								title: '兑换成功',
							});
						}, 3000);
					})
				} else {
					this.$tui.toast('请勾选待兑换金豆');
				}
			},
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
			.record {
				position: absolute;
				right: 0;
			}

			width: 100%;

			.content-wrapper {
				background-color: #fff;
				width: 100%;
				padding: 40upx 40upx 0 40upx;

				.banner {
					background: url(../../../static/my/bg.png) no-repeat 0 0;
					background-size: 100% 100%;
					height: 250upx;
					width: 670upx;
					position: relative;

					&>view {
						position: absolute;
						left: 40upx;
						color: #fff;
						font-family: PingFangSC-Semibold, PingFang SC;

						&:first-child {
							top: 50upx;
							font-size: 40upx;
						}

						&:last-child {
							font-size: 60upx;
							font-weight: 800;
							top: 122upx;
						}
					}
				}

				.tab {
					&>view {
						height: 112upx;
						line-height: 112upx;
						width: 50%;
						display: inline-block;
						text-align: center;
						font-size: 36upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);

						&>image {
							width: 72rpx;
							height: 72rpx;
							position: relative;
							top: 20upx;
							right: 10upx;
						}

						&.current {
							color: rgba(51, 51, 51, 1);
						}
					}
				}
			}

			.list {
				background-color: #fff;
				border-top: 1upx solid #EDEDED;

				&>view {
					border-bottom: 1upx solid #EDEDED;
					padding: 48upx 40upx 36upx;
					position: relative;
					display: flex;
					box-sizing: border-box;
					align-items: center;

					&>.viewGroup {
						display: flex;
						flex-direction: column;
						margin-left: 32upx;

						&>text {
							&:nth-of-type(1) {
								font-size: 32upx;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);
							}

							&:nth-of-type(2) {
								font-size: 28upx;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								margin-top: 16upx;
							}
						}
					}

					&>text {
						font-family: PingFangSC-Medium, PingFang SC;
						display: block;

						&:nth-of-type(1) {
							font-size: 32upx;
							font-weight: 500;
							color: rgba(25, 123, 253, 1);
							position: absolute;
							right: 40upx;
							height: 40upx;
							top: 50%;
							margin-top: -20upx;
						}
					}
				}
			}

			.btns {
				padding: 48upx 40upx 36upx;
				position: fixed;
				// height: 50upx;
				// line-height: 50upx;
				// box-sizing: content-box;
				left: 0;
				bottom: 0;
				width: 100%;
				display: flex;
				justify-content: space-between;
				text-align: right;
				box-sizing: border-box;

				&>text {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #1879FD;
					z-index: 9;
				}
			}
		}
	}
</style>
