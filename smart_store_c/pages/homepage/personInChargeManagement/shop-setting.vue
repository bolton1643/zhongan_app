<template>
	<view>
		<view class="page-box">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="content">店铺设置</block>
			</cu-custom>

			<view class="content-box">
				<view class="time-select-box">
					<view class="remind">在您设置的布防时间段内，如果您没有布防，系统会给您发送短信布防提醒</view>
					<view class="time-select-item" @click="goChoose('startTime')">
						<text class="time-select-text">布防时间</text>
						<text class="select-time" :class="{'slected': data.startTime !== '选择开始时间'}">{{ data.startTime }}</text>
					</view>
					<view class="time-select-item" @click="goChoose('endTime')">
						<text class="time-select-text">撤防时间</text>
						<text class="select-time" :class="{'slected': data.endTime !== '选择结束时间'}">{{ data.endTime }}</text>
					</view>
				</view>

				<view class="btn-box">
					<button class="submit-btn" type="primary" @click="submit">确定</button>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" :maskClick="false"></uni-popup>
		<mx-date-picker :show="showPicker" type="time" color="#1676FE" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
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
				showPicker: false,
				data: {
					startTime: "选择开始时间",
					endTime: "选择结束时间"
				},
				value: ""
			}
		},

		onLoad: function(options) {},

		methods: {
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
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
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
			padding: 40upx 80upx 68upx;
			box-sizing: border-box;

			.time-select-box {
				width: 100%;
				display: flex;
				flex-direction: column;

				.remind {
					width: 100%;
					background-color: #F7F6FB;
					border-radius: 8upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					padding: 24upx 32upx;
					box-sizing: border-box;
					line-height: 52upx;
				}

				.time-select-item {
					width: 100%;
					margin-top: 16upx;
					display: flex;
					align-items: center;
					padding: 42upx 0 26upx;
					box-sizing: border-box;
					border-bottom: 2upx #E6E6E6 solid;

					.time-select-text {
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
			}

			.btn-box {
				width: 100%;
				margin-top: 80upx;

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
