<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">理赔详情</block>
		</cu-custom>
		<view class="content-wrapper">
			<view class="list tel">
				<view>
					<!-- <image src="../../static/my/kf.png"></image> -->
					<text>客服热线</text>
					<text>400-030-1530</text>
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
		
		methods: {
			search() {},

			input() {

			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #f0f0f0;
		.page-box {
			width: 100%;
			.content-wrapper {
				width: 100%;
				position: relative;
				overflow-y: auto;

				.list{
					background-color: #fff;
					padding: 120upx 40upx 0 40upx;
					& > view{
						height: 112upx;
						border-bottom: 1upx solid #EDEDED;
						position: relative;
						// background: url(../../static/my/arrow.png) no-repeat right center;
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

				
			}
		}
	}
</style>
