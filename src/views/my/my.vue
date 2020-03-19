<template>
	<div>
		<home-footer></home-footer>
	</div>
</template>

<script>
	 import HomeFooter from '../../components/footer.vue'
	 export default {
	   name: 'home',
	   data() {
	 		return {
	 			title:'商品评价',
	 			color: '#666',
	 		}
	   },
	   components: {
	 		HomeFooter,
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

<style>
	
</style>
