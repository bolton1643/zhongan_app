<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">告警详情</block>
		</cu-custom>

		<view class="content">
			<view class="content-desp">
				<view class="desp-item">
					<text class="desp-item-text" v-text="detailData.shopName"></text>
					<!-- <text class="desp-item-text" v-text="`${detailData.description}（${detailData.devSerialNo}）`"></text> -->
					<text class="desp-item-value"></text>
				</view>
				<view class="divide"></view>
				<view class="desp-item">
					<text class="desp-item-text">首次报警时间</text>
					<text class="desp-item-value" v-text="detailData.alarmTimeFirst"></text>
				</view>
				<view class="divide"></view>
				<view class="desp-item">
					<text class="desp-item-text">最后报警时间</text>
					<text class="desp-item-value" v-text="detailData.alarmTimeLast"></text>
				</view>
				<view class="divide"></view>
				<view class="desp-item">
					<text class="desp-item-text">报警次数</text>
					<text class="desp-item-value" v-text="`${detailData.alarmCount}次`"></text>
				</view>
			</view>

			<view class="content-audiovisual">
				<view class="content-audiovisual-item" v-for="(item, index) in videoList" :key="index" @click="showModal(item)">
					<view class="audiovisual-item-video-content" v-if="item.type === 'video'">
						<video class="audiovisual-item-video" :src="item.url" :controls="false" :muted="true" style="position: relative;">
							<cover-view style="background-color: transparent; width: 100%; height: 100%; position: absolute; z-index: 10;"
							 @click="showModal(item)"></cover-view>
						</video>
						<text class="audiovisual-item-text" v-text="item.title"></text>
					</view>
					<image class="audiovisual-item-image" v-else-if="item.type === 'image'" :src="item.url"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {},
				videoList: [{
						url: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
						title: "20200503001.wmv",
						type: "video"
					},
					{
						url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
						type: "image"
					},
					{
						url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
						type: "image"
					},
					{
						url: 'http://qiniu.zaizaihome.com//videob0495abb83d30f70def3b17f2dfe6843.mp4',
						title: "20200503001.wmv",
						type: "video"
					},
					{
						url: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
						title: "20200503001.wmv",
						type: "video"
					},
					{
						url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
						type: "image"
					},
					{
						url: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
						title: "20200503001.wmv",
						type: "video"
					},
					{
						url: 'http://qiniu.zaizaihome.com//videob0495abb83d30f70def3b17f2dfe6843.mp4',
						title: "20200503001.wmv",
						type: "video"
					}
				]
			}
		},

		onLoad: function(options) {
			console.log(options);
			this.detailData = JSON.parse(options.param);

			this.videoList = [];
			if (this.detailData.alarmImages) {
				for (let s of JSON.parse(this.detailData.alarmImages)) {
					const obj = {
						url: s,
						type: "image"
					}
					this.videoList.push(obj);
				}
			}

			if (this.detailData.alarmVideos) {
				for (let z of JSON.parse(this.detailData.alarmVideos)) {
					const param = {
						url: z,
						type: "video",
						title: ""
					}
					this.videoList.push(param);
				}
			}
		},

		methods: {
			showModal: function(e) {
				uni.navigateTo({
					url: "./videoOrImageDetail?type=" + e.type + "&url=" + e.url
				})
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

			.content-desp {
				width: 100%;
				padding: 36upx 40upx;
				box-sizing: border-box;
				background-color: white;
				margin-top: 40upx;

				.desp-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.desp-item-text {
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						word-break: break-all;
					}

					.desp-item-value {
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}

				.divide {
					width: 100%;
					height: 2upx;
					background-color: #EDEDED;
					margin: 36upx 0;
				}
			}

			.content-audiovisual {
				width: 100%;
				margin-top: 32upx;
				background-color: white;
				padding: 40upx 40upx 0;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.content-audiovisual-item {
					width: 50%;
					margin-bottom: 32upx;

					.audiovisual-item-video-content {
						width: 100%;
						display: flex;
						flex-direction: column;

						.audiovisual-item-video {
							width: 100%;
							height: 196upx;
							border-radius: 12upx;
						}

						.audiovisual-item-text {
							width: 100%;
							margin-top: 16upx;
							font-size: 28upx;
							font-family: PingFang-SC-Medium, PingFang-SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
						}
					}

					.audiovisual-item-image {
						width: 100%;
						height: 196upx;
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
		}
	}
</style>
