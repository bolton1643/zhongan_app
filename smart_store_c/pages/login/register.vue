<template>
	<view class="login-container">
		<view class="container-title">
			<div class="header-name">注册</div>
		</view>
		<view class="container-body">
			<div class="form-content">
				<div class="form-content-input">
					<div class="input-title">手机号</div>
					<input class="input-content" v-model.trim="form.mobile" @blur="focusBlur('mobile')" @focus="focusType = 'mobile'"
					 placeholder="请输入手机号" type="number" maxlength="11" />
					<uni-icons v-if="focusType === 'mobile'" @click="clear('mobile')" class="input-tip-look" type="clear" size="22"
					 color="#D8D8D8">
					</uni-icons>
				</div>
				<div class="form-content-input">
					<div class="input-title">验证码</div>
					<input class="input-content" v-model.trim="form.captcha" @focus="focusType = 'captcha'" placeholder="请输入验证码" />
					<text class="count-down" v-if="!sendCode" @click="getCode">获取验证码</text>
					<text class="count-down-normal" v-else>{{time}}s后重新获取</text>
				</div>
				<div class="form-content-input password-input">
					<div class="input-title"><span>密</span><span>码</span></div>
					<input class="input-content password" @focus="focusType = 'password'" v-model.trim="form.password" maxlength="16"
					 :password="showPassword" @blur="focusBlur('password')" placeholder="8-16位字母数字组合" />
					<uni-icons v-if="focusType === 'password'" @click="clear('password')" class="input-tip-look" type="clear" size="22"
					 color="#D8D8D8">
					</uni-icons>
					<uni-icons @click="changePasswordType('showPassword')" class="input-tip-look" type="eye" size="21" color="#979797"
					 :class="showPassword ? '' : 'active'">
					</uni-icons>
				</div>
				<div class="form-content-input">
					<div class="input-title">确认密码</div>
					<input class="input-content password" @focus="focusType = 're_password'" v-model.trim="form.re_password" maxlength="16"
					 :password="showRePassword" @blur.stop="focusBlur('re_password')" placeholder="请再次输入密码" />
					<uni-icons v-if="focusType === 're_password'" @click="clear('re_password')" class="input-tip-look" type="clear"
					 size="22" color="#D8D8D8">
					</uni-icons>
					<uni-icons @click="changePasswordType('showRePassword')" class="input-tip-look" type="eye" size="21" color="#979797"
					 :class="showRePassword ? '' : 'active'">
					</uni-icons>
				</div>
			</div>
			<div class="form-tips" v-if="errorText" v-text="errorText"></div>
			<view class="form-btn-group">
				<button :type="primaryType" :disabled="disabled" :loading="loading" class="form-login-btn" @click="loginForm">注册</button>
			</view>
		</view>
		<view class="rules" @click="protocolCheckedHandleClick">
			<radio :checked="protocolChecked" />
			<view class="rules-text">
				<span>同意</span>
				<span class="special">用户协议</span>
				<span>及</span>
				<span class="special">隐私条款</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					mobile: '',
					captcha: '',
					password: '',
					re_password: '',
				},
				showPassword: true,
				showRePassword: true,
				errorText: '',
				loading: false,
				primaryType: 'primary',
				focusType: '',
				time: 60,
				timer: null,
				sendCode: false,
				protocolChecked: false
			}
		},

		computed: {
			disabled() {
				let text = true;
				if (this.form.mobile && this.form.password && this.form.captcha && this.form.re_password && !this.errorText) {
					text = false;
				} else {
					text = true;
				}
				return text;
			}
		},

		methods: {
			protocolCheckedHandleClick() {
				this.protocolChecked = !this.protocolChecked;
			},

			// 切换密码类型
			changePasswordType(type) {
				this[type] = !this[type];
			},

			focusBlur(type) {
				if (type === 'mobile') {
					this.checkPhoneRules();
				} else if (type === 'password') {
					this.checkPasswordRules();
				} else if (type === 're_password') {
					this.checkRePasswordRules();
				} else if (type === 'captcha') {
					this.checkCaptchaRules();
				}
			},

			// 手机号码校验
			checkPhoneRules() {
				const regex = /^1[3456789]\d{9}$/;
				if (this.form.mobile && !regex.test(this.form.mobile)) {
					this.errorFocus = 'mobile';
					this.errorText = '此电话号码无效';
					return false;
				} else if (!this.form.mobile) {
					this.errorFocus = 'mobile';
					this.errorText = '请输入手机号';
					return false;
				} else {
					this.errorFocus = '';
					this.errorText = '';
					return true;
				}
			},

			// 密码校验
			checkPasswordRules() {
				const regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
				if (!this.form.password) {
					this.errorText = '请输入密码';
					return false;
				} else if (this.form.password && (this.form.password.length < 8 || this.form.password.length > 16)) {
					this.errorText = '请输入	8-16位字母数字组合';
					return false;
				} else if (this.form.password && !regex.test(this.form.password)) {
					this.errorText = '密码格式错误';
					return false;
				} else {
					this.errorText = '';
					return true;
				}
			},

			// 密码再次校验
			checkRePasswordRules() {
				if (!this.form.password) {
					this.errorText = '请先输入密码';
					return false;
				} else if (!this.form.re_password) {
					this.errorText = '请确认新密码';
					return false;
				} else if (this.form.password && this.form.re_password && this.form.password !== this.form.re_password) {
					this.errorText = '两次输入的密码不一致，请重新输入';
					return false;
				} else {
					this.errorText = '';
					return true;
				}
			},

			// 验证码校验
			checkCaptchaRules() {
				if (!this.form.captcha) {
					this.errorText = '请输入验证码';
					return false;
				} else {
					this.errorText = '';
					return true;
				}
			},

			clear(type) {
				this.form[type] = '';
				this.focusBlur(type);
			},

			async getCode() {
				const isCheckPhone = await this.checkPhoneRules();
				if (!isCheckPhone) return;
				this.sendCode = true;
				this.focusType = '';
				this.time = 60;
				this.timer = setInterval(() => {
					this.time -= 1;
					if (this.time === 0) {
						clearInterval(this.timer);
						this.sendCode = false;
					}
				}, 1000);
				this.getValidCode();
			},

			// 获取注册验证码
			getValidCode() {
				const obj = {
					cellphone: this.form.mobile,
				}
				this.$tui.request('/public/vCode', 'get', obj, false, false, true).then(res => {
					if (res.success && res.status === 200) {
						this.$tui.toast('验证码已发送，请注意查收')
					} else {
						this.$tui.toast('验证码发送错误，请稍后再试');
						clearInterval(this.timer);
						this.sendCode = false;
					}
				}).catch();
			},

			// 注册
			async loginForm() {
				const phoneChcek = await this.checkPhoneRules();
				if (!phoneChcek) return;
				const passwordCheck = await this.checkPasswordRules();
				if (!passwordCheck) return;
				const rePasswordCheck = await this.checkRePasswordRules();
				if (!rePasswordCheck) return;
				const captchaChcek = await this.checkCaptchaRules();
				if (!captchaChcek) return;
				if (!this.protocolChecked) {
					this.$tui.toast('请先勾选同意《用户协议》《隐私条款》');
					return;
				}
				const obj = {
					phone: this.form.mobile,
					password: this.form.password,
					captcha: this.form.captcha,
				}
				this.$tui.request('/user/register', 'post', obj).then(res => {
					if (res.success && res.status === 200) {
						this.$tui.toast('注册成功');
						setTimeout(() => {
							uni.reLaunch({
								url: './login',
							})
						}, 100)
					}
				}).catch();
			},
		}
	}
