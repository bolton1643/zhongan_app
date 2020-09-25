<template name="warningDetail">
	<view class="bg-gray">
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">告警详情</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">店铺名称： {{detail.shopName || ""}}</view>
		</view>
		<view class="cu-form-group  ">
			<view class="title">店铺编号： {{detail.shopNo || ""}}</view>
		</view>
		 <view class="cu-form-group  ">
		 	<view class="title">店铺地址： {{detail.addr || ""}}</view>
		 </view>
		 <view class="cu-form-group  ">
		 	<view class="title">负责人： {{detail.manager || ""}}</view>
		 </view>
		<view class="cu-form-group  ">
			<view class="title">负责手机： {{detail.managerPhone || ""}}</view>
		</view>
		
		<view class="cu-form-group margin-top">
			<view class="title">首次报警时间： {{detail.alarmTime}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">最后报警时间： {{detail.alarmTimeLast}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">报警次数  {{detail.alarmCount || 0}}</view>
		</view>
		
		<!-- <view class="cu-form-group margin-top">
			<view class="title"> 2020-08-25 10:20:20</view>
			<view class="title"> 防区报警</view>
		</view>
		<view class="cu-form-group ">
			<view class="title"> 2020-08-25 10:20:20</view>
			<view class="title"> 区域入侵</view>
		</view> -->
		
		<view class="padding flex flex-wrap justify-between align-center bg-white margin-top" v-if="step === '1'">
			<button class="cu-btn round  lg" @click="lookVideo">查看录像</button>
			<button class="cu-btn round lg" @tap="showModal" data-target="bottomModal" >电话联系</button>
			<button class="cu-btn round lg"  @tap="showModal" data-target="Image">防区图</button>
		</view>
		
		<view class="padding flex flex-direction margin-top"  v-if="step === '1'">
			<button class="cu-btn bg-blue lg  " @tap="showModal"  data-target="Modal">立即处理</button>
		</view>
  
		<view class=" bg-white margin-top" v-if="step === '2'">
			<view class="cu-form-group margin-top">
				<view class="title">处理时间:</view>
				<view  class="title"> {{detail.processDate}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">处理说明:</view>
				<view class="title" >{{detail.processContent}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">图片</view>
				<view class="title " v-if="detail.processPhoto"><image :src="detail.processPhoto"></image></view>
				<view class="title " v-if="!detail.processPhoto">无</view>
			</view>
		</view>
 
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog"  @tap.stop="">
				<view class="padding-xs">
					<view class="cu-list menu" >
						<view class="cu-item solid-bottom arrow"  @click="makePhoneCall(detail.contact1Phone)">
							<view class="content   ">
								<text class="text-black fl"> {{detail.contact1Name || '无'}} </text>
								<text class="text-black " style="margin-left: -200upx;">   {{detail.contact1Phone|| '无'}}</text>
								<text class=" text-sl cuIcon-phone text-grey margin-left-sm " ></text>
							</view>
						</view>
						<view class="cu-item solid-bottom arrow" @click="makePhoneCall(detail.contact2Phone)">
							<view class="content">
								<text class="text-black fl"> {{detail.contact2Name || '无'}} </text>
								<text class="text-black " style="margin-left: -200upx;">   {{detail.contact2Phone|| '无'}}</text>
								<text class=" text-sl cuIcon-phone text-grey margin-left-sm " ></text>
							</view>
						</view>
						<view class="cu-item solid-bottom arrow"  @click="makePhoneCall(detail.contact3Phone)">
							<view class="content">
								<text class="text-black fl"> {{detail.contact3Name|| '无'}} </text>
								<text class="text-black " style="margin-left: -200upx;">   {{detail.contact3Phone|| '无'}}</text>
								<text class=" text-sl cuIcon-phone text-grey margin-left-sm " ></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="height:200px;" :style="styles">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		
		<!-- 警情处理 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择操作</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>			 
					</view>
				</view>
				<view class="padding-xl">
					<view class="bg-blue padding-lg margin-xs radius">我要导航</view>
					<view class="bg-blue padding-lg margin-xs radius"  @click="haveInStore">我已到店</view>
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
				step: '1',
				detail:{},
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
				id:'',
				styles: '',
				// time: new Date('2020/04/24 01:00:00').getTime() - new Date('2020/04/24 00:45:00').getTime(),
				// picker: ['类型1', '类型2', '类型3'],
				// pickersex: ['男', '女'],
				// basicsList: [{
				// 	cuIcon: 'usefullfill',
				// 	name: '填写资料'
				// }, {
				// 	cuIcon: 'radioboxfill',
				// 	name: '支付'
				// }, {
				// 	cuIcon: 'roundclosefill',
				// 	name: '完成'
				// },  ],
				// basics: 0,
				// numList: [{
				// 	name: '填写资料'
				// }, {
				// 	name: '支付'
				// }, {
				// 	name: '完成'
				// },  ],
				// num: 0,
				// scroll: 0,
				// multiArray: [
				// 	['浙江省', '江苏省'],
				// 	['杭州市', '嘉兴市', '湖州市'],
				// 	['桐乡', '嘉善']
				// ],
				// address: '请选择地址',
				// index:0 ,
				// sexindex: 0 ,
				// date: '2020-06-08',
				// TabCur: 0,
				// scrollLeft: 0,
				// packageList: [
				// 	{
				// 		id: 0,
				// 		title: '待处理'
				// 	},
				// 	{
				// 		id: 1,
				// 		title: '已处理'
				// 	},
					 
				// ],
				
				imgList: [],
				// imgList2: [],
				// imgList3: [],
				// imgList4: [],
				// imgList5: [],
				modalName: null,
				lefttime: '15:00',
			};
		},
		onLoad(event) {
			this.id = event.id;
			this.alarmDetail()
		},
		methods: {
			alarmDetail() {
				let _self = this;
				this.$api.alarmDetail({id:this.id}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						this.detail = res.result
						if (this.detail.alarmImages) {
							this.detail.imagrsArr = JSON.parse(this.detail.alarmImages)
							this.styles = 'background:url('	+ this.detail.imagrsArr[0] + ');background-size:100% 100%;'
						}
						if (this.detail.status == 1) {
							this.step = '2'
						}
						
						
						// if (this.detail.repairStatus == 1) {
						// 	this.step = 3
						// }
					}else {
						this.detail = {}
					}
				}).catch(res => {
					this.detail = {}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			haveInStore(e) {
				this.hideModal(e);
				uni.navigateTo({
					url: '../indexgroup/dealWarning?id=' + this.id
				})
				// uni.navigateTo({
				// 	url: '../indexgroup/addInstall?applyId=' + this.detail.id
				// })
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
			 lookVideo(){
				 console.log(this.detail.alarmVideos)
				uni.navigateTo({
					url: '/pages/indexgroup/warning/warningVideoDetail?videos=' + this.detail.alarmVideos + '&alarmImages=' + this.detail.alarmImages
				}) 
			 },
			 makePhoneCall(phoneNumber){
				uni.makePhoneCall({
				     phoneNumber:  phoneNumber  
				 });
			 }
		
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
