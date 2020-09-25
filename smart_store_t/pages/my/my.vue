<template name="my">
	<view>
		<view style="" class="bg-blue">
			<cu-custom  style="background-color:rgba(0,0,0,0~1)">
				<block slot="content" ><text style="color: white">我的</text></block>
			</cu-custom>
			<view style="width:750upx;height:300upx; margin-top: 10upx; "  >
				<view class="cu-avatar xl round " style="margin-left: 310upx;margin-top: 60upx;background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<br>
				<view class="text-center margin-top">{{uerInfo.phone}}</view>
			
			</view>
		</view>
		
		<view class="cu-list   menu ">
			<view class="cu-item arrow"  >
				<view class="content" @click="gotoUrl('../my/myMoney')">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的金豆</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content"  @click="gotoUrl('../my/baseInfo')">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">基本资料</text>
				</view>
			</view>
			<view class="cu-item arrow"  >
				<view class="content"   @click="gotoUrl('../my/forgetPassword')">
						<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">修改密码</text>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction margin-top-xl">
			<button class="cu-btn bg-blue lg" @click="loginout">退出</button>
		</view>
		 
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: mapState(['uerInfo']),
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
			...mapMutations(['closeSocket']),
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			gotoUrl(path){
				console.log('跳转path=',path)
				uni.navigateTo({
					url:  path
				});
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			loginout(){
				uni.clearStorageSync()
				//this.closeSocket()
				// uni.setStorageSync("isBecomePartner",0)
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
