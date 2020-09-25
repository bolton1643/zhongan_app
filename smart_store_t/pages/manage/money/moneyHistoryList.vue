<template name="moneyHistoryList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">历史理赔</block>
		</cu-custom>
		
		<view  >
			<view class="cu-list menu-avatar" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item"  @click="gotoDetail">
					<view class="cu-avatar round lg" style="background-image:url('/static/image/manage/auditPass.png');"></view>
					<view class="content">
						<view class="text-grey">发起时间 2020-5-3 11:20:20</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								理赔金额（元） 3000
							</view> </view>
					</view>
					<view class="action">
						<text class="cuIcon-right    margin-right-xs"></text>
					</view>
				</view>
				
				<view class="cu-item"  @click="gotoDetail">
					<view class="cu-avatar round lg" style="background-image:url('/static/image/manage/auditPass.png');"></view>
					<view class="content">
						<view class="text-grey">发起时间 2020-5-3 11:20:20</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								理赔金额（元） 3000
							</view> </view>
					</view>
					<view class="action">
						<text class="cuIcon-right    margin-right-xs"></text>
					</view>
				</view>
				
				<view class="cu-item"  @click="gotoDetail">
					<view class="cu-avatar round lg" style="background-image:url('/static/image/manage/auditNoPass.png');"></view>
					<view class="content">
						<view class="text-grey">发起时间 2020-5-3 11:20:20</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								理赔金额（元） 3000
							</view> </view>
					</view>
					<view class="action">
						<text class="cuIcon-right    margin-right-xs"></text>
					</view>
				</view>
				
				
				 
				 
			</view>
		</view>
		
		
			
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
	
	export default {
		components: {  
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer
		},
		data() {
			return {
				
			 
			};
		},
		methods: {
			gotoDetail(){
				uni.navigateTo({
					url:  'moneyHistoryDetail'
				})
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
