<template name="repaireHistoryDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">理赔详情</block>
		</cu-custom>
		<view>
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index">
					 {{item.title}}
				</view>
			</scroll-view>
			
			<view class=" margin-top solid-bottom" v-if="TabCur === '0'">
				 <view class="cu-form-group  ">
				 	<view class="title">被盗时间  2020-5-12 02:20:25</view>
				 </view>
				 <view class="cu-form-group  ">
				 	<view class="title">理赔金额（元）  3000</view>
				 </view>
				 <view class="cu-form-group  ">
					<view class="title">上传照片   </view>
			 
				 </view>
				 <view class="cu-form-group  ">
						<image style="width: 350upx; height: 350upx;" :src="imageurl"></image>
						<image style="width: 350upx; height: 350upx;" :src="imageurl"></image>
				 </view>
				 <view class="cu-form-group margin-top ">
						<image style="width: 350upx; height: 350upx;" :src="imageurl"></image>
				 </view>
			</view>
			
			<view class=" margin-top solid-bottom" v-if="TabCur === '1'">
				<view class="cu-timeline">
					<view class="cu-time">处理历史</view>
					<view class="cu-item cur cuIcon-noticefill">
						<view class="content bg-green shadow-blur">
							<text>22:22</text> 发钱
						</view>
					</view>
					<view class="cu-item text-red cuIcon-attentionforbidfill">
						<view class="content bg-red shadow-blur">
							审核成功
						</view>
					</view>
					<view class="cu-item text-grey cuIcon-evaluate_fill">
						<view class="content bg-grey shadow-blur">
							公司员工上门
						</view>
					</view>
					<view class="cu-item text-blue">
						<view class="bg-blue content">
							<text>20:00</text> 报案
						</view>
						<view class="bg-cyan content">
							<text>10:00</text> 发生盗窃
						</view>
					</view>
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
