<template>
	<view class="page-box">
		<view class="content-wrapper">
			<view class="h">
				<text>我的</text>
				<view>
					<image src="../../static/my/avatar.png"></image>
					<text>我的昵称</text>
					<text>18201998658</text>
				</view>
			</view>
			
			<view class="list">
				<view @click="handleReLaunch('../my/service/service')">
					<image src="../../static/my/service.png"></image>
					<text>我的服务</text>
				</view>
				<view @click="handleReLaunch('../my/myShop/myShop')">
					<image src="../../static/my/shop.png"></image>
					<text>我的店铺</text>
				</view>
				<view @click="handleReLaunch('../my/repair/repair')">
					<image src="../../static/my/wx.png"></image>
					<text>我的维修</text>
				</view>
				<view @click="handleReLaunch('../my/myClaim/myClaim')">
					<image src="../../static/my/lp.png"></image>
					<text>我的理赔</text>
				</view>
				<view @click="handleReLaunch('../my/myBean/index')">
					<image src="../../static/my/jd.png"></image>
					<text>我的金豆</text>
				</view>
				<view @click="handleReLaunch('../my/money/index')">
					<image src="../../static/my/money.png"></image>
					<text>我要挣钱</text>
				</view>
				<view>
					<image src="../../static/my/pw.png"></image>
					<text>修改密码</text>
				</view>
			</view>
			<view class="list tel">
				<view>
					<image src="../../static/my/kf.png"></image>
					<text>客服热线</text>
					<text>400-030-1530</text>
				</view>
			</view>
		
			<view class="exit">退出</view>
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
				uni.navigateTo({
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
			width: 100%;

			.content-wrapper {
				width: 100%;

				.h{
					background-color: #55B9FE;
					height: 300upx;
					position: relative;
					& > text{
						font-size: 52upx;
						position: absolute;
						left: 42upx;
						top: 50upx;
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight: 600;
						color:rgba(255,255,255,1);
					}
					& > view {
						background-color: #fff;
						width: 670upx;
						height: 240upx;
						position: absolute;
						left: 50%;
						margin-left: -335upx;
						bottom: -92upx;
						border-top-left-radius: 16upx;
						border-top-right-radius: 16upx;
						box-shadow:  0 14upx 20upx #EFF4F9;
						& > image{
							width: 128upx;
							height: 128upx;
							position: absolute;
							left: 60upx;
							top: 50upx;
							height: 128upx;
							width: 128upx;
						}
						& > text{
							font-family:PingFangSC-Medium,PingFang SC;
							&:nth-of-type(1){
								position: absolute;
								left: 220upx;
								top: 70upx;
								color: rgba(51,51,51,1);
								font-size: 40upx;
								font-weight: 500;
							}
							&:nth-of-type(2){
								position: absolute;
								left: 220upx;
								top: 128upx;
								color: rgba(153,153,153,1);;
								font-size: 28upx;
								font-weight: normal;
							}
						}
					}
				}
				
				.list{
					background-color: #fff;
					padding: 120upx 40upx 0 40upx;
					& > view{
						height: 112upx;
						border-bottom: 1upx solid #EDEDED;
						position: relative;
						background: url(../../static/my/arrow.png) no-repeat right center;
						background-size: 32upx 32upx;
						& > image{
							width: 44upx;
							height: 44upx;
							position: absolute;
							left: 0;
							top: 34upx;
						}
						& > text{
							font-family:PingFangSC-Regular,PingFang SC;
							position: relative;
							font-weight:400;
							&:nth-of-type(1){
								left: 66upx;
								line-height: 112upx;
								font-size: 32upx;
								color:rgba(51,51,51,1);
							}
							&:nth-of-type(2){
								right: 38upx;
								line-height: 112upx;
								position: relative;
								font-size: 28upx;
								float: right;
								color: #999;
							}
						}
						&:last-child{
							border-bottom: 0 none;
						}
					}
					
				}
				
				.tel{
					padding: 0 40upx;
					border-top: 20upx solid #f0f0f0;
				}
				
				.exit{
					width:100%;
					height:112upx;
					background:rgba(22,118,254,1);
					font-size: 36upx;
					text-align: center;
					color: #fff;
					line-height: 112upx;
					border-top: 40upx solid #f0f0f0;
					border-bottom: 40upx solid #f0f0f0;
					box-sizing: content-box;
				}
			}
		}
	}
</style>
