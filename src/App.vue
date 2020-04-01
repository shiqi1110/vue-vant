<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		computed: {
			...mapState(['getColor'])
		},
		created() {
			// if(!!this.getColor){
			// 	// console.log(this.getColor,8989)
			// 	this.changeThemeColor(this.getColor)
			// }else{
			// 	this.initThemeColor();
			// }
		}
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
.flex{
	display: flex;
}
.flex-item{
	flex: 1;
}
.flex-align-center{
	align-items: center;
}
.flex-justify-center{
	justify-content: center;
}
html{
	background-color: #f5f5f5;
}
.clearfloat::after{
	content: "";/*设置添加的子元素的内容为空*/
	display: block;/*设置添加的子元素为块级元素*/
	height: 0;/*设置添加的子元素的高度为0*/
	visibility: hidden;/*设置添加的子元素看不见*/
	clear: both;/*给添加的子元素设置clear: both*/
}
.clearfloat{
	zoom: 1
}
</style>
