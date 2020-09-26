<template name="dealWarning">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">现场处理</block>
		</cu-custom>
		<view >
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="text-red" >*</text>  <text style="margin-left: 10upx;">处理说明：</text></view>
				<textarea placeholder="" name="input" v-model="params.processContent"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					上传图片
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
	
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-blue lg margin-top-sm" @tap="showModal" data-target="DialogModal1">提交</button>
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
		 				<button class="cu-btn bg-green margin-left" @tap="alarmProcess">确定</button>
		 
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
				modalName: null,
				params:{
					id:''
				},
				packageDetail:{},
				applyList:[]
			};
		},
		onLoad(event) {
			if (event.id) {
				this.params.id = event.id;
			}
		},
		methods: { 
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			alarmProcess() {
				this.modalName = null
				if (!this.checkForm()) {
					return
				}
				this.$api.alarmProcess(this.params).then(res => {
					if (res.status === 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '处理成功'
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
								this.imgList.push(request.interfaceUrl() +'/api/tuser/public/images/' + res.result)
								this.params.processPhotos = res.result
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
			checkForm() {
				if (!this.params.processContent) {
					uni.showToast({
						title:'请输入处理说明',
						icon: 'none'
					})
					return false
				}
				if (this.imgList.length == 0) {
					uni.showToast({
						title:'请选择图片',
						icon: 'none'
					})
					return false
				}
				return true
			}
		},
		onReady()  {
			// this.package()
			// this.shopList()
			// if (!this.params.applyId) {
			// 	this.getApplyList()
			// }
		},
		computed:{
			myfilter() {
				return function() {
					let res = 0;
					if(this.extraDevices.length>0) {
					  for(let i = 0; i<this.extraDevices.length;i++) {
						 res += Number(this.extraDevices[i].amount) * Number(this.extraDevices[i].price) 
					  }
					}
					if(this.extracServices.length>0) {
					  for(let i = 0; i<this.extracServices.length;i++) {
						 res += Number(this.extracServices[i].amount)*Number(this.extracServices[i].price) 
					  }
					}
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
