<template>
	<div class="body">
		<div class="content">
			<div class="top" :style="{backgroundColor:commonColor}">
				<div class="tophug"><img class="head" src="../../assets/img/touxiang.png" alt="" /></div>
				<img class="wave" src="../../assets/img/wave.gif" alt="" />
			</div>
			<div class="main">
				<div class="main-hug">
					<div class="main-item flex flex-align-center" @click="itemBtn(1)">
						<van-icon class="item-right" name="chart-trending-o" />
						<div class="flex-item">wavesurfer</div>
						<van-icon class="item-right" name="arrow" />
					</div>
					<div class="main-item flex flex-align-center" @click="itemBtn(2)">
						<van-icon class="item-right" name="friends-o" />
						<div class="flex-item">索引</div>
						<van-icon class="item-right" name="arrow" />
					</div>
					<div class="main-item flex flex-align-center" @click="itemBtn(3)">
						<van-icon class="item-right" name="desktop-o" />
						<div class="flex-item">抽屉</div>
						<van-icon class="item-right" name="arrow" />
					</div>
					<div class="main-item flex flex-align-center" @click="itemBtn(4)">
						<van-icon class="item-right" name="desktop-o" />
						<div class="flex-item">设置</div>
						<van-icon class="item-right" name="arrow" />
					</div>
				</div>
			</div>
		</div>

		<!-- <div style="width:300px;height:300px;background:red;margin:20px;" v-waves></div> -->
		<home-footer></home-footer>
	</div>
</template>

<script>
import { Icon } from 'vant';
import Waves from '../../components/waves/waves.js';
import HomeFooter from '../../components/footer.vue';
export default {
	name: 'home',
	directives: { Waves },
	data() {
		return {
			title: '商品评价',
			color: '#666',
			commonColor: '#ff0000'
		};
	},
	components: {
		HomeFooter,
		[Icon.name]: Icon
	},
	computed: {},
	created() {
		this.commonColor = this.myCommomColor;
		// console.log('1212121');
	},
	activated() {},
	deactivated() {},
	methods: {
		itemBtn(type) {
			if(type == 1){
				this.$router.push({path: '/wavesurfer'})
			}else if(type == 2){
				this.$router.push({path: '/indexBar'})
			}else if(type == 3){
				this.$router.push({path: '/drawer'})
			}else if(type == 4){
				this.$router.push({path: '/themeColor'})
			}
		}
	}
};
</script>
<style scoped  lang="scss">
.top {
	background-color: #ff0000;
	/* height: 200px; */
}
.wave {
	width: 100%;
	display: block;
	mix-blend-mode: screen;
}
.tophug {
	text-align: center;
	padding-top: 60px;
	min-height: 110px;
}
.head {
	width: 110px;
	height: 110px;
}
.main {
	margin-top: 40px;
	padding: 20px;
}
.main-hug {
	background-color: #fff;
	box-shadow: 0 0 20px #a2a0a0;
	border-radius: 10px;
	padding:12px 0;
}
.main-item {
	padding: 24px 12px;
	text-align: left;
	border-bottom: 1px solid #DDDDDD;
}
.main-item:nth-last-of-type(1){
	border-bottom: 0;
}
.main-item .flex-item {
	font-size: 28px;
	margin-left: 12px;
}
.main-item .item-right {
	font-size: 40px;
	color: #666;
}
</style>
