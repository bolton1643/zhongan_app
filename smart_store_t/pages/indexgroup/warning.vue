<template name="warning">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">告警管理</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom  ">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in packageList" :key="index" @tap="tabSelect" :data-id="index">
						 {{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		 
		<view v-if="num === 0">
			<view class="cu-list menu-avatar padding ">
				<view class="cu-item margin-top margin-bottom" v-for="(items,index1) in alarmMessageList" :key="index1" @click="gotoDetail(items)">
					<view class="cu-avatar  lg " style="margin-left: -50upx;margin-top: -10upx; width:150upx;height:150upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
						<!-- <view class="cu-tag badge">4</view> -->
					</view>
					<view class="content" style=" width: 100%;">
						<view class="cf ">
							<view class="  fl "><view class="text-black text-bold">{{items.shopName}}({{items.shopNo|| '无'}})</view></view>
							<!-- <view class="  fr"><view class="fr" style="margin-left: 200upx;">{{items.shopAddr}}</view></view> -->
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<view class="cf ">
									<view class="  fl "><text class=" text-gray ">店铺地址：{{items.shopAddr||'无'}}</text></view>
									<!-- <view class="  fr"><view class="fr" style="margin-left: 250upx;">{{items.alarmTimeLast.split(' ')[0]}}</view></view> -->
								</view>
								
							</view> </view>
					</view>
				<!-- 	<view class="action">
						
						<view class="cu-tag round bg-grey sm">5</view>
					</view> -->
				</view>
				<!-- <view class="cu-item margin-top margin-bottom" @click="gotoDetail">
					<view class="cu-avatar  lg " style="margin-left: -50upx;margin-top: -10upx; width:150upx;height:150upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
					</view>
					<view class="content" style=" width: 100%;">
						<view class="cf ">
							<view class="  fl padding-sm"><view class="text-black text-bold">小红烧烤店</view></view>
							<view class="  fr"><view class="fr" style="margin-left: 250upx;">00:00:04</view></view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<view class="cf ">
									<view class="  fl padding-sm"><text class=" text-gray ">	来自：厨房</text></view>
									<view class="  fr padding-sm"><view class="fr" style="margin-left: 260upx;">昨天</view></view>
								</view>
								
							</view> </view>
					</view>
				</view> -->
			<!-- 	<view class="cu-item margin-top margin-bottom" @click="gotoDetail">
					<view class="cu-avatar  lg " style="margin-left: -50upx;margin-top: -10upx; width:150upx;height:150upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
					</view>
					<view class="content" style=" width: 100%;">
						<view class="cf ">
							<view class="  fl padding-sm"><view class="text-black text-bold">小红烧烤店</view></view>
							<view class="  fr"><view class="fr" style="margin-left: 250upx;">00:00:04</view></view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<view class="cf ">
									<view class="  fl padding-sm"><text class=" text-gray ">	来自：厨房</text></view>
									<view class="  fr padding-sm"><view class="fr" style="margin-left: 260upx;">昨天</view></view>
								</view>
								
							</view> </view>
					</view>
				</view>
				
				<view class="cu-item margin-top margin-bottom" @click="gotoDetail">
					<view class="cu-avatar  lg " style="margin-left: -50upx;margin-top: -10upx; width:150upx;height:150upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
					</view>
					<view class="content" style=" width: 100%;">
						<view class="cf ">
							<view class="  fl padding-sm"><view class="text-black text-bold">小红烧烤店</view></view>
							<view class="  fr"><view class="fr" style="margin-left: 250upx;">00:00:04</view></view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<view class="cf ">
									<view class="  fl padding-sm"><text class=" text-gray ">	来自：厨房</text></view>
									<view class="  fr padding-sm"><view class="fr" style="margin-left: 260upx;">昨天</view></view>
								</view>
								
							</view> </view>
					</view>
				</view>
				
				<view class="cu-item margin-top margin-bottom" @click="gotoDetail">
					<view class="cu-avatar  lg " style="margin-left: -50upx;margin-top: -10upx; width:150upx;height:150upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
					</view>
					<view class="content" style=" width: 100%;">
						<view class="cf ">
							<view class="  fl padding-sm"><view class="text-black text-bold">小红烧烤店</view></view>
							<view class="  fr"><view class="fr" style="margin-left: 250upx;">00:00:04</view></view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<view class="cf ">
									<view class="  fl padding-sm"><text class=" text-gray ">	来自：厨房</text></view>
									<view class="  fr padding-sm"><view class="fr" style="margin-left: 260upx;">昨天</view></view>
								</view>
								
							</view> </view>
					</view> -->
				<!-- </view> -->
			</view>
		</view>
		
		<view v-if="num === 1">
			<view class="cu-list menu-avatar">
				<view class="cu-item" @click="gotoDetail">
					<view class="content">
						<view class="text-grey">小红烧烤店</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								浙江省杭州市西湖区古墩路1号
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">2020-5-3 14:15:40</view>
						<view class="cu-tag round bg-grey sm">5</view>
					</view>
				</view>
				<view class="cu-item" @click="gotoDetail">
				 	<view class="content">
				 		<view class="text-grey">小红烧烤店</view>
				 		<view class="text-gray text-sm flex">
				 			<view class="text-cut">
				 				<text class="cuIcon-infofill text-red  margin-right-xs"></text>
				 				浙江省杭州市西湖区古墩路1号
				 			</view> </view>
				 	</view>
				 	<view class="action">
				 		<view class="text-grey text-xs">2020-5-3 14:15:40</view>
				 		<view class="cu-tag round bg-grey sm">5</view>
				 	</view>
				</view>
			</view>
		</view>
		
		<view>
			<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
		</view>
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {  
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer,
			 uniLoadMore
		},
		data() {
			return {
				alarmMessageList:[],
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
				num:0,
				modalName: null,
				lefttime: '15:00',
				isActive:false,//字体颜色样式
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				page:1
			};
		},
		onLoad: function (option) {
			// this.getProvince();
			// this.lawsquest();
			// this.getLawToken()
			uni.startPullDownRefresh()
			this.alarmList()
		},
		onReachBottom() {
			let _self = this
			if (_self.status == "nomore") {
				return
			}
			this.status = 'loading'
			uni.showNavigationBarLoading()
			_self.page++;
			_self.alarmList();
			// setTimeout(function() {
				
				
			// }, 2000);
		},
		methods: {
			alarmList() {
				let _self = this;
				let params = {
					status:this.TabCur,
					pageNo:this.page,
					pageSize:10
				}
				this.$api.alarmList(params).then(res => {
				   // 获得数据 
				   if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						_self.status = 'more'
						uni.hideNavigationBarLoading()
						if(_self.page != 1){
							_self.alarmMessageList =_self.alarmMessageList.concat(res.result.records)
						}else{
							_self.alarmMessageList = res.result.records
						}
						if (res.result.records.length < 10) {
							_self.status = 'nomore'
						}
				   }else {
						_self.status = 'more'
						uni.hideNavigationBarLoading()
						uni.showToast({
							title:res.message,
							icon: 'none'
						})
				   }
				}).catch(res => {
					if(_self.page == 1) {
						_self.alarmMessageList = []
					}
					_self.status = 'more'
					uni.hideNavigationBarLoading()
				})
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
				this.page = 1
				this.alarmList()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:  '../indexgroup/warningDetail?id=' + item.id
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
			
		},
		onReady()  {
			// this.alarmMessage()
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
