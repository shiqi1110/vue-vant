import Vue from 'vue'
import loadingComponent from './loading.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
	el: document.createElement('div')
})

instance.show = false; // 默认隐藏
const showLoading = {
	show() { // 显示方法
		instance.show = true;
		document.body.appendChild(instance.$el)
	},
	hide() { // 隐藏方法
		instance.show = false;
	}
}
if (!Vue.prototype.showLoading) {
	Vue.prototype.showLoading = showLoading
}
Vue.mixin({
	created() {
		this.showLoading = Vue.prototype.showLoading
	}
})

// export default {
// 	install() {
// 		if (!Vue.prototype.loading) {
// 			Vue.prototype.loading = loading
// 		}
// 		Vue.mixin({
// 			created() {
// 				this.loading = Vue.prototype.loading
// 			}
// 		})
// 	}
// }
