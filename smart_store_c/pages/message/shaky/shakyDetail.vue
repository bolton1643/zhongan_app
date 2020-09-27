<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">活动详情</block>
		</cu-custom>
		<view class="content">
			<view class="content-view">
				<view class="content-view-title">
					<text v-text="title" class="title"></text>
					<text v-text="time"></text>
				</view>
				<view class="content-view-info" v-text="info"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '活动标题',
				time: '2020-2-15 11:20:20',
				info: '维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修说明维修维修说明维修说明维修说明维修说明说明维修说明维修说明维修说明维修说明维修 '
			};
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
			margin-top: 40upx;
			background-color: #FFFFFF;
			border-radius: 24upx 24upx 0 0;
			box-sizing: border-box;

			.content-view {
				width: 100%;
				padding: 60upx 40upx 40upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				
				.content-view-title {
					height: 40upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #999999;
					font-size: 28upx;
					
					.title {
						font-size: 36upx;
						color: #333333;
					}
				}
				
				.content-view-info {
					color: #999999;
					margin-top: 32upx;
					word-break: break-all;
					line-height: 56upx;
				}

			}
		}
	}
</style>
