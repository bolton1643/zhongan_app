<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">我的维修</block>
		</cu-custom>
		<view class="content">
			<view class="content-search">
				<uni-search-bar @confirm="search" @input="input" placeholder="请输入店铺名字或变编号"></uni-search-bar>
			</view>
			<view class="content-info">
				<view class="content-info-item" v-for="(item, index) in list" :key="index">
					<text class="item-time" v-text="item.time"></text>
					<view class="item-shop-info">
						<image :src="image" class="item-image"></image>
						<view class="info-content">
							<view class="shop-content">
								<view class="shop-content-item" v-for="(sub, subIndex) in item.content" :key="subIndex">
									<text class="text" v-text="sub.text"></text>
									<text class="data" v-text="sub.data"></text>
								</view>
							</view>
							<view class="btn-view">
								<button class="btn" @click="getNext" :class="item.status ? 'repaired' : ''" type="primary" v-text="item.status ? '已维修' : '待维修'"></button>
							</view>
						</view>
					</view>
					<view class="content-describe">
						<text class="title" v-text="item.describeTitle"></text>
						<view class="info" v-text="item.describeText"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const repairImage = require('../../../static/my/repair/repair.png');
	export default {
		data() {
			return {
				image: repairImage,
				list: [{
						time: '2020-5-3 11:20:20',
						content: [{
							text: '店铺名称',
							data: '小海小鲜(000001)'
						}, ],
						status: 0,
						describeTitle: '维修描述',
						describeText: '维修维修维修维修维维未维维修维修维维未维修维修维维未维修维修维维未维修维修维维未维修维修维维未维修维修维维未',
					},
					{
						time: '2020-5-3 11:20:20',
						content: [{
								text: '店铺名称',
								data: '小海小鲜(000001)'
							},
							{
								text: '维修人员',
								data: '张三'
							},
							{
								text: '维修时间',
								data: '2020-5-3 11:20:20'
							},
						],
						status: 1,
						describeTitle: '维修描述',
						describeText: '维修维修维修维修维维未维维修维修维维未维修维修维维未维修维修维维未维修维修维维未维修维修维维未维修维修维维未',
					}
				],
			};
		},
		
		methods: {
			getNext() {
				uni.navigateTo({
					url: './repairDetail',
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
			width: 100%;

			.content {
				width: 100%;
				position: relative;
				overflow-y: auto;

				.content-search {
					position: sticky;
					top: 0;
					left: 0;
					width: 100%;
					height: 104upx;
					box-sizing: border-box;
				}

				.content-info {
					display: flex;
					flex-direction: column;

					.content-info-item {
						background-color: #FFFFFF;
						padding: 32upx 40upx;
						box-sizing: border-box;
						margin-bottom: 16upx;

						.item-time {
							color: #999999;
							font-size: 28upx;
							height: 32upx;
							display: flex;
							align-items: center;
							justify-content: flex-start;
						}

						.item-shop-info {
							margin-top: 18upx;
							display: flex;
							height: 212upx;

							.item-image {
								width: 168upx;
								height: 212upx;
								flex-shrink: 0;
							}

							.info-content {
								flex: 1 0 0;
								display: flex;
								flex-direction: column;
							}

							.shop-content {
								height: 140upx;
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								margin-left: 32upx;

								.shop-content-item {
									width: 100%;
									display: flex;
									justify-content: space-between;
									align-items: center;
									height: 40upx;

									&+.shop-content-item {
										margin-top: 10upx;
									}

									.text {
										color: #333333;
										font-size: 32upx;
										font-weight: 500;
									}

									.data {
										font-size: 28upx;
										color: #999999;
									}
								}
							}

							.btn-view {
								display: flex;
								margin-top: 20upx;
								justify-content: flex-end;
								align-items: center;
								height: 56upx;

								.btn {
									width: 160upx;
									height: 56upx;
									background-color: #1676FE;
									border-radius: 3px;
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 24upx;
									margin-right: inherit;
									
									&.repaired {
										background-color: rgba(22, 118, 254, 0.62);
									}
								}
							}
						}

						.content-describe {
							display: flex;
							width: 100%;
							padding: 0 40upx 28upx;
							box-sizing: border-box;
							background-color: #F3F3F3;
							flex-direction: column;
							margin-top: 34upx;

							.title {
								height: 60upx;
								display: flex;
								align-items: center;
								justify-content: flex-start;
							}

							.info {
								line-height: 32upxn;
								color: #999999;
								font-size: 24upx;
							}
						}
					}
				}
			}
		}
	}
</style>
