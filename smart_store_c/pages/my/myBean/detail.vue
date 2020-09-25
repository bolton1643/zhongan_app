<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">兑换明细</block>
		</cu-custom>
		<view class="content-wrapper">
			<view class="list">
				<view>
					<text>兑换</text>
					<text>2020-5-3 11:20:20</text>
					<text>+200.00</text>
				</view>
				<view>

					<text>兑换</text>
					<text>2020-5-3 11:20:20</text>
					<text>+400.00</text>
				</view>
				<view>
					<text>兑换</text>
					<text>2020-5-3 11:20:20</text>
					<text>+600.00</text>
				</view>
				<view>
					<text>兑换</text>
					<text>2020-5-3 11:20:20</text>
					<text>+300.00</text>
				</view>
			</view>
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
				padding: 0;
				.list{
					background-color: #fff;
					border-top: 1upx solid #EDEDED;
					& > view{
						border-bottom: 1upx solid #EDEDED;
						padding: 40upx 40upx 40upx 40upx;
						position: relative;
						
						& > text{
							font-family:PingFangSC-Medium,PingFang SC;
							display: block;
							&:nth-of-type(1){
								font-size: 32upx;
								font-weight:500;
								color:rgba(51,51,51,1);
							}
							&:nth-of-type(2){
								font-size: 28upx;
								font-weight:400;
								color:rgba(153,153,153,1);
							}
							&:nth-of-type(3){
								font-size:32upx;
								font-weight:500;
								color:rgba(51,51,51,1);
								position: absolute;
								right: 40upx;
								height: 40upx;
								top: 50%;
								margin-top: -20upx;
							}
						}
					}
				}
			}
			
		}
	}
</style>
