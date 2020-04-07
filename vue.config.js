const themePlugin = require('./webpack/themePlugin');

module.exports = {
	publicPath: './',
	// baseUrl: './',
	outputDir: 'dist',
	assetsDir: 'static',
	productionSourceMap: false,
	chainWebpack: (config) => {
		config.module
			.rule('scss')
			.test(/\.scss$/)
			.oneOf('vue')
			.resourceQuery(/\?vue/)
			.use('px2rem')
			.loader('px2rem-loader')
			.before('postcss-loader') // this makes it work.
			.options({
				remUnit: 75
			})
	},
	css: {
	    loaderOptions: {
	        sass: {
	            prependData: `@import "./src/css/index.scss";`
	        }
	    },
		// postcss: {
		// 	plugins: [
		// 		require('postcss-plugin-px2rem')({
		// 			remValue: 75,
		// 			mediaQuery: true, //（布尔值）允许在媒体查询中转换px。
		// 			minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
		// 		})
		// 	]
		// }
	},
	configureWebpack: {
		plugins: [
			themePlugin
		]
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'https://www.jsanai.com/',
				ws: true,
				changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
				// cookiePathRewrite: { // 路径重写
				//   '/tb-customer-web_war': '/' // 替换target中的请求地址，也就是说以后你在请求地址的时候直接写成/api即可
				// },
				logLevel: 'debug',
				// pathRewrite: {
				// 	'^/api': function(path, req) {
				// 		return path.replace('/api', '')
				// 	}
				// }
			},
		}
	}
}
