<template name="placemanageList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">场所列表</block>
		</cu-custom>
		
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		
		<view class="cu-form-group margin-top">
			<view class="title">{{item.shopName}}({{item.shopNo}})在线 布防      餐饮</view>
		</view>
		 <view class="cu-form-group ">
		 	<view class="title">{{item.addr}}</view>
		 </view>
		
		<view class="cu-form-group margin-top">
			<view class="title">店铺联系人</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">负责人姓名：  {{item.benifitName || "无"}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">负责人电话：  {{item.benifitPhone || "无"}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">第一负责人姓名：  {{item.contact1Name || "无"}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">第一负责人电话：  {{item.contact1Phone || "无"}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">第二负责人姓名：  {{item.contact2Name || "无"}}</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">第二负责人电话：  {{item.contact2Phone || "无"}}</view>
		</view>
		 <view class="cu-form-group ">
		 	<view class="title">第三负责人姓名：  {{item.contact3Name || "无"}}</view>
		 </view>
		 <view class="cu-form-group ">
		 	<view class="title">第三负责人电话：  {{item.contact3Phone || "无"}}</view>
		 </view>
		 
		 <view class="cu-form-group margin-top">
		 	<view class="title">创建事件：  2020-09-01 12：12：12</view>
		 </view>
		   <view class="cu-form-group ">
		   	<view class="title">服务时间： {{item.serviceEffectiveDate|| "无"}}</view>
		   </view>
		
		
		<view class="  bg-white margin-top solid-bottom" style="width: 700upx; margin-left: 25upx; border-radius: 20upx;">
			<view class="flex   justify">
					<view class="flex-sub  padding-sm margin-xs radius text-center" @click="godevices" >
						<image :src="'/static/image/manage/shebeiguanli.png'" style="width: 60upx;height: 60upx;"></image>
						<br>
						<text>设备管理</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="log/logList" @tap="toChild">
						<image :src="'/static/image/manage/bufangjilu.png'" style="width: 60upx;height: 60upx;"></image>
						<br>
						<text>布撤防记录</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="warning/warningHistoryList" @tap="toChild">
						<image :src="'/static/image/manage/lishijinggao.png'" style="width: 60upx;height: 60upx;"></image>
						<br>
						<text>历史警告</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="repair/repairHistoryList" @tap="toChild">
						<image :src="'/static/image/manage/lishiweixiu.png'" style="width: 60upx;height: 60upx;"></image>
						<br>
						<text>历史维修</text>
					</view>
			</view>
			<view class="flex  justify">
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="money/moneyHistoryList" @tap="toChild">
						<image :src="'/static/image/manage/lishilipei.png'" style="width: 60upx;height: 60upx;"></image>
						<br>
						<text>历史理赔</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="fangqu/fangquDetail" @tap="toChild">
						<image :src="'/static/image/manage/fangqutu.png'" style="width: 60upx;height: 80upx;"></image>
						<br>
						<text>防区图</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="order/orderDetail" @tap="toChild">
						<image :src="'/static/image/manage/fangqutu.png'" style="width: 60upx;height: 80upx;"></image>
						<br>
						<text>保单</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="" @tap="toChild">
						<image :src="'/static/image/manage/fangqutu.png'" style="width: 60upx;height: 80upx;"></image>
						<br>
						<text>路线导航</text>
					</view>
					
			</view>
		</view>
		
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
    import slFilter from '@/components/songlazy-sl-filter/sl-filter/filter-view.vue';
	import uniCombox from "@/components/uni-combox/uni-combox"
	export default {
		components: {  
			TabCur: 0,
			scrollLeft: 0,
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer,
			 slFilter,
			 uniCombox,
			 
		},
		data() {
			return {
				gridCol: 3,
				gridBorder: false,
				dotStyle: false,
				item:{},
				cuIconList: [{
					cuIcon: 'recordfill',
					color: 'orange',
					path: '',
					badge: 0,
					name: '设备管理'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '布撤防记录'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '历史告警'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '历史维修'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '历史理赔'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '防区图'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '保险'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					path: '',
					name: '路线导航'
				}
				
				
				
				
				],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://qiniu.zaizaihome.com/2020/login_banner.jpg'
				} ],
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				city: '',
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
				menuList: [
				    {
				        'title': '菜单1',
				        'detailTitle': '子标题1',
				        'isMutiple': true,
				        'key': 'key_1',
				        'detailList': [
				            {
				                'title': '不限',
				                'value': ''
				            },
				            {
				                'title': '条件_1_1',
				                'value': 'val_1_1'
				            },
				            {
				                'title': '条件1_2',
				                'value': 'val_1_2'
				            }
				        ]
				    },
				    {
				        'title': '菜单2',
				        'detailTitle': '子标题2',
				        'key': 'key_2',
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '不限',
				                'value': ''
				            },
				            {
				                'title': '条件_2_1',
				                'value': 'val_2_1'
				            },
				            {
				                'title': '条件_2_2',
				                'value': 'val_2_2'
				            }
				        ]
				    },
				    {
				        'title': '菜单3',
				        'detailTitle': '子标题3',
				        'key': 'key_3',
				        'isSort': true,
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '条件_3_1',
				                'value': 'val_3_1'
				            },
				            {
				                'title': '条件_3_2',
				                'value': 'val_3_2'
				            },
				            {
				                'title': '条件_3_3',
				                'value': 'val_3_3'
				            }
				        ]
				    }
				]
			};
		},
		onLoad: function (option) {
			this.item = JSON.parse(option.item) 
		},
		methods: {
			toChild(e) {
				if(e.currentTarget.dataset.url != ''){
					uni.navigateTo({
						url: e.currentTarget.dataset.url
					})
				}else{
					uni.showToast({
						title: '开发中。。。'
					})
				}
				
			},
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
					url:  '../indexgroup/warningDetail'
				})
			},
			godevices(){
				uni.navigateTo({
					url:  'devices/deviceslist?shopId=' + this.item.shopId
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
	.cu-form-group .title {
		min-width: calc(4em + 25px);
	}
</style>