</script>

<style lang="less">
	.login-container {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
		position: relative;
		font-family: PingFang-SC-Medium, PingFang-SC;

		.container-title {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 64upx;
			margin-top: 102upx;
			padding: 0 80upx;
			box-sizing: border-box;

			.header-name {
				height: 64upx;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				font-size: 64upx;
				color: #333333;
				font-weight: 500;
			}
		}

		.container-body {
			margin-top: 64upx;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0 80upx;
			box-sizing: border-box;

			.form-content {
				display: flex;
				flex-direction: column;

				.form-content-input {
					height: 112upx;
					width: 100%;
					border-bottom: 2upx solid #e6e6e6;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 36upx;
					color: #474747;

					&.password-input {
						.input-title {
							width: 104upx;
							flex: 104upx 0 0;
						}

						.input-content {
							padding: 0 28upx 0 64upx;
						}
					}

					.input-title {
						width: 144upx;
						flex: 144upx 0 0;
						display: flex;
						justify-content: space-between;
						font-weight: 500;
						height: 44upx;
						align-items: center;
					}

					.input-tip {
						width: 24upx;
						height: 44upx;
						margin: 0 24upx 0 16upx;
						padding: 12upx 0 8upx;
						box-sizing: border-box;
						display: flex;
						align-items: center;

						image {
							width: 24upx;
							height: 24upx;
						}
					}

					.input-tip-look {
						width: 46upx;
						height: 100%;
						display: flex;
						align-items: center;
						flex: 46upx 0 0;
						margin-left: 10upx;

						&.active {
							color: #007AFF !important;
						}
					}

					.input-content {
						flex: 1 0 0;
						font-size: 36upx;
						letter-spacing: 2upx;
						padding: 0 28upx;
						box-sizing: border-box;

						.input-placeholder {
							font-size: 32upx;
							color: #D2D2D6;
						}
					}

					.count-down {
						color: #1676FE;
						font-size: 28upx;
					}

					.count-down-normal {
						font-size: 28upx;
						color: #999999;
					}
				}
			}

			.form-tips {
				margin-top: 32upx;
				height: 28upx;
				font-size: 28upx;
				width: 100%;
				color: #e93232;
				display: flex;
				align-items: center;
			}

			.form-btn-group {
				margin-top: 64upx;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 112upx;

				.form-login-btn {
					width: 100%;
					border-radius: 48upx;
					height: 112upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.form-login-btn[disabled="true"] {
					background-color: #CCCCCC;
					color: #FFFFFF;
				}
			}

			.form-forget {
				margin-top: 32upx;
				display: flex;
				justify-content: space-between;
				height: 32upx;
				font-size: 28upx;
				color: #474747;

				span {
					color: #1676FE;
				}
			}
		}

		.other_login {
			display: flex;
			padding: 0 130upx;
			justify-content: space-around;
			box-sizing: border-box;
			position: absolute;
			bottom: 120upx;
			width: 100%;

			.login_icon {
				display: flex;
				flex-direction: column;
				width: 200upx;
				align-items: center;

				image {
					width: 120upx;
					height: 120upx;
				}

				text {
					margin-top: 16upx;
					font-size: 24upx;
					transform: scale(0.833);
					color: #999999;
				}
			}
		}

		.container-btn-group {
			position: absolute;
			left: 0;
			width: 100%;
			padding: 0 80upx;
			display: flex;
			bottom: 108upx;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			height: 256upx;

			.login-btn {
				width: 100%;
				border-radius: 48upx;
				height: 112upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.rules {
			position: absolute;
			display: flex;
			align-items: center;
			height: 32upx;
			bottom: 30upx;
			left: 50%;
			transform: translateX(-50%);

			image {
				width: 32upx;
				height: 32upx;
				margin-right: 16upx;
			}

			.rules-text {
				font-size: 28upx;
				color: #333333;
				margin-left: 12upx;

				.special {
					color: #1676FE;
				}
			}
		}
	}
</style>
