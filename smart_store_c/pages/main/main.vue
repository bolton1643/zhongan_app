<template>
	<view class="container">
		<view class="container-title">
			<image class="header-image" src="/static/login/zhihuimengdian.png"></image>
		</view>
		<view class="container-btn-group">
			<button type="primary" plain="true" class="login-btn" @click="login">登录</button>
			<button type="primary" class="login-btn" @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		methods:{
			login() {
				uni.redirectTo({
				    url: '/pages/login/login'
				});
			},
			
			register() {
				uni.navigateTo({
				    url: '/pages/login/register'
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
		position: relative;
		
		.container-title {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 50%;
			top: 376upx;
			transform: translateX(-50%);
			width: 200upx;
			height: 200upx;
			
			.header-image {
				width: 100%;
				height: 100%;
				border-radius: 30upx;
			}
		}
		
		.container-btn-group {
			position: absolute;
			left: 0;
			width: 100%;
			padding: 0 80upx;
			display: flex;
			bottom: 108upx;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			height: 256upx;
			
			.login-btn {
				width: 100%;
				border-radius: 48upx;
				height: 112upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
