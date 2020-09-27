<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">维修详情</block>
		</cu-custom>
		<view class="content">
			<view class="content-info">
				<view class="content-item">
					<text class="title">店铺名称</text>
					<text class="text">小海小鲜(000001)</text>
				</view>
				<view class="content-item describe">
					<text class="title">维修描述</text>
					<text class="text">设备设备设备设备设备设备设备设备设备设备设设备设备设备设备设备….. </text>
				</view>
				<view class="content-item describe">
					<text class="title">照片</text>
					<view class="image-box">
						<image :src="image"></image>
						<image :src="image"></image>
						<image :src="image"></image>
						<image :src="image"></image>
						<image :src="image"></image>
					</view>
				</view>
			</view>
			<view class="content-info">
				<view class="content-item">
					<text class="title">发起时间</text>
					<text class="text">2020-5-3 11:10:20</text>
				</view>
				<view class="content-item">
					<text class="title">维修人员</text>
					<text class="text">张三</text>
				</view>
				<view class="content-item">
					<text class="title">状态</text>
					<text class="text">已维修</text>
				</view>
				<view class="content-item">
					<text class="title">维修时间</text>
					<text class="text">2020-5-3 11:10:20</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const repairImage = require('../../../static/my/repair/repairDetail.png');
	export default {
		data() {
			return {
				image: repairImage,
			};
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
			width: 100%;

			.content {
				width: 100%;
				margin-top: 40upx;
				
				.content-info {
					padding: 0 40upx;
					box-sizing: border-box;
					background-color: #FFFFFF;
					margin-bottom: 32upx;
					
					.content-item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 112upx;
						border-bottom: 2upx solid rgba(237, 237, 237, 1);
						box-sizing: border-box;
						
						&.describe {
							flex-direction: column;
							justify-content: center;
							align-items: flex-start;
							height: inherit;
							border-bottom: 0;
							
							.title {
								padding: 32upx 0 16upx;
								height: 88upx;
								display: flex;
								align-items: center;
								box-sizing: border-box;
							}
							
							.text {
								line-height: 48upx;
							}
							
							.image-box {
								margin-bottom: 50upx;
								display: flex;
								flex-wrap: wrap;
								justify-content: space-between;
							}
							
							image {
								width: 320upx;
								height: 196upx;
								margin-bottom: 20upx;
							}
						}
						
						.title {
							font-size: 32upx;
							color: #333333;
							font-weight: 500;
						}
						
						.text {
							color: #999999;
							font-size: 28upx;
						}
					}
				}
			}
		}
	}
</style>
