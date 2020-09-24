<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">布撤防记录</block>
			<view slot="right" class="slot-view" @click="showCalendar">
				<image :src="calendarImage"></image>
			</view>
		</cu-custom>

		<view class="content">
			<view v-for="(item, index) in record" :key="index" class="record-view">
				<view class="record-view-date" v-text="item.time" :class="{'bold': item.isNow}"></view>
				<view class="record-view-list">
					<view class="record-view-list-item" v-for="(sub, subIndex) in item.list" :key="subIndex">
						<view class="item-title">
							<text class="title" v-text="sub.type ? '布防' : '撤防'"></text>
							<text class="time" v-text="sub.time"></text>
						</view>
						<text class="item-operate">操作人：{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view>
			<uni-calendar ref="calendar" :insert="false" :needTodayBtn="false" :showMonth="false" title="请选择查询时间" :lunar="false"
			 :range="true" :clearDate="false" @confirm="confirm">
			</uni-calendar>
		</view>
	</view>
</template>

<script>
	const calendarImage = require('../../../static/homepage/defence/calendar.png');

	export default {
		data() {
			return {
				calendarImage,
				record: [
					{
						time: '8月18日',
						isNow: true,
						list: [
							{ 
								type: 1, 
								name: '张三',
								time: '09:05:16',
							},
							{
								type: 0, 
								name: '张三',
								time: '09:05:16',
							},
							{
								type: 1, 
								name: '张三',
								time: '09:05:16',
							}
						],
					},
					{
						time: '8月17日',
						isNow: false,
						list: [
							{ 
								type: 1, 
								name: '张三',
								time: '09:05:16',
							},
							{
								type: 0, 
								name: '张三',
								time: '09:05:16',
							},
							{
								type: 1, 
								name: '张三',
								time: '09:05:16',
							}
						],
					}
				],
			};
		},
		
		methods: {
			// 日历组件确定事件
			confirm(e) {
				console.log(e);
			},
			
			// 展示日历组件
			showCalendar() {
				this.$refs.calendar.open();
			},
		},
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		background-color: #f0f0f0;

		.page-box {
			width: 100%;

			.content {
				width: 100%;
				
				.record-view {
					display: flex;
					flex-direction: column;
					padding: 40upx;
					box-sizing: border-box;
					
					.record-view-date {
						display: flex;
						height: 40upx;
						width: 100%;
						justify-content: flex-start;
						align-items: center;
						margin-bottom: 20upx;
						color: #999999;
						font-size: 28upx;
						
						&.bold {
							font-size: 32upx;
							color: #333333;
							font-weight: 500;
						}
					}
					
					.record-view-list {
						display: flex;
						flex-direction: column;
						
						.record-view-list-item {
							display: flex;
							padding: 40upx 40upx 40upx 60upx;
							background-color: #FFFFFF;
							box-sizing: border-box;
							height: 160upx;
							border-radius: 24upx;
							flex-direction: column;
							
							& + .record-view-list-item {
								margin-top: 16upx;
							}							
							.item-title {
								height: 40upx;
								display: flex;
								justify-content: space-between;
								
								.title {
									font-size: 32upx;
									font-weight: 500;
									color: #333333;
								}
								
								.time {
									font-size: 24upx;
									color: #999999;
								}
							}
							
							.item-operate {
								margin-top: 8upx;
								display: flex;
								height: 32upx;
								align-items: center;
								justify-content: flex-start;
								font-size: 28upx;
								color: #666666;
							}
						}
					}
				}
			}
		}
	}
	
	.slot-view {
		padding-right: 40upx;
		
		image {
			width: 56upx;
			height: 56upx;
		}
	}
</style>
