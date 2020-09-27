<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">服务详情</block>
		</cu-custom>

		<view class="content">
			<view class="content-item" v-for="(item, index) in contentData" :key="index">
				<text class="item-title" v-text="item.title"></text>
				<text class="item-content" v-text="item.content"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentData: [{
						title: "1.智慧门店是什么？",
						content: "智慧门店拥有全方位的安全防护，通过智能设备的接入，您可以自由控制门店的放回状态，当您的门店处于防护中时，一旦有人闯入，我们会第一时间安排值守人员到店内查看，并且在您的财产发生损失时，及时给您妥善的解决方案。"
					},
					{
						title: "2.如何开通智慧门店服务？",
						content: ""
					},
					{
						title: "3.开通之后能享受到那些服务？",
						content: ""
					},
					{
						title: "4.如何收费的",
						content: ""
					}
				]
			}
		},

		onLoad: function(options) {},

		mounted: function() {
			this.getServiceDetail();
		},

		methods: {
			getServiceDetail: function() {
				this.$tui.request("/public/service", "GET").then(data => {
					if (data.success) {

					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							position: 'bottom'
						});
					}
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

		.content {
			width: 100%;
			padding: 40upx;
			box-sizing: border-box;

			.content-item {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item-title {
					width: 100%;
					line-height: 44upx;
					font-size: 32upx;
					font-family: PingFang-SC-Medium, PingFang-SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.item-content {
					width: 100%;
					line-height: 56upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					margin: 32upx 0;
				}
			}
		}
	}
</style>
