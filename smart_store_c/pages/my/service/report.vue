<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">服务报表</block>
		</cu-custom>
		<view class="content-wrapper">
			<text class="time">「2020年7月15日」</text>
			<text class="intro">您的店铺已进行安全保障<text class="blue">100天</text>，这100天里我们实时与您相伴</text>
			<image src="../../../static/my/service/2.png"></image>
			<text class="time">「2020年7月15日」</text>
			<text class="intro">本月您共收到<text class="f50 blue">10次</text>布防提醒，<text class="gray"><text class="blue fn f35">五次</text>电话回访，<text class="blue fn f35">0次</text>被盗，<text class="blue fn f35">一次</text>警告通知</text></text>
			<image src="../../../static/my/service/3.png"></image>
			<text class="time">「2020年7月15日」</text>
			<text class="intro">一次<text class="f50 blue">到期</text>提醒</text>
			<image src="../../../static/my/service/4.png"></image>
			<text class="time">「2020年7月15日」</text>
			<text class="intro">您共查看了<text class="f50 blue">10次</text>视频</text>
			<image src="../../../static/my/service/5.png"></image>
			
			
			<text class="time">「2020年7月15日」</text>
			<text class="intro">看到您很关注<text class="f50 blue">客流</text>统计</text>
			<image src="../../../static/my/service/6.png"></image>
			
			<text class="time">「2020年7月15日」</text>
			<text class="intro bl">您发起了一次<text class="f50 blue">维修</text></text>
			<text class="gray fn">我们的维修人员在<text class="red f35">48</text>小时内为您完成了维修</text>
			<image src="../../../static/my/service/7.png"></image>
			
			<text class="time">「2020年7月15日」</text>
			<text class="intro bl">您发起了一次保险<text class="f50 blue">理赔</text></text>
			<text class="gray fn">目前还在<text class="red f30">审核中</text></text>
			<image src="../../../static/my/service/8.png"></image>
			
			<text class="time">「2020年7月15日」</text>
			<text class="intro bl">您邀请了<text class="f50 blue">2个</text>好友</text>
			<text class="gray fn">还得到 <text class="red f30">200元</text>的红包</text>
			<image src="../../../static/my/service/9.png"></image>
			
			
			<view class="blue subjest">欢迎您随时给我们提出宝贵的意见希望您对我们的服务感到满意。</view>
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
				& > image{
					width: 100%;
					margin: 30upx 0 60upx 0;
				}
				& > text{
					font-family:PingFang-SC-Heavy,PingFang-SC;
				}
				& > .time{
					font-size: 32upx;
					font-weight:800;
					color:rgba(22,118,254,1);
					display: block;
					line-height: 44upx;
					margin-bottom: 30upx;
				}
				& > .intro{
					font-size: 52upx;
					font-weight:800;
					color:rgba(51,51,51,1);
					line-height: 96upx;
				}
				.blue{
					color: #1676FE;
				}
				.f50{
					font-size: 100upx;
				}
				.f35{
					font-size: 70upx;
				}
				.fn{
					font-weight: normal;
				}
				.gray{
					color: #666;
					font-size: 50upx;
					font-weight: normal;
				}
				.bl{
					display: block;
				}
				.red{
					color: #f00;
				}
				.subjest{
					font-size: 44upx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(22,118,254,1);
					line-height: 88upx;
					text-align: center;
					padding: 50upx 0;
				}
			}
			
		}
	}
</style>
