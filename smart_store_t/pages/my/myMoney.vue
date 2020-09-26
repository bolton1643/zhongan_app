<template name="myMoney">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"  >
			<block slot="backText">返回</block>
			<block slot="content">我的金豆</block>
			<block slot="right"><view @click="gotoHistory">兑换明细</view></block>
		</cu-custom>
		<view class="margin"> 可提现金豆 ：{{totalGold}}</view>

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.id == TabCur ? 'text-blue cur' : ''" v-for="item in tabList" :key="item.id" @tap="tabSelect" :data-id="item.id">
				<!-- 	<view v-if="index === 0" class="cu-avatar radius margin-left" style="background:rgba(255, 255, 255, 0.1); ">
						<image :src="'/static/image/install/deal2Select.png'"  v-if="index == TabCur" style="width: 50upx; height: 50upx;"></image>
						<image :src="'/static/image/install/ready2Select.png'"  v-else style="width: 50upx; height: 50upx;"></image>
					</view>
					<view v-else  class="cu-avatar radius margin-left" style="background:rgba(255, 255, 255, 0.1); ">
						<image :src="'/static/image/install/deal2selectdone.png'"  v-if="index == TabCur" style="width: 50upx; height: 50upx;"></image>
						<image :src="'/static/image/install/agreeNoSelect.png'"  v-else style="width: 50upx; height: 50upx;"></image>
					</view> -->
					{{ item.title }}
				</view>
			</view>
		</scroll-view>
		<view>
			<checkbox-group class="block" @change="changeCheckbox">
				<view class="cu-list menu-avatar">
					<view class="cu-item margin-top margin-bottom"  v-for="(item, index) in cashList" :key="index" >
						<view v-show="TabCur === 1 || TabCur === '1'" class="cu-avatar" >
							<view class="cu-form-group">
								<checkbox :class="{'checked':checkedArr.includes(String(item.id))}" :checked="checkedArr.includes(String(item.id))" :value="String(item.id)"></checkbox>
							</view>
						</view>
						<view class="content" @click="gotoDetail(item)">
							<view class="text-black yc">{{ item.createTime }} {{ item.shopName}}({{ item.shopNo}})</view>
							<view class="text-grey" style="font-size: 13px;line-height: 20px;" v-for="(itemchild, index2) in item.notes" :key="index2"  >
								{{ itemchild.item }}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{ itemchild.money }}
							</view>
						</view>
						<view class="action">
						 
						</view>
					</view>
				</view>
			</checkbox-group>
			<!-- <checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-list menu-avatar">
					<view class="cu-item margin-top margin-bottom"  v-for="(item, index) in cashList" :key="index" >
						<view  class="cu-avatar" >
							<view class="cu-form-group margin-top">
								<checkbox :class="checkbox[index].checked?'checked':''" :checked="checkbox[index].checked?true:false" :value="checkbox[index].value"></checkbox>
							</view>
						</view>
						<view class="content" @click="gotoDetail(item)">
							<view class="text-black">{{ item.date }} {{ item.name }}({{ item.code }})</view>
							<view class="text-grey"  v-for="(itemchild, index2) in item.childrenList" :key="index2"  >
								{{ itemchild.title }}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{ itemchild.money }}
							</view>
						</view>
						<view class="action">
						 
						</view>
					</view>
				</view>
			</checkbox-group> -->
			<view  v-show="TabCur === 1 || TabCur === '1'" class="bg-white">
				<view class=" cf  ">
					<view class=" radius fl ">
						<view class="cu-form-group margin-top" >
							<checkbox-group @change="allChoose">
								<label>
									<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox>
								</label>
							</checkbox-group>
						</view>
					</view>
					<view class=" radius fr margin-top margin-right "><button class="cu-btn bg-blue lg " @click="goBranch">兑换</button></view>
				</view>
			</view>
		</view>

		<!-- <view v-if="TabCur === 3 || TabCur === '3'">
			 <checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-list menu-avatar">
					<view class="cu-item margin-top margin-bottom"  v-for="(item, index) in cashList" :key="index" >
						<view  class="cu-avatar" >
							<view class="cu-form-group margin-top">
								<checkbox :class="checkbox[index].checked?'checked':''" :checked="checkbox[index].checked?true:false" :value="checkbox[index].value"></checkbox>
							</view>
						</view>
						<view class="content" @click="gotoDetail(item)">
							<view class="text-black">{{ item.date }} {{ item.name }}({{ item.code }})</view>
							<view class="text-grey"  v-for="(itemchild, index2) in item.childrenList" :key="index2"  >
								{{ itemchild.title }}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{ itemchild.money }}
							</view>
						</view>
						<view class="action">
						 
						</view>
					</view>
				</view>
			</checkbox-group>
		</view> -->
		
		
	</view>
</template>

