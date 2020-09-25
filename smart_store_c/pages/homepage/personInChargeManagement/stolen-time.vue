<template>
	<view>
		<view class="page-box">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="content">被盗时间</block>
			</cu-custom>

			<view class="content-box">
				<view>
					<uni-swipe-action class="swipe-box">
						<view class="swipe-item" v-for="(item, index) in list" :key="index">
							<text class="item-date" :class="{'swiped': item.swiped}">{{ item.date }}</text>
							<view class="item-content-box">
								<uni-swipe-action-item @change="swipeChange($event, index)">
									<view class="item-content">
										<view class="item-content-left">
											<text class="item-type">{{ item.type }}</text>
											<text class="item-operator">操作人：{{ item.operator }}</text>
										</view>
										<view class="item-content-right">
											{{ item.time }}
										</view>
									</view>
									<template v-slot:right>
										<view class="item-select">
											<radio :value="index + ''" checked />
										</view>
									</template>
								</uni-swipe-action-item>
							</view>
						</view>
					</uni-swipe-action>

					<view class="time-select-item" @click="goChoose('date')">
						<text class="time-select-text">日期</text>
						<text class="select-time" :class="{'slected': data.date !== '请选择被盗日期'}">{{ data.date }}</text>
					</view>
					<view class="divide"></view>
					<view class="time-select-item" @click="goChoose('time')">
						<text class="time-select-text">时间点</text>
						<text class="select-time" :class="{'slected': data.time !== '选择被盗时间点'}">{{ data.time }}</text>
					</view>
					<view class="divide"></view>
				</view>

				<view class="btn-box">
					<button class="submit-btn" type="primary" @click="submit">确定</button>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" :maskClick="false"></uni-popup>
		<mx-date-picker :show="showPicker" :type="value" color="#1676FE" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";

	export default {
		components: {
			uniPopup,
			MxDatePicker
		},

		data() {
			return {
				list: [{
						date: "11月18号",
						type: "警报1",
						operator: "张三",
						time: "09:05:16",
						swiped: false
					},
					{
						date: "11月18号",
						type: "警报1",
						operator: "张三",
						time: "09:05:16",
						swiped: false
					}
				],
				showPicker: false,
				data: {
					date: "请选择被盗日期",
					time: "选择被盗时间点"
				},
				value: ""
			}
		},

		onLoad: function(options) {},

		methods: {
			swipeChange(e, index) {
				console.log(e, index);
				if (e === 'none') {
					for (let s of this.list) {
						s.swiped = false;
					}
				} else {
					this.list[index].swiped = true;
				}
			},

			goChoose(val) {
				this.$refs.popup.open();
				this.showPicker = true;
				this.value = val;
			},

			onSelected(e) { //选择
				this.showPicker = false;
				this.$refs.popup.close();
				if (e) {
					this.data[this.value] = e.value;
				}
			}
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

		.content-box {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.swipe-box {
				width: 100%;
				margin: 40upx 0 64upx;

				.swipe-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 32upx;

					.item-date {
						width: 100%;
						padding: 0 40upx;
						box-sizing: border-box;
						font-size: 28upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #999999;
					}

					.swiped {
						color: #333333;
					}

					.item-content-box {
						width: 100%;
						margin-top: 26upx;
						padding: 0 40upx;
						box-sizing: border-box;


						.item-content {
							width: 100%;
							display: flex;
							justify-content: space-between;
							background-color: #F0F0F0;
							border-radius: 24upx;
							padding: 42upx 40upx 60upx;
							box-sizing: border-box;

							.item-content-left {
								display: flex;
								flex-direction: column;

								.item-type {
									font-size: 32upx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #333333;
								}

								.item-operator {
									font-size: 28upx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #666666;
									margin-top: 16upx;
								}
							}

							.item-content-right {
								font-size: 24upx;
								font-family: SanFranciscoText-Regular, SanFranciscoText;
								font-weight: 400;
								color: #999999;
							}
						}

						.item-select {
							display: flex;
							align-items: center;
							margin-left: 20px;
						}
					}
				}
			}

			.divide {
				height: 2upx;
				margin: 0 80upx;
				background-color: #E6E6E6;
			}

			.time-select-item {
				width: 100%;
				height: 112upx;
				line-height: 112upx;
				display: flex;
				padding: 0 80upx;
				box-sizing: border-box;

				.time-select-text {
					width: 108upx;
					font-size: 36upx;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: #474747;
					margin-right: 64upx;
				}

				.select-time {
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D2D2D6;
				}

				.slected {
					color: #1676FE;
				}
			}

			.btn-box {
				margin: 80upx 80upx 68upx;

				.submit-btn {
					width: 100%;
					height: 112upx;
					line-height: 112upx;
					background-color: #1676FE;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					border-radius: 56upx;
				}
			}
		}
	}
</style>
