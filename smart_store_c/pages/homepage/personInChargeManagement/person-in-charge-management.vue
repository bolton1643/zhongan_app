<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">负责人管理</block>
		</cu-custom>

		<view class="content-box">
			<view class="content-item" @click="goPrincipalList">
				<text>负责任人管理</text>
				<image src="../../../static/homepage/icon-enter.png"></image>
			</view>
			<view class="divide"></view>
			<view class="content-item" @click="goShopSetting">
				<text>时间段设置</text>
				<image src="../../../static/homepage/icon-enter.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},

		onLoad: function(options) {},

		methods: {
			goPrincipalList() {
				uni.navigateTo({
					url: "./principal-list"
				});
			},

			goShopSetting() {
				uni.navigateTo({
					url: "./shop-setting"
				});
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
			margin-top: 40upx;

			.content-item {
				width: 100%;
				background-color: white;
				padding: 40upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;

				uni-image {
					width: 32upx;
					height: 32upx;
				}
			}

			.divide {
				width: 100%;
				height: 2upx;
				background-color: #E6E6E6;
			}
		}
	}
</style>
