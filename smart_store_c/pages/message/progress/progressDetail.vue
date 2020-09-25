<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="content">
			<view class="content-view-title" v-text="info.time"></view>
			<view class="content-view">
				<view class="content-view-info">
					<text class="content-view-info-title" v-text="info.title"></text>
					<text class="content-view-info-text" v-text="info.text"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '详情',
				info: {
					time: '11',
					title: '您有新的金豆进账',
					text: '你邀请王小二开通安保服务的奖励金豆已到账，可以直接兑换哦~',
				}
			};
		},

		onLoad() {

		},
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

				.content-view-info {
					padding: 40upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					background-color: #FFFFFF;
					border-radius: 16upx;
					
					.content-view-info-title {
						font-size: 32upx;
						color: #333333;
						font-weight: 500;
						line-height: 40upx;
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
					
					.content-view-info-text {
						margin-top: 16upx;
						font-size: 28upx;
						color: #999999;
						line-height: 40upx;
					}
				}
			}
		}
	}
</style>
