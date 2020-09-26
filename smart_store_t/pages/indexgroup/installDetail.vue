<template name="installDetail">
	<view >
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">安装详情</block>
		</cu-custom>
		<view v-if = "step === '1' || step === 1">
			<view class="cu-form-group ">
				<view class="title">客户姓名：</view><view class="context">{{detail.name}}</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">客户手机号码：</view><view class="context">{{detail.phone}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">客户省市区：</view><view class="context">{{detail.provinceCityCounty}}</view>
			</view> 
			<view class="cu-form-group ">
				<view class="title">详细地址：</view><view class="context">{{detail.address}}</view>
			</view> 
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg " @click="step = 2">立刻处理</button>
			</view>
		</view>
		
		<view v-if = "step === '2' || step === 2">
			<radio-group class="block" @change="RadioChange">
				<view class="margin-top">
					<view class="cu-form-group ">
						<view class="title"><radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio></view>
						<view class="context">已联系，客户无意向</view>
					</view>
					<view class="cu-form-group ">
						 <view class="title "></view>
						 <picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'请选择客户无意向原因'}}
							</view>
						 </picker>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">备注</view>
						<textarea maxlength="-1" :disabled="modalName!=null" v-model="params.message" @input="textareaBInput" placeholder=""></textarea>
					</view>
				</view>
				
				<view class="margin-top">
					<view class="cu-form-group ">
						<view class="title"><radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio></view>
						<view class="context">已联系，客户有意向</view>
					</view> 
				</view>
				
			</radio-group>
			 <view class="padding flex flex-direction">
			 	<button class="cu-btn bg-blue lg "  @tap="showModal"  data-target="Modal">下一步</button>
			 </view>
		</view>
		
		
		<view v-if = "step === '3' || step === 3">
			<radio-group class="block" @change="RadioChange1">
				
				<view class="margin-top">
					<view class="cu-form-group ">
						<view class="title"><radio :class="radio2=='A'?'checked':''" :checked="radio2=='A'?true:false" value="A"></radio></view>
						<view class="context">我已到店，客户无意向</view>
					</view>
					<view class="cu-form-group ">
						 <view class="title "></view>
						 <picker @change="PickerChange"  :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'请选择客户无意向原因'}}
							</view>
						 </picker>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">备注</view>
						<textarea maxlength="-1" :disabled="modalName!=null" v-model="params.message" @input="textareaBInput" placeholder=""></textarea>
					</view>
				</view>
				<view class="margin-top">
					<view class="cu-form-group ">
						<view class="title"><radio :class="radio2=='B'?'checked':''" :checked="radio2=='B'?true:false" value="B"></radio></view>
						<view class="context">客户需要智慧门店服务，现在发起新增</view>
					</view> 
				</view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue lg "  @click="gotoInsert"  >下一步</button>
				</view>
			</radio-group>
			
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
					 <view class="bg-blue padding-lg margin-xs radius" @click="openMap()">我要导航</view>
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
				step: 1,
				radio: 'A',
				radio2: 'A',
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				params: {
					applyId:'',
					status:'',
					message:''
				}
			}
		},
		onLoad(event) {
			this.detail = JSON.parse(decodeURIComponent(event.detailDate));
			this.params.applyId = this.detail.id
			//详情标题
			uni.setNavigationBarTitle({
				title: this.detail.name
			});
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
				console.log(this.radio)
			},
			RadioChange1(e) {
				this.radio2 = e.detail.value
			},
			showModal(e) {
				if (this.radio == 'B') {
					this.params.status = 'accept'
					this.params.message = ''
				}else {
					this.params.status = 'deny'
					if (this.index == -1 ) {
						uni.showToast({
							title: '请选择客户无意向原因',
							icon: 'none'
						})
						return
					}else {
						if (this.picker[this.index] == '其他' && !this.params.message) {
							uni.showToast({
								title: '请输入原因',
								icon: 'none'
							})
							return
						}
					}
					this.params.message = this.picker[this.index] + this.params.message
				}
				this.fellow(e,1)
			},
			fellow (e,type) {
				this.$api.fellow(this.params).then(res => {
					if (res.status === 200) {
						if (type == 1) {
							if (this.radio == 'A') {
								uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
									delta: 1
								})
							}else {
								this.modalName = e.currentTarget.dataset.target
							}
						}else {
							if (this.radio2 == 'A') {
								uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
									delta: 1
								})
							}else {
								uni.navigateTo({
									url: '../indexgroup/addInstall?applyId=' + this.detail.id
								})
							}
						}
						
						
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
			gotoInsert() {
				if (this.radio2 == 'B') {
					this.params.status = 'arrived'
					this.params.message = ''
				}else {
					this.params.status = 'deny'
					if (this.index == -1 ) {
						uni.showToast({
							title: '请选择客户无意向原因',
							icon: 'none'
						})
						return
					}else {
						if (this.picker[this.index] == '其他' && !this.params.message) {
							uni.showToast({
								title: '请输入原因',
								icon: 'none'
							})
							return
						}
					}
					this.params.message = this.picker[this.index] + this.params.message
				}
				this.fellow('',2)
			},
			haveInStore(e) {
				this.step =3;
				this.params.message = ''
				this.index = -1
				this.hideModal(e);
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			openMap() {
				uni.openLocation({
					latitude: this.detail.latitude-0,//要去的纬度-地址       
					longitude: this.detail.longitude-0,//要去的经度-地址
					name:this.detail.provinceCityCounty,//地址名称
					address: this.detail.address,//详细地址名称
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
