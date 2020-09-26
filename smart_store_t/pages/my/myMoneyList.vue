<template name="myMoneyList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">提现明细</block>
			<block slot="right"  >  </block>
		</cu-custom>
	 
		 
		<view  >
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="'arrow'"  @click="gotoDetail">
					<view class="content">
						<text class="cuIcon-moneybag text-red  margin-right-xs"></text>
						<text class="text-grey">2020-9-3 11:20:20  兑换 </text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-olive light">+800.00</view>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'"  @click="gotoDetail">
					<view class="content">
						<text class="cuIcon-moneybag text-red  margin-right-xs"></text>
						<text class="text-grey">2020-8-3 11:20:20  兑换 </text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-olive light">+900.00</view>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'"  @click="gotoDetail">
					<view class="content">
						<text class="cuIcon-moneybag text-red  margin-right-xs"></text>
						<text class="text-grey">2020-7-3 11:20:20  兑换 </text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-olive light">+500.00</view>
					</view>
				</view>
				<view class="cu-item" :class="'arrow'"  @click="gotoDetail">
					<view class="content">
						<text class="cuIcon-moneybag text-red  margin-right-xs"></text>
						<text class="text-grey">2020-6-3 11:20:20  兑换 </text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-olive light">+300.00</view>
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			BasicsSteps() {
				this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1				
			},
			NumSteps() {
				this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1				
			},
			NumStepsPre() {
				this.num= this.num == 0 ? 0 : this.num - 1				
			},
			ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
			region_change(e) {
				console.log('e',e.target.value)
				this.address = e.target.value;
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			PickerSex(e) {
				this.sexindex = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			gotoDetail(){
				uni.navigateTo({
					url:  'myMoneyDetail'
				})
			},
			gotoAdd(){
				debugger
				uni.navigateTo({
					url:  'devicesDetail?detailflag=0'
				})
			},
			 ChooseImage(index) {
				var indextmp = index;
			 	uni.chooseImage({
			 		count: 4, //默认9
			 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			 		sourceType: ['album'], //从相册选择
			 		success: (res) => {
						if(indextmp === 0){
							if (this.imgList.length != 0) {
								this.imgList = this.imgList.concat(res.tempFilePaths)
							} else {
								this.imgList = res.tempFilePaths
							}
						}
						 
						if(indextmp === 2){
							if (this.imgList2.length != 0) {
								this.imgList2 = this.imgList2.concat(res.tempFilePaths)
							} else {
								this.imgList2 = res.tempFilePaths
							}
						}
						if(indextmp === 3){
							if (this.imgList3.length != 0) {
								this.imgList3 = this.imgList3.concat(res.tempFilePaths)
							} else {
								this.imgList3 = res.tempFilePaths
							}
						}
						if(indextmp === 4){
							if (this.imgList4.length != 0) {
								this.imgList4 = this.imgList4.concat(res.tempFilePaths)
							} else {
								this.imgList4 = res.tempFilePaths
							}
						}
						if(indextmp === 5){
							if (this.imgList5.length != 0) {
								this.imgList5 = this.imgList5.concat(res.tempFilePaths)
							} else {
								this.imgList5 = res.tempFilePaths
							}
						}
			 			
			 		}
			 	});
			 },
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
