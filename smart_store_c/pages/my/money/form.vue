<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">智慧门店APP</block>
		</cu-custom>
		<view class="content-wrapper">
			<view class="tips">
				填写您的基本信息提交，我们会有专业工作人员在2个工作日内联系您~
			</view>
			<div class="form-content-input">
				<div class="input-title">姓名</div>
				<input class="input-content" placeholder="请输入姓名" type="number" maxlength="11" />
				</uni-icons>
			</div>
			<div class="form-content-input">
				<div class="input-title">手机号</div>
				<input class="input-content" placeholder="请输入手机号" type="number" maxlength="11" />
				</uni-icons>
			</div>
			<div class="form-content-input">
				<div class="input-title">验证码</div>
				<input class="input-content" placeholder="请输入验证码" />
				<text class="count-down">获取验证码</text>
			</div>
			<div class="form-content-input">
				<div class="input-title">省市区</div>
				<input class="input-content" placeholder="请选择门店所在省市区" type="number" maxlength="11" />
				</uni-icons>
			</div>
			<div class="form-content-input">
				<div class="input-title">详细地址</div>
				<input class="input-content" placeholder="请输入详细地址" type="number" maxlength="11" />
				</uni-icons>
			</div>
			<div class="form-content-input">
				<div class="input-title">备注</div>
				<input class="input-content" placeholder="" type="number" maxlength="11" />
				</uni-icons>
			</div>
			
			
			<view class="btn">提交</view>
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
		background-color: #fff;
		
		.page-box {
			.record{
				position: absolute;
				right: 0;
			}
			width: 100%;

			.content-wrapper {
				background-color: #fff;
				width: 100%;
				padding: 30upx 80upx 80upx 80upx;
				display: flex;
				flex-direction: column;
				
				.tips{
					width: 100%;
					line-height: 40upx;
					background:rgba(247,246,251,1);
					border-radius:8upx;
					padding: 20upx 20upx 14upx 20upx;
					margin-bottom: 20upx;
					color: #A9A9A9;
				}
				
				.btn{
					width:590upx;
					height:112upx;
					line-height: 112upx;
					background:rgba(22,118,254,1);
					border-radius:56upx;
					text-align: center;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
					position: fixed;
					bottom: 80upx;
					left: 50%;
					margin-left: -295upx;
					font-size: 36upx;
				}
				
				.form-content-input {
					height: 112upx;
					width: 100%;
					border-bottom: 2upx solid #e6e6e6;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 36upx;
					color: #474747;
				
					&.password-input {
						.input-title {
							width: 104upx;
							flex: 104upx 0 0;
						}
				
						.input-content {
							padding: 0 28upx 0 64upx;
						}
					}
				
					.input-title {
						width: 144upx;
						flex: 144upx 0 0;
						display: flex;
						justify-content: space-between;
						font-weight: 500;
						height: 44upx;
						align-items: center;
					}
				
					.input-tip {
						width: 24upx;
						height: 44upx;
						margin: 0 24upx 0 16upx;
						padding: 12upx 0 8upx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
				
						image {
							width: 24upx;
							height: 24upx;
						}
					}
				
					.input-tip-look {
						width: 46upx;
						height: 100%;
						display: flex;
						align-items: center;
						flex: 46upx 0 0;
						margin-left: 10upx;
				
						&.active {
							color: #007AFF !important;
						}
					}
				
					.input-content {
						flex: 1 0 0;
						font-size: 36upx;
						letter-spacing: 2upx;
						padding: 0 28upx;
						box-sizing: border-box;
				
						.input-placeholder {
							font-size: 32upx;
							color: #D2D2D6;
						}
					}
					
					.count-down {
						color: #1676FE;
						font-size: 28upx;
					} 
					
					.count-down-normal {
						font-size: 28upx;
						color: #999999;
					}
				}
			}
			
		}
	}
</style>
