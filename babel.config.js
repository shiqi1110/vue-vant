module.exports = {
	presets: [
		'@vue/app'
	],
	plugins: [
		// '@babel/plugin-syntax-dynamic-import',
		// //'@babel/plugin-transform-runtime', //用了useBuiltIns不需要它
		// ['@babel/plugin-proposal-class-properties', {
		// 	loose: true
		// }],
		// '@vue/babel-plugin-transform-vue-jsx',
		[
			'babel-plugin-component',
			{
				libraryName: 'element-ui',
				styleLibraryName: '~node_modules/element-theme-chalk/src',
				ext: '.scss'
			}
		]
	]
}
