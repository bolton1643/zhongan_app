<template>
	<view class="page-box">
		<cu-custom bgColor="bg-blue" :isBack="true" class="cu-custom-class">
			<block slot="content">邀请好友</block>
		</cu-custom>
		<view class="content-wrapper">
			<view class="rule" @click="handleReLaunch('../money/intro')">活动规则</view>
			<view class="btn" @click="handleInvitation(true)"></view>
			<text class="iv" @click="handleReLaunch('../money/invitation')">我的邀请 ></text>
			
			
			<view class="invitation-layer-mask" v-if="invitationState"></view>
			<view class="invitation-list" v-if="invitationState">
				<view><image src="../../../static/my/money/wx.png"></image>微信</view>
				<view><image src="../../../static/my/money/pyq.png"></image>朋友圈</view>
			</view>
			<view class="invitation-btn" v-if="invitationState" @click="handleInvitation(false)">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitationState: false
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
			},
			handleInvitation(state){
				this.invitationState = state
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
			height: 100%;
			display: flex;
			.content-wrapper {
				background-color: #fff;
				width: 100%;
				background: url(../../../static/my/money/bg.png) no-repeat 0 0;
				background-size: cover;
				flex: 1 0 0;
				position: relative;
				.rule{
					position: fixed;
					right: 0;
					top: 45upx;
					transform: translateY(-50%);
					background: #549AEE;
					border-top-left-radius: 28upx;
					border-bottom-left-radius: 28upx;
					// opacity:0.1718;
					width: 150upx;
					height: 56upx;
					line-height: 56upx;
					text-align: center;
					z-index: 10000;
					color: #fff;
				}
				.btn{
					position: absolute;
					left: 50%;
					margin-left: -335upx;
					bottom: 100upx;
					height: 120upx;
					width: 670upx;
					background: url(../../../static/my/money/1.png) no-repeat 0 0;
					background-size: cover;
				}
				
				.iv{
					position: absolute;
					left: 50%;
					margin-left: -335upx;
					bottom: 20upx;
					height: 60upx;
					width: 670upx;
					font-size: 36upx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
					text-align: center;
				}
				
				.invitation-layer-mask{
					background-color: #000;
					opacity: 0.2;
					position: fixed;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;
					width: 100%;
					height: 100%;
					z-index: 100001;
				}
				.invitation-list,
				.invitation-btn{
					width: 670upx;
					position: fixed;
					left: 50%;
					margin-left: -335upx;
					z-index: 100002;
					background-color: #fff;
					border-radius: 24upx;
				}
				.invitation-list{
					bottom: 200upx;
					height: 224upx;
					& > view{
						width: 50%;
						float: left;
						text-align: center;
						color: #333;
						font-size: 30upx;
						& > image{
							width: 92upx;
							height: 92upx;
							display: block;
							margin: 32upx auto 20upx auto;
						}
					}
				}
				.invitation-btn{
					bottom: 68upx;
					height: 112upx;
					line-height: 112upx;
					text-align: center;
					font-size: 36upx;
					color: #333;
				}
			}
			
		}
	}
</style>
