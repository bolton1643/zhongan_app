<template name="packageDetail">
	<view >
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">套餐变更详情</block>
		</cu-custom>
		<view v-if = "step === '1' || step === 1">
			<view class="cu-form-group  ">
				<view class="title">店铺名称：</view><view class="context">{{detail.shopName}}</view>
			</view>
			<view class="cu-form-group  ">
				<view class="title">店铺编号：</view><view class="context">{{detail.shopNo}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">店铺地址：</view><view class="context">{{detail.shopAddr}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">负责人：</view><view class="context">{{detail.manager}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">负责人电话：</view><view class="context">{{detail.managerPhone}}</view>
			</view> 
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg  "  @tap="showModal"  data-target="Modal">下一步</button>
			</view>
		</view>
		 
		
		<view v-if = "step === '2' || step === 2">
			
			<view class="cu-form-group  ">
				<view class="title">店铺名称：</view><view class="context">{{detail.shopName}}</view>
			</view>
			<view class="cu-form-group  ">
				<view class="title">店铺编号：</view><view class="context">{{detail.shopNo}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">店铺地址：</view><view class="context">{{detail.shopAddr}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">负责人：</view><view class="context">{{detail.manager}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">负责人电话：</view><view class="context">{{detail.managerPhone}}</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">变更类型</view>
				<picker @change="PickerChange" :value="index" :range="pickerType">
					<view class="picker">
						{{index>-1?pickerType[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group  ">
				<view class="">
					<view class="  bg-white  ">
						<view class="solid-bottom padding text-left">
							<text class="text-left">设备及保险</text>
						</view>
						<view class="cu-list menu" >
							<view class="cu-item" v-for="(item,index) in combo.optiondevices"> 
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{item.name}} ¥{{item.price}}</text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0" :value="item.amount" @change="numChange1($event,item)" ></yp-number-box></view>
									</view>
								</view>
							</view>
							<!-- <view class="cu-item" >
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>NB烟感 （含安装费） ¥100 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view> -->
							<!-- :class="menuArrow?'arrow':''" -->
							<view class="cu-item" v-for="(item,index) in combo.optionservices">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{item.name}} ¥{{item.price}}</text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0" :value="item.amount" @change="numChange($event,item)" ></yp-number-box></view>
									</view>
								</view>
							</view>
						</view>	
					</view>
				</view>	
				
			</view>
			
			<view class="cu-form-group  bg-gray ">
				<view class="" style="width:100%;" >
					<view class=" bg-gray ">
						<view class="solid-bottom padding text-left">
							<text class="text-left">当前套餐</text>
						</view>
						<view class="cu-list menu " >
							<view class="cu-item " v-for="(item,index) in combo.devices">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{item.name}} *{{item.amount}}</text></view>
										<view class=" flex-sub   padding-sm margin-xs radius">¥{{item.price}}</view>
									</view>
								</view>
							</view>
							<!-- <view class="cu-item" >
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>NB烟感 （含安装费） ¥100 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  :disabled="true" value="1" ></yp-number-box></view>
									</view>
								</view>
							</view> -->
							<view class="cu-item" v-for="(item,index) in combo.services">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{item.name}} *{{item.amount}}</text></view>
										<view class=" flex-sub   padding-sm margin-xs radius">¥{{item.price}} </view>
									</view>
								</view>
							</view>
							<view class="cu-item" >
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>服务开始时间 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius">{{detail.serviceEffectiveDate}} </view>
									</view>
								</view>
							</view>
							<view class="cu-item" >
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>服务结束时间 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius">{{detail.serviceExpireDate}} </view>
									</view>
								</view>
							</view>
						</view>	
					</view>
				</view>	
			</view>
		 
			
		 
			<view class="padding flex flex-direction bg-gray ">
				<button class="cu-btn bg-blue lg  " @click="submitBtn">提交</button>
			</view>
		</view>
		
		
		 <view class="cu-modal" :class="modalName=='Modal'?'show':''">
		 	<view class="cu-dialog">
		 		<view class="cu-bar bg-white justify-end">
		 			<view class="content">请选择操作</view>
		 			<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
		 			</view>
		 		</view>
		 		<view class="padding-xl">
					<view class="bg-blue padding-lg margin-xs radius" @click="openMap(detail.longitude,detail.latitude,detail.shopAddr)">我要导航</view>
					 <view class="bg-blue padding-lg margin-xs radius"  @click="haveInStore">我已到店</view>
		 		</view>
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
				index: -1,
				picker: ['对提供的服务不感兴趣', '感觉价格较高', '其他'],
				detail: {},
				combo:{
					devices:[],
					services:[],
					optiondevices:[],
					optionservices:[]
				},
				id:'',
				step: 1,
				radio: 'A',
				radio2: 'A',
				modalName: '',
				pickerType: ['新增设备或者保险', '变更套餐'],
			}
		},
		onLoad(event) {
			this.id = event.id
			//详情标题
			// uni.setNavigationBarTitle({
			// 	title: this.detail.name
			// });
			this.repairDetail()
		},
		methods: {
			repairDetail() {
				let _self = this;
				this.$api.combochangeDetail({id:this.id}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						this.detail = res.result
						this.combo.devices = this.detail.comboContent.devices
						this.combo.services = this.detail.comboContent.services
						this.combo.optiondevices = this.detail.optionCombo.devices
						this.combo.optionservices = this.detail.optionCombo.services
					}else {
						this.detail = {}
					}
				}).catch(res => {
					this.detail = {}
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				// this.step = 2
			},
			hideModal(e) {
				this.modalName = null
			},
			gotoInsert() {
				uni.navigateTo({
					url: '../indexgroup/addInstall'
				})
			},
			haveInStore(e) {
				this.step =2;
				this.hideModal(e);
			},
			submitBtn() {
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '是否确定变更套餐',
				    success: function (res) {
				        if (res.confirm) {
				          that.combochange()
				        } else if (res.cancel) {
				           
				        }
				    }
				});
				
			},
			combochange () {
				let params = {
					id:this.id,
					shopId:this.detail.shopId,
					devices:[],
					services:[]
				}
				for (let i = 0 ; i< this.combo.optionservices.length; i++ ) {
					if (this.combo.optionservices[i].amount) {
						params.services.push(this.combo.optionservices[i])
					}
				}
				for (let i = 0 ; i< this.combo.optiondevices.length; i++ ) {
					if (this.combo.optiondevices[i].amount) {
						params.devices.push(this.combo.optiondevices[i])
					}
				}
				params.devices = JSON.stringify(params.devices)
				params.services = JSON.stringify(params.services)
				this.$api.combochangeProcess(params).then(res => {
					if (res.status === 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '变更成功'
						});
						uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 1
						})
					}else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res.message
						});
						// _this.isRotate=false
					}
				}).catch(res => {
				　　// 失败进行的操作
				})
			},
			numChange1(value,e) {
				let data = e
				for(let i = 0; i<this.combo.optiondevices.length;i++) {
					if (this.combo.optiondevices[i].name == data.name) {
						this.combo.optiondevices[i].amount = value
					} 
				}
			}, 
			numChange(value,e) {
				let data = e
				for(let i = 0; i<this.combo.optionservices.length;i++) {
					if (this.combo.optionservices[i].name == data.name) {
						this.combo.optionservices[i].amount = value
					} 
				}
			}, 
			openMap(latitude,longitude,name) {
				uni.openLocation({
					latitude: latitude-0,//要去的纬度-地址       
					longitude: longitude-0,//要去的经度-地址
					name:name,//地址名称
					address: name,//详细地址名称
					success: function () {
						console.log('导航成功');
					},
					fail:function(error){
						console.log(error)
					  }
			   });
			}
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
	.cu-form-group .context {
		flex: 1;
		text-align: right;
	}
</style>
