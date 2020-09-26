<template name="achievementDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">成就管理</block>
		</cu-custom>
		<view  >
			<view class="cu-form-group">
				<view class="title">选择月份</view>
				<picker mode="date" :value="date" fields="month" start="2015-09-01" end="2025-09-01" @change="dateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
		</view>
		<view class="padding text-center">
			
			<view class="padding-lr bg-white margin-top">
				<view class="solid-bottom padding">
					<text class="text-Abc">本月您的收益</text>
				</view>
				<view class="padding">新增店铺20家，直接提成8000元</view>
				<view class="padding">新加入合伙人3人，间接提成900元</view>
			</view>
			<view class="padding-lr bg-white margin-top">
				<view class="solid-bottom padding">
					<text class="text-Abc">本月您为客户提供</text>
				</view>
				<view class="padding">维修1次</view>
				<view class="padding">出警1次</view>
				<view class="padding">变更套餐一次</view>
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
				date: '2020-12-25',
			};
		}, 
		methods: {
			  dateChange(e){
				  this.date = e.detail.value
			  }
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
