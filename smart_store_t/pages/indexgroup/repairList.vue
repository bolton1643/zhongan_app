<template name="repairList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true"  >
			<block slot="backText">返回</block>
			<block slot="content">维修列表</block>
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
		
		<!-- <view v-show="TabCur === 0 || TabCur === '0'">
			<view class="cu-list menu-avatar bg-gray">
				<view class="cu-item margin-top margin-bottom listitem   "  style="margin-left: 20upx; height: 250upx; padding-right: 0px;" v-for="(item, index) in installTaskList" :key="index" @click="gotoDetail(item)">
					<view class="content padding " style="left: 20upx; width: 100%;">
						<view class="text-black text-bold margin-top">外婆家西溪印象城店（000001）
						<view class="text-grey text-xs margin-left fr " style=""  >{{ item.time }}</view></view>
						<view class="flex  p-xs margin-bottom-sm mb-sm">
							<view class="flex-sub   padding margin-xs radius text-center" style="margin-left: -50upx;">
								<view v-if="index%2 === 0" class="  bg-grey   radius text-center" style="width: 120upx; height: 120upx;">
									<image :src="'/static/image/install/repair1.png'" style="width: 50upx;height: 50upx;margin-top: 15upx;"></image>
									<view class="text-sm">已维修</view>
								</view>
								<view v-if="index%2 === 1" class="  bg-blue   radius text-center" style="width: 120upx; height: 120upx;">
									<image :src="'/static/image/install/repair2.png'" style="width: 50upx;height: 50upx;margin-top: 15upx;"></image>
									<view class="text-sm">待维修</view>
								</view>
							</view>
							<view class="flex-treble   padding-top-sm margin-top-xs radius" style="margin-left: -50upx;">
								<view class="text-black text-bold listitem-text">显示我所有店铺的所有维修记录，按照发起 时间倒序排列，列表可以通过店铺名称或...</view>
								<view class="listitem-text-gay text-grey margin-top  "  >维修人：张超 2020-7-3 12:20:20</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view> -->
		
		<!-- <view v-if="TabCur === 1 || TabCur === '1'"> -->
		<view class="cu-list menu-avatar bg-gray">
			<view class="cu-item margin-top margin-bottom listitem   "  style="margin-left: 20upx; height: 250upx; padding-right: 0px;" v-for="(item, index) in installTaskList" :key="index" @click="gotoDetail(item)">
				<view class="content padding " style="left: 20upx; width: 100%;">
					<view class="text-black text-bold margin-top">{{item.shopName}}（{{item.shopNo || '无' }}）
					<view class="text-grey text-xs margin-left fr " style=""  >{{ item.reportDate }}</view></view>
					 
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub   padding margin-xs radius text-center" style="margin-left: -50upx;">
							<view v-if="item.repairStatus == 1" class="  bg-grey   radius text-center" style="width: 120upx; height: 120upx;">
								<image :src="'/static/image/install/repair1.png'" style="width: 50upx;height: 50upx;margin-top: 15upx;"></image>
								<view class="text-sm">已处理</view>
							</view>
							<view v-if="item.repairStatus == 0" class="  bg-blue   radius text-center" style="width: 120upx; height: 120upx;">
								<image :src="'/static/image/install/repair2.png'" style="width: 50upx;height: 50upx;margin-top: 15upx;"></image>
								<view class="text-sm">待处理</view>
							</view>
						</view>
						<view class="flex-treble   padding-top-sm margin-top-xs radius" style="margin-left: -50upx;">
							<view class="text-black text-bold listitem-text">地址：{{item.shopAddr || '无'}}</view>
							<view class="listitem-text-gay text-grey margin-top " >申报人：{{item.reportBy}} {{item.reportPhone}}</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
			
			 
			
		<!-- </view> -->
		<view>
			<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
export default {
	components: {
		uniLoadMore
	},
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
			installTaskList: [],
			installTaskFinishList: [],
			isActive:false,//字体颜色样式
			status: 'more',
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			page:1
		};
	},
	onLoad: function (option) {
		// this.getProvince();
		// this.lawsquest();
		// this.getLawToken()
		uni.startPullDownRefresh()
		this.repairLists()
	},
	onReachBottom() {
		let _self = this
		if (_self.status == "nomore") {
			return
		}
		this.status = 'loading'
		uni.showNavigationBarLoading()
		_self.page++;
		_self.repairLists();
		// setTimeout(function() {
			
			
		// }, 2000);
	},
	methods: {
		repairLists() {
			let _self = this;
			let params = {
				repairStatus:this.TabCur,
				pageNo:this.page,
				pageSize:10
			}
			this.$api.repairList(params).then(res => {
			   // 获得数据 
				if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
					// this.toMain(res.data.data);
					_self.status = 'more'
					uni.hideNavigationBarLoading()
					if(_self.page != 1){
						_self.installTaskList =_self.installTaskList.concat(res.result.records)
					}else{
						_self.installTaskList = res.result.records
					}
					if (res.result.records.length < 10) {
						_self.status = 'nomore'
					}
				}else {
					_self.status = 'more'
					uni.hideNavigationBarLoading()
				}
			}).catch(res => {
				if(_self.page == 1) {
					_self.installTaskList = []
				}
				_self.status = 'more'
				uni.hideNavigationBarLoading()
			})
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			this.page = 1
			this.repairLists()
		},
		gotoDetail(e){
			uni.navigateTo({
				url: '../indexgroup/repairDetail?id=' + e.id
			});
		}
	}
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
.listitem-text {
	width:500upx;
	height:63upx;
	font-size:26upx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:36upx;
}
.listitem-text-gay {
	width:500upx;
	height:63upx;
	font-size:24upx;
	font-family:PingFang SC;
	font-weight:400;
	line-height:20upx;
}
</style>
