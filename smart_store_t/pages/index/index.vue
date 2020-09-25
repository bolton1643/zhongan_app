<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<indexgroup v-if="PageCur=='indexgroup'"></indexgroup>
		<messagehome v-if="PageCur=='messagehome'"></messagehome>
		<messagelist v-if="PageCur=='messagelist'"></messagelist>
		<my v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="indexgroup">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/index' + [PageCur=='indexgroup'?'select':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='indexgroup'?'text-blue':'text-gray'">首页</view>
			</view>
			 <view class="action" @click="NavChange" data-cur="messagehome">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/manage' + [PageCur=='messagehome'?'_select':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='messagehome'?'text-blue':'text-gray'">管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="messagelist">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/notice' + [PageCur=='messagelist'?'select':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='messagelist'?'text-blue':'text-gray'">通知</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur=='my'?'select':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-green':'text-gray'">我的</view>
			</view> 
	<!--	<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='indexgroup'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
			</view>	 
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='indexgroup'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='indexgroup'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">首页</view>
			</view>
		 	-->
		</view> 
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: mapState(['uerInfo']),
		data() {
		return {
				PageCur: 'indexgroup'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
		onLoad() {
			console.log(this.uerInfo)
		},
	}
</script>

<style>

</style>
