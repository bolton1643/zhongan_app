<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">活动规则</block>
		</cu-custom>
		<view class="content-wrapper">
			<text>1. 您分享的用户必须是未下载过智慧门店的新用户，其通过您的链接注册成为客户，并登录app申请安保服务后正式成为客户， 您将获得6665元现金红包，可直接提现到您的支付宝账户。</text>
			<text>2. 现金红包会于您的好友成为我们正式客户后的24小时内发放</text>
			<text>3. 活动时间为2020-5-3-2020-7-31，平台拥有对活动的一切解释权。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
			}
		},

		onLoad: function(options) {},

		mounted: function() {
			
		},

		methods: {
			handleReLaunch(url){
				uni.reLaunch({
					url: `${url}`,
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f0f0f0;
		
		.page-box {
			.record{
				position: absolute;
				right: 0;
			}
			width: 100%;

			.content-wrapper {
				background-color: #fff;
				width: 100%;
				padding: 40upx 40upx 0 40upx;
				& > text{
					display: block;
					font-size:32upx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
					padding-bottom: 40upx;
				}
			}
			
		}
	}
</style>
