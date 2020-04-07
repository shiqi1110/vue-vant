<template>
	<div class="bg-gradual-blue">
		<div  class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<header-view :title="title" :color="color"></header-view>			
			<div class='padding margin text-center'>
				<van-button type="primary" @click="showModal" data-target="viewModal">打开抽屉</van-button>
			</div>
			<div class="cu-list menu card-menu ">
				<div class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<div class="content flex-align-center">
						<van-icon name="like text-grey" />
						<span class="text-grey">{{index +1}}</span>
					</div>
				</div>
			</div>
			
			<div class='padding margin text-center'>
				<van-button type="primary" @click="showModal" data-target="viewModal">打开抽屉</van-button>
			</div>
		</div>
		<div class="DrawerClose" :class="modalName=='viewModal'?'show':''" @click="hideModal">
			<van-icon name="upgrade right" />
		</div>
		<div  class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<div class="cu-list menu card-menu show-content">
				<div class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<div class="content">
						<van-icon name="like text-grey" />
						<span class="text-grey">{{index +1}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Button, Icon } from 'vant';
	export default {
		components:{
			[Button.name]:Button,
			[Icon.name]:Icon,
		},
		data() {
			return {
				modalName:null,
				title: '抽屉',
				color: '',
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
		overflow-y: scroll;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100px 0;
		box-sizing: border-box;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50px;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64px;
		height: 64px;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10px;
		height: 10px;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
	.text-center{
		text-align: center;
	}
	.padding {
	    padding: 15px;
	}
	.margin {
	    margin: 15px;
	}
	.cu-list.card-menu {
	    overflow: hidden;
	    margin-right: 30px;
	    margin-left: 30px;
	    border-radius: 15px;
		display: block;
		margin-bottom: 25px;
		margin-top: 25px;
		background-color: #fff;
	}
	.cu-item{
		padding: 20px;
	}
	.cu-item .content{
		font-size: 30px;
		flex: 1;
	}
	.text-grey{
		color: #8799a3;
		margin-right: 10px;
		display: inline-block;
	}
	.right{
		color: #FFFFFF;
		transform:rotate(90deg);
	}
	.cu-list.card-menu.show-content{
		overflow: scroll;
		height: 100%;
	}
</style>
