<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">我的店铺</block>
		</cu-custom>
		<view class="content">
			<view class="content-info">
				<view class="content-info-item" v-for="(item, index) in list" :key="index" @click="getNext">
					<text v-text="item.shopName"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{ shopName: '小海小鲜店(000001)' },
					{ shopName: '小海小鲜店2(000001)' },
				]
			};
		},
		
		methods: {
			getNext() {
				uni.navigateTo({
					url:'./myShopDetail',
				})
			},
		},
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
			width: 100%;

			.content {
				width: 100%;
				// margin-top: 40upx;
				
				.content-info {
					padding: 0 40upx;
					width: 100%;
					background-color: #FFFFFF;
					
					.content-info-item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						border-bottom: 2upx solid rgba(237, 237, 237, 1);
						height: 112upx;
						box-sizing: border-box;
						
						&:last-child {
							border-bottom: 0;
						}
						
						text {
							color: #333333;
							font-size: 32upx;
							font-weight: 500;
						}
					}
				}
			}
		}
	}
</style>
