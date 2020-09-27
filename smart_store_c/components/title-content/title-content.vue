<template>
	<view class="title-box" :style="{height: height}">
		<view class="title-content">
			<span class="title" v-text="title"></span>
			<slot name="titleIcon"></slot>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		props: {
			title:{
				required: true,
				default: () => '',
				type: String,
			},
			
			height: {
				default: () => '300upx',
				type: String,
			}
		},
	}
</script>

<style lang="less">
	.title-box {
		width: 100%;
		
		.title-content {
			height: 96upx;
			padding: 40upx 40upx 16upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			
			.title {
				font-size: 32upx;
				color: #203046;
				font-weight: 500;
			}
		}
	}
</style>
