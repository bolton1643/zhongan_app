<template name="repaireHistoryDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">保单详情</block>
		</cu-custom>
		<view>
			<view class=" margin-top solid-bottom" >
				 <view class="cu-form-group  ">
				 	<view class="title">保障开始时间  2020-5-12 02:20:25</view>
				 </view>
				 <view class="cu-form-group  ">
				 	<view class="title">保障结束时间  2021-5-12 02:20:25</view>
				 </view>
				 <view class="cu-form-group  ">
				 	<view class="title">投保人  小张</view>
				 </view>
				<view class="cu-form-group  ">
					<view class="title">被保人  小李</view>
				</view>
				<view class="cu-form-group  ">
					<view class="title">收益人  小斯</view>
				</view>
				<view class="cu-form-group  ">
					<view class="title">保额  ¥10,000</view>
				</view>
				 <view class="cu-form-group  ">
					<view class="title">电子保单     </view>
					查看
				 </view>
				 <view class="cu-form-group  ">
				 	<text class="cuIcon-warn text-sm"></text>	
					<text class="text-sm" >
						本页面仅供参考，实际保单信息以保险公司官方内容为准
					</text>
							 
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
				navList:[
					{
						id: 0,
						title: '基本资料'
					},
					{
						id: 1,
						title: '进度'
					}
					
				],
				TabCur: '0',
				imageurl: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
			};
		},
		onReady: function(res) {
		     
		    },
		methods: {
			 tabSelect(e) {
			 	this.TabCur = e.currentTarget.dataset.id;
			 	this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			 }
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
