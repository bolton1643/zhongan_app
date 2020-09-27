<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">兑换明细</block>
		</cu-custom>

		<view class="content-box">
			<view class="list-item" v-for="(item, index) in goldenBeansList" :key="index">
				<view class="user-box">
					<text class="item-user-name">{{ item.userName }}</text>
					<text class="item-time">{{ item.time }}</text>
				</view>
				<text class="item-num">{{ item.num }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				]
			}
		},

		onLoad: function(options) {},

		methods: {}

	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #F0F0F0;

		.content-box {
			width: 100%;
			margin-top: 40upx;
			background-color: white;

			.list-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40upx;
				box-sizing: border-box;
				border-bottom: 2upx #F0F0F0 solid;

				.user-box {
					display: flex;
					flex-direction: column;

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

				.item-num {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
		}
	}
</style>
