<template name="placemanageList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">场所列表</block>
		</cu-custom>
		<view  class="" style="margin-top: -20upx;">
			<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex'
			@onSelected='onSelected' @dateChange='dateChange'></ren-dropdown-filter>
		</view>
		<view  style="margin-top: 80upx;">
			
			<view class="cu-list menu-avatar margin-top" >
				
				<view class="cu-item margin-top "   v-for="(item,index) in shopList" :key="index" @click="gotoDetail(item)">
					<view class="cu-avatar  lg" style="width:100upx;height:100upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
						<view class="cu-tag badge">3</view>
					</view>
					<view class="content">
						<view class="text-black">{{item.shopName}}({{item.shopNo}})</view>
						<view class="text-grey">{{item.addr}}</view>
						<view class="text-gray text-sm flex">
						<view class="text-cut">
							  {{item.serviceEffectiveDate}}
						</view>
					</view>
					<view class="action">
					</view>
				</view>
			</view>
		</view>
				
				<!-- <view class="cu-item margin-top " @click="gotoDetail" >
					<view class="cu-avatar  lg" style="width:100upx;height:100upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
						<view class="cu-tag badge">5</view>
					</view>
					<view class="content">
						<view class="text-black">小海小香2（000002）</view>
							<view class="text-grey">浙江省杭州市西湖区古墩路11号</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								  2020-5-3 14:15:40
							</view> </view>
					</view>
					<view class="action">
					</view>
				</view> -->
				
				
				<!-- <view class="cu-item margin-top " @click="gotoDetail" >
					<view class="cu-avatar  lg" style="width:100upx;height:100upx;background:rgba(205,53,64,0.1);border-radius:10upx;">
						<image :src="'/static/image/message/warning.png'" style="width: 50upx; height: 50upx;"></image>
						<view class="cu-tag badge">4</view>
					</view>
					<view class="content">
						<view class="text-black">小海小香4（000001）</view>
							<view class="text-grey">浙江省杭州市西湖区古墩路11号</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								  2020-5-3 14:15:40
							</view> </view>
					</view>
					<view class="action">
					</view>
				</view> -->
				
				
				
			</view>
		</view>
		 
	 
		
		
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
    import slFilter from '@/components/songlazy-sl-filter/sl-filter/filter-view.vue';
	import uniCombox from "@/components/uni-combox/uni-combox";
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	export default {
		components: {  
			TabCur: 0,
			scrollLeft: 0,
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer,
			 slFilter,
			 uniCombox,
			 RenDropdownFilter,
			 
		},
		data() {
			return {
				filterData:[
				    [{ text: '布撤防状态', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
				    [{ text: '服务状态', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }],
					[{ text: '店铺类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }], 
				],
				defaultIndex:[0,0,0],
				shopList:[],
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
		methods: {
			shopLists() {
				this.$api.shopLists({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						this.shopList = res.result
					}else {
						// _this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			onSelected(res){
			                console.log(res)
			            },
			dateChange(d){
			   uni.showToast({
				   icon:'none',
				   title:d
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
			gotoDetail(item){
				uni.navigateTo({
					url:  '../manage/placemanageDetail?item=' + JSON.stringify(item)
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
			this.shopLists()
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
