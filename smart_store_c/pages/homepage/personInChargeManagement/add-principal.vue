<template>
	<view>
		<view class="page-box">
			<cu-custom bgColor="bg-gray" :isBack="true">
				<block slot="content">新增负责人</block>
				<block slot="right">
					<text style="margin-right: 40upx;">取消</text>
				</block>
			</cu-custom>

			<view class="content-box">
				<view class="content-item">
					<text class="item-text">姓名</text>
					<input class="item-input" v-model="formData.name" maxlength="10" placeholder="请填写姓名" />
				</view>
				<view class="divide"></view>
				<view class="content-item">
					<text class="item-text">手机号</text>
					<input class="item-input" v-model="formData.phone" type="number" maxlength="11" placeholder="请输入手机号" />
				</view>

				<view class="content-item" style="margin-top: 40upx;" @click="chooseRole">
					<text class="item-text">角色</text>
					<text class="role-text">{{ formData.role }}</text>
					<image class="icon-enter" src="../../../static/homepage/icon-enter.png"></image>
				</view>
				<view class="divide"></view>
				<view class="content-item">
					<text class="item-text">查看视频</text>
					<radio-group class="radio-box">
						<label class="uni-list-cell uni-list-cell-pd">
							<radio value="1" :checked="formData.isCheckVideo === '1'" />
							<text>是</text>
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<radio value="0" :checked="formData.isCheckVideo === '0'" />
							<text>否</text>
						</label>
					</radio-group>
				</view>
				<view class="divide"></view>
				<view class="content-item" @click="chooseImg" style="justify-content: space-between;">
					<text class="item-text">照片</text>
					<text class="img-path">{{ formData.imgPath }}</text>
					<image class="img-camera" src="../../../static/homepage/icon-xiangji.png"></image>
				</view>

				<view class="makesure-btn">确定</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="modal-box">
				<view class="role-box">
					<view class="role-item" @click="selectRole('管理员')">
						<text>管理员</text>
						<image src="../../../static/homepage/icon-choose.png"></image>
					</view>
					<view class="divide"></view>
					<view class="role-item" @click="selectRole('操作员')">
						<text>操作员</text>
						<image src="../../../static/homepage/icon-choose.png"></image>
					</view>
				</view>

				<view class="cancel" @click="cancelModal">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup,
		},

		data() {
			return {
				formData: {
					name: "",
					phone: "",
					role: "请选择",
					isCheckVideo: "1",
					imgPath: ""
				}
			}
		},

		onLoad: function(options) {},

		methods: {
			chooseRole() {
				this.$refs.popup.open();
			},

			cancelModal() {
				this.$refs.popup.close();
			},

			selectRole(val) {
				this.formData.role = val;
				this.cancelModal();
			},

			chooseImg() {
				const _this = this;
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						_this.formData.imgPath = res.tempFilePaths[0];
					},
					fail: function(res) {
						console.log(res);
					}
				});
			}
		}

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
			margin-top: 40upx;

			.content-item {
				width: 100%;
				display: flex;
				align-items: center;
				height: 112upx;
				background-color: white;
				padding: 0 40upx;
				box-sizing: border-box;

				.item-text {
					min-width: 192upx;
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.item-input,
				.role-text,
				.img-path,
				.radio-box {
					flex: 1;
					font-size: 28upx;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: #999999;
				}

				.icon-enter {
					width: 32upx;
					height: 32upx;
				}

				.img-path {
					max-width: 360upx;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.img-camera {
					width: 88upx;
					height: 88upx;
				}

				.radio-box uni-label:nth-child(1) {
					margin-right: 64upx;
				}

				.radio-box uni-label uni-radio {
					margin-right: 18upx;
				}
			}

			.divide {
				width: 100%;
				height: 2upx;
				background-color: #E6E6E6;
			}

			.makesure-btn {
				width: 100%;
				height: 112upx;
				line-height: 112upx;
				text-align: center;
				background-color: #1676FE;
				font-size: 32upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 40upx;
			}
		}
	}

	.modal-box {
		width: 100vw;
		display: flex;
		flex-direction: column;
		padding: 0 40upx 68upx;
		box-sizing: border-box;

		.role-box {
			width: 100%;
			background-color: white;
			border-radius: 24upx;
			display: flex;
			flex-direction: column;

			.role-item {
				width: 100%;
				height: 112upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40upx;
				box-sizing: border-box;
				font-size: 32upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;

				uni-image {
					width: 32upx;
					height: 32upx;
				}
			}

			.divide {
				width: 100%;
				height: 2upx;
				background-color: #E6E6E6;
			}
		}

		.cancel {
			width: 100%;
			margin-top: 16upx;
			height: 112upx;
			line-height: 112upx;
			text-align: center;
			background-color: white;
			border-radius: 24upx;
			font-size: 36upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
</style>
