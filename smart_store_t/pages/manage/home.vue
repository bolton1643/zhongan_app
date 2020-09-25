<template name="managehome">
	
	<view class="main">
		<view   class="main" :style="{'height': windowHeight+'px'}">
			<cu-custom  style="background-color:rgba(0,0,0,0~1)"> 
				<block slot="content" ><text style="color: white">管理</text></block>
			</cu-custom>
			
			<view class="padding-sm text-center "  >
				<view >
					<image :src="'/static/image/index/index.png'" class="index-image" >
					</image>
				</view>
			</view>
				
			
			<view class="  bg-white margin-top solid-bottom" style="width: 700upx; margin-left: 25upx; border-radius: 20upx;">
				<view class="flex   justify">
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../manage/placemanage" @tap="toChild">
						<image :src="'/static/image/index/add.png'" style="width: 100upx;height: 100upx;"></image>
						<br>
						<text>场所管理</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../manage/achievement/achievementDetail" @tap="toChild" >
						<image :src="'/static/image/index/install.png'" style="width: 100upx;height: 100upx;"></image>
						<br>
						<text>成就关联</text>
					</view>
					<view class="flex-sub  padding-sm margin-xs radius text-center" data-url="../manage/partnerlist" @tap="toChild">
						<image :src="'/static/image/index/making.png'" style="width: 100upx;height: 100upx;"></image>
						<br>
						<text>合伙人管理</text>
					</view>
				</view>
			 
			</view>
		</view> 
		 
	</view>	 
	
	
	
	
	
	
	<!-- <view>
		 
		 
 		 
		 
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
		 
		 
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
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
					path: '../manage/placemanage',
					badge: 120,
					name: '场所管理'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					path: '../manage/partnerlist',
					name: '合伙人管理'
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
		background:linear-gradient(180deg,rgba(21,118,244,1) 0%,rgba(255,255,255,1) 100%);
		opacity:0.4;
	}
	.main {
		background:linear-gradient(180deg,rgba(21,118,244,1) 0%,rgba(255,255,255,1) 100%);
	}
	.index-image{
		width: 700upx;
		height: 350upx;
	}
</style>
