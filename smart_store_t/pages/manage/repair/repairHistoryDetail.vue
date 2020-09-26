<template name="repaireHistoryDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">历史维修详情</block>
		</cu-custom>
		<view>
			<view class=" margin-top solid-bottom">
				 <view class="cu-form-group  ">
				 	<view class="title">维修描述  XXXXXXXXXXXXXXXXXXX</view>
				 </view>
				 <view class="cu-form-group  ">
				 	<view class="title">发起时间  2020-5-12 02:20:25</view>
				 </view>
				 <view class="cu-form-group  ">
					<view class="title">图片   </view>
					<image :src="imageurl"></image>
				 </view>
			</view>
			<view class=" margin-top">
				 <view class="cu-form-group  ">
				 	<view class="title">维修状态 已维修</view>
				 </view>
				 <view class="cu-form-group  ">
				 	<view class="title">完成时间  2020-5-15 02:20:25</view>
				 </view>
				 <view class="cu-form-group  ">
					<view class="title">图片   </view>
					<image :src="imageurl"></image>
				 </view>
			</view>
		</view> 
		 
	</view>
</template>

<script>
 
 
	export default {
		components: {  
		  
		},
		data() {
			return {
				imageurl: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
			};
		},
		onReady: function(res) {
		     
		    },
		methods: {
			 
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
