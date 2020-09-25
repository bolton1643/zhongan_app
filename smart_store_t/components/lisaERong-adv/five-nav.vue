<template>
	<view>
		<view class="row j-center my-0   span-20 d-flex flex-row">
			<block v-for="(item, index) in resdata" :key="index">
				<view class="span-10 d-flex flex-row bg-white " v-bind:style="{ 'margin-top': item.my, width: '49.5%' }">
					<image :src="item.src" class="span-20 " lazy-load style="height:450upx;"></image>
				</view>
				<view class="span-10 d-flex flex-row " v-bind:style="{ 'margin-top': item.my, width: '49.5%', 'margin-left': '1%' }">
					<view class="row j-center my-0   span-20 d-flex flex-row">
						<block v-for="(subitem, subindex) in item.subdata" :key="subindex">
							<view v-if="subindex % 2 == 0" class="span-10 d-flex flex-column  " v-bind:style="{ 'margin-top': subitem.my, width: '49%' }">
								<image :src="subitem.src" class="span-20 " style="width:100%;height:245upx;" lazy-load></image>
							</view>
							<view v-else class="span-10 d-flex flex-column  " v-bind:style="{ 'margin-top': subitem.my, width: '49%', 'margin-left': '2%' }">
								<image :src="subitem.src" class="span-20 " style="width:100%;height:245upx;" lazy-load></image>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		resdata: Array
	},
	methods: {
		event(item) {
			console.log('点击了轮播图');
		}
	}
};
</script>

<style></style>
