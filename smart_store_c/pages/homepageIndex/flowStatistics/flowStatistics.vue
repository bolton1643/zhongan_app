<template>
	<view class="page-box">
		<cu-custom bgColor="bg-gray" :isBack="true">
			<block slot="content">客流统计</block>
		</cu-custom>
		<view class="content">
			<view class="chart-content">
				<view class="chart-title">
					<text class="title">当日客流</text>
					<text class="chart-info">同比 80 +20% 环比 90 +10%</text>
				</view>
				<view class="charts">
					<canvas canvas-id="canvasDoubleLine" id="canvasDoubleLine" class="chart" @touchstart="touchLine"></canvas>
				</view>
				<view class="chart-bottom"></view>
			</view>
			<view class="chart-content">
				<view class="chart-title">
					<text class="title">客流人数统计图</text>
					<text class="chart-info" @click="showCalendar">
						<uni-icons type="arrowright"></uni-icons>
					</text>
				</view>
				<view class="charts">
					<canvas canvas-id="canvasLine" id="canvasLine" class="chart" @touchstart="touchLine"></canvas>
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
	import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';

	export default {
		data() {
			return {
				cWidth: '335',
				cHeight: '196',
				pixelRatio: 1,
				lineData: {
					categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
					series: [{
						name: '成交量A',
						data: [35, 20, 25, 37, 4, 20],
						color: '#1676FE'
					}]
				},
				doubleLineData: {
					categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
					series: [{
						name: '成交量A',
						data: [35, 20, 25, 37, 4, 20],
						color: '#FD6F00'
					}, {
						name: '成交量B',
						data: [135, 120, 125, 137, 14, 120],
						color: '#1676FE'
					}]
				},
				chartLine: null,
				chartDoubleLine: null,
			}
		},

		mounted() {
			this.cWidth = uni.upx2px(676);
			this.cHeight = uni.upx2px(326);
			this.getLine();
			this.getDoubleLine();
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

			//单线图
			getLine() {
				this.showLine('canvasLine', this.lineData);
			},

			//双线图
			getDoubleLine() {
				this.showLine('canvasDoubleLine', this.doubleLineData);
			},

			// line 图
			showLine(canvasId, chartData) {
				const _self = this;
				this.chartLine = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: false,
					},
					padding: [10, 15, 5, 0],
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						disableGrid: true,
						boundaryGap: 'justify',
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio
				});
			},
		}
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

				.chart-content {
					display: flex;
					flex-direction: column;
					padding: 40upx 32upx;
					box-sizing: border-box;
					background-color: #FFFFFF;

					&+.chart-content {
						margin-top: 16upx;
					}

					.chart-title {
						display: flex;
						height: 48upx;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 20upx;

						.title {
							font-size: 32upx;
							color: #666666;
						}

						.chart-info {
							font-size: 28upx;
							color: #1676FE;
							
							.uni-icons {
								font-size: 48upx !important;
							}
						}
					}

					.charts {
						width: 676upx;
						height: 326upx;

						.chart {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
