<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">我的套餐</block>
		</cu-custom>
		<view class="content">
			<view class="content-view">
				<view class="content-view-title">
					<text v-text="title" class="title"></text>
					<text v-text="money"></text>
				</view>
				<view class="content-view-info">
					<text class="view-info-text">10万保额保险一年</text>
					<text class="view-info-text">出警服务一年</text>
					<text class="view-info-text">设备维修服务一年</text>
				</view>
			</view>
			<view class="view-btn">
				<button type="primary" @click="submit">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '服务费',
				money: '￥450',
				info: '',
			};
		},
		
		methods: {
			submit() {
				uni.navigateTo({
					url: '../../homepage/pay/pay',
				})
			},
		},
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

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
							color: #FA3A39;
								font-size: 36upx;
							
							.title {
								color: #333333;
							}
						}
						
						.content-view-info {
							color: #999999;
							display: flex;
							flex-direction: column;
							
							.view-info-text{
								height: 40upx;
								margin-top: 32upx;
							}
						}
				
					}
				
			}
			.view-btn {
				position: absolute;
				bottom: 68upx;
				width: 100%;
				left: 0;
				padding: 0 40upx;
				box-sizing: border-box;
				
				button {
					width: 100%;
					height: 112upx;
					background: #1676FE;
					border-radius: 56upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
