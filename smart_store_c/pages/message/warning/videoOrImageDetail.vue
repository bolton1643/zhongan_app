<template>
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">详情</block>
		</cu-custom>

		<view class="content">

			<video v-if="modalInfo.type === 'video'" :src="modalInfo.url" autoplay @error="videoErrorCallback"></video>

			<movable-area v-else-if="modalInfo.type === 'image'" scale-area>
				<movable-view direction="all" inertia scale scale-min="1" scale-max="4" scale-value="1">
					<image :src="modalInfo.url" mode="widthFix"></image>
				</movable-view>
			</movable-area>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalInfo: {
					type: "",
					url: ""
				}
			};
		},

		onLoad: function(options) {
			console.log(options);
			this.modalInfo = options;
		},

		mounted: function() {

		},

		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: black;
		display: flex;
		flex-direction: column;

		.content {
			width: 100%;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			uni-video {
				width: 100%;
			}

			movable-area {
				height: 100%;
				width: 100%;
				position: fixed;
				overflow: hidden;

				movable-view {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;

					image {
						width: 100%;
					}
				}
			}
		}
	}
</style>
