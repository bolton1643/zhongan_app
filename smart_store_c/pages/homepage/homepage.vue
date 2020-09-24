<template>
	<view>
		<homepageIndex v-if="PageCur=='home'"></homepageIndex>
		<message v-if="PageCur == 'message'"></message>
		<mine v-if="PageCur === 'mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/homepage/home' + [PageCur=='home'?'_active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-system':'text-system-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="message">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/homepage/message' + [PageCur == 'message'?'_active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-system':'text-system-gray'">消息</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/homepage/mine' + [PageCur == 'mine'?'_active':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-system':'text-system-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import homepageIndex from 'pages/homepageIndex/homepageIndex.vue';
	import message from 'pages/message/message';
	import mine from 'pages/my/index';
	
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		
		components: {
			homepageIndex,
			message,
			mine,
		},
		
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
