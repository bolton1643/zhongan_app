<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">默认支付</block>
		</cu-custom>

		<view class="content">
			<view class="basic-info">
				<view class="basic-info-item">
					<text class="basic-info-item-title">店铺名称</text>
					<text class="basic-info-item-info">{{ shopInfoDetail.shopName }}</text>
				</view>
				<!-- <view class="basic-info-item">
					<text class="basic-info-item-title">店铺编号</text>
					<text class="basic-info-item-info">{{ storeInfo.shopNo }}</text> 
				</view> -->
				<view class="basic-info-item">
					<text class="basic-info-item-title">省市区</text>
					<text class="basic-info-item-info">{{ shopInfo.provinceCityCounty }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">详细地址</text>
					<text class="basic-info-item-info">{{ shopInfo.addr }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">店铺类型</text>
					<text class="basic-info-item-info">{{ shopInfo.shopType }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">负责人姓名</text>
					<text class="basic-info-item-info">{{ shopInfoDetail.benifitName }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">第一联系人姓名</text>
					<text class="basic-info-item-info">{{ shopInfoDetail.contact1Name }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">第一联系人电话</text>
					<text class="basic-info-item-info">{{ shopInfoDetail.contact1Phone }}</text>
				</view>
			</view>

			<view class="package-info">
				<view class="package-info-title">{{comboContent.packageName}}</view>
				<view class="package-info-content" style="width: 100%; display: flex; justify-content: space-between; margin: 24upx 0 32upx;"
				 v-for="(item, index) in comboContent.devices" :key="index">
					<text style="width: 50%;">{{item.name}}*1</text>
					<text>￥{{item.price}}</text>
				</view>
				<view class="package-info-title">
					<text>服务费</text>
					<text class="package-info-content" style="text-align: right;">￥{{comboContent.serviceMoney}}</text>
				</view>
				<view class="package-info-content" style="margin: 16upx 0;" v-for="(item, index) in comboContent.services" :key="index">
					{{item.name}}一年
				</view>
				<!-- <view class="package-info-content">
					出警服务一年
				</view>
				<view class="package-info-content" style="margin-top: 16upx;">
					设备维修服务一年
				</view> -->
			</view>

			<view class="increase-info" v-if="comboContent.extracServices ||comboContent.extraDevices">
				<view class="basic-info-item">
					<text class="basic-info-item-title">增加</text>
				</view>
				<view class="basic-info-item" v-for="(item, index) in comboContent.extraDevices" :key="index">
					<text class="basic-info-item-title">{{item.name}} *{{item.amount}}</text>
					<text class="basic-info-item-info" style="color: #333333;">￥{{item.price}}</text>
				</view>
				<view class="basic-info-item" v-for="(item, index) in comboContent.extracServices" :key="index">
					<text class="basic-info-item-title">{{item.name}} *{{item.amount}}</text>
					<text class="basic-info-item-info" style="color: #333333;">￥{{item.price}}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">服务生效时间</text>
					<text class="basic-info-item-info">{{ storeInfo.serviceEffectiveDate }}</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">服务期限（年)</text>
					<text class="basic-info-item-info">{{ storeInfo.serviceDuration }}</text>
				</view>
			</view>

			<view class="upload-image-info-box">
				<view class="upload-image-info-title">
					上传照片
				</view>

				<view class="upload-image-info">
					<view class="content-audiovisual-item">
						<image class="audiovisual-item-image" :src="imageUrl + shopPhoto.gate"></image>
					</view>
					<view class="content-audiovisual-item">
						<image class="audiovisual-item-image" :src="imageUrl + shopPhoto.innerView"></image>
					</view>
					<view class="content-audiovisual-item" v-if="shopPhoto.innerView2">
						<image class="audiovisual-item-image" :src="imageUrl + shopPhoto.innerView2"></image>
					</view>
					<view class="content-audiovisual-item">
						<image class="audiovisual-item-image" :src="imageUrl + shopPhoto.guard"></image>
					</view>
					<view class="content-audiovisual-item">
						<image class="audiovisual-item-image" :src="imageUrl + shopPhoto.id1"></image>
					</view>
					<view class="content-audiovisual-item">
						<image class="audiovisual-item-image" :src="shopPhoto.id2"></image>
					</view>

				</view>
				<view class="btn-box">
					<button class="form-submit-btn" type="primary" @click="goPay">确认支付￥{{comboContent.totalMoney || 0}}</button>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeInfo: {
					shopName: "店铺名称", // 店铺名称
					shopCode: "店铺编码", // 店铺编码
					provinceCityCounty: "区域", // 区域
					addr: "详细地址", // 详细地址
					addrNote: "位置备注", // 位置备注
					longitude: "", // 经度
					latitude: "", // 纬度
					coordinate: "", // 坐标系 1: 百度 2: 腾讯 3: 高德 4: 谷歌
					shopType: "店铺典型", // 店铺典型
					benifitPhone: "受益人姓名", // 受益人姓名
					benifitName: "", // 受益人电话
					contact1Name: "联系姓名", // 联系姓名
					contact1Phone: "联系人电话", // 联系人电话
					contact1Phone: "", // 联系人电话
					contact2Name: "", // 联系姓名
					contact2Phone: "", // 联系人电话
					contact3Name: "", // 联系姓名
					contact3Phone: "", // 联系人电话
					serviceEffectiveDate: "服务生效时间", // 服务生效时间yyyy - mm - dd
					serviceDuration: "服务年限", // 服务年限
					armingStatue: "", // 布撤防状态 0 撤防， 1 布防
					//套餐内容， 含额外数据。 格式如下 
					comboContent: {
						id: "", //套餐标识
						totalMoney: "", //计算后的价格， 前端统计， 后端会根据信息进行校验
						packageName: "", //套餐名称
						deviceMoney: "", //设备价格
						serviceMoney: "", //服务价格
						devices: [{
							name: "", //设备名称
							price: "", //价格
							amount: "" //数量， 这里默认一份
						}],
						services: [{
							name: "", //服务名称
							price: "", //服务年费
							amount: "", //数量， 这里默认一份
						}],
						extraDevices: [], //参照devices， 数量可以多个
						extracServices: [], //参照services， 数量可以多份
					},
					//对应图片
					// shopPhoto: {
					// 	gate: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg", // 门头照
					// 	innerView: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg", // 内景
					// 	innerView2: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg", // 内景
					// 	guard: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg", // 防区图
					// 	id1: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg", // 身份证
					// 	id2: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg" // 身份证
					// }
				},
				imageUrl: 'http://47.111.166.221:8080/api/cuser/public/images/',
				totalPrice: 899,
				shopId: "",
				applyId: "",
				shopInfo: {},
				shopInfoDetail: {},
				comboContent: {},
				shopPhoto: {}
			}
		},

		onLoad: function(options) {
			this.shopInfo = JSON.parse(options.shopInfo);
			this.shopInfoDetail = JSON.parse(this.shopInfo.shopInfo);
			this.shopPhoto = JSON.parse(this.shopInfoDetail.shopPhoto);
			this.comboContent = JSON.parse(this.shopInfoDetail.comboContent);
			console.log(this.shopPhoto)
		},

		mounted: function() {
			uni.getStorage({
				key: 'smart_c_shopList',
				success: (res) => {
					console.log(res);
					this.shopId = res.data[0].shopId;
					this.getDetail();
				}
			});
		},

		methods: {
			getDetail: function() {
				this.$tui.request("/shop/info/" + this.shopId, "GET").then(data => {
					if (data.success) {
						this.storeInfo = data.result;
						this.storeInfo.comboContent = JSON.parse(data.result.comboContent);
						this.storeInfo.shopPhoto = JSON.parse(data.result.shopPhoto);
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
				});
			},

			goPay: function() {
				uni.navigateTo({
					url: "../homepage/pay/pay?applyId=" + this.shopInfo.applyId + '&totalMoney=' + this.comboContent.totalMoney
				})
			}
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #f0f0f0;

		.content {
			width: 100%;
			margin-top: 40upx;

			.basic-info,
			.increase-info {
				width: 100%;
				background-color: white;
				border-bottom: 1px #E6E6E6 solid;

				.basic-info-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 40upx;
					box-sizing: border-box;
					border-top: 1px #E6E6E6 solid;

					.basic-info-item-title {
						flex: 2;
						font-size: 32upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.basic-info-item-info {
						flex: 3;
						font-size: 28upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: rgba(153, 153, 153, 1);
						text-align: right;
					}
				}
			}

			.package-info {
				width: 100%;
				margin-top: 32upx;
				background-color: white;
				padding: 32upx 40upx 48upx;
				box-sizing: border-box;

				.package-info-title {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 32upx;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.package-info-content {
					width: 50%;
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

			.increase-info {
				margin-top: 32upx;
			}

			.upload-image-info-box {
				width: 100%;
				margin-top: 32upx;
				background-color: white;
				padding: 32upx 40upx 68upx;
				box-sizing: border-box;


				.upload-image-info-title {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 32upx;
				}

				.upload-image-info {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.content-audiovisual-item {
						width: 50%;
						margin-bottom: 32upx;

						.audiovisual-item-image {
							width: 100%;
							height: 194upx;
							border-radius: 12upx;
						}
					}

					.content-audiovisual-item:nth-child(odd) {
						padding-right: 16upx;
						box-sizing: border-box;
					}

					.content-audiovisual-item:nth-child(even) {
						padding-left: 16upx;
						box-sizing: border-box;
					}
				}

				.btn-box {
					width: 100%;
					padding: 80upx 40upx 0;
					box-sizing: border-box;

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
		}
	}
</style>
