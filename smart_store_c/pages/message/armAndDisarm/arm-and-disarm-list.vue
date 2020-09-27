<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">布撤防通知</block>
		</cu-custom>

		<view class="content-box">
			<view class="content-view" v-for="(item, index) in list" :key="index">
				<view class="content-view-title" v-text="item.date"></view>
				<uni-swipe-action class="swipe-box" v-for="(list, listIndex) in item.list" :key="listIndex" :disabled="item.disabled">
					<view class="swipe-item">
						<view class="item-content-box">
							<uni-swipe-action-item @change="swipeChange(list)">
								<view class="item-content">
									<view class="item-content-top">
										<text class="item-type">{{ list.type }}</text>
										<text class="item-time">{{ list.time }}</text>
									</view>
									<view class="item-content-bottom">
										<text class="item-operator">操作人：{{ list.operator }}</text>
									</view>
								</view>
								<template v-slot:right>
									<view class="item-select" @click="radioFn">
										<radio v-model="radioCheck" :value="item.checked" />
									</view>
								</template>
							</uni-swipe-action-item>
						</view>
					</view>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					date: "2020-5-3",
					list: [{
						date: "11月18号",
						type: "小海小鲜（000001）",
						operator: "张三 撤防",
						time: "15:26:42",
						swiped: false,
						checked: '1',
						disabled: false,
					}, {
						date: "11月18号",
						type: "小海小鲜（000001）",
						operator: "张三 撤防",
						time: "15:26:42",
						swiped: false,
						checked: '1',
						disabled: false,
					}]
				}],
				radioCheck: '-1',
			};
		},

		methods: {
			swipeChange(e, list) {},

			radioFn() {}
		},
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
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.content-view {
				display: flex;
				justify-content: flex-start;
				flex-direction: column;

				.content-view-title {
					display: flex;
					height: 92upx;
					padding: 40upx 40upx 20upx;
					box-sizing: border-box;
					align-items: center;
					justify-content: flex-start;
					font-size: 28upx;
					color: #999999;

					&.isToday {
						font-size: 32upx;
						color: #333333;
					}
				}

				.swipe-box {
					width: 100%;

					&+.swipe-box {
						margin-top: 16upx;
					}

					.swipe-item {
						width: 100%;
						display: flex;
						flex-direction: column;
						box-sizing: border-box;

						.item-content-box {
							width: 100%;

							.uni-swipe {
								box-sizing: border-box;
								padding: 0 40upx;
							}

							.item-content {
								width: 100%;
								display: flex;
								justify-content: space-between;
								background-color: white;
								border-radius: 24upx;
								padding: 42upx 32upx 42upx 40upx;
								box-sizing: border-box;
								flex-direction: column;

								.item-content-top {
									display: flex;
									justify-content: space-between;

									.item-type {
										font-size: 32upx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #333333;
										height: 32upx;
										display: flex;
										align-items: center;
										flex: 1;
									}

									.item-time {
										font-size: 24upx;
										font-family: SanFranciscoText-Regular, SanFranciscoText;
										font-weight: 400;
										color: #999999;
										flex: 120upx 0 0;
										display: flex;
										justify-content: flex-end;
									}
								}

								.item-content-bottom {
									margin-top: 16upx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;

									.item-operator {
										font-size: 28upx;
										color: #666666;
										display: flex;
										align-items: center;
										line-height: 28upx;
									}
								}
							}

							.item-select {
								display: flex;
								align-items: center;
								margin-left: 40upx;
								justify-content: center;
								box-sizing: border-box;
							}
						}
					}
				}
			}
		}
	}
</style>
