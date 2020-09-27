<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">进度</block>
		</cu-custom>

		<view class="content-box">
			<view class="item" v-for="(item, index) in schedule" :key="index">
				<view class="item-content">
					<view class="info">
						<view class="status-icon"></view>
						<text class="person" v-if="item.person">{{ item.person }}</text>
						<text class="status">{{ item.status }}</text>
					</view>
					<text class="time">{{ item.time }}</text>
				</view>
				<view class="divide" v-if="index !== schedule.length - 1"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedule: [{
						person: "",
						status: "待审核",
						time: ""
					},
					{
						person: "张三",
						status: "发起",
						time: "2020-05-13 14:22:23"
					},
					{
						person: "",
						status: "已赔偿",
						time: "2020-05-15 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					},
					{
						person: "管理员",
						status: "审核通过",
						time: "2020-05-14 14:22:23"
					}
				]
			}
		},

		onLoad: function(options) {},

		methods: {}

	}
</script>

<style lang="less" scoped>
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: white;

		.content-box {
			width: 100%;
			padding: 40upx;
			box-sizing: border-box;

			.item {
				width: 100%;

				.item-content {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.info {
						display: flex;
						align-items: center;

						.status-icon {
							width: 40upx;
							height: 40upx;
							border-radius: 100%;
							background-color: #1676FE;
							margin-right: 40upx;
						}

						.person {
							width: 100upx;
							font-size: 28upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
							margin-right: 40upx;
						}

						.status {
							font-size: 32upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}

					.time {
						font-size: 24upx;
						font-family: SanFranciscoText-Regular, SanFranciscoText;
						font-weight: 400;
						color: #999999;
					}
				}

				.divide {
					height: 80upx;
					width: 0;
					border-left: 2upx #615c5c dashed;
					margin: 20upx;
				}
			}
		}
	}
</style>
