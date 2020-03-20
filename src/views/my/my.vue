<template>
	<div class="body">
		<div class="content">
			<div class="top">
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
			color: '#666'
		};
	},
	components: {
		HomeFooter,
		[Icon.name]: Icon
	},
	computed: {},
	created() {
		console.log('1212121');
	},
	activated() {},
	deactivated() {},
	methods: {
		itemBtn(type) {
			if(type == 1){
				this.$router.push({path: '/wavesurfer'})
			}
		}
	}
};
</script>
<style scoped>
.top {
	background-color: #fff;
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
}
.main-item {
	padding: 20px 12px;
	text-align: left;
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
