<template name="repairDetail">
	<view >
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">维修详情</block>
		</cu-custom>
		<view v-if = "step === '1' || step === 1">
			<view class="cu-form-group ">
				<view class="title">店铺名称：</view><view class="context">{{detail.shopName}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">店铺编号：</view><view class="context">{{detail.shopNo}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">店铺地址：</view><view class="context">{{detail.shopAddr}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">负责人：</view><view class="context">{{detail.manager}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">负责人电话：</view><view class="context">{{detail.managerPhone}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">维修描述：</view><view class="context">{{detail.reportDesc}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">发起时间：</view><view class="context">{{detail.reportDate || '无'}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">图片：</view>
				<view class="context padding-top fr" v-if="detail.reportPhoto">
					<image :src="detail.reportPhoto" style="width: 400upx; height:400upx;margin-right: -50upx;"></image>
				</view>
				<view class="context padding-top fr" v-if="!detail.reportPhoto">无</view>
			</view> 
			<!-- v-if="detail.repairStatus == 0" -->
			<view class="padding flex flex-direction" v-if="detail.repairStatus == 0">
				<button class="cu-btn bg-blue lg "  @tap="showModal"  data-target="Modal">立刻处理</button>
			</view>
		</view>
		
		<view v-if = "step === '2' || step === 2">
			 <view class="margin ">*处理说明：</view>
			 <view class="cu-form-group ">
			 	<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" v-model="params.repairDesc" placeholder="请输入处理说明"></textarea>
			 </view>
			 <view class="margin ">* 上传图片：</view>
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
			 
			 <view class="padding flex flex-direction">
			 	<button class="cu-btn bg-blue lg "  @click="showAllDetail"  >下一步</button>
			 </view>
		</view>
		
		<view v-if = "step === '3' || step === 3">
			<view class="cu-form-group ">
				<view class="title">店铺名称：</view><view class="context">{{detail.shopName}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">店铺编号：</view><view class="context">{{detail.shopNo}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">店铺地址：</view><view class="context">{{detail.shopAddr}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">店铺负责人：</view><view class="context">{{detail.manager}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">负责人电话：</view><view class="context">{{detail.managerPhone}}</view>
			</view>
			
			<view class="bg-gray " style="height: 20px;"> </view> 
			
			<view class="cu-form-group ">
				<view class="title">维修设备：</view><view class="context">华为好望AI摄像头</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">维修类型：</view><view class="context">设备维修</view>
			</view> 
		
			<view class="cu-form-group ">
				<view class="title">备注：</view><view class="context">{{detail.reportDesc}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">发起时间：</view><view class="context">{{detail.reportDate}}</view>
			</view> 
			
			<view class="bg-gray " style="height: 20px;"> </view> 
			
			<view class="cu-form-group ">
				<view class="title">完成时间：</view><view class="context">{{detail.repairDate}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">处理说明：</view><view class="context">{{detail.repairDesc}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">图片：</view>
				<view class="context padding-top" v-show="detail.repairPhoto">
					<image :src="detail.repairPhoto" style="width: 400upx; height:400upx; margin-right: -50upx;"></image>
				</view>
				<view class="context padding-top" v-show="!detail.repairPhoto">无</view>
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
	import request from '@/common/httpRequest.js'
	export default {
		components: {  
			 
		},
		data() {
			return {
				index: -1,
				picker: ['对提供的服务不感兴趣', '感觉价格较高', '其他'],
				detail: {},
				id:'',
				step: 1,
				radio: 'A',
				radio2: 'A',
				modalName: '',
				imgList:[],
				params:{
					repairDesc:''
				}
			}
		},
		onLoad(event) {
			// this.detail = JSON.parse(decodeURIComponent(event.detailDate));
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
				this.$api.repairDetail({id:this.id}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						this.detail = res.result
						if (this.detail.repairStatus == 1) {
							this.step = 3
						}
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
			ChooseImage(index) {
				var indextmp = index;
			 	uni.chooseImage({
			 		count: 1, //默认9
			 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			 		sourceType: ['album'], //从相册选择
			 		success: (res) => {
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
			showAllDetail(){
				let params = {
					id:this.id,
					repairStatus:1,
					repairDesc:this.params.repairDesc,
					repairPhoto:this.imgList[0]
				}
				this.$api.repairProcess(params).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '操作成功'
						});
						this.step =3;
					}else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.message
						});
					}
				}).catch(res => {
					
				})
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
</style>
