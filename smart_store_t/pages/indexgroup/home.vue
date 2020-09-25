<template name="indexgroup">
	<view class="main"  >
		<view v-if="helloflag == 1" >
			<cu-custom class="bg-blue"  :isBack="true"> 
				<block slot="content">轻照守护</block>
			</cu-custom>
			 <view class="bg-img   align-center " :style="{'min-height': (windowHeight-50)+'px', 'background-size': '100% 100%', 'background-image': 'url(../../static/image/install/loading.png)'  }">
			 <!-- 	
				<view class="flex solid-bottom padding justify-center">
					<view class="  padding-sm margin-xs   "><button> 注册合伙人</button></view>
				</view>
				<view class="flex solid-bottom padding justify-center">
					<view class="  padding-sm margin-xs  "><button> 进入首页</button></view>
				</view> -->
					<image :src="'../../static/image/install/submit.png'" @click="gotobecomepartner"
					 style="width: 350upx;height: 80upx;position:absolute;left:200upx;top:1000upx;"></image>
					
			<!-- 	<view class="padding-xl text-white align-center self-center">
			 		<view class="padding-xs text-xxl ">
			 			 <button> 注册合伙人</button>
			 		</view>
			 		<view class="padding-xs text-xxl">
						 <button> 进入首页</button>
			 		</view>
			 	</view> -->
			 </view>
			 
		</view>
		
		<view v-if="helloflag == 0" class="main" :style="{'height': windowHeight+'px'}">
			<cu-custom  style="background-color:rgba(0,0,0,0~1)"> 
				<block slot="content" ><text style="color: white">首页</text></block>
			</cu-custom>
			
			<view>
				<view class="padding-sm text-center "  >
					<view >
						<image :src="swiperList[0].url" class="index-image" >
							
						</image>
					</view>
				</view>
			 
			</view>
			<!-- <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper> -->
			<view class="  bg-white margin-top " style="width: 700upx; margin-left: 25upx; border-radius: 20upx;">
				<view class="flex solid-bottom padding justify-between">
						<view class="  radius  "> 
							<view class=" text-df  ">
								<text class="text-gray text-df fl">本月收入</text>
							</view>
							<view   >
									<text class="text-price text-blue text-xxl ">{{detail.monthlyIncome || 0 }}</text>
							</view>
					    </view>
						<view class="radius "> 
							<view class="text-df  ">
								<text class="text-gray text-df fr">总收入</text>
							</view>
							<view   >
								<text class="text-price text-blue text-xxl ">{{detail.totalIncome || 0 }}</text>
							</view>
						</view>
					        
				</view>
				
			</view>
			
			<view class="  bg-white margin-top solid-bottom" style="width: 700upx; margin-left: 25upx; border-radius: 20upx;">
				<view class="flex   justify">
						<view class="flex-sub padding-sm margin-xs radius text-center" data-url="../indexgroup/addInstall" @tap="toChild">
							<view class="postion">
								<image :src="'/static/image/index/add.png'" style="width: 100upx;height: 100upx;"></image>
							</view>
							
							<!-- <br> -->
							<text>新增</text>
						</view>
						<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../indexgroup/installList" @tap="toChild">
							<view class="postion">
								<image :src="'/static/image/index/install.png'" style="width: 100upx;height: 100upx;"></image>
								<view class="cu-tag badge">{{detail.shopRequest || 0 }}</view>
							</view>
							<text>安装</text>
						</view>
						<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../indexgroup/repairList" @tap="toChild">
							<view class="postion">
								<image :src="'/static/image/index/making.png'" style="width: 100upx;height: 100upx;"></image>
								<view class="cu-tag badge">{{detail.repairRequest || 0 }}</view>
							</view>
							<text>维修</text>
						</view>
				</view>
				<view class="flex  justify">
						<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../indexgroup/packageList" @tap="toChild">
							<view class="postion">
								<image :src="'/static/image/index/change.png'" style="width: 100upx;height: 100upx;"></image>
								<view class="cu-tag badge">{{detail.repairRequest || 0 }}</view>
							</view>
							<text>变更套餐</text>
							<text></text>
						</view>
						<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../indexgroup/warning" @tap="toChild">
							<view class="postion">
								<image :src="'/static/image/index/warning.png'" style="width: 100upx;height: 100upx;"></image>
								<view class="cu-tag badge">{{detail.alarmRequest || 0 }}</view>
							</view>
							<text>告警</text>
						</view>
						<view class="flex-sub  padding-sm margin-xs radius text-center"  data-url="../indexgroup/becomepartner"  @tap="toChild" >
						<!-- 	<image :src="'/static/image/index/making.png'" style="width: 100upx;height: 100upx;"></image>
							<br>
							<text>新增合伙人</text> -->
						</view>
				</view>
			</view>
			 
			 
			 
		
		
		<!-- 	<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'  margin-top-sm':'no-border  margin-top-sm']" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" :data-url="item.path" @tap="toChild">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view> -->
			<!-- <view class="grid col-3 bg-white padding-sm margin-top-sm">
				<view class="padding flex justify-between align-center" v-for="(item,index) in actionList" 
				:data-url="item.path" @tap="toChild"
				:key="index" >
					<view class='cu-avatar xl radius'>
							<view class="text-lg">{{item.title}}</view>
						<view class="cu-tag badge" v-if="item.number>0">{{item.number}}+</view>
					</view>
				</view>
			</view> -->
			 
		</view>
		
	</view>
	

