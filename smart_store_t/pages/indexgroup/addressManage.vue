<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressForm.realName" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressForm.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressForm.provinceName}} {{addressForm.cityName}} {{addressForm.areaName}} {{addressForm.address}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressForm.gateNote" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="isDefaultflag" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {addUserAddress, updateUserAddress, queryUserAddressOne } from '@/common/api/address.js'
	
	export default {
		data() {
			return {
				addressDataId:'',
				// addressData: {
				// 	name: '',
				// 	mobile: '',
				// 	addressName: '在地图选择',
				// 	address: '',
				// 	area: '',
				// 	default: false,
				// 	prov: '',
				// 	city: '',
				// 	area: '',
				// 	gateNote: '',
				// },
				type: '',
				isDefaultflag: false,
				addressForm: {
					id: '',
					realName: '',
					phone: '',
					area: '',
					areaName: '',
					province: '',
					provinceName: '',
					city: '',
					cityName: '',
					address: '在地图选择',
					addressName: '',
					gateNote: '',
					zipCode: '',
					isDefault: 0,
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressDataId = option.id
				this.getAddressInfo();
			}
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			async getAddressInfo(){
				let form = {
					id: this.addressDataId,
				}
				debugger
				let res = await queryUserAddressOne(form);
				if(res.state === 'ok'){
					this.addressForm = res.data;
					if(this.addressForm.isDefault === 1  ){
						this.isDefaultflag = true;
					}else{
						this.isDefaultflag = false;
					}
				}
			},
			async addUserAddress(){
				let form = {
					id: this.addressDataId,
				}
				let res = await queryUserAddressOne(form);
				if(res.state === 'ok'){
					this.addressForm = res.data;
				}
			},
			async updateUserAddress(){
				let res = await queryUserAddressOne(this.addressForm);
				if(res.state === 'ok'){
					this.addressForm = res.data;
				}
			},
			switchChange(e){
				this.addressForm.isDefault = e.detail;
			},
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						console.log('地址data=',data)
						// this.addressForm.addressName = data.name;
						let allAddress = data.address+data.name ;
						this.addressForm.address = allAddress;
						let prov_city_area = this.matchAddress(this.addressForm.address);
						if(prov_city_area != null && prov_city_area.length>0){
							this.addressForm.provinceName = prov_city_area[0];
							this.addressForm.cityName = prov_city_area[1];
							this.addressForm.areaName = prov_city_area[2];
							let maxlength = prov_city_area[0].length + prov_city_area[1].length +prov_city_area[2].length;
							this.addressForm.address = allAddress.slice(maxlength);
							console.log('this.addressData.address=',data)
						}
						console.log('prov_city_area=',prov_city_area)
					}
				})
			},
			matchAddress(addressName){
				var reg = /.+?(省|市|自治区|自治州|县|区)/g;
				 // console.log(add1 + ': ', add1.match(reg));
				return addressName.match(reg)
			},
			//提交
			async confirm(){
				let data = this.addressForm;
				if(!data.realName){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(this.isDefaultflag){
					data.isDefault = 1;
				}else{
					data.isDefault = 0;
				}
				debugger;
				if(data.id != ''){
					let res = await updateUserAddress(data);
				}else{
					let res = await addUserAddress(data);
				}
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
