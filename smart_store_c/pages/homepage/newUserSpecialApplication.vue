<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">新用户特惠申请</block>
		</cu-custom>

		<view class="content">
			<view class="form-content">
				<view class="remind">填写您的基本信息提交，我们会有专业工作人员在2个工作日内联系您~</view>
				<view class="form-item">
					<text class="form-item-text">姓名</text>
					<input class="form-input" v-model.trim="formData.manager" maxlength="5" placeholder="请输入姓名" />
				</view>
				<view class="form-item">
					<text class="form-item-text">手机号</text>
					<input class="form-input" v-model.trim="formData.phone" type="number" maxlength="11" placeholder="请输入手机号" />
				</view>
				<view class="form-item">
					<text class="form-item-text">验证码</text>
					<input class="form-input" style="flex: 3.5;" v-model.trim="formData.captcha" maxlength="6" placeholder="请输入验证码" />
					<text v-if="!sendCode" class="get-verify-code-btn text-color-blue" @click="getCaptcha">获取验证码</text>
					<text v-else class="get-verify-code-btn text-color-gray">{{ time }}s后重新获取</text>
				</view>
				<view class="form-item">
					<text class="form-item-text">省市区</text>
					<region-picker class="select-addr-btn" @change="regionChange" :value="330101">
						<view :style="formData.province_city_county ? 'color: rgb(51, 51, 51);' : ''">{{ formData.province_city_county ? formData.province_city_county : '选择门店所在省市区' }}</view>
					</region-picker>
				</view>
				<view class="form-item">
					<text class="form-item-text">详细地址</text>
					<input class="form-input" v-model.trim="formData.addr" maxlength="30" placeholder="请输入详细地址" />
				</view>
				<view class="form-item">
					<text class="form-item-text">备注</text>
					<input class="form-input" v-model.trim="formData.notes" maxlength="20" />
				</view>
			</view>
			<view class="btn-box">
				<button class="form-submit-btn" type="primary" :disabled="disabled" @click="submit">提交</button>
			</view>
		</view>

		<view class="cu-modal show" v-if="showModal">
			<view class="cu-dialog">
				<view class="modal-title">您的申请已提交</view>
				<view class="modal-content">我们会有工作人员在2个工作日内联系您</view>
				<view class="modal-btn-box">
					<button class="modal-btn" type="primary" @click="hideModal">我知道了</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import regionPicker from "@/components/region-picker/region-picker.vue"

	export default {
		data() {
			return {
				formData: {
					manager: "",
					phone: "",
					captcha: "",
					province_city_county: "",
					addr: "",
					notes: ""
				},
				sendCode: false,
				time: 60,
				timer: null,
				showModal: false
			}
		},

		computed: {
			disabled: function() {
				let result = true;
				if (this.formData.manager && this.formData.phone && this.formData.captcha && this.formData.province_city_county) {
					result = false;
				} else {
					result = true;
				}
				return result;
			}
		},

		onLoad: function(options) {},

		mounted: function() {

			uni.getStorage({
				key: 'smart_c_userInfo',
				success: (res) => {
					console.log(res);
					this.formData.phone = res.data.phone;
				}
			});
		},

		methods: {
			getCaptcha: function() {
				const message = this.$utils.checkPhoneRules(this.formData.phone);
				if (message) {
					uni.showToast({
						title: message,
						icon: 'none',
						position: 'bottom'
					});
					return;
				}

				this.$tui.request("/public/vCode", "GET", {
					cellphone: this.formData.phone,
					type: 'apply'
				}).then(data => {
					if (data.success) {
						this.sendCode = true;
						this.time = 60;
						this.timer = setInterval(() => {
							this.time -= 1;
							if (this.time === 0) {
								clearInterval(this.timer);
								this.sendCode = false;
							}
						}, 1000);
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
				});
			},

			regionChange: function(e) {
				this.formData.province_city_county = e.detail.value.join("-");
			},

			submit: function() {
				this.$tui.request("/shop/apply", "POST", this.formData).then(data => {
					if (data.success) {
						this.showModal = true;
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
				});
			},

			hideModal: function() {
				this.showModal = false;
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: white;
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;
			width: 100%;
			padding: 40upx 80upx 60upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.form-content {
				width: 100%;
				display: flex;
				flex-direction: column;

				.remind {
					width: 100%;
					background-color: rgba(247, 246, 251, 1);
					border-radius: 8upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(169, 169, 169, 1);
					padding: 24upx 28upx;
					box-sizing: border-box;
					line-height: 52upx;
				}

				.form-item {
					width: 100%;
					margin-top: 16upx;
					padding: 40upx 0 28upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					border-bottom: 2upx #E6E6E6 solid;

					.form-item-text {
						flex: 3;
						font-size: 36upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(71, 71, 71, 1);
					}

					.form-input {
						flex: 7;

						.input-placeholder {
							font-size: 32upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(210, 210, 214, 1);
						}
					}

					.get-verify-code-btn {
						flex: 3.5;
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						text-align: right;
					}

					.text-color-blue {
						color: rgba(22, 118, 254, 1);
					}

					.text-color-gray {
						color: #999999;
					}

					.select-addr-btn {
						flex: 7;
						font-size: 32upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(210, 210, 214, 1);
					}
				}
			}

			.btn-box {
				width: 100%;
				margin-top: 80upx;

				.form-submit-btn {
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

		.cu-modal .cu-dialog {
			border-radius: 24upx;
			padding: 0 60upx;
			box-sizing: border-box;

			.modal-title {
				font-size: 44upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-top: 64upx;
			}

			.modal-content {
				font-size: 36upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-top: 32upx;
				line-height: 60upx;
				text-align: left;
			}

			.modal-btn-box {
				width: 100%;
				padding: 108upx 108upx 80upx;
				box-sizing: border-box;

				.modal-btn {
					width: 100%;
					height: 96upx;
					line-height: 96upx;
					border-radius: 56upx;
				}
			}
		}
	}
</style>
