<template name="warningHistoryDetail">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">历史告警详情</block>
		</cu-custom>
		<view>
			<view>
				<view class="cu-form-group  ">
					<view class="title">首次报警时间  2020-5-12 02:20:20</view>
				</view>
				<view class="cu-form-group  ">
					<view class="title">最后报警时间  2020-5-12 02:20:25</view>
				</view>
				<view class="cu-form-group  ">
					<view class="title">报警次数  8</view>
				</view>
			</view>
			<view class="box margin-top">
					<t-table @change="change">
			                <t-tr>
			                    <t-th>操作时间</t-th>
			                    <t-th>操作类型</t-th>
			                    <t-th>操作人</t-th>
			                </t-tr>
			                <t-tr v-for="item in tableList" :key="item.id">
			                    <t-td>{{ item.date }}</t-td>
			                    <t-td>{{ item.typeName }}</t-td>
			                    <t-td>{{ item.people }}</t-td>
			                </t-tr>
					</t-table>
			</view>
			
		    <view class="uni-padding-wrap uni-common-mt margin-top">
				<view>
					<text class="text-gray"> 录像 </text>
				</view>
		        <view class="text-center margin-top-sm" >
		            <video id="myVideo" style="width: 750upx;" :src="playurl"
		                @error="videoErrorCallback" :danmu-list="danmuList"  controls></video>
		        </view>
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group margin-top" v-for="item in videoList"  :key="item.id" >
						<view class="title">{{item.title}}</view>
						<radio :class="radio=='item.url'?'checked':''" :checked="radio=='item.url'?true:false" :value="item.url"></radio>
					</view>
				</radio-group>
		    </view>
			
			
			<view class=" margin-top">
				<view>
					<text class="text-gray"> 处理 </text>
				</view>
				 <view class="cu-form-group  ">
					<view class="title">处理时间  2020-5-12 02:20:20</view>
				 </view>
				 <view class="cu-form-group  ">
					<view class="title">处理说明 XXXXXXXXXXXXXXXXXXXXXXXX</view>
				 </view>
				 <view class="cu-form-group  ">
					<view class="title">图片   </view>
					<image :src="imageurl"></image>
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
					{
						id: "1",
						title: '20200503001.wmv',
						url: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4'
					},
					{
						id: "2",
						title: '20200503002.wmv',
						url: 'http://qiniu.zaizaihome.com//videob0495abb83d30f70def3b17f2dfe6843.mp4'
					},
					 
				],
				playurl: 'http://qiniu.zaizaihome.com//videode715680a2d847e9a335a0f12eb6d4f1.mp4',
				imageurl: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg',
			};
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
