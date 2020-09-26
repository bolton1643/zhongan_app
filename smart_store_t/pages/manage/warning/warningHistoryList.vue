<template name="deviceslist">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">历史告警</block>
		</cu-custom>
		
		<view  >
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="'arrow'"   >
					<view class="content">
						<text class="text-grey">2020-5-3 11:20:20</text>
					</view>
					<view class="action">
						<view class="cu-capsule round"  @click="gotoDetail">
							<view class='cu-tag bg-red '>
								报警次数
							</view>
							<view class="cu-tag line-blue">
								40
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'" >
					<view class="content">
						<text class="text-grey">2020-5-2 11:20:20</text>
					</view>
					<view class="action">
						<view class="cu-capsule round"  @click="gotoDetail">
							<view class='cu-tag bg-red '>
								报警次数
							</view>
							<view class="cu-tag line-blue">
								20
							</view>
						</view>
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
				
				tabList: [
					{
						tabindex: 0,
						tabtitle: '待处理',
					},
					{
						tabindex: 1,
						tabtitle: '已处理',
					},
				],
				radio: 'A',
				time: new Date('2020/04/24 01:00:00').getTime() - new Date('2020/04/24 00:45:00').getTime(),
				picker: ['类型1', '类型2', '类型3'],
				pickersex: ['男', '女'],
				basicsList: [{
					cuIcon: 'usefullfill',
					name: '填写资料'
				}, {
					cuIcon: 'radioboxfill',
					name: '支付'
				}, {
					cuIcon: 'roundclosefill',
					name: '完成'
				},  ],
				basics: 0,
				numList: [{
					name: '填写资料'
				}, {
					name: '支付'
				}, {
					name: '完成'
				},  ],
				num: 0,
				scroll: 0,
				multiArray: [
					['浙江省', '江苏省'],
					['杭州市', '嘉兴市', '湖州市'],
					['桐乡', '嘉善']
				],
				address: '请选择地址',
				index:0 ,
				sexindex: 0 ,
				date: '2020-06-08',
				TabCur: 0,
				scrollLeft: 0,
				packageList: [
					{
						id: 0,
						title: '待处理'
					},
					{
						id: 1,
						title: '已处理'
					},
					 
				],
				
				imgList: [],
				imgList2: [],
				imgList3: [],
				imgList4: [],
				imgList5: [],
				modalName: null,
				lefttime: '15:00',
				menuBorder: false,
				menuArrow: true,
				menuCard: false,
			};
		},
		methods: {
			gotoDetail(){
				debugger
				uni.navigateTo({
					url:  'warningHistoryDetail'
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
