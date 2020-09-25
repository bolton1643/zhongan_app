<template name="addInstall">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">到店新增</block>
		</cu-custom>
	 
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		
		<view v-if="num === 0">
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="text-red" >*</text>  <text style="margin-left: 10upx;">店铺名称：</text></view>
				<input placeholder="" name="input" v-model="params.shopName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text> <text style="margin-left: 10upx;">省市区：</text> </view>
				<region-picker @change="region_change" :value="350104">
				    <view class="picker"> {{address?address:'请选择地区信息'}}</view>
				</region-picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text>   <text  style="margin-left: 10upx;" >详细地址：</text></view>
				<view class="addrpicker" @click="chooseLocation">
					{{params.addr ? params.addr : '请选择详细地址'}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>  <text  >地址备注：</text></view>
				<input placeholder="" name="input" v-model="params.addrNote"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title"><text class="text-red"  >*</text><text  style="margin-left: 10upx;" >店铺类型：</text> </view>
				<picker @change="PickerChange" :value="index" :range="picker" range-key = "itemText">
					<view class="picker">
						{{index>-1?picker[index].itemText:'请选择店铺类型'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text>   <text  style="margin-left: 10upx;" >保险受益人姓名</text></view>
				<input placeholder="" name="input"  v-model="params.benifitName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text>   <text  style="margin-left: 10upx;" >保险受益人电话</text></view>
				<input placeholder="" name="input"  v-model="params.benifitPhone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text><text  style="margin-left: 10upx;" >负责人</text> </view>
				<input placeholder="" name="input" v-model="params.manager"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"  >*</text><text  style="margin-left: 10upx;" >负责人电话</text></view>
				<input placeholder="" name="input" v-model="params.managerPhone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第一联系人姓名</view>
				<input placeholder="" name="input" v-model="params.contact1Name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第一联系人电话</view>
				<input placeholder="" name="input" v-model="params.contact1Phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第二联系人姓名</view>
				<input placeholder="" name="input" v-model="params.contact2Name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第二联系人电话</view>
				<input placeholder="" name="input" v-model="params.contact2Phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第三联系人姓名</view>
				<input placeholder="" name="input" v-model="params.contact3Name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm "  > &nbsp;</text>第三联系人电话</view>
				<input placeholder="" name="input" v-model="params.contact3Phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm"  > &nbsp;</text>服务生效时间</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date || '请选择服务生效时间'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="margin-left-sm"  > &nbsp;</text>服务期限(年)</view>
					<yp-number-box :min="0" :max="9" @change="onNumberChange"></yp-number-box>
			</view>
	
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-blue lg " @tap="NumStepsPre" v-if="num >0">上一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="NumSteps" v-if="num <2">下一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="NumSteps" v-else>提交</button>
			</view>
		</view>
		
		<view v-if="num === 1">
			<!-- <scroll-view scroll-x class="bg-white nav margin-top">
			 	<view class="flex text-center">
			 		<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in packageList" :key="index" @tap="tabSelect" :data-id="index">
			 			 {{item.title}}
			 		</view>
			 	</view>
			 </scroll-view> -->
			
			<!-- <view v-if="TabCur==0">
				<view class="">
					<view class="padding-lr bg-white">
						<view class="solid-bottom padding-sm text-left">
							<text class="text-left">服务费：</text>
						</view>
						 
						<view class="padding-left padding-sm margin-left-sm  text-left">10万保额保险 一年</view>
						<view class="padding-left padding-sm margin-left-sm text-left">设备维修服务 一年</view>
					</view>
					
				</view>	
				
				<view class=" ">
					<view class="padding-lr bg-white  ">
						<view class="solid-bottom padding-sm text-left">
							<text class="text-left">设备及保险</text>
						</view>
						<view class="cu-list menu " :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs   mb-sm">
										<view class="flex-twice padding-sm   radius"><text>华为好望AI摄像头(含安装费） ¥439</text></view>
										<view class=" flex-sub   padding-sm   radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view>
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>NB烟感 （含安装费） ¥100 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view>
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>保险 ¥100 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view>
							
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm  fr">
										<view class="  padding">
											总计：<text class="text-price">350.00</text>
										</view>
									</view>
								</view>
							</view>
							
						</view>	
					</view>
				</view>	
				
				
				
			</view> -->
			
			<!-- <view v-if="TabCur==1">
				<view class="padding text-center">
					<view class="padding-lr bg-white">
						<view class="solid-bottom padding">
							<text class="text-price">550.00</text>
						</view>
						<view class="padding-sm text-left">服务费：</view>
						<view class="padding-sm">50万保额保险 一年</view>
						<view class="padding-sm">设备维修服务 一年</view>
					</view>
					
				</view>	
				
				<view class="padding ">
					<view class="padding-lr bg-white  ">
						<view class="solid-bottom padding text-left">
							<text class="text-left">设备及保险</text>
						</view>
						<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>升级华为好望AI摄像头(含安装费） ¥439</text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view>
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>保险 ¥500 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view>
						</view>	
					</view>
				</view>	
			</view>
			</view>	 -->
			<view class="packageName" >
				 {{packageDetail.packageName}}
			</view>
			<view >
				<view class="padding text-center">
					<view class="padding-lr bg-white">
						<!-- <view class="solid-bottom padding">
							<text class="text-price">{{packageDetail.serviceMoney}}</text>
						</view> -->
						<view class="padding-sm text-left">服务费：¥{{packageDetail.serviceMoney}}</view>
						<view class="padding-sm" v-for="(item,index) in packageDetail.services" :key="index">{{item.name}} 一年</view>
						<!-- <view class="padding-sm">设备维修服务 一年</view> -->
					</view>
				</view>	
				<view class="padding text-center">
					<view class="padding-lr bg-white">
						<!-- <view class="solid-bottom padding">
							<text class="text-price">{{packageDetail.deviceMoney}}</text>
						</view> -->
						<view class="padding-sm text-left">设备费：¥{{packageDetail.deviceMoney}}</view>
						<view class="padding-sm" v-for="(item,index) in packageDetail.devices" :key="index">{{item.name}} 一年</view>
						<!-- <view class="padding-sm">设备维修服务 一年</view> -->
					</view>
					
				</view>	
				<view class="padding ">
					<view class="padding-lr bg-white">
						<view class="solid-bottom padding text-left">
							<text class="text-left">增加</text>
						</view>
						<view class="cu-list menu" >
							<view class="cu-item" v-for="(items,index1) in extraDevices" :key="index1">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{items.name}} ¥{{items.price}}</text></view>
										<view class="flex-sub padding-sm margin-xs radius">
											<yp-number-box :min="0" :value="items.amount" @change="numChange($event,items)"></yp-number-box>
										</view>
									</view>
								</view>
							</view>
							<view class="cu-item" v-for="(items,index1) in extracServices" :key="index1">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>{{items.name}} ¥{{items.price}}</text></view>
										<view class="flex-sub padding-sm margin-xs radius">
											<yp-number-box :min="0" :value="items.amount" @change="numChange1($event,items)"></yp-number-box>
										</view>
									</view>
								</view>
							</view>
							<view class="total">
								总计：￥{{myfilter()}}
							</view>
							<!-- <view class="cu-item">
								<view class="content">
									<view class="flex  p-xs margin-bottom-sm mb-sm">
										<view class="flex-twice padding-sm margin-xs radius"><text>保险 ¥2000 </text></view>
										<view class=" flex-sub   padding-sm margin-xs radius"><yp-number-box :min="0"  ></yp-number-box></view>
									</view>
								</view>
							</view> -->
						</view>	
					</view>
				</view>	
			</view>
			
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-blue lg " @tap="NumStepsPre" v-if="num >0">上一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="NumSteps" v-if="num <3">下一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="NumSteps" v-else>提交</button>
			</view>
		</view>
		
		
		<view v-if="num === 2">
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					门头照
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(0)" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					内景照
				</view>
				<view class="action">
					{{imgList2.length}}/2
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList2" :key="index" @tap="ViewImage" :data-url="imgList2[index]">
					 <image :src="imgList2[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(2)" v-if="imgList2.length<2">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					防区图
				</view>
				<view class="action">
					{{imgList3.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList3" :key="index" @tap="ViewImage" :data-url="imgList3[index]">
					 <image :src="imgList3[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(3)" v-if="imgList3.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					负责人身份证正面
				</view>
				<view class="action">
					{{imgList4.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList4" :key="index" @tap="ViewImage" :data-url="imgList4[index]">
					 <image :src="imgList4[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(4)" v-if="imgList4.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					负责人身份证反面
				</view>
				<view class="action">
					{{imgList5.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList5" :key="index" @tap="ViewImage" :data-url="imgList5[index]">
					 <image :src="imgList5[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage(5)" v-if="imgList5.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			
			
			
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-blue lg " @tap="NumStepsPre" v-if="num >0">上一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="NumSteps" v-if="num <2">下一步</button>
				<button class="cu-btn bg-blue lg margin-top-sm"  @tap="createSite" data-target="DialogModal1" v-else>提交</button>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
		 	<view class="cu-dialog">
		 		<view class="cu-bar bg-white justify-end">
		 			<view class="content">提交确认</view>
		 			<view class="action" @tap="hideModal">
		 				<text class="cuIcon-close text-red"></text>
		 			</view>
		 		</view>
		 		<view class="padding-xl">
		 			确认提交吗
		 		</view>
		 		<view class="cu-bar bg-white justify-end">
		 			<view class="action">
		 				<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
		 				<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
		 
		 			</view>
		 		</view>
		 	</view>
		</view>
		
		
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import request from '@/common/httpRequest.js'
	import { getTime } from '@/common/util.js'
	export default {
		components: {  
		    regionPicker ,
			 ypNumberBox
		},
		data() {
			return {
				picker: [],
				basicsList: [{
					cuIcon: 'usefullfill',
					name: '基本信息'
					}, 
					{
						cuIcon: 'radioboxfill',
						name: '选择套餐'
					}, 
					{
						cuIcon: 'roundclosefill',
						name: '上传图片'
					}
				],
				basics: 0,
				numList: [{
					name: '基本信息'
				}, {
					name: '选择套餐'
				}, {
					name: '上传图片'
				},  ],
				num: 0,
				scroll: 0,
				multiArray: [
					['浙江省', '江苏省'],
					['杭州市', '嘉兴市', '湖州市'],
					['桐乡', '嘉善']
				],
				address: '请选择地址',
				index:-1,
				date: '',
				TabCur: 0,
				scrollLeft: 0,
				packageList: [
					{
						id: 1,
						title: '套餐1'
					},
					{
						id: 2,
						title: '套餐2'
					},
					{
						id: 3,
						title: '套餐3'
					},
				],
				imgList: [],
				imgList2: [],
				imgList3: [],
				imgList4: [],
				imgList5: [],
				extraDevices:[],
				extracServices:[],
				ids:[],
				ids1:[],
				modalName: null,
				params:{
					longitude:'',
					latitude:'',
					coordinate:2,
					addr:'',
					shopPhoto:{}
				},
				packageDetail:{},
				applyList:[]
			};
		},
		onLoad(event) {
			if (event.applyId) {
				this.params.applyId = event.applyId;
			}else {
				this.params.applyId = '';
			}
		},
		methods: {
			numChange(value,e) {  
				let data = e
				for(let i = 0; i<this.extraDevices.length;i++) {
					if (this.extraDevices[i].name == data.name) {
						this.extraDevices[i].amount = value
					} 
				}
				// if (value >= 0) {
				// 	let ind = this.ids.indexOf(data.name)
				// 	if (ind > -1) {
				// 		this.extraDevices[ind].amount = value
				// 	}else {
				// 		data.amount = value
				// 		this.ids.push(data.name)
				// 		this.extraDevices.push(data)
				// 	}
					
				// } 
			},  
			numChange1(value,e) {
				let data = e
				for(let i = 0; i<this.extracServices.length;i++) {
					if (this.extracServices[i].name == data.name) {
						this.extracServices[i].amount = value
					} 
				}
				// if (value >= 0) {
				// 	let ind = this.ids1.indexOf(data.name)
				// 	if (ind > -1) {
				// 		this.extracServices[ind].amount = value
				// 	}else {
				// 		data.amount = value
				// 		this.ids1.push(data.name)
				// 		this.extracServices.push(data)
				// 	}
					
				// } 
			},  
			onNumberChange(value) {  
				this.params.serviceDuration = value;  
			},  
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			createSite() {
				if (!this.checkImage()) {
					return
				}
				this.params.serviceEffectiveDate = this.date
				this.packageDetail.extraDevices = []
				this.packageDetail.extracServices = []
				for (let i = 0; i<this.extraDevices.length;i++) {
					if(this.extraDevices[i].amount) {
						this.packageDetail.extraDevices.push(this.extraDevices[i])
					}
				}
				for (let i = 0; i<this.extracServices.length;i++) {
					if(this.extracServices[i].amount) {
						this.packageDetail.extracServices.push(this.extracServices[i])
					}
				}
				this.params.comboContent = JSON.stringify(this.packageDetail) 
				this.params.shopPhoto = JSON.stringify(this.params.shopPhoto) 
				this.$api.process(this.params).then(res => {
					if (res.status === 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '新增成功'
						});
						uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 2
						})
						// uni.navigateTo({
						// 	url: '../index/index'
						// });
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
			hideModal(e) {
				this.modalName = null
			},
			BasicsSteps() {
				this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1				
			},
			NumSteps() {
				if (this.num === 0) {
					if (this.checkForm()) {
						this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
					}
					// this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
				}else {
					this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
				}
				// this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1				
			},
			NumStepsPre() {
				this.num= this.num == 0 ? 0 : this.num - 1				
			},
			ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
			region_change(e) {
				this.params.provinceCityCounty = e.detail.code[2]
				this.address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
			},
			PickerChange(e) {
				if (e.detail.value === -1) {
					return
				}
				this.index = e.detail.value
				this.params.shopType =  this.picker[Number(this.index)].itemValue
			},
			DateChange(e) {
				this.date = e.detail.value
				this.params.birthday = getTime(this.date)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			package() {
				this.$api.package({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						this.packageDetail = res.result
						for (let i = 0;i < this.packageDetail.devices.length;i++) {
							let obj = this.packageDetail.devices[i]
							obj.amount = 0
							this.extraDevices.push(obj)
						}
						for (let i = 0;i < this.packageDetail.services.length;i++) {
							let obj1 = this.packageDetail.services[i]
							obj1.amount = 0
							this.extracServices.push(obj1)
						}
					}else {
						_this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			shopList() {
				this.$api.shopList({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						this.picker = res.result
						this.picker.unshift({itemText:'请选择店铺类型',itemValue:''})
					}else {
						_this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			getApplyList() {
				this.$api.applyList({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						this.applyList = res.result
						this.params.applyId = this.applyList[0].applyId
						// for(let i = 0;i<this.applyList.length;i++){
						// 	if (this.applyList[i].status == 100) {
						// 		this.params.applyId = this.applyList[i].applyId
						// 		return
						// 	}
						// }
					}else {
						_this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			ChooseImage(index) {
				var indextmp = index;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// let paramsData = 'file=' + res.tempFilePaths[0] 
						// console.log(paramsData)
						request.uploadFile('/api/tuser/public/upload',res.tempFilePaths[0]).then(result => {
						   // 获得数据 
						   let  res = JSON.parse(result)
							if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
								// this.toMain(res.data.data);
								uni.showToast({
									icon: 'success',
									position: 'bottom',
									title: '上传成功'
								});
								if(indextmp === 0){
									this.imgList.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.shopPhoto.gate = res.result
								}
								if(indextmp === 2){
									if (this.imgList2.length === 0) {
										this.params.shopPhoto.innerView = res.result
									}else {
										this.params.shopPhoto.innerView2 = res.result
									}
									this.imgList2.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									
								}
								if(indextmp === 3){
									this.imgList3.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.shopPhoto.guard = res.result
								}
								if(indextmp === 4){
									this.imgList4.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.shopPhoto.id1 = res.result
								}
								if(indextmp === 5){
									this.imgList5.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.shopPhoto.id2 = res.result
								}
								console.log(this.params)
							}else {
								
							}
						}).catch(res => {
							// _this.isRotate=false
							// console.log(res)
						　　// 失败进行的操作
						})
						
					}
				});
			},
			chooseLocation () {
				uni.chooseLocation({
					success: (res) => {
						this.params.longitude = res.longitude
						this.params.latitude = res.latitude
						this.params.addr = res.address + res.name
					}
				})
			},
			checkForm() {
				if (!this.params.shopName) {
					uni.showToast({
						title:'请输入店铺名称',
						icon: 'none'
					})
					return false
				}
				if (!this.params.provinceCityCounty) {
					uni.showToast({
						title: '请选择区域',
						icon: 'none'
					})
					return false
				}
				if (!this.params.addr) {
					uni.showToast({
						title: '请选择详细地址',
						icon: 'none'
					})
					return false
				}
				if (!this.params.shopType) {
					uni.showToast({
						title: '请选择店铺类型',
						icon: 'none'
					})
					return false
				}
				if (!this.params.benifitPhone) {
					uni.showToast({
						title: '请输入受益人姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.params.benifitName) {
					uni.showToast({
						title: '请输入受益人电话',
						icon: 'none'
					})
					return false
				}
				if (!this.params.manager) {
					uni.showToast({
						title:'请输入负责人',
						icon: 'none'
					})
					return false
				}
				if (!this.params.managerPhone) {
					uni.showToast({
						title:'请输入负责人电话',
						icon: 'none'
					})
					return false
				}
				return true
			},
			checkImage () {
				if (this.imgList.length == 0) {
					uni.showToast({
						title:'请选择门头照',
						icon: 'none'
					})
					return false
				}
				if (this.imgList2.length == 0) {
					uni.showToast({
						title:'请选择内景',
						icon: 'none'
					})
					return false
				}
				if (this.imgList2.length == 0) {
					uni.showToast({
						title:'请选择防区图',
						icon: 'none'
					})
					return false
				}
				if (this.imgList4.length == 0 || this.imgList5.length == 0) {
					uni.showToast({
						title:'请选择身份证正反面',
						icon: 'none'
					})
					return false
				}
				return true
			}
		},
		onReady()  {
			this.package()
			this.shopList()
			// if (!this.params.applyId) {
			// 	this.getApplyList()
			// }
		},
		computed:{
			myfilter() {
				return function() {
					let res = 0;
					// if(this.extraDevices.length>0) {
					  for(let i = 0; i<this.extraDevices.length;i++) {
						 res += Number(this.extraDevices[i].amount) * Number(this.extraDevices[i].price) 
					  }
					// }
					// if(this.extracServices.length>0) {
					  for(let i = 0; i<this.extracServices.length;i++) {
						 res += Number(this.extracServices[i].amount)*Number(this.extracServices[i].price) 
					  }
					// }
					res = res + Number(this.packageDetail.deviceMoney) + Number(this.packageDetail.serviceMoney)
					this.packageDetail.totalMoney = res
				  return res;
				};              
			}  
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.packageName {
		line-height: 50px;
		padding: 0 15px;
		margin-top: 10px;
		background-color: #FFFFFF;
	}
	.total {
		line-height: 50px;
		padding: 0 15px;
		margin-top: 10px;
		background-color: #FFFFFF;
		text-align: right;
	}
	
</style>
