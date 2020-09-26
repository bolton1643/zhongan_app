<template name="indexgroup">
	<view>
		<view v-if="helloflag == 1" >
			<cu-custom bgColor="bg-blue" :isBack="true"><block slot="backText">返回</block>
				<block slot="content">首页</block>
			</cu-custom>
			 <view class="bg-img bg-mask   align-center" style="background-image: url('http://qiniu.zaizaihome.com/2020/timg.jpg');height: 1214upx;">
			 <!-- 	
				<view class="flex solid-bottom padding justify-center">
					<view class="  padding-sm margin-xs   "><button> 注册合伙人</button></view>
				</view>
				<view class="flex solid-bottom padding justify-center">
					<view class="  padding-sm margin-xs  "><button> 进入首页</button></view>
				</view> -->
				<view class="padding flex flex-direction" >
					<button class="cu-btn bg-grey lg" style="margin-top: 600upx;">注册合伙人</button>
					<button class="cu-btn bg-red margin-tb-sm lg" @click="gotoHome2">进入合伙人首页</button>
				</view>
					
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
		
		<view v-if="helloflag == 0" >
			<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
				<block slot="content">首页</block>
			</cu-custom>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="cu-bar bg-white margin-top">
				<view class="action text-center">
					<view class="flex solid-bottom padding justify-center">
						<view class=" padding-sm margin-xs radius"> 本月收入   ¥2000 </view>
						<view class=" padding-sm margin-xs radius"> 总收入     ¥1200</view>
					</view>
					           
				</view>
			</view>
			 
			 
			 
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'  margin-top-sm':'no-border  margin-top-sm']" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" :data-url="item.path" @tap="toChild">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			 
			 
			 
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
				helloflag: 1,
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://qiniu.zaizaihome.com/2020/login_banner.jpg'
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
					path: '../indexgroup/addInstall',
					name: '安装'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '维修',
					path: '../indexgroup/addInstall',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '变更套餐',
					path: '../indexgroup/addInstall',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '告警',
					path: '../indexgroup/addInstall',
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
		}
		,
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
					url:  'pages/indexgroup/addInstall'
				});
			},
			gotoHome2(){
				 this.helloflag=0
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
