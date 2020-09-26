<template name="logList">
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" ><block slot="backText">返回</block>
			<block slot="content">布撤防记录</block>
			<block slot="right"  >   </block>
		</cu-custom>
		
		<view class="box">
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
		 
	</view>
</template>

<script>
 import tTable from '@/components/t-table/t-table.vue';
 import tTh from '@/components/t-table/t-th.vue';
 import tTr from '@/components/t-table/t-tr.vue';
 import tTd from '@/components/t-table/t-td.vue';
	
	export default {
		components: {  
			 tTable,
			 tTh,
			 tTr,
			 tTd
		},
		data() {
			return {
				tableList: [
					{
						 id: 0,
						 date: '2021-5-6 11:20:20',
						 typeName: '撤防',
						 people: '张三'
					},
					{
						 id: 1,
						 date: '2020-5-6 11:20:20',
						 typeName: '布防',
						 people: '张三'
					},
				],
				 
			};
		},
		methods: {
			 
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
