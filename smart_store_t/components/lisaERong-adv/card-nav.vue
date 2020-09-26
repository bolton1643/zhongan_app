<template>
	<view>
		<view class="row j-center my-0  bg-white span-20 d-flex flex-row">
			<block v-for="(item, index) in resbannerdata" :key="index">
				<view v-if="index % 2 == 0" class="span-10 d-flex flex-row  " v-bind:style="{ 'margin-top': item.my, width: '49.5%' }">
					<image :src="item.src" class="span-20 " style="height: 120upx;" lazy-load mode="widthFix"></image>
				</view>
				<view v-else class="span-10 d-flex flex-row " v-bind:style="{ 'margin-top': item.my, width: '49.5%', 'margin-left': '1%' }">
					<image :src="item.src" class="span-20" style="height: 120upx;" lazy-load mode="widthFix"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		resbannerdata: Array
	},
	methods: {
		event(item) {
			console.log('点击了轮播图');
		}
	}
};
</script>

<style></style>
