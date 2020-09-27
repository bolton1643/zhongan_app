<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">我的服务</block>
		</cu-custom>
		<view class="content">
			<view class="content-view-title"></view>
			<view class="content-view">
				<view class="content-view-info">
					<view class="content-view-info-section" v-for="(item, index) in list" :key="index" @click="getNext">
						<text class="content-view-info-title" v-text="item.title"></text>
						<text class="content-view-info-text" v-text="item.time"></text>
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
						title: '您二月服务报表，请查收~',
						time: '2020-2-15 11:20:20',
					},

					{
						title: '您一月服务报表，请查收~',
						time: '2020-2-15 11:20:20',
					}
				],
			};
		},
		
		methods:{
			getNext() {
				uni.navigateTo({
					url: './report',
				})
			},
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
				height: 40upx;
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
				display: flex;
				flex-direction: column;

				.content-view-info {
					display: flex;
					flex-direction: column;

					.content-view-info-section {
						padding: 40upx 40upx 32upx;
						box-sizing: border-box;
						margin-bottom: 16upx;
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
	}
</style>
