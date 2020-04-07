<template>
	<div class="page">
		<header-view :title="title" :color="color"></header-view>
		<div class="block">
			<span class="demonstration">有默认值</span>
			<el-color-picker v-model="color1" @change="changeColor"></el-color-picker>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title:'设置',
			color: '',
			color1: '#ff0000'
		};
	},
	computed: {
	},
	created() {
		if(!!this.myCommomColor){
			this.color1 = this.myCommomColor;
		}
	},
	methods:{
		changeColor(e){
			this.$store.dispatch('setColor', e);
			this.changeThemeColor(e)
			this.myCommomColor = e;
			console.log(e)
		}
	}
};
</script>

<style lang="scss" scoped>
	.page{
		padding: 30px;
	}
	.block{
		
	}
</style>
