<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">我要评价</block>
		</cu-custom>

		<view class="content-box">
			<view class="detail">
				<view class="repair-content">
					<view class="title">维修描述</view>
					<view class="desp">{{ data.desp }}</view>
					<view class="title">照片</view>
					<image class="img" src="../../homepage/video/movie_bg.jpg"></image>
				</view>

				<view class="repair-info">
					<view class="info">
						<text class="title">发起时间</text>
						<text class="content">{{ data.startTime }}</text>
					</view>
					<view class="divide"></view>
					<view class="info">
						<text class="title">维修人员</text>
						<text class="content">{{ data.personnel }}</text>
					</view>
					<view class="divide"></view>
					<view class="info">
						<text class="title">维修时间</text>
						<text class="content">{{ data.repairTime }}</text>
					</view>
				</view>

				<view class="score">
					<view class="score-item">
						<text class="item-text">维修质量</text>
						<uni-rate v-model="value1" :readonly="readonly" color="#E6E6E6" activeColor="#F8BE2C" @change="onChange" />
					</view>
					<view class="score-item">
						<text class="item-text">维修速度</text>
						<uni-rate v-model="value2" :readonly="readonly" color="#E6E6E6" activeColor="#F8BE2C" @change="onChange" />
					</view>
					<view class="score-item">
						<text class="item-text">服务态度</text>
						<uni-rate v-model="value3" :readonly="readonly" color="#E6E6E6" activeColor="#F8BE2C" @change="onChange" />
					</view>
					<view class="my-evaluation-item">
						<text class="my-evaluation-text">我的评价</text>
						<textarea class="textarea" v-model="evaluation" placeholder="您可以再此输入您的评价哦~" placeholder-class="input-placeholder"
						 maxlength="20"></textarea>
					</view>
				</view>
			</view>
			<view class="btn-box">
				<button class="submit-btn" type="primary" :disabled="disabled" @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				data: {
					desp: "设备设备设备设备设备设备设备设备设备设备设设备设备设备设备设备….. ",
					startTime: "2020-5-3 11 10 20",
					personnel: "张三",
					repairTime: "2020-5-3 11 10 20"
				},
				disabled: false,
				value1: 1,
				value2: 2,
				value3: 3,
				readonly: false,
				evaluation: ""
			}
		},

		onLoad: function(options) {},

		methods: {
			submit() {},
			onChange(e) {}
		}

	}
</script>

<style lang="less" scoped>
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
			margin-top: 40upx;

			.detail {
				width: 100%;

				.repair-content {
					width: 100%;
					padding: 32upx 30upx 50upx 40upx;
					box-sizing: border-box;
					background-color: white;

					.title {
						font-size: 32upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 40upx;
					}

					.desp {
						font-size: 28upx;
						font-family: PingFang-SC-Regular, PingFang-SC;
						font-weight: 400;
						color: #999999;
						line-height: 48upx;
						margin-bottom: 40upx;
					}

					.img {
						width: 320upx;
						height: 196upx;
						border-radius: 16upx;
					}
				}

				.repair-info {
					width: 100%;
					padding: 0 40upx;
					box-sizing: border-box;
					background-color: white;
					margin-top: 32upx;

					.info {
						width: 100%;
						padding: 40upx 0;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.title {
							font-size: 32upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: #333333;
						}

						u .content {
							font-size: 28px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}

					.divide {
						width: 100%;
						height: 2upx;
						background-color: #EDEDED;
					}
				}

				.score {
					width: 100%;
					padding: 32upx 40upx;
					box-sizing: border-box;
					background-color: white;
					margin-top: 32upx;

					.score-item {
						width: 100%;
						display: flex;
						align-items: center;
						margin-bottom: 56upx;

						.item-text {
							font-size: 32upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: #333333;
							margin-right: 60upx;
						}
					}

					.my-evaluation-item {
						width: 100%;
						display: flex;
						flex-direction: column;

						.my-evaluation-text {
							font-size: 32upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: #333333;
							margin-bottom: 32upx;
						}

						.textarea {
							width: 100%;
							border-radius: 16upx;
							background-color: #F9F9F9;
							padding: 32upx;
							box-sizing: border-box;

							.input-placeholder {
								font-size: 28upx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
							}
						}
					}
				}
			}

			.btn-box {
				width: 100%;
				background-color: white;
				padding: 40upx;
				box-sizing: border-box;

				.submit-btn {
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
</style>
