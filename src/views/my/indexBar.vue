<template>
	<div>
		<!-- <header-view :title="title" :color="color"></header-view> -->
		<cu-custom  bgImage="http://attach.bbs.miui.com/forum/201401/11/145825zn1sxa8anrg11gt1.jpg" :isBack="true">
			<span slot="backText">返回</span>
			<span slot="content">索引</span>
			<!-- <span slot="right" @click="rightBtn">按钮</span> -->
		</cu-custom>
		<van-tabs v-model="active">
			<van-tab title="基础用法">
				<van-index-bar>
					<div v-for="(item,index) in indexListTwo" :key="index">
						<van-index-anchor :index="item" style="text-align: center;"></van-index-anchor>
						<van-cell :title="'标题'+item+'文本'+cindex" v-for="(citem,cindex) in 3" :key="cindex"></van-cell>
					</div>

				</van-index-bar>
			</van-tab>
			<van-tab title="自定义索引列表">
				<van-index-bar :index-list="indexList">
					<div v-for="(item,index) in indexList" :key="index">
						<van-index-anchor :index="item" style="text-align: center;">标题{{item}}</van-index-anchor>
						<van-cell :title="'标题'+item+'文本'+cindex" v-for="(citem,cindex) in 3" :key="cindex"></van-cell>
					</div>
				</van-index-bar>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { IndexBar, IndexAnchor, Tab, Tabs, Cell } from 'vant';
export default {
	components: {
		[IndexBar.name]: IndexBar,
		[IndexAnchor.name]: IndexAnchor,
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[Cell.name]: Cell
	},
	data() {
		return {
			title: '索引',
			color: '',
			active: 0,
			indexListTwo:['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
			indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		};
	},
	methods:{
		rightBtn(){
			console.log(89898)
		}
	}
};
</script>

<style></style>
