<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">评价</block>
		</cu-custom>

		<view class="content-box">
			<view class="list" v-for="(item, index) in list" :key="index">
				<view class="item-type">
					<text class="type-text">{{ item.type }}</text>
					<text class="status-text">{{ item.status }}</text>
				</view>
				<view class="time">
					{{ item.time }}
				</view>
				<view class="btn-box">
					<view class="btn-group">
						<button class="btn" type="primary" :disabled="item.is" @click="goEvaluation">{{ item.is ? '已评价' : '评价' }}</button>
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
				list: [{
						type: "华为好望摄像头",
						status: "已完成",
						time: "2020-04-22 13 23 26",
						is: false
					},
					{
						type: "新增安装",
						status: "已完成",
						time: "2020-04-22 13 23 26",
						is: true
					},
					{
						type: "告警",
						status: "已完成",
						time: "2020-04-22 13 23 26",
						is: true
					},
					{
						type: "变更套餐",
						status: "已完成",
						time: "2020-04-22 13 23 26",
						is: true
					}
				]
			}
		},

		onLoad: function(options) {},

		methods: {
			goEvaluation() {
				uni.navigateTo({
					url: './evaluation'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #F0F0F0;

		.content-box {
			width: 100%;
			padding: 40upx 40upx 24upx;
			box-sizing: border-box;

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 16upx;
				margin-bottom: 16upx;
				background-color: white;
				padding: 40upx;
				box-sizing: border-box;

				.item-type {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.type-text {
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
					}

					.status-text {
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}

				.time {
					width: 100%;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 34upx;
				}

				.btn-box {
					width: 100%;
					text-align: right;
					margin-top: 24upx;
					display: flex;
					justify-content: flex-end;

					.btn-group {
						width: 160upx;
						height: 60upx;

						.btn {
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 16upx;
							font-size: 32upx;
						}
					}
				}
			}
		}
	}
</style>
