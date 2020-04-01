<template>
	<div class="footer">
		<div class="footerHugK"></div>
		<div class="footerHugW">
			<div class="footerHug">
				<van-tabbar v-model="active"  @change="onChange">
					<van-tabbar-item>
						<div class="van-tabbar-item__icon">
							<i class="el-icon-house"  style="font-size: 26px;"></i>
						</div>
						<span v-if="active == 0" :style="{color: activeColor}">首页</span>
						<span v-if="active != 0">首页</span>
						<!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" /> -->
					</van-tabbar-item>
					<van-tabbar-item>
						<div class="van-tabbar-item__icon">
							<i class="el-icon-news" :color="activeColor" style="font-size: 26px;"></i>
						</div>
						<span v-if="active == 1" :style="{color: activeColor}">新闻</span>
						<span v-if="active != 1">新闻</span>
					</van-tabbar-item>
					<van-tabbar-item>
						<div class="van-tabbar-item__icon">
							<i class="el-icon-s-marketing" :color="activeColor" style="font-size: 26px;"></i>
						</div>
						<span v-if="active == 2" :style="{color: activeColor}">图表</span>
						<span v-if="active != 2">图表</span>
					</van-tabbar-item>
					<van-tabbar-item>
						<div class="van-tabbar-item__icon">
							<i class="el-icon-s-custom" style="font-size: 26px;"></i>
						</div>
						<span v-if="active == 3" :style="{color: activeColor}">个人中心</span>
						<span v-if="active != 3">个人中心</span>
					</van-tabbar-item>
				</van-tabbar>
			</div>
		</div>
		
		<!--<div class="footerHug" v-model="activeIndex" @change="changeNav">-->
		<!--<div class="footerItem">首页</div>-->
		<!--<div class="footerItem">分类</div>-->
		<!--<div class="footerItem">分类</div>-->
		<!--<div class="footerItem">购物车</div>-->
		<!--<div class="footerItem">我的</div>-->
		<!--</div>-->
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Tabbar, TabbarItem } from 'vant';
export default {
	data() {
		return {
			activeIndex: '',
			active: 0,
			routerName: '',
			activeColor:'#ff0000'
		};
	},
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	computed: {
		...mapState(['nowIndex','getColor'])
	},
	mounted() {
		var name = this.$route.path;
		this.routerName = name;
		//    console.log(name)
		// if (name == '/classify') {
		// 	this.activeIndex = 1;
		// 	this.$store.dispatch('setIndex', 1);
		// } else if (name == '/home') {
		// 	this.activeIndex = 0;
		// 	this.$store.dispatch('setIndex', 0);
		// } else if (name == '/shoppingCart') {
		// 	this.activeIndex = 2;
		// 	this.$store.dispatch('setIndex', 2);
		// } else if (name == '/personal') {
		// 	this.activeIndex = 3;
		// 	this.$store.dispatch('setIndex', 3);
		// } else if (name == '/foodScene') {
		// 	this.active = 4;
		// 	this.$store.dispatch('setIndex', 4);
		// } else {
		// 	this.active = 5;
		// 	this.$store.dispatch('setIndex', 5);
		// }
	},
	created() {
		this.active = this.nowIndex;
		if(!!this.myCommomColor){
			this.activeColor = this.myCommomColor;
			console.log(this.activeColor)
		}
		// this.activeColor = this.getColor;
	},
	methods: {
		changeNav(active, name) {
			console.log(active);
			this.activeIndex = active;
			this.$router.push({
				path: name
			});
			this.$store.dispatch('setIndex', active);
		},
		foodBtn() {
			this.$router.push({
				path: '/foodScene'
			});
		},
		onChange(index) {
			let name = '';
			if(index == 0){
				name = '/home'
			}else if(index == 1){
				name = '/news'
			}else if(index == 2){
				name = '/lightweight'
			}else{
				name = '/my'
			}
			this.$router.push({
				path: name
			});
			this.$store.dispatch('setIndex', index);
			console.log(index)
		     // Notify({ type: 'primary', message: index });
		}
	}
};
</script>

<style>
.footerHugK {
	margin-top: 43px;
	height: 98px;
	/*background-color: #fff;*/
	width: 100%;
	/*position: absolute;*/
	/*bottom: 0;*/
}

/*.footerHugW{*/
/*max-width: 750px;*/
/*margin: 0 auto;*/
/*position: relative;*/
/*}*/
.footerHug {
	height: 98px;
	background-color: #fff;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	border-top: 1px solid rgba(229, 229, 229, 1);
	z-index: 1000;
	text-align: center;
}

.van-tabbar-item {
	margin-top: 0;
}
.van-tabbar-item--active {
    /* color: #ee0a24; */
}

</style>
