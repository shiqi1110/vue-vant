<template>
	<div class="backHug">
		<div class="headerTitle">
			<div class="header-left" @click="$router.go(-1)">
				<van-icon class="zuojiantou" name="arrow-left" :color="color" style="font-size: 24px;" />
			</div>
			<div class="header-in">{{ title }}</div>
			<div class="header-right"></div>
		</div>
		<!-- <van-nav-bar
		  :title="title"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/> -->
	</div>
</template>

<script>
import { Icon,NavBar } from 'vant';
export default {
	name: 'headerTitle',
	props: ['title','color'],
	components: {
		[Icon.name]: Icon,
		[NavBar.name]: NavBar,
	},
	computed: {},
	data() {
		return {};
	},
	created() {
		//    this.reload();
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		}
	}
};
</script>

<style scoped>
	.backHug {
		position: relative;
		height: 88px;
		width: 100%;
	}
	.headerTitle {
		width: 100%;
		height: 88px;
		line-height: 88px;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		font-size: 0;
		overflow: hidden;
	}
	.header-left {
		width: 10%;
		height: 100%;
		display: block;
		float: left;
		vertical-align: middle;
		
	}
	.zuojiantou {
		line-height: 88px;
		font-size: 36px;
		text-align: center;
		display: block;
		color: #3e3a39;
	}
	.header-in {
		width: 80%;
		display: block;
		float: left;
		vertical-align: middle;
		text-align: center;
		font-size: 32px;
		line-height: 88px;
	}
	.header-right {
		width: 10%;
		display: block;
		float: left;
		vertical-align: middle;
	}
</style>
