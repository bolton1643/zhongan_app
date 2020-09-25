<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">我的理赔</block>
		</cu-custom>
		<view class="content">
			<view class="content-search">
				<uni-search-bar @confirm="search" @input="input" placeholder="请输入店铺名字或变编号"></uni-search-bar>
			</view>
			<view class="content-list">
				<view class="content-list-item" v-for="(item, index) in list" :key="index" @click="handleReLaunch('../myClaim/detail')">
					<view class="item-image">
						<image src="../../homepage/video/movie_bg.jpg"></image>
					</view>
					<view class="item-content">
						<view class="item-content-text">
							<text class="title">店铺名称</text>
							<text class="text" v-text="item.title"></text>
						</view>
						<view class="item-content-text">
							<text class="title">申请理赔金额(元)</text>
							<text class="text" v-text="item.money"></text>
						</view>
						<view class="item-content-btn">
							<button :type="item.type" v-text="item.text" :class="item.type"></button>
						</view>
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
						title: '小海小鲜(000001)',
						money: '3000',
						type: 'primary',
						text: '待审核'
					},

					{
						title: '小海小鲜(000001)',
						money: '3000',
						type: 'primary',
						text: '待赔偿'
					},

					{
						title: '小海小鲜(000001)',
						money: '3000',
						type: 'refause',
						text: '审核不通过'
					},

					{
						title: '小海小鲜(000001)',
						money: '3000',
						type: 'primary',
						text: '已赔偿'
					},
				]
			}
		},
		
		methods: {
			search() {},

			input() {

			},
			handleReLaunch(url){
				uni.navigateTo({
					url: `${url}`,
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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

				.content-list {
					display: flex;
					flex-direction: column;

					.content-list-item {
						display: flex;
						height: 312upx;
						width: 100%;
						background-color: #FFFFFF;
						padding: 40upx;
						box-sizing: border-box;
						margin-bottom: 16upx;

						.item-image {
							height: 232upx;
							width: 184upx;
							flex-shrink: 0;
							
							image {
								width: 100%;
								height: 100%;
							}
						}

						.item-content {
							margin-left: 32upx;
							flex: 1 0 0;

							.item-content-text {
								display: flex;
								margin-top: 8upx;
								justify-content: space-between;
								line-height: 40upx;
								height: 40upx;
								align-items: center;

								.title {
									font-size: 32upx;
									color: rgba(51, 51, 51, 1);
								}

								.text {
									font-size: 28upx;
									color: #999999;
								}

								&+.item-content-text {
									margin-top: 72upx;
								}
							}

							.item-content-btn {
								display: flex;
								justify-content: flex-end;
								margin-top: 18upx;
								
								.primary, .refause {
									height: 56upx;
									display: flex;
									align-items: center;
									font-size: 28upx;
									margin-right: inherit;
								}
								
								.refause {
									background-color: #E97B47;
									color: #FFFFFF;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
