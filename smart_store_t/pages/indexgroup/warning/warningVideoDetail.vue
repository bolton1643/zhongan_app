<template name="warningHistoryDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">历史告警详情-录像播放</block>
		</cu-custom>
		<view>
			 
		    <view class="uni-padding-wrap uni-common-mt ">
			 
		        <view class="text-center margin-top-sm" >
		            <video id="myVideo" style="width: 750upx;" :src="playurl"
		                @error="videoErrorCallback" :danmu-list="danmuList"  controls></video>
		        </view>
				<!-- <radio-group class="block" @change="RadioChange">
					<view class="cu-form-group margin-top" v-for="(item,index) in videoList"  :key="index" >
						<view class="title">视频{{index}}</view>
						<radio :class="radio=='item'?'checked':''" :checked="radio=='item'?true:false" :value="item"></radio>
					</view>
				</radio-group> -->
		    </view>
			
			 
			
			
			<view class="padding  ">
				<text>报警图片</text>
				<view class="flex">
					<view class="flex-sub   padding-sm margin-xs radius " v-for="(item, index) in imageList" :key="index">
						<image :src="item" style="width: 300upx;height: 300upx;"></image>
					</view>
					<!-- <view class="flex-sub   padding-sm margin-xs radius ">
						<image :src="imageurl" style="width: 300upx;height: 300upx;"></image>
					</view> -->
				</view>
			</view>
			
		</view> 
		 
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import countdownTimer from "@/components/countdown-timer/countdown-timer.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {  
			tTable,
			tTh,
			tTr,
			tTd,
		    regionPicker ,
			 ypNumberBox,
			 countdownTimer
		},
		data() {
			return {
			    src: '',
				danmuList: [ 
				],
				danmuValue: '',
				tableList: [
					{
						 id: 0,
						 date: '2021-5-6 11:20:20',
						 typeName: '周界报警',
						 
					},
					{
						 id: 1,
						 date: '2020-5-6 11:20:20',
						 typeName: '周界报警',
					 
					},
				],
				radio: 0,
				videoList: [
					// {
					// 	id: "1",
					// 	title: '20200503001.wmv',
					// 	url: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4'
					// },
					// {
					// 	id: "2",
					// 	title: '20200503002.wmv',
					// 	url: 'http://qiniu.zaizaihome.com//videob0495abb83d30f70def3b17f2dfe6843.mp4'
					// },
					 
				],
				// playurl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
				playurl: '',
				imageurl: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
				imageList: [
					// {
					// 	id: 1,
					// 	url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
					// 	videoUrl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
					// },
					// {
					// 	id: 2,
					// 	url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
					// 	videoUrl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
					// },
					// {
					// 	id: 3,
					// 	url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
					// 	videoUrl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
					// },
					// {
					// 	id: 4,
					// 	url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
					// 	videoUrl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
					// }
				]
			};
		},
		onLoad(event) {
			this.videoList =  JSON.parse(event.videos);
			// console.log(this.videoList)
			this.playurl = this.videoList[0]
			this.imageList = JSON.parse(event.alarmImages);
		},
		onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		    },
		methods: {
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			RadioChange(e) {
				console.log('e.detail=',e.detail)
				this.playurl = e.detail.value;
				this.radio = e.detail.value
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
