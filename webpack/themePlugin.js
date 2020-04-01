const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const config = require('../src/config/appConfig')
module.exports = new ThemeColorReplacer({
    fileName: 'css/theme-colors.[contenthash:8].css',
    matchColors: [
        ...forElementUI.getElementUISeries(config.themeColor),  //element-ui主色系列
        // '#0cdd3a',  //自定义颜色
    ],
    changeSelector: forElementUI.changeSelector,
    isJsUgly:  process.env.NODE_ENV !== 'development',
    // injectCss: false,
    // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
    //     return resultCss + youCssCode
    // }
})