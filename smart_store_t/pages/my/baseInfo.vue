<template name="baseInfo">
	<view >
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">基本资料</block>
		</cu-custom>
		<view >
			<view class="cu-form-group  ">
				<view class="title">角色：</view><view class="context">普通合伙人</view>
			</view>
			<view class="cu-form-group  ">
				<view class="title">省市区：</view><view class="context">浙江省杭州市西湖区</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">姓名：</view><view class="context">小王</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">出生日期：</view><view class="context">1988-5-28</view>
			</view> 
			<view class="cu-form-group  ">
				<view class="title">性别：</view><view class="context">男</view>
			</view> 
			<view class="cu-bar bg-white  ">
				<view class="action">
					身份证正面
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
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white ">
				<view class="action">
					身份证反面
				</view>
				<view class="action">
					{{imgList2.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList2" :key="index" @tap="ViewImage2" :data-url="imgList2[index]">
					 <image :src="imgList2[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg2" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage2" v-if="imgList2.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			
			<view class="cu-form-group  ">
				<view class="title">活动礼包：</view><view class="context">30000</view>
			</view>  
			<view class="cu-form-group  ">
				<view class="title">收货城市：</view><view class="context">浙江省杭州市西湖区</view>
			</view>  
			<view class="cu-form-group  ">
				<view class="title">收货地址：</view><view class="context">古墩路112号</view>
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
				modalName: '',
				pickerType: ['新增设备或者保险', '变更套餐'],
				imgList: [],
				imgList2: [],
			}
		},
		onLoad(event) {
			console.log(event);
			this.detail = JSON.parse(decodeURIComponent(event.detailDate));
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
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.step = 2
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
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage2() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList2.length != 0) {
							this.imgList2 = this.imgList2.concat(res.tempFilePaths)
						} else {
							this.imgList2 = res.tempFilePaths
						}
					}
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgList2,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg2(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList2.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
