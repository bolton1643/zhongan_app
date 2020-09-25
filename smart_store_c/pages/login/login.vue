<template>
	<view class="login-container">
		<view class="container-title">
			<image class="header-image" src="/static/login/zhihuimengdian.png"></image>
			<!-- <div class="header-name" v-text="name"></div> -->
		</view>
		<view class="container-body">
			<div class="form-content">
				<div class="form-content-input">
					<div class="input-title">手机号</div>
					<div class="input-tip">
						<image src="/static/login/xialajiantou.png"></image>
					</div>
					<input class="input-content" :class="{'red': errorFocus === 'mobile'}" v-model.trim="form.mobile" @blur="focusBlur('mobile')"
					 placeholder="请输入手机号" type="number" maxlength="11" />
				</div>
				<div class="form-content-input">
					<div class="input-title"><span>密</span><span>码</span></div>
					<div class="input-tip"></div>
					<input class="input-content password" v-model.trim="form.password" maxlength="16" :password="showPassword" @blur="focusBlur('password')"
					 placeholder="8-16位字母数字组合" />
					<!-- <div class="input-tip-look" @click="changePasswordType">
						<image src="/static/login/hide.png" :class="passwordType === 'password' ? '' : 'active'"></image>
					</div> -->
					<uni-icons @click="changePasswordType" class="input-tip-look" type="eye" size="21" color="#979797" :class="showPassword ? '' : 'active'">
					</uni-icons>
				</div>
			</div>
			<div class="form-tips" v-if="errorText" v-text="errorText"></div>
			<view class="form-btn-group">
				<button :type="primaryType" :disabled="disabled" :loading="loading" class="form-login-btn" @click="loginForm">登录</button>
			</view>
			<view class="form-forget">
				<div class="forget" @click="forgetPassword">忘记密码</div>
				<div class="register" @click="registerUser">新用户<span>注册</span></div>
			</view>
		</view>
		<view class="other_login cuIcon">
			<view class="login_icon" @tap="login_alipay">
				<image src="/static/login/zhifubao.png"></image>
				<text>支付宝一键登录</text>
			</view>
			<view class="login_icon" @tap="login_weixin">
				<image src="/static/login/weixin.png"></image>
				<text>微信一键登录</text>
			</view>
		</view>
		<view class="rules">
			<image src="../../static/login/user_circle_select.png"></image>
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
	import uniIcons from "../../components/uni-icons/uni-icons.vue";

	export default {
		data() {
			return {
				name: '18657193140',
				form: {
					mobile: '',
					password: '',
				},
				showPassword: true,
				errorText: '',
				errorFocus: '',
				primaryType: 'primary',
				loading: false,
			};
		},

		components: {
			uniIcons,
		},

		computed: {
			disabled() {
				let text = true;
				if (this.form.mobile && this.form.password && !this.errorText) {
					text = false;
				} else {
					text = true;
				}
				return text;
			}
		},

		methods: {
			// 切换密码类型
			changePasswordType() {
				this.showPassword = !this.showPassword;
			},

			// 焦点失去事件
			focusBlur(type) {
				if (type === 'mobile') {
					this.checkPhoneRules();
				} else if (type === 'password') {
					this.checkPasswordRules();
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

			login_alipay() {
				//微信登录
				uni.login({
					provider: 'zhifubao',
					success: function(loginRes) {
						console.log(loginRes.authResult);
					}
				});
			},

			login_weixin() {
				//微信登录
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
					}
				});
			},

			// 登录
			async loginForm() {
				const phoneChcek = await this.checkPhoneRules();
				if (!phoneChcek) return;
				const passwordCheck = await this.checkPasswordRules();
				if (!passwordCheck) return;
				this.loading = true;
				const _this = this;
				uni.showLoading({
					mask: true,
					title: '正在登录，请稍候...',
				})
				const obj = {
					phone: this.form.mobile,
					password: this.form.password,
				}
				this.$tui.request('/user/login', 'post', obj, false, false, true).then(res => {
					if (res.status === 200 && res.success) {
						uni.setStorageSync('smart_c_userInfo', res.result.userInfo);
						uni.setStorageSync('smart_c_token', res.result.token);
						uni.setStorageSync('smart_c_shopList', res.result.shopList);
						this.loading = false;
						uni.hideLoading();
						if (res.result.shopList && res.result.shopList.length) {
							uni.reLaunch({
								url: '../homepageIndex/homepageIndex',
							});
						} else {
							uni.reLaunch({
								url: '../homepage/homepage-no',
							});
						}
					} else {
						this.loading = false;
						uni.hideLoading();
					}
				}).catch(res => {
					this.loading = false;
					uni.hideLoading();
				});
			},

			// 忘记密码
			forgetPassword() {
				uni.navigateTo({
					url: '/pages/login/forget'
				});
			},

			// 注册
			registerUser() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
		}
	}
</script>

<style lang="scss">
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
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
			width: 100%;
			height: 280upx;
			margin-top: 76upx;

			.header-image {
				width: 190upx;
				height: 190upx;
				border-radius: 30upx;
			}

			.header-name {
				margin-top: 38upx;
				height: 52upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 44upx;
				color: #333333;
			}
		}

		.container-body {
			margin-top: 102upx;
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

					.input-title {
						width: 108upx;
						flex: 108upx 0 0;
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

						&.active {
							color: #007AFF !important;
						}
					}

					.input-content {
						flex: 1 0 0;
						font-size: 36upx;
						letter-spacing: 2upx;

						.input-placeholder {
							font-size: 32upx;
						}

						&.password {
							padding: 0 10upx 0 0;
						}
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

				.special {
					color: #1676FE;
				}
			}
		}
	}
</style>
