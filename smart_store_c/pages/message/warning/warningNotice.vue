<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">告警通知</block>
		</cu-custom>
		<view class="content">
			<view class="content-item" v-for="(item, index) in listData" :key="index" @click="goDetail(item)">
				<text class="item-date" v-text="item.alarmTimeLast.split(' ')[0]"></text>
				<!-- v-for="(iterator, sub) in item.children" :key="sub" -->
				<view class="item-content">
					<text class="item-content-store-info" v-text="item.shopName"></text>
					<!-- <text class="item-content-store-info" v-text="`${item.description}（${item.devSerialNo}）`"></text> -->
					<text class="item-content-time" v-text="item.alarmTimeLast.split(' ')[1]"></text>
				</view>
			</view>
			<text class="loading-text">
				{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jsonData: {
					listData: [],
					pagesCount: 20
				},
				listData: [{
					sourceType: 3,
					devSerialNo: "EBFF1910ADC8437C11178B0057663536",
					alarmTimeFirst: "2020-08-19 20:01:31",
					alarmTimeLast: "2020-08-19 20:01:31",
					alarmCount: 8, // 报警次数
					description: "区域进入检测",
					hostId: "64767a9cbd234301acc46ebb457ce385",
					type: 1,
					channelIndex: 1,
					alarmId: "c2367a9cbd23db01acc46ebb457ce964",
					alarmCode: "100",
					alarmImages: [
						"https://qingzhao-oss.oss-cn-hangzhou.aliyuncs.com/111111/101_HOST111111_CH1_20200511160209_00000002.jpg"
					],
					alarmVideos: ["https://qingzhao-oss.oss-cn-hangzhou.aliyuncs.com/111111/20200822193718_1_103.mp4"]
				}],
				loadingType: 2,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				page: 1,
				rows: 5
			}
		},

		onLoad: function(options) {
			this.getNewsList();
		},

		// 下拉刷新
		onPullDownRefresh: function() {
			this.getNewsList();
		},

		// 上拉加载
		onReachBottom: function() {
			return;
			if (this.loadingType !== 0) {
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading();
			// uni.request({
			// 	url: './noticeList.json?page=' + this.page,
			// 	success: function(res) {
			if (this.listData.length === this.jsonData.pagesCount) {
				this.loadingType = 2;
				uni.hideNavigationBarLoading();
				return false;
			}
			this.page++;
			let list = [];
			for (var i = this.listData.length; i < this.listData.length + this.rows; i++) {
				list.push(this.jsonData.listData[i]);
			}
			this.listData = this.listData.concat(list); //将数据拼接在一起
			this.loadingType = 0; //将loadingType归0重置
			uni.hideNavigationBarLoading(); //关闭加载动画
			// uni.showToast({
			// 	title: "加载成功",
			// 	duration: 2000
			// });
			// // 	}
			// });
		},

		methods: {
			getNewsList: function() {
				// this.loadingType = 0;
				// this.page = 1;
				this.listData = [];
				// uni.showNavigationBarLoading();
				// uni.request({
				// 	url: './noticeList.json?page=' + this.page,
				// 	success: function(res) {
				// let list = [];
				// for (var i = 0; i < this.rows; i++) {
				// 	list.push(this.jsonData.listData[i]);
				// }
				// this.listData = list;
				// uni.hideNavigationBarLoading();
				// uni.stopPullDownRefresh();

				// if (this.listData.length === this.jsonData.pagesCount) {
				// 	this.loadingType = 2;
				// }

				// 	}
				// });

				this.$tui.request("/shop/alarmMessage", "GET").then(data => {
					if (data.success) {
						this.listData = data.result.data;
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
				});
			},

			goDetail: function(data) {
				uni.navigateTo({
					url: '/pages/message/warning/warningDetails?param=' + JSON.stringify(data)
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #f0f0f0;

		.content {
			width: 100%;

			.content-item {
				width: 100%;
				padding: 0 40upx;
				box-sizing: border-box;
				margin-top: 40upx;

				.item-date {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.item-content {
					width: 100%;
					background-color: white;
					border-radius: 24upx;
					padding: 36upx 32upx 84upx 40upx;
					box-sizing: border-box;
					margin-top: 20upx;
					display: flex;
					justify-content: space-between;

					.item-content-store-info {
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						word-break: break-all;
					}

					.item-content-time {
						font-size: 24upx;
						font-family: SanFranciscoText-Regular, SanFranciscoText;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						margin-left: 20upx;
					}
				}
			}

			.loading-text {
				height: 100upx;
				line-height: 100upx;
				display: flex;
				justify-content: space-around;
			}
		}
	}
</style>
