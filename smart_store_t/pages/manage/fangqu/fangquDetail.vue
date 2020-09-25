<template name="fangquDetail">
	<view>
		<cu-custom class="bg-blue"  :isBack="true">
			<block slot="content">防区图</block>
		</cu-custom>
		 <view class="bg-img  align-center " :style="{'min-height': (windowHeight-50)+'px', 'background-size': '100% 100%', 'background-image': 'url(../../static/image/manage/fangquguanli.jpg)'  }">
				 
		 </view>
	</view>

	

</template>

<script>
	export default {
		data() {
			return { 
				     
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
			gotoAdd(){
				
			}
		},
		created(){
			const isBecomePartner = uni.getStorageSync("isBecomePartner" );
			if(isBecomePartner != undefined &&  isBecomePartner === 1){
				this.helloflag = 0;
			}
		}
		 
	 
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
</style>
