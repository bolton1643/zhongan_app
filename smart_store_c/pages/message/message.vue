<template name="message">
	<view class="page-box">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">消息中心</block>
		</cu-custom>

		<view>
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" data-url="/pages/message/smartCustomerService/smart-customer-service" @tap="toChild">
					<view class="cu-avatar lg" style="width: 96upx; height: 96upx; background: white; border-radius: 100%;">
						<image :src="'/static/homepage/icon-smart-customer-service.png'" style="width: 100%; height: 100%;"></image>
						<view class="cu-tag badge">5</view>
					</view>
					<view class="content">
						<view class="text-black">智能客服</view>
					</view>
					<view class="action">
						<image style="width: 32upx; height: 32upx;" src="/static/homepage/icon-enter.png"></image>
					</view>
				</view>
				<view class="divide"></view>

				<view class="cu-item margin-top" data-url="/pages/message/warning/warningNotice" @tap="toChild">
					<view class="cu-avatar lg" style="width: 96upx; height: 96upx; background: white; border-radius: 100%;">
						<image :src="'/static/homepage/icon-alert-notification.png'" style="width: 100%; height: 100%;"></image>
						<view class="cu-tag badge">3</view>
					</view>
					<view class="content">
						<view class="text-black">告警通知</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								小海小香(010101) &nbsp; &nbsp;
							</view>
						</view>
					</view>
					<view class="action">
						<image style="width: 32upx; height: 32upx;" src="/static/homepage/icon-enter.png"></image>
					</view>
				</view>
				<view class="divide"></view>

				<view class="cu-item margin-top" data-url="/pages/message/armAndDisarm/arm-and-disarm-list" @tap="toChild">
					<view class="cu-avatar lg" style="width: 96upx; height: 96upx; background: white; border-radius: 100%;">
						<image :src="'/static/homepage/icon-disarm-notification.png'" style="width: 100%; height: 100%;"></image>
						<view class="cu-tag badge">18</view>
					</view>
					<view class="content">
						<view class="text-black">布撤防通知</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								小海小香(010101) &nbsp; &nbsp;
							</view>
						</view>
					</view>
					<view class="action">
						<image style="width: 32upx; height: 32upx;" src="/static/homepage/icon-enter.png"></image>
					</view>
				</view>
				<view class="divide"></view>

				<view class="cu-item margin-top" data-url="/pages/message/progress/progress" @tap="toChild">
					<view class="cu-avatar lg" style="width: 96upx; height: 96upx; background: white; border-radius: 100%;">
						<image :src="'/static/homepage/icon-progress-notification.png'" style="width: 100%; height: 100%;"></image>
						<view class="cu-tag badge">5</view>
					</view>
					<view class="content">
						<view class="text-black">进度通知</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								您的7月份服务报表，请及时查收！如有问题请及时向...
							</view>
						</view>
					</view>
					<view class="action">
						<image style="width: 32upx; height: 32upx;" src="/static/homepage/icon-enter.png"></image>
					</view>
				</view>
				<view class="divide"></view>

				<view class="cu-item margin-top" data-url="/pages/message/shaky/shaky" @tap="toChild">
					<view class="cu-avatar lg" style="width: 96upx; height: 96upx; background: white; border-radius: 100%;">
						<image :src="'/static/homepage/icon-event-notification.png'" style="width: 100%; height: 100%;"></image>
						<view class="cu-tag badge">8</view>
					</view>
					<view class="content">
						<view class="text-black">活动通知</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								「618年中庆」1年时间，从0到300万用户，智慧门店
							</view>
						</view>
					</view>
					<view class="action">
						<image style="width: 32upx; height: 32upx;" src="/static/homepage/icon-enter.png"></image>
					</view>
				</view>
				<view class="divide"></view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		methods: {
			toChild(e) {
				if (e.currentTarget.dataset.url != '') {
					uni.navigateTo({
						url: e.currentTarget.dataset.url
					})
				} else {
					uni.showToast({
						title: '开发中。。。'
					})
				}
			}
		}
	}
</script>

<style>
	.page-box {
		width: 100vw;
		height: calc(100vh - 100upx);
		background-color: white;
	}

	.divide {
		height: 2upx;
		background-color: #E6E6E6;
		margin: 0 44upx 0 30upx;
	}
</style>
