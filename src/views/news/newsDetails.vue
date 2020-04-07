<template>
	<div>
		<header-view :title="title" :color="color"></header-view>
		<div class="page">
			<div class="title">{{infoData.title}}</div>
			<div style="max-width: 100%;overflow: hidden;word-break: break-word;">
				<div v-html="detailContent(content)"></div>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		data () {
			return {
				title: '商品详情',
				color: '',
				leftId: 0,
				infoData: '',
				content: '',
			}
		},
		components:{
		},
		mounted() {
			this.leftId = this.$route.query.id;
			this.getAction()
		},
		methods: {
			getAction(){
				let that = this;
				that.request('api/selfnews/newsd',{
						id: that.leftId,
					},'GET').then(res => {
					console.log(res);
					if(res.code == 1){
						that.infoData = res.data;
						that.content = res.data.content;
					}
				});
			}
		}
	}
</script>

<style  lang="scss">
	.page{
		padding: 16px;
		text-align: left;
	}
	.title{
		font-size: 32px;
		text-align: center;
		margin-bottom: 20px;
		padding-top: 10px;
	}
</style>
