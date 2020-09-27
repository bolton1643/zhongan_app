<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">视频回放</block>
			<block slot="right">
				<image class="title-right" src="../../static/homepage/timeNoSelect.png" @click="selectDate"></image>
			</block>
		</cu-custom>

		<view class="content">
			<video id="video" class="video" :src="videoUrl" :loop="false" :controls="true" :poster="imageUrl" objectFit="fill"></video>
		</view>
	</view>
</template>

<script>
	const videoUrl = require('./video/movie.mp4');
	const imageUrl = require('./video/movie_bg.jpg');

	export default {
		data() {
			return {
				videoUrl: videoUrl,
				imageUrl,
				date: ""
			}
		},

		onLoad: function(options) {},

		mounted:function(){
			const _this = this;
			uni.$on('calendar-modal', (data) => {
				console.log(data);
				_this.date = data.msg;
			});
		},

		methods: {
			selectDate: function() {
				const subNvue = uni.getSubNVueById('calendar-modal'); //获取 
				subNvue.show(); // 显示
			}
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100vw;
		min-height: 100vh;
		background-color: #F0F0F0;
		display: flex;
		flex-direction: column;

		.title-right {
			width: 44upx;
			height: 44upx;
			margin-right: 40upx;
		}

		.content {
			flex: 1;
			width: 100%;

			.video {
				width: 100%;
			}
		}
	}
</style>
