<template name="installList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"  >
			<block slot="backText">返回</block>
			<block slot="content">安装列表</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
					<!-- <view v-if="index === 0" class="cu-avatar radius margin-left" style="background:rgba(255, 255, 255, 0.1); ">
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

		<view v-show="TabCur === 0 || TabCur === '0'">
			<view class="cu-list menu-avatar bg-gray" >
				<view class="cu-item margin-top margin-bottom listitem   " style="margin-left: 20upx; height: 200upx; padding-right: 0px;" v-for="(item, index) in installTaskList" :key="index" @click="gotoDetail(item)">
					<!-- <view class="cu-avatar  lg margin-left" style="width:50upx;height:50upx;background:rgba(255, 255, 255, 0.1);border-radius:10upx;">
						<image :src="'/static/image/install/noAgree.png'" v-if="index === 1" style="width: 50upx; height: 50upx;"></image>
						<image :src="'/static/image/install/agree.png'" v-else style="width: 50upx; height: 50upx;"></image>
					</view>
					<view class="content">
						<view class="text-black">{{ item.name }} {{ item.phone }}</view>
						<view class="text-grey">{{ item.address }}</view>
						<view class="text-grey">[{{ item.note }}]</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs" style="width: 120upx;margin-left: -50upx;">{{ item.time }}</view>
					</view> -->
					<view class=" cu-avatar  lg margin-left" style="width:10upx; margin-left: -10upx; background:rgba(255, 255, 255, 0.1);border-radius:10upx;" >
						<view class="listitem-left fl bg-blue" v-if="index%3 ===0 " ></view>
						<view class="listitem-left fl bg-gray" v-if="index%3 ===1 " ></view>
						<view class="listitem-left fl bg-yellow" v-if="index%3 ===2 " ></view>
						<!-- <view class="listitem-left fl bg-red" v-if="index%4 ===3 " ></view> -->
					</view>
					
					<view class="content padding " style="left: 20upx;">
						<view class="text-black text-bold">{{ item.customerName }} {{ item.phone }}</view>
						<view class="text-grey">{{ item.addr }}</view>
						<view class="text-grey">[{{ item.provinceCityCounty }}]</view>
					</view>
					<view class="action fr" style="margin-left: 100upx;">
						<view class="cu-tag bg-blue fr" v-if="item.status == 100" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">新增</view>
						<view class="cu-tag bg-gray fr" v-if="item.status == 200" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">获取消息并反馈</view>
						<view class="cu-tag bg-yellow fr" v-if="item.status == 300" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">有意向</view>
						<view class="cu-tag bg-blue fr" v-if="item.status == 301" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">无意向</view>
						<view class="cu-tag bg-gray fr" v-if="item.status == 400" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">到店</view>
						<view class="cu-tag bg-yellow fr" v-if="item.status == 500" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">未支付</view>
						<view class="cu-tag bg-red fr" v-if="item.status == 600" style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">完成支付</view>
						
						<view class="text-grey text-xs" style="width: 120upx;margin-left: -50upx;">{{ item.time }}</view>
					</view>
					
				</view>
			</view>
		</view>

		<view v-if="TabCur === 1 || TabCur === '1'">
			<view class="cu-list menu-avatar bg-gray">
				<view class="cu-list menu-avatar " >
					<!-- <view class="cu-item margin-top margin-bottom listitem   " style="margin-left: 20upx; height: 200upx; padding-right: 0px;" v-for="(item, index) in installTaskList" :key="index" @click="gotoDetail(item)"> -->
						<!-- <view class="cu-avatar  lg margin-left" style="width:50upx;height:50upx;background:rgba(255, 255, 255, 0.1);border-radius:10upx;">
							<image :src="'/static/image/install/noAgree.png'" v-if="index === 1" style="width: 50upx; height: 50upx;"></image>
							<image :src="'/static/image/install/agree.png'" v-else style="width: 50upx; height: 50upx;"></image>
						</view>
						<view class="content">
							<view class="text-black">{{ item.name }} {{ item.phone }}</view>
							<view class="text-grey">{{ item.address }}</view>
							<view class="text-grey">[{{ item.note }}]</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs" style="width: 120upx;margin-left: -50upx;">{{ item.time }}</view>
						</view> -->
						<!-- <view class=" cu-avatar  lg margin-left" style="width:10upx; margin-left: -10upx; background:rgba(255, 255, 255, 0.1);border-radius:10upx;" >
							<view class="listitem-left fl bg-blue" v-if="index%3 ===0 " ></view>
							<view class="listitem-left fl bg-gray" v-if="index%3 ===1 " ></view>
							<view class="listitem-left fl bg-yellow" v-if="index%3 ===2 " ></view>
						</view>
						
						<view class="content padding " style="left: 20upx;">
							<view class="text-black text-bold">{{ item.name }} {{ item.phone }}</view>
							<view class="text-grey">{{ item.address }}</view>
							<view class="text-grey">[{{ item.note }}]</view>
						</view>
						<view class="action fr" style="margin-left: 100upx;">
							<view class="cu-tag bg-blue fr" v-if="index%3 ===0 " style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">待处理</view>
							<view class="cu-tag bg-gray fr" v-if="index%3 ===1 " style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">已处理</view>
							<view class="cu-tag bg-yellow fr" v-if="index%3 ===2 " style="margin-top: -73upx;margin-left: 105upx;width: 200upx; border-top-right-radius:20upx; ">无意向</view>
							
							<view class="text-grey text-xs" style="width: 120upx;margin-left: -50upx;">{{ item.time }}</view>
						</view> -->
						
					<!-- </view> -->
				</view>
			</view>
			
			 
			
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			TabCur: 0,
			tabList: [
				{
					id: 0,
					title: '待处理'
				},
				{
					id: 1,
					title: '已处理'
				}
			],
			installTaskList: [
				// {
				// 	id: 1,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '张三',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-06-10 10:10:10',
				// 	status: '同意'
				// },
				// {
				// 	id: 2,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '李四',
				// 	phone: '18867686840',
				// 	note: '路程有点遥远',
				// 	time: '2020-06-12 10:10:10',
				// 	status: '同意'
				// },
				// {
				// 	id: 3,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '王五',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-10-10 10:10:10',
				// 	status: '不同意'
				// },
				// {
				// 	id: 3,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '王五',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-10-10 10:10:10',
				// 	status: '不同意'
				// },
				// {
				// 	id: 3,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '王五',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-10-10 10:10:10',
				// 	status: '不同意'
				// },
				// {
				// 	id: 4,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '王五',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-10-10 10:10:10',
				// 	status: '同意'
				// },
				
				// {
				// 	id: 5,
				// 	address: '浙江省杭州市西湖区西溪路100号',
				// 	name: '王五',
				// 	phone: '18867686840',
				// 	note: '需要带齐工具去',
				// 	time: '2020-10-10 10:10:10',
				// 	status: '不同意'
				// },
			]
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		applyList() {
			this.$api.applyList({}).then(res => {
			   // 获得数据 
				if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
					// this.toMain(res.data.data);
					this.installTaskList = res.result
				}else {
					uni.showToast({
						title:res.message,
						icon: 'none'
					})
				}
			}).catch(res => {
				
			})
		},
		gotoDetail(e){
			let detail = {
				address: e.addr,
				name: e.customerName,
				id: e.applyId,
				phone: e.phone,
				note: e.note,
				provinceCityCounty:e.provinceCityCounty,
				// time: e.time,
				status: e.status,
				longitude:e.longitude,
				latitude:e.latitude
			};
			uni.navigateTo({
				url: '../indexgroup/installDetail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
			});
		}
	},
	onReady()  {
		this.applyList()
	},
};
</script>

<style>
.page {
	height: 100vh;
}
.listitem {
	width:710upx;
	height:300upx;
	background:rgba(255,255,255,1);
	border:1px solid rgba(221, 221, 221, 1);
	border-radius:20upx;
}
.listitem-left {
	width:10upx;
	height:50upx;
	margin-left: -50upx;
	margin-top: -130upx;
	
	border-radius:20upx;
}
 
</style>
