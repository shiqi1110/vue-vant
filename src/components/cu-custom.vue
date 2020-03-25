<template>
	<div>
		<div class="cu-custom" >
			<div class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<div class="action"  @click="$router.go(-1)" v-if="isBack">
					<van-icon class="backBtn" name="arrow-left" />
					<slot name="backText"></slot>
				</div>
				<div class="content" >
					<slot name="content"></slot>
				</div>
				<div class="navRightBox">
					<slot name="right"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Icon } from 'vant';
	export default {
		components:{
			[Icon.name]: Icon,
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				console.log(11212,style)
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
		}
	}
</script>

<style scoped>
	/* 自定义样式 */
	.bg-gradual-blue{
		background-image: -webkit-linear-gradient(45deg, #0081ff, #1cbbb4);
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
	}
	.cu-custom{
		height: 88px;
		display: block;
		position: relative;
	}
	/* 主题字体样式 */
	.text-white{
		color: #fff;
	}
	.none-bg{
		background-color: none;
	}
	.text-black{
		color: #333333;
	}
	.bg-white{
		background-color: #fff;
	}
	.bg-img {
	    background-size: cover;
	    background-position: center;
	    background-repeat: no-repeat;
	}
	/* 导航条 */
	.cu-bar.fixed{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1024;
		box-shadow: 0 0.5px 3px rgba(0, 0, 0, 0.1);
	}
	.cu-bar {
	    display: flex;
	    position: relative;
	    align-items: center;
	    height: 88px;
	    -webkit-box-pack: justify;
	    justify-content: space-between;
	}
	/* 导航条左边 */
	.cu-bar .action {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    height: 100%;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    max-width: 100%;
	}
	.cu-bar .action:first-child {
	    margin-left: 15px;
	    font-size: 15px;
	}
	.action span{
		font-size: 28px;
	}
	/* 导航条标题 */
	.cu-bar .content {
	    position: absolute;
	    text-align: center;
	    width: calc(100% - 170px);
	    left: 0;
	    right: 0;
	    bottom: 0;
	    top: 0;
	    margin: auto;
	    height: 50px;
	    font-size: 32px;
	    line-height: 50px;
	    cursor: none;
	    pointer-events: none;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
		/* font-weight: 550; */
	}
	.cu-custom .cu-bar .content {
	    width: calc(100% - 300px);
	}
	.backBtn{
		font-size: 40px !important;
	}
	/* 导航条右边 */
	.navRightBox{
		margin-right: 15px;
		font-size: 15px;
	}
	.navRightBox span{
		font-size: 28px;
	}
	
</style>
