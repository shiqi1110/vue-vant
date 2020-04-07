<template>
	<div>
		<div class="xian" id="line"></div>
		<div class="name">折线图</div>
		<div class="area" id="area"></div>
		<div class="name">面积图</div>
		<div class="bar" id="bar"></div>
		<div class="name">美图</div>
		<div class="candlestick" id="candlestick"></div>
		<div class="name">K线图</div>
		<div class="histogram" id="histogram"></div>
		<div class="name">直方图</div>
		<div class="hug" id="hug"></div>
		<div class="name">结合图</div>
		<home-footer></home-footer>
	</div>
</template>

<script>
import HomeFooter from '../../components/footer.vue';
import { createChart } from 'lightweight-charts';
export default {
	name: 'home',
	data() {
		return {
			title: 'K线图',
			color: '#666',
			screenWidth: 0,
		};
	},
	components: {
		HomeFooter,
		createChart
	},
	computed: {},
	mounted() {
		let that = this
		window.screenWidth = document.body.clientWidth
		that.screenWidth = window.screenWidth;
		that.getLine();
		that.getArea();
		that.getBar();
		that.getCandlestick()
		that.getHistogram();
		that.getHug();
	},
	activated() {},
	deactivated() {},
	methods: {
		getLine(){
			let that = this;
			const line = createChart(document.getElementById('line'), { width: that.screenWidth, height: 300 });
			const lineSeries = line.addLineSeries();
			lineSeries.setData([
			    { time: '2019-04-11', value: 80.01 },
			    { time: '2019-04-12', value: 96.63 },
			    { time: '2019-04-13', value: 76.64 },
			    { time: '2019-04-14', value: 81.89 },
			    { time: '2019-04-15', value: 74.43 },
			    { time: '2019-04-16', value: 80.01 },
			    { time: '2019-04-17', value: 96.63 },
			    { time: '2019-04-18', value: 76.64 },
			    { time: '2019-04-19', value: 81.89 },
			    { time: '2019-04-20', value: 74.43 },
			]);
		},
		getArea(){
			let that = this;
			const area = createChart(document.getElementById('area'), { width: that.screenWidth, height: 300 });
			const areaSeries = area.addAreaSeries();
			area.addAreaSeries({
			  topColor: "rgba(21, 146, 230, 0.4)",
			  bottomColor: "rgba(21, 146, 230, 0)",
			  lineColor: "rgba(21, 146, 230, 1)",
			  lineStyle: 0,
			  lineWidth: 3,
			  crosshairMarkerVisible: false,
			  crosshairMarkerRadius: 3
			});
			areaSeries.setData([
			  { time: "2018-12-22", value: 32.51 },
			  { time: "2018-12-23", value: 31.11 },
			  { time: "2018-12-24", value: 27.02 },
			  { time: "2018-12-25", value: 27.32 },
			  { time: "2018-12-26", value: 25.17 },
			  { time: "2018-12-27", value: 28.89 },
			  { time: "2018-12-28", value: 25.46 },
			  { time: "2018-12-29", value: 23.92 },
			  { time: "2018-12-30", value: 22.68 },
			  { time: "2018-12-31", value: 22.67 }
			]);
		},
		getBar(){
			let that = this;
			const bar = createChart(document.getElementById('bar'), { width: that.screenWidth, height: 300 });
			const barSeries = bar.addBarSeries({
			  thinBars: false
			});
			// 设置数据
			barSeries.setData([
			  {
			    time: "2018-12-19",
			    open: 141.77,
			    high: 170.39,
			    low: 120.25,
			    close: 145.72
			  },
			  {
			    time: "2018-12-20",
			    open: 145.72,
			    high: 147.99,
			    low: 100.11,
			    close: 108.19
			  },
			  { time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
			  { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
			  { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
			  { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
			  { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
			  { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
			  { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
			  {
			    time: "2018-12-28",
			    open: 111.51,
			    high: 142.83,
			    low: 103.34,
			    close: 131.25
			  },
			  { time: "2018-12-29", open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
			  { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
			  { time: "2018-12-31", open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
			]);
		},
		getCandlestick(){
			let that = this;
			const candlestick = createChart(document.getElementById('candlestick'), { width: that.screenWidth, height: 300 });
			const candlestickSeries = candlestick.addCandlestickSeries();
			// candlestick.subscribeCrosshairMove(handleCrosshairMoved);
			// function handleCrosshairMoved(param) {
			//   if (!param.point) {
			//     return;
			//   }
			// 
			//   console.log(
			//     `A user moved the crosshair to (${param.point.x}, ${
			//       param.point.y
			//     }) point, the time is ${param.time}`
			//   );
			// }
			// 设置数据
			candlestickSeries.setData([
			  { time: "2018-12-19", open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
			  { time: "2018-12-20", open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
			  { time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
			  { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
			  { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
			  { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
			  { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
			  { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
			  { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
			  { time: "2018-12-28", open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
			  { time: "2018-12-29", open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
			  { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
			  { time: "2018-12-31", open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
			]);
			
		},
		getHistogram(){
			let that = this;
			const histogram = createChart(document.getElementById('histogram'), { width: that.screenWidth, height: 300 });
			const histogramSeries = histogram.addHistogramSeries({
			  base: 0
			});
			histogram.addHistogramSeries({
			  color: "#FFF5EE",
			  base: 5
			});
			
			// 设置数据
			histogramSeries.setData([
			  { time: "2018-12-20", value: 20.31, color: "#ff00ff" },
			  { time: "2018-12-21", value: 30.27, color: "#ff00ff" },
			  { time: "2018-12-22", value: 70.28, color: "#ff00ff" },
			  { time: "2018-12-23", value: 49.29, color: "#ff0000" },
			  { time: "2018-12-24", value: 40.64, color: "#ff0000" },
			  { time: "2018-12-25", value: 57.46, color: "#ff0000" },
			  { time: "2018-12-26", value: 50.55, color: "#0000ff" },
			  { time: "2018-12-27", value: 34.85, color: "#0000ff" },
			  { time: "2018-12-28", value: 56.68, color: "#0000ff" },
			  { time: "2018-12-29", value: 51.6, color: "#00ff00" },
			  { time: "2018-12-30", value: 75.33, color: "#00ff00" },
			  { time: "2018-12-31", value: 54.85, color: "#00ff00" }
			]);
			// histogramSeries.applyOptions({
			//   base: -10
			// });
		},
		getHug(){
			let that = this;
			const hug = createChart(document.getElementById('hug'), { width: that.screenWidth, height: 300 });
			//  折线图
			const candlestickSeries = hug.addCandlestickSeries(); 
			candlestickSeries.setData([
			  { time: "2018-12-19", open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
			  { time: "2018-12-20", open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
			  { time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
			  { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
			]);
			
			// 直方图
			const histogramSeries = hug.addHistogramSeries({
			  base: 0
			});
			// hug.addHistogramSeries({
			//   color: "#FFF5EE",
			//   base: 5
			// });
			
			// 设置数据
			histogramSeries.setData([
			  { time: "2018-12-20", value: 20.31, color: "#ff00ff" },
			  { time: "2018-12-21", value: 30.27, color: "#ff00ff" },
			  { time: "2018-12-22", value: 40.28 }
			]);
		},
	}
};
</script>

<style lang="scss" scoped>
	.xian{
		padding-top: 20px;
	}
	.area,.bar,.candlestick,.histogram,.hug{
		margin-top: 30px;
	}
	.name{
		text-align: center;
		font-size: 30px;
		padding: 30px 0;
		text-align: center;
	}
</style>
