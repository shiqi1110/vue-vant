<template>
	<div class="loadingBox" v-if="show">
		<div class="spinnerloading">
			<div class="spinner-containerloading container1loading">
				<div class="circle1loading"></div>
				<div class="circle2loading"></div>
				<div class="circle3loading"></div>
				<div class="circle4loading"></div>
			</div>
			<div class="spinner-containerloading container2loading">
				<div class="circle1loading"></div>
				<div class="circle2loading"></div>
				<div class="circle3loading"></div>
				<div class="circle4loading"></div>
			</div>
			<div class="spinner-containerloading container3loading">
				<div class="circle1loading"></div>
				<div class="circle2loading"></div>
				<div class="circle3loading"></div>
				<div class="circle4loading"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Loading',
		props: {
			show: Boolean
		},
		data() {
			return {}
		}
	}
</script>

<style media="screen" scoped lang="scss">
	@import "../../css/defines.scss";
	.loadingBox {
		position: fixed;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 100%;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.3);
	}

	.spinnerloading {
		width: 60px;
		height: 60px;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	.container1loading>div,
	.container2loading>div,
	.container3loading>div {
		width: 15px;
		height: 15px;
		/*background: linear-gradient(to right, #e8dec7, #d39c53);*/
		/*background: -webkit-linear-gradient(left, #e8dec7, #d39c53);*/
		background: $--color-primary;
		border-radius: 100%;
		position: absolute;
		-webkit-animation: bouncedelayloading 1.2s infinite ease-in-out;
		animation: bouncedelayloading 1.2s infinite ease-in-out;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.spinnerloading .spinner-containerloading {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.container2loading {
		-webkit-transform: rotateZ(45deg);
		transform: rotateZ(45deg)
	}

	.container3loading {
		-webkit-transform: rotateZ(90deg);
		transform: rotateZ(90deg);
	}

	.circle1loading {
		top: 0;
		left: 0;
	}

	.circle2loading {
		top: 0;
		right: 0;
	}

	.circle3loading {
		right: 0;
		bottom: 0;
	}

	.circle4loading {
		left: 0;
		bottom: 0;
	}

	.container2loading .circle1loading {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}

	.container3loading .circle1loading {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}

	.container1loading .circle2loading {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}

	.container2loading .circle2loading {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}

	.container3loading .circle2loading {
		-webkit-animation-delay: -0.7s;
		animation-delay: -0.7s;
	}

	.container1loading .circle3loading {
		-webkit-animation-delay: -0.6s;
		animation-delay: -0.6s;
	}

	.container2loading .circle3loading {
		-webkit-animation-delay: -0.5s;
		animation-delay: -0.5s;
	}

	.container3loading .circle3loading {
		-webkit-animation-delay: -0.4s;
		animation-delay: -0.4s;
	}

	.container1loading .circle4loading {
		-webkit-animation-delay: -0.3s;
		animation-delay: -0.3s;
	}

	.container2loading .circle4loading {
		-webkit-animation-delay: -0.2s;
		animation-delay: -0.2s;
	}

	.container3loading .circle4loading {
		-webkit-animation-delay: -0.1s;
		animation-delay: -0.1s;
	}

	@-webkit-keyframes bouncedelayloading {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0.0)
		}

		40% {
			-webkit-transform: scale(1.0)
		}
	}

	@keyframes bouncedelayloading {

		0%,
		80%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}

		40% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>
