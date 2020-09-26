<template>
	<view class="row j-center m bg-white">		
		<block v-for="(item,index) in resdata" :key="index">
			<view class="span-10 d-flex flex-column j-center a-center  "
			@tap="event(item)">
				<image :src="item.src" 
				style="width: 370upx;height: 60upx;" lazy-load
				mode="widthFix"></image>
			</view>
		</block>		
	</view>
</template>

<script>
	console.log('nav');
	export default {
		//组建注册自定义属性
		props:{
			resdata:Array
		},
		methods:{
			event(item){
				console.log(JSON.stringify(item));
			}
		}
	}
</script>

<style>
</style>
