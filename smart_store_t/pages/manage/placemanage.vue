<template name="placemanage">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">场所管理</block>
		</cu-custom>
		<view class="cu-form-group  ">
			<view class="title" @click="gotoList">总场所数量： 200家</view>
		</view>
		 
		<view class="cu-form-group  ">
			<view class="title">在线状态</view>
			<view class="cu-capsule round" @click="gotoList">
				<view class='cu-tag bg-blue '>
					在线
				</view>
				<view class="cu-tag line-blue">
					120
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-gray '>
					离线
				</view>
				<view class="cu-tag line-blue">
					80
				</view>
			</view>
		</view>
		
		<view class="cu-form-group  ">
			<view class="title">在线状态</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-blue '>
					布防
				</view>
				<view class="cu-tag line-blue">
					120
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-gray '>
					撤防
				</view>
				<view class="cu-tag line-blue">
					80
				</view>
			</view>
		</view>
		
		<view class="cu-form-group  ">
			<view class="title">服务状态</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-blue '  >
					正常
				</view>
				<view class="cu-tag line-blue">
					120
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-yellow ' >
					即将到期
				</view>
				<view class="cu-tag line-blue">
					40
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-red '>
					已到期
				</view>
				<view class="cu-tag line-blue">
					40
				</view>
			</view>
		</view>
		
		
		<view class="cu-form-group  ">
			<view class="title">店铺类型</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-blue '>
					服装店
				</view>
				<view class="cu-tag line-blue">
					10
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-blue '>
					烟草店
				</view>
				<view class="cu-tag line-blue">
					30
				</view>
			</view>
			<view class="cu-capsule round"  @click="gotoList">
				<view class='cu-tag bg-blue '>
					金银首饰
				</view>
				<view class="cu-tag line-blue">
					30
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
					url:  '../indexgroup/warningDetail'
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
			gotoList(){
				uni.navigateTo({
					url: 'placemanageList'
				})
			}	 
			 
			
		},
		
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