</template>

<script>
	export default {
		data() {
			return { 
				helloflag: -1,
				cardCur: 0,
				detail:{},
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/image/index/index.png'
				}, {
					id: 1,
					type: 'image',
					url: 'http://qiniu.zaizaihome.com/2020/login_banner.jpg',
				}],
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					path: '../indexgroup/addInstall',
					badge: 120,
					name: '新增'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					path: '',
					name: '安装'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '维修',
					path: '',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '变更套餐',
					path: '',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '告警',
					path: '../indexgroup/warning',
				}],
				gridCol: 3,
				gridBorder: false,
				dotStyle: false,
				actionList: [
					{
						title: '新增',
						name: 'red',
						color: '#e54d42',
						path: '../indexgroup/addInstall',
						number: 99,
					},
					{
						title: '安装',
						name: 'red',
						color: '#e54d42',
						path: '',
						number: 22,
					},
					{
						title: '维修',
						name: 'red',
						color: '#e54d42',
						path: '',
						number: 0,
					},
					{
						title: '变更',
						name: 'red',
						color: '#e54d42',
						path: '',
						number: 0,
					},
					{
						title: '告警',
						name: 'red',
						color: '#e54d42',
						path: '',
						number: 0,
					}
				],
				elements: [{
						title: '操作条',
						name: 'bar',
						color: 'purple',
						cuIcon: 'vipcard'
					},
					{
						title: '导航栏 ',
						name: 'nav',
						color: 'mauve',
						cuIcon: 'formfill'
					},
					{
						title: '列表',
						name: 'list',
						color: 'pink',
						cuIcon: 'list'
					},
					{
						title: '卡片',
						name: 'card',
						color: 'brown',
						cuIcon: 'newsfill'
					},
					{
						title: '表单',
						name: 'form',
						color: 'red',
						cuIcon: 'formfill'
					},
					{
						title: '时间轴',
						name: 'timeline',
						color: 'orange',
						cuIcon: 'timefill'
					},
					{
						title: '聊天',
						name: 'chat',
						color: 'green',
						cuIcon: 'messagefill'
					},
					{
						title: '轮播',
						name: 'swiper',
						color: 'olive',
						cuIcon: 'album'
					},
					{
						title: '模态框',
						name: 'modal',
						color: 'grey',
						cuIcon: 'squarecheckfill'
					},
					{
						title: '步骤条',
						name: 'steps',
						color: 'cyan',
						cuIcon: 'roundcheckfill'
					}
				],
			};
		},
		mounted() {
			const isBecomePartner = uni.getStorageSync("isBecomePartner");
			if(isBecomePartner != undefined &&  isBecomePartner == 1){
				this.helloflag = 0;
				// this.helloflag = 1;
			}else {
				this.helloflag = 1;
			}
			if (this.helloflag == 0) {
				this.stats()
			}
		},
		methods: {
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			gotoUrl(path){
				console.log('跳转path=',path)
				uni.navigateTo({
					url:  '../addInstall'
				});
			},
			//gotoUrl('pages/indexgroup/addInstall')
			gotoHome2(){
				 this.helloflag=0
			},
			gotobecomepartner(){
				uni.navigateTo({
					url:  '../indexgroup/becomepartner'
				});
			},
			toChild(e) {
				if(e.currentTarget.dataset.url != ''){
					uni.navigateTo({
						url: e.currentTarget.dataset.url
					})
				}else{
					uni.showToast({
						title: '开发中。。。'
					})
				}
				
			},
			stats() {
				this.$api.stats({}).then(res => {
				   // 获得数据 
					if (res.status === 200) {//登录成功后改变vuex的状态，并退出登录页面
						this.detail = res.result
						
					}else {
						this.detail = {}
					}
				}).catch(res => {
					this.detail = {}
				})
			},
			gotoAdd(){
				
			}
		},
		// created(){
		// 	const isBecomePartner = uni.getStorageSync("isBecomePartner");
		// 	console.log(isBecomePartner)
		// 	if(isBecomePartner != undefined &&  isBecomePartner == 1){
		// 		this.helloflag = 0;
		// 	}
		// }
		 
	 
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.main {
		background:linear-gradient(180deg,rgba(21,118,244,1) 0%,rgba(255,255,255,1) 100%);
	} 
	 .index-image{
		width: 700upx;
		height: 350upx;
	}
	.postion {
		position: relative;
	}
	.cu-tag.badge {
		right: 15px;
	}
</style>
