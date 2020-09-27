<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">智能客服</block>
		</cu-custom>

		<view class="content-box">
			<view class="chat-box">
				<view class="default-chat">
					<view class="default-chat-time">{{ defaultChatTime }}</view>
					<view class="default-chat-greeting">
						<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png"></image>
						<view class="greeting-box">
							<view class="triangle-left"></view>
							<view class="greeting">
								<view class="greeting-one">您好，我是智能客服小守，很高兴为您服务</view>
								<view class="greeting-two">您可以选择下面热门问题</view>
								<view class="greeting-three">您可以输入框中简述您的问题哦</view>
							</view>
						</view>
					</view>
					<view class="default-chat-ask">
						<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png"></image>
						<view class="ask-box">
							<view class="triangle-left"></view>
							<view class="ask">
								<view class="ask-one">猜您想问</view>
								<view class="divide"></view>
								<view class="ask-two">新手指南</view>
								<view class="ask-three">设备故障怎么办？</view>
								<view class="ask-four">我要续费？</view>
								<view class="ask-five">其他</view>
							</view>
						</view>
					</view>
					<view class="default-chat-operating">
						<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png" style="opacity: 0;"></image>
						<view class="operating-box">
							<view class="triangle-left"></view>
							<view class="operating">
								<view class="operating-item" @click="goNext('./evaluation-list')">
									<image class="operating-img" src="/static/image/message/pingjia.png"></image>
									<text class="operating-text">评价</text>
								</view>
								<view class="operating-item">
									<image class="operating-img" src="/static/image/message/icon-test.png"></image>
									<text class="operating-text">投诉</text>
								</view>
								<view class="operating-item">
									<image class="operating-img" src="/static/image/message/ziyuan.png"></image>
									<text class="operating-text">续费</text>
								</view>
								<view class="operating-item">
									<image class="operating-img" src="/static/image/message/huodong.png"></image>
									<text class="operating-text">活动</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="chat-list-box">
					<view class="chat-item" v-for="(item, index) in chatList" :key="index">
						<view class="chat-item-time" v-if="item.time">{{ item.time }}</view>
						<view class="sender-box" v-if="item.isSender">
							<view class="sender-text">{{ item.message }}</view>
							<view class="triangle-right"></view>
							<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png"></image>
						</view>
						<view v-else-if="item.messageType === 'evaluation'" class="evaluation-box">
							<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png"></image>
							<view class="triangle-left"></view>
							<view class="evaluation">
								<view class="evaluation-text-title">您有一个已完成的维修单</view>
								<view class="evaluation-desp">欢迎您来评价哦~您的评价就是我们努力的 动力~</view>
								<view class="divide"></view>
								<view class="evaluation-btn">去评价</view>
							</view>
						</view>
						<view v-else-if="item.messageType === 'text'" class="system-text-box">
							<image class="robot-avatar" src="/static/homepage/icon-smart-customer-service.png"></image>
							<view class="triangle-left"></view>
							<view class="system-text">{{ item.message }}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="input-box">
				<input v-model="content" class="input-style" placeholder-class="placeholder-style" placeholder="请输入您的问题~" />
				<text class="send-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				defaultChatTime: new Date().toLocaleString(),
				chatList: [{
						isSender: false,
						messageType: "evaluation",
						time: new Date().toLocaleString()
					},
					{
						isSender: true,
						messageType: "text",
						message: "测试消息测试消息",
						time: new Date().toLocaleString()
					},
					{
						isSender: false,
						messageType: "text",
						message: "测试消息测试消息",
						time: ""
					},
					{
						isSender: true,
						messageType: "text",
						message: "测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息",
						time: ""
					}
				]
			}
		},

		onLoad: function(options) {},

		methods: {
			goNext(url) {
				uni.navigateTo({
					url: url
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.page-box {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.content-box {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #F0F0F0;
			position: relative;
			overflow: hidden;

			.chat-box {
				flex: 1;
				width: 100%;
				overflow: auto;
				margin-bottom: 116upx;
				padding: 0 40upx 40upx;
				box-sizing: border-box;

				.default-chat {
					width: 100%;

					.default-chat-time {
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						text-align: center;
					}

					.default-chat-greeting,
					.default-chat-ask {
						width: 100%;
						display: flex;
						margin-top: 40upx;

						.greeting-box,
						.ask-box {
							display: flex;

							.greeting,
							.ask {
								width: calc(100vw - 230upx);
								background-color: white;
								display: flex;
								flex-direction: column;
								padding: 32upx;
								box-sizing: border-box;
								border-radius: 0 16upx 16upx 16upx;

								.greeting-one {
									font-size: 28upx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: bold;
									color: #333333;
									line-height: 40upx;
								}

								.greeting-two,
								.greeting-three {
									font-size: 24upx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
									margin-top: 16upx;
								}

								.ask-one {
									font-size: 28upx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: bold;
									color: #333333;
								}


								.ask-two,
								.ask-three,
								.ask-four,
								.ask-five {
									font-size: 28upx;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									color: #333333;
									margin-bottom: 40upx;
								}

								.ask-five {
									margin-bottom: 0;
								}
							}
						}
					}

					.default-chat-operating {
						width: 100%;
						display: flex;
						margin-top: 32upx;

						.operating-box {
							display: flex;

							.operating {
								width: calc(100vw - 230upx);
								background-color: white;
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 32upx;
								box-sizing: border-box;
								border-radius: 0 16upx 16upx 16upx;

								.operating-item {
									display: flex;
									flex-direction: column;
									align-items: center;

									.operating-img {
										width: 68upx;
										height: 68upx;
										border-radius: 100%;
									}

									.operating-text {
										font-size: 28upx;
										font-family: PingFang-SC-Medium, PingFang-SC;
										font-weight: 500;
										color: #999999;
										margin-top: 16upx;
									}
								}
							}
						}
					}
				}

				.chat-list-box {
					width: 100%;
					margin-top: 40upx;

					.chat-item {
						width: 100%;
						display: flex;
						flex-direction: column;

						.chat-item-time {
							font-size: 24upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
							text-align: center;
							margin-bottom: 40upx;
						}

						.sender-box {
							width: 100%;
							display: flex;
							justify-content: flex-end;
							margin-bottom: 40upx;

							.sender-text {
								max-width: calc(100vw - 230upx);
								background-color: #66B7FC;
								padding: 32upx;
								box-sizing: border-box;
								border-radius: 16upx 0 16upx 16upx;
								font-size: 28upx;
								font-family: PingFang-SC-Medium, PingFang-SC;
								font-weight: 500;
								color: #FFFFFF;
							}
						}

						.system-text-box {
							width: 100%;
							display: flex;
							margin-bottom: 40upx;

							.system-text {
								max-width: calc(100vw - 230upx);
								background-color: white;
								padding: 32upx;
								box-sizing: border-box;
								border-radius: 16upx 0 16upx 16upx;
								font-size: 28upx;
								font-family: PingFang-SC-Medium, PingFang-SC;
								font-weight: 500;
								color: #333333;
							}
						}

						.evaluation-box {
							width: 100%;
							display: flex;
							margin-bottom: 40upx;

							.evaluation {
								width: calc(100vw - 230upx);
								background-color: white;
								display: flex;
								flex-direction: column;
								padding: 32upx;
								box-sizing: border-box;
								border-radius: 0 16upx 16upx 16upx;

								.evaluation-text-title {
									font-size: 28upx;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									color: #333333;
								}

								.evaluation-desp {
									font-size: 24upx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
									line-height: 36upx;
									margin-top: 16upx;
								}

								.evaluation-btn {
									text-align: center;
									font-size: 28upx;
									font-family: PingFang-SC-Medium, PingFang-SC;
									font-weight: 500;
									color: #1676FE;
								}
							}
						}
					}
				}

				.robot-avatar {
					width: 68upx;
					height: 68upx;
					border-radius: 100%;
					background-color: #F0F0F0;
				}

				.triangle-left {
					width: 0;
					height: 0;
					border-top: 14upx solid white;
					border-top-left-radius: 6upx;
					border-left: 14upx solid transparent;
					margin-right: -2upx;
				}

				.triangle-right {
					width: 0;
					height: 0;
					border-top: 14upx solid #66B7FC;
					border-top-right-radius: 6upx;
					border-right: 14upx solid transparent;
					margin-left: -2upx;
				}

				.divide {
					width: 100%;
					height: 1upx;
					background-color: #EDEDED;
					margin: 30upx 0;
				}

			}

			.input-box {
				width: 100%;
				height: 116upx;
				display: flex;
				align-items: center;
				padding: 0 40upx;
				box-sizing: border-box;
				background-color: white;
				box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.04);
				position: absolute;
				bottom: 0;

				.input-style {
					flex: 1;
					height: 84upx;
					line-height: 84upx;
					background-color: #F0F0F0;
					border-radius: 16upx;
					margin-right: 16upx;
					padding: 0 32upx;
					box-sizing: border-box;

					.placeholder-style {
						font-size: 28upx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #999999;
					}
				}

				.send-text {
					font-size: 36upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #1676FE;
				}
			}
		}
	}
</style>
