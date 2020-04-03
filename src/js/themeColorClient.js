import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
import appConfig from '../config/appConfig.js'
// export let curColor = appConfig.themeColor

// // 动态切换主题色
// export function changeThemeColor(newColor) {
//     var options = {
//         newColors: [...forElementUI.getElementUISeries(newColor)],
//     }
//     return client.changer.changeColor(options, Promise)
//         .then(() => {
//             curColor = newColor
//             localStorage.setItem('theme_color', curColor)
//         });
// }

// export function initThemeColor() {
//     const savedColor = localStorage.getItem('theme_color')
//     if (savedColor) {
//         curColor = savedColor
//         changeThemeColor(savedColor)
//     }
// }
export let curColor = appConfig.themeColor

// 动态切换主题色
export function changeThemeColor(newColor) {
    var options = {
        newColors: [...forElementUI.getElementUISeries(newColor), '#ff0000', '#ffff00'],
    }
    return client.changer.changeColor(options, Promise)
        .then(t => {
            console.log(curColor)
            curColor = newColor
            localStorage.setItem('theme_color', curColor)
        });
}

export function initThemeColor() {
    const savedColor = localStorage.getItem('theme_color')
    if (savedColor) {
        curColor = savedColor
        changeThemeColor(savedColor)
    }
}