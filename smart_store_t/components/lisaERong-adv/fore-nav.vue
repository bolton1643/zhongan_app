<template>
	<view class="row j-center my-0  bg-white">
		<block v-for="(item, index) in resdata" :key="index">
			<view v-if="index < 2" class="span-10 d-flex flex-row j-center a-center  border-bottom " @tap="event(item)">
				<view class="span-14 d-flex flex-column ">
					<text class="font-lg ml-3 mt-2" style="color: #FCBE11;">{{ item.title }}</text>
					<text class="font-md m-3 mt-0" style="color: #757575;">{{ item.subtitle }}</text>
				</view>
				<view class="span-6 d-flex flex-row border-right border-top-0">
					<image :src="item.src" style="width: 120upx;height: 120upx;" lazy-load class="left-0" mode="widthFix"></image>
				</view>
			</view>
			<view v-else class="span-10 d-flex flex-row j-center a-center  " @tap="event(item)">
				<view class="span-14 d-flex flex-column ">
					<text class="font-lg ml-3 mt-2" style="color: #FCBE11;">{{ item.title }}</text>
					<text class="font-md m-3 mt-0" style="color: #757575;">{{ item.subtitle }}</text>
				</view>
				<view class="span-6 d-flex flex-row border-right border-top-0">
					<image :src="item.src" style="width: 130upx;height: 130upx;" class="left-0" lazy-load mode="widthFix"></image>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
console.log('fore-nav');
export default {
	//组建注册自定义属性
	props: {
		resdata: Array
	},
	methods: {
		event(item) {
			console.log(JSON.stringify(item));
		}
	}
};
</script>

<style></style>
