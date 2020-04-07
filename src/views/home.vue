<template>
	<div class="home">
		<!-- <header-view :title="title" :color="color"></header-view> -->
		<van-swipe :autoplay="3000" class="swiper">
		  <van-swipe-item v-for="(image, index) in images" :key="index">
		    <img :src="image" />
		  </van-swipe-item>
		</van-swipe>
		<div class="title">121212121</div>
		<home-footer></home-footer>
	</div>
</template>

<script>
  import HomeFooter from '../components/footer.vue'
  import { Lazyload,Swipe, SwipeItem } from 'vant';
  export default {
    name: 'home',
    data() {
		return {
			title:'商品评价',
			color: '#666',
			images:[
				"http://img.kaiyanapp.com/0-38f631123536258234d51eef79daf653.jpeg",
				"http://img.kaiyanapp.com/1-38f631123536258234d51eef79daf653.jpeg",
				"http://img.kaiyanapp.com/4-38f631123536258234d51eef79daf653.jpeg"
			],
		}
    },
    components: {
		HomeFooter,
		[Lazyload.name]: Lazyload,
		[Swipe.name]:Swipe,
		[SwipeItem.name]:SwipeItem,
    },
    computed: {
    },
    created() {
      console.log('1212121')
    },
    activated() {

    },
    deactivated() {

    },
    methods: {
	
    }
  }
</script>


<style scoped lang="scss">
	/*@import "../css/defines.scss";*/



  .title{
  	  font-size: 24px;
  }
  .swiper{
	  height: 360px;
  }
  .swiper img{
	  width: 100%;
  }
</style>