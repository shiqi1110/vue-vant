<template>
	<div>
		<div class="flex">
			<div class="left">
				<van-sidebar v-model="activeKey" @change="onChange"><van-sidebar-item v-for="(item, index) in listName" :key="index" :title="item" /></van-sidebar>
			</div>
			<div class="flex-item right">
				<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
					<!-- 	  <p>刷新次数: {{ count }}</p> -->
					<div class="flex flex-align-center item" v-for="(item,index) in listData" :key="index" @click="infoBtn(item.id)">
						<div class="img">
							<van-image class="img" fit="cover" :src="item.headpic" />
							<!-- <img src="http://p1.pstatp.com/large/pgc-image/64db80209e6a4cf4b25708c76fdcea0c" alt=""> -->
						</div>
						<div class="flex-item">
							<div class="title">{{item.title}}</div>
							<div class="time">来源：{{item.source}}</div>
						</div>
					</div>
				</van-pull-refresh>
			</div>
		</div>
		<home-footer></home-footer>
	</div>
</template>

<script>
import { Sidebar, SidebarItem, Image, Toast, PullRefresh } from 'vant';
import HomeFooter from '@/components/footer.vue';
export default {
	data() {
		return {
			activeKey: 0,
			listName: ['科技', '财经', '体育', '娱乐', '国际', '历史', '军事', '情感', '搞笑'],
			page: 1,
			pageSize: 20,
			isLoading: false,
			total: 0,
			listData: [],
		};
	},
	components: {
		[Sidebar.name]: Sidebar,
		[SidebarItem.name]: SidebarItem,
		[Image.name]: Image,
		[Toast.name]:Toast,
		[PullRefresh.name]: PullRefresh,
		HomeFooter
	},
	mounted() {
		this.getList();
	},
	methods: {
		onChange(index) {
			let that = this;
			that.activeKey = index;
			that.listData = [];
			this.page = 1;
			this.psize = 20;
			this.getList();
		},
		infoBtn(id){
			this.$router.push({path: '/newsDetails',query:{id:id}})
		},
		getList() {
			let that = this;
			that.request('api/selfnews/newslist',{
					type: that.activeKey + 1,
					page: that.page,
					psize: that.psize
				},'GET').then(res => {
					setTimeout(() => {
						that.isLoading = false;
						if(res.code == 1){
							that.listData = res.data;
							that.total = res.total;
						}else{
							that.listData = [];
							that.total = 0;
						}
					}, 1000);
				console.log(res);
			});
		},
		onRefresh() {
			this.page = 1;
			this.psize = 20;
			this.getList();
			
		}
	}
};
</script>

<style scoped>
.left {
	width: 170px;
	position: fixed;
	left: 0;
	top: 0;
}
.right{
	margin-left: 170px;
}
.img {
	width: 160px;
	height: 160px;
	margin-right: 16px;
}
.img img {
	width: 180px;
}

.item {
	padding: 10px;
	text-align: left;
}
.title{
	text-align: left;
	font-size: 28px;	
	height: 80px;
	overflow: hidden;
	text-overflow:ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.time{
	margin-top: 6px;
	font-size: 26px;
}
</style>