<script>
 
 
export default {
	components:  { },
	data() {
		return {
			totalGold: 0,
			TabCur: 1,
			isChecked:true,
			tabList: [
				{
					id: 1,
					title: '可兑换'
				},
				{
					id: 3,
					title: '已兑换'
				}
			],
			checkedArr:[], //复选框选中的值
			allChecked:false, //是否全选
			checkbox: [{
				value: 'A',
				checked: true
			}, {
				value: 'B',
				checked: false
			}, {
				value: 'C',
				checked: false
			}, {
				value: 'D',
				checked: false
			},
			{
				value: 'E',
				checked: false
			},
			{
				value: 'F',
				checked: false
			},
			{
				value: 'G',
				checked: false
			},
			{
				value: 'H',
				checked: false
			},
			
			
			],
			
			cashList: [
				// {
				// 	id: 1,
				// 	date: '2020-5-9',
				// 	name: '小海小香',
				// 	code: '000001',
				// 	moneyTotal: 400,
				// 	childrenList: [
				// 		{
				// 			title: '安装费',
				// 			money: 200,
				// 		},
				// 		{
				// 			title: '提成',
				// 			money: 100,
				// 		}
					
				// 	]
				// },
				// {
				// 	id: 2,
				// 	date: '2020-5-9',
				// 	name: '小海小香',
				// 	code: '000001',
				// 	moneyTotal: 400,
				// 	childrenList: [
				// 		{
				// 			title: '安装费',
				// 			money: 200,
				// 		},
				// 		{
				// 			title: '提成',
				// 			money: 100,
				// 		}
					
				// 	]
				// },
				// {
				// 	id: 3,
				// 	date: '2020-5-9',
				// 	name: '小海小香',
				// 	code: '000001',
				// 	moneyTotal: 400,
				// 	childrenList: [
				// 		{
				// 			title: '安装费',
				// 			money: 200,
				// 		},
				// 		{
				// 			title: '提成',
				// 			money: 100,
				// 		}
					
				// 	]
				// },
				// {
				// 	id: 4,
				// 	date: '2020-5-9',
				// 	name: '小海小香',
				// 	code: '000001',
				// 	moneyTotal: 400,
				// 	childrenList: [
				// 		{
				// 			title: '安装费',
				// 			money: 200,
				// 		},
				// 		{
				// 			title: '提成',
				// 			money: 100,
				// 		}
					
				// 	]
				// }
			],
			installTaskList: [
				{
					id: 1,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '张三',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-06-10 10:10:10',
					status: '同意'
				},
				{
					id: 2,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '李四',
					phone: '18867686840',
					note: '路程有点遥远',
					time: '2020-06-12 10:10:10',
					status: '同意'
				},
				{
					id: 3,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '王五',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-10-10 10:10:10',
					status: '不同意'
				},
				{
					id: 3,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '王五',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-10-10 10:10:10',
					status: '不同意'
				},
				{
					id: 3,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '王五',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-10-10 10:10:10',
					status: '不同意'
				},
				{
					id: 4,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '王五',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-10-10 10:10:10',
					status: '同意'
				},
				
				{
					id: 5,
					address: '浙江省杭州市西湖区西溪路100号',
					name: '王五',
					phone: '18867686840',
					note: '需要带齐工具去',
					time: '2020-10-10 10:10:10',
					status: '不同意'
				},
			],
			oQueryData: {
				drawStatus: this.TabCur,
				pageNo: 1,
				pageSize: 10
			}
		};
	},
	onReady()  {
		// this.earningList()
		this.incomeList()
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.oQueryData.drawStatus = e.currentTarget.dataset.id
			this.incomeList()
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		gotoHistory(){
			uni.navigateTo({
				url: 'myMoneyList'
			})
		},
		earningList() {
			this.$api.earningList({}).then(res => {
			   // 获得数据 
				if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
					// this.toMain(res.data.data);
					// this.cashList = res.result
					// console.log(this.cashList[0])
					let sum = 0;
					for(let index = 0 ,len = res.result.length; index < len;index++) {
						let datas = res.result[index]
						if (datas.notes) {
							datas.notes = JSON.parse(datas.notes)
						}
						sum += datas.money;
						this.cashList.push(datas)
					}
					
					this.totalGold = sum;
					//console.log(sum);
				}else {
					uni.showToast({
						title:res.message,
						icon: 'none'
					})
				}
			}).catch(res => {
				
			})
		},
		incomeList() { // 我的金豆
			this.$api.incomeList(this.oQueryData).then(res => {
			   // 获得数据 
				if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
					// this.toMain(res.data.data);
					this.cashList = res.result.records
					// console.log(this.cashList[0])
					// let sum = 0;
					// for(let index = 0 ,len = res.result.length; index < len;index++) {
					// 	let datas = res.result[index]
					// 	if (datas.notes) {
					// 		datas.notes = JSON.parse(datas.notes)
					// 	}
					// 	sum += datas.money;
					// 	this.cashList.push(datas)
					// }
					
					this.totalGold = res.result.money;
					// this.totalGold = sum;
					//console.log(sum);
				}else {
					uni.showToast({
						title:res.message,
						icon: 'none'
					})
				}
			}).catch(res => {
				
			})
		},
		goBranch() {
			let that = this
			uni.showModal({
			    title: '提示',
			    content: '是否确定兑换',
			    success: function (res) {
			        if (res.confirm) {
						uni.showToast({
							title:'兑换成功',
							icon: 'success'
						})
			          uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
			          	delta: 1
			          })
			        } else if (res.cancel) {
			           
			        }
			    }
			});
		},
		gotoDetail(e){
			  
			 
		},
		CheckboxChange(e) {
			var items = this.checkbox,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				items[i].checked = false;
				for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					if (items[i].value == values[j]) {
						items[i].checked = true;
						break
					}
				}
			}
		},
		 // 多选复选框改变事件
		changeCheckbox(e){
			this.checkedArr = e.detail.value;
			// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			if(this.checkedArr.length>0 && this.checkedArr.length==this.cashList.length){
				this.allChecked=true;
			}else{
				this.allChecked=false;
			}
		},
		// 全选事件
		allChoose(e){
			let chooseItem = e.detail.value;
			// 全选
			if(chooseItem[0]=='all'){
				this.allChecked=true;
				for(let item of this.cashList){
					let itemVal=String(item.id);
					if(!this.checkedArr.includes(itemVal)){
						this.checkedArr.push(itemVal);
					}
				}                    
			}else{
				// 取消全选
				this.allChecked=false;
				this.checkedArr=[];
			}
		}
	}
};
</script>

<style>
.page {
	height: 100vh;
}
.yc {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
