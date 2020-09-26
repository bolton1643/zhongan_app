<template name="devicesDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">{{detailflag==='1'?'设备详情':'设备新增'}}</block>
			<block slot="right"  > </block>
		</cu-custom>
	 
		 
		<view  >
			<view v-if="detailflag==='0'">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">厂家品牌</view>
						<picker @change="brandPickerChange" :value="index" :range="brandPicker">
							<view class="picker">
								{{brandPicker[index]}}
							</view>
						</picker>
					</view>

					<view v-if="brandPicker[index] === '华为好望AI摄像头'">
						<view class="cu-form-group">
							<view class="title">型号</view>
							<picker @change="goodsTypePickerChange" :value="goodsTypePickerIndex" :range="goodsTypePicker">
								<view class="picker">
									{{goodsTypePicker[goodsTypePickerIndex]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">访问模式</view>
							<picker @change="modePickerChange" :value="modePickerIndex" :range="modePicker">
								<view class="picker">
									{{modePicker[modePickerIndex]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">设备名称</view>
							<input class=" text-right" v-model="params.deviceName" name="input"></input>
						</view>
						
						<view class="cu-form-group">
							<view class="title">设备序列号</view>
							<input class=" text-right" v-model="params.serialNo" name="input"></input>
						</view>
						
						<view class="cu-form-group">
							<view class="title">登陆账号</view>
							<input class=" text-right" v-model="params.loginAccount" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">登陆密码</view>
							<input class=" text-right" v-model="params.loginPass" name="input"></input>
						</view>
						
						<!-- <view class="cu-form-group">
							<view class="title">登陆密码</view>
							<input class=" text-right"  name="input"></input>
						</view> -->
						
						<view class="padding flex flex-direction margin-top">
							<button class="cu-btn bg-blue lg margin-top-sm"  @click="deviceAdd">提交</button>
						</view>
					</view>
					
					<view v-if="brandPicker[index] === 'NB烟感' || brandPicker[index] === 'NB门磁'">
						<view class="cu-form-group">
							<view class="title">型号</view>
							<picker @change="goodsTypePickerChange" :value="goodsTypePickerIndex" :range="goodsTypePicker">
								<view class="picker">
									{{goodsTypePicker[goodsTypePickerIndex]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">设备名称</view>
							<input class=" text-right"  name="input"></input>
						</view>
											 
						<view class="cu-form-group">
							<view class="title">设备序列号</view>
							<input class=" text-right"  name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">SIM卡号</view>
							<input class=" text-right"  name="input"></input>
						</view>
						
						<view class="cu-form-group">
							<view class="title">SIM卡开始时间</view>
							<picker mode="date" :value="begindate" start="2015-09-01" end="2025-09-01" @change="beginDateChange">
								<view class="picker">
									{{begindate}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">SIM卡结束时间</view>
							<picker mode="date" :value="enddate" start="2015-09-01" end="2025-09-01" @change="endDateChange">
								<view class="picker">
									{{enddate}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">安装位置</view>
							<input class=" text-right"  name="input"></input>
						</view>
						
						<view class="padding flex flex-direction margin-top">
							<button class="cu-btn bg-blue lg margin-top-sm"  >提交</button>
						</view>
					</view>
					
				</form>
			</view>
			
			<view v-if="detailflag==='1'">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">厂家品牌</view>
						<input disabled="true" name="input">  {{detail.deviceBrand}}  </input>
					</view>
					<view class="cu-form-group">
						<view class="title">型号</view>
						<input disabled="true" name="input">  {{detail.deviceType}}</input>
					</view>
					<view class="cu-form-group">
						<view class="title">访问模式</view>
						<input   name="input">{{detail.accessModel}}</input>
					</view>
					<view class="cu-form-group">
						<view class="title">设备名称</view>
						<input   name="input">{{detail.deviceName}}</input>
					</view>
					<view class="cu-form-group">
						<view class="title">登陆账号</view>
						<input   name="input">{{detail.loginAccount}}</input>
					</view>
					<view class="cu-form-group">
						<view class="title">登陆密码</view>
						<input   name="input">{{detail.loginPass}}</input>
					</view>
					
				</form>
			</view>
			
			
			
		 
		</view>
		 
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	    
	export default {
		components: {  
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer,
			 tTable,
			 tTh,
			 tTr,
			 tTd
		},
		data() {
			return {
				params:{},
				tableList: [
					{
						 id: 0,
						 name: '张三',
						 age: '19',
						 hobby: '游泳'
					},
					{
						 id: 1,
						 name: '李四',
						 age: '21',
						 hobby: '绘画'
					},
					{
						 id: 2,
						 name: '王二',
						 age: '29',
						 hobby: '滑板'
					},
					{
						 id: 3,
						 name: '码字',
						 age: '20',
						 hobby: '蹦极'
					}
				],
				brandPicker: ['华为好望AI摄像头'],
				index:0 ,
				goodsTypePicker: ['型号1', '型号2'],
				goodsTypePickerIndex:0,
				
				modePicker: ['云端访问'],
				modePickerIndex:0,
				modalName: null,
				lefttime: '15:00',
				detailflag: '1',
				menuBorder: false,
				menuArrow: true,
				menuCard: false,
				begindate: '2018-12-25',
				enddate: '2020-12-25',
				detail:{}
			};
		},
		onLoad(options) {
			this.detailflag = options.detailflag;
			if (this.detailflag == 0) {
				this.params.deviceBrand = this.brandPicker[0]
				this.params.deviceType = this.goodsTypePicker[0]
				this.params.accessModel = this.modePicker[0]
				this.params.shopId = options.shopId
			}else {
				this.detail = JSON.parse(options.detail)
				console.log(this.detail)
			}
		},
		methods: {
			deviceAdd() {
				// if (!this.checkImage()) {
				// 	return
				// }
				
				this.$api.deviceAdd(this.params).then(res => {
					if (res.status === 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '新增成功'
						});
						uni.navigateBack()
					}else {
						// _this.isRotate=false
					}
				}).catch(res => {
				　　// 失败进行的操作
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
			brandPickerChange(e) {
				this.index = e.detail.value
				this.params.deviceBrand = this.brandPicker[Number(this.index)]
			},
			goodsTypePickerChange(e) {
				this.goodsTypePickerIndex = e.detail.value
				this.params.deviceType = this.goodsTypePicker[Number(this.goodsTypePickerIndex)]
			},
			modePickerChange(e) {
				this.modePickerIndex = e.detail.value
				this.params.accessModel = this.modePicker[Number(this.modePickerIndex)]
			},
			beginDateChange(e) {
				this.date = e.detail.value
			},
			endDateChange(e) {
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
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
