<template name="becomepartner">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">成为城市合伙人</block>
		</cu-custom>
		<!-- <view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 新增超级合伙人
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="NumSteps" v-if="num <2">下一步</button>
		 
			</view>
		</view> -->
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		
		<view v-if="num === 0">
			<view class="cu-form-group margin-top">
				<view class="title"><text class="text-red">*</text> 角色</view>
				<picker @change="bindPickerChange" :value="index" :range="picker" range-key = "name">
					<view class="picker">{{index>-1?picker[index].name:'请选择角色'}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text> 省市：</view>
				<region-picker @change="region_change" :value="350104">
				    <view class="picker"> {{address?address:'请选择地区信息'}}</view>
				</region-picker>
			</view>
			<view class="cu-form-group" v-if="params.role == 1">
				<view class="title"><text class="text-red">*</text> 类型：</view>
				<picker @change="typePicker" :value="typeIndex" :range="pickertype" range-key = "name">
					<view class="picker">
						{{typeIndex>-1?pickertype[typeIndex].name:'请选择类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group"  v-if="params.role == 1 && params.userType==1">
				<view class="title"> <text class="text-red">*</text>企业名称：</view>
				<input placeholder="" name="input" v-model="params.companyName"></input>
			</view>
			<view class="cu-form-group " >
				<view class="title"> <text class="text-red">*</text> {{(params.role == 1 && params.userType==1) ?"法人姓名":"姓名"}}：</view>
				<input placeholder="" name="input" v-model="params.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text> 出生年月</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date || '请选择出生日期'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title"><text class="text-red">*</text> 性别</view>
				<picker @change="PickerSex" :value="index" :range="pickersex" range-key = "name">
					<view class="picker">
						{{sexindex>-1?pickersex[sexindex].name:'请选择性别'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-bar bg-white" v-if="params.role == 1 && params.userType==1">
				<view class="action">
					<text class="text-red">*</text> 营业执照
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group" v-if="params.role == 1 && params.userType==1">
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
			
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="text-red">*</text> 负责人身份证正面
				</view>
				<view class="action">
					{{imgList2.length}}/1
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
					<view class="solids" @tap="ChooseImage(2)" v-if="imgList2.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="text-red">*</text> 负责人身份证反面
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
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text> 活动礼包</view>
				<view class="title"><text class="text-price">{{giftDetail.money}}</text></view>
			</view>
			<view class="cu-form-group">
				<text class="cuIcon-warn" ></text>
				<view class="title text-xs ">{{giftDetail.desc}}</view>
			</view>
				
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text> 收货城市：</view>
				<region-picker @change="sregion_change" :value="350104">
					<view class="picker"> {{saddress?saddress:'请选择地区信息'}}</view>
				</region-picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text> 收货地址</view>
				<input placeholder="" name="input" v-model="params.addr"></input>
			</view>
	
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-grey lg " @tap="NumStepsPre" v-if="num >0">上一步</button>
				<button class="cu-btn bg-grey lg margin-top-sm" @tap="NumSteps" v-if="num <2">下一步</button>
				<button class="cu-btn bg-grey lg margin-top-sm" @tap="NumSteps" v-else>提交</button>
			</view>
		</view>
		
		<view v-if="num === 1">
			<view class="cu-form-group  margin-top">
					<view class="flex-sub text-center">
						<view class="solid-bottom text-xxl padding">
							<text class=" text-red">剩余支付时间</text>
						</view>
						<view class="padding">
							<countdown-timer :time="time">
							    <template v-slot="{ minute, second}">
							        <view> {{minute}}分{{second}}秒</view>        
							    </template>
							</countdown-timer>
						</view>
					</view>
			</view>
			<view class="cu-form-group">
				<view class="title">选择支付方式</view>
				<view class="title"> </view>
			</view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group">
					<view class="title">支付宝</view>
					<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">微信</view>
					<view>
						<radio class=' margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
					</view>
				</view>
			</radio-group>
			
			 
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-grey lg " @tap="NumStepsPre" v-if="num >0">上一步</button>
				<button class="cu-btn bg-grey lg margin-top-sm" @tap="NumSteps" v-if="num <2">下一步</button>
				<button class="cu-btn bg-grey lg margin-top-sm" @tap="NumSteps" v-else>确认支付</button>
			</view>
		</view>
		
		
		<view v-if="num === 2">
			<view class="bg-white padding-lr margin-top">
				<view class="solids-bottom padding-xs flex align-center">
					<view class="padding"></view>
					<view class="flex-sub text-center">
						<view class="solid-bottom text-xsl padding">
							<text class=" cuIcon-roundcheckfill text-green"></text>
						</view>
						<view class="padding">您已提交成功，管理员审核通过后即可正式使用</view>
					</view>
				</view>
			</view>
			
			<view class="padding flex flex-direction margin-top">
			 
				<button class="cu-btn bg-grey lg margin-top-sm" @tap="gotoIndexGroup" >进入首页</button>
			</view>
			
			
			<!-- <view class="padding flex flex-direction margin-top">
			
				<button class="cu-btn bg-grey lg margin-top-sm"  @tap="showModal" data-target="DialogModal1" >提交</button>
			</view> -->
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
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
	import request from '@/common/httpRequest.js'
	import { getTime } from '@/common/util.js'
	
	export default {
		components: {  
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer
		},
		data() {
			return {
				radio: 'A',
				time: new Date('2020/04/24 01:00:00').getTime() - new Date('2020/04/24 00:45:00').getTime(),
				picker: [{name:'请选择角色',id:''},{name:'一般合伙人',id:0}, {name:'超级合伙人',id:1}],
				pickertype: [{name:'请选择类型',id:''},{name:'个人',id:0}, {name:'企业',id:1}],
				pickersex: [{name:'请选择性别',id:''},{name:'男',id:'M'}, {name:'女',id:'F'}],
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
				address: '',
				saddress:'',
				index:-1,
				typeIndex:-1,
				sexindex: -1,
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
				modalName: null,
				lefttime: '15:00',
				params:{
					photo:{}
				},
				giftDetail:{},
				giftData:[],
				next:true,
				prepayDetail:{}
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
				if (this.num === 0) {
					if(!this.next) {
						this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
						return
					}
					console.log(this.giftDetail)
					this.prepay(this.giftDetail)
					this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
		// 			if (this.checkForm()) {
		// 				this.params.photo = JSON.stringify(this.params.photo)
		// 				this.$api.partnerApply(this.params).then(res => {
		// 				   // 获得数据 
		// 					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
		// 						// this.toMain(res.data.data);
		// 						this.next = false
		// 						this.prepay(this.giftDetail)
		// 						this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
		// 					}else {
		// 						uni.showToast({
		// 						    icon: 'none',
		// 							position: 'bottom',
		// 						    title: res.message
		// 						});
		// 						// _this.isRotate=false
		// 					}
		// 				}).catch(res => {
		// 					uni.showToast({
		// 　　　　　　　　　　　　title: res.message,
		// 　　　　　　　　　　　　icon: 'none'
		// 　　　　　　　　　　	})
		// 				})
		// 			}
				}else if (this.num == 1){
					this.prepayBtn()
					// this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
				}else {
					this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
				}
							
			},
			NumStepsPre() {
				this.num= this.num == 0 ? 0 : this.num - 1				
			},
			ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
			//区域省市区
			region_change(e) {
				this.params.postCode = e.detail.code[2]
				this.address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
			},
			//角色
			bindPickerChange (e){
				if (e.detail.value === -1) {
					return
				}
				this.index = e.target.value
				this.params.role = this.picker[Number(this.index)].id
				this.params.gift = e.target.value
				for (let i = 0; i<this.giftData.length;i++) {
					if (this.params.role == this.giftData[i].id) {
						this.giftDetail = this.giftData[i]
					}
				}
			},
			//类型
			typePicker(e){
				this.typeIndex = e.target.value
				this.params.userType = this.picker[Number(this.typeIndex)].id
			},
			//收货省市区
			sregion_change(e) {
				this.params.recvPostCode = e.detail.code[2]
				this.saddress = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
			},
			//性别
			PickerSex(e) {
				this.sexindex = e.detail.value
				this.params.sex = this.pickersex[Number(this.sexindex)].id
			},
			DateChange(e) {
				this.date = e.detail.value
				this.params.birthday = getTime(this.date)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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
									this.params.photo.lisence = res.result
								}
								 
								if(indextmp === 2){
									this.imgList2.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.photo.id1 = res.result
								}
								if(indextmp === 3){
									this.imgList3.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
									this.params.photo.id2 = res.result
								}
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
			gift() {
				this.$api.gift({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						// this.toMain(res.data.data);
						this.giftData = res.result
						if (this.params.role || this.params.role == 0) {
							for (let i = 0; i<this.giftData.length;i++) {
								if (this.params.role == this.giftData[i].id) {
									this.giftDetail = this.giftData[i]
								}
							}
						}
					}else {
						// _this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			prepay(item) {
				this.$api.prepay({giftId:item.id,totalAmount:item.money}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						this.prepayDetail = res.result
					}else {
						// _this.isRotate=false
					}
				}).catch(res => {
					
				})
			},
			prepayBtn () {
				console.log(this.prepayDetail.tradeNo)
				uni.requestPayment({  
				    provider: 'alipay',  
				    orderInfo: this.prepayDetail.tradeNo,  
				    success: res => {  
						console.log(res)
				        // 进入此回调说明支付成功  
				    },  
				    fail: err => { 
						console.log('fail:' + JSON.stringify(err));
				        const message = err.errMsg || '';  
				        if (message.indexOf('[payment支付宝:62001]') !== -1) {  
				            uni.showModal({  
				                content: '您已取消支付。如有需要，您可在我的订单里重新付款。30分钟内有效。',  
				                showCancel: false  
				            });  
				        } else {  
				            uni.showModal({  
				                content: '支付失败,原因为: ' + message,  
				                showCancel: false  
				            });  
				        }  
				    },  
				    complete: () => {  
				        this.submitting = false;  
				        }  
				    });
			},
			gotoIndexGroup(){
				 uni.setStorageSync("isBecomePartner",1);
				 uni.navigateTo({
					url: '/pages/index/index'
				 })
			},
			checkForm() {
				if (!this.params.role && this.params.role !=0) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择角色',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (!this.params.postCode) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择区域',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (this.params.role == 1) {
					if (!this.params.userType && this.params.userType !=0) {
						uni.showToast({
	　　　　　　　　　　　　title: '请选择类型',
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　	})
						return false
					}
				}
				if (this.params.role == 1 && this.params.userType==1) {
					if (!this.params.companyName) {
						uni.showToast({
	　　　　　　　　　　　　title: '请输入企业名称',
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　	})
						return false
					}
				}
				if (!this.params.name) {
					uni.showToast({
　　　　　　　　　　　　title: '请输入' + ((this.params.role == 1&&this.params.userType==1)?'法人姓名':'姓名'),
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (!this.params.birthday) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择出生日期',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (!this.params.sex) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择性别',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (this.params.role == 1 && this.params.userType==1) {
					if (this.imgList.length == 0) {
						uni.showToast({
	　　　　　　　　　　　　title: '请选择营业执照',
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　	})
						return false
					}
				}
				if (this.imgList2.length == 0 || this.imgList3.length == 0) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择身份证正反面',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (!this.params.recvPostCode) {
					uni.showToast({
　　　　　　　　　　　　title: '请选择收货城市',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				if (!this.params.addr) {
					uni.showToast({
　　　　　　　　　　　　title: '请输入收货地址',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　	})
					return false
				}
				return true
			}
		},
		onReady()  {
			this.gift()
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
