import Vue from 'vue'
import App from './App.vue'

import router from './router';
import 'lib-flexible/flexible';
import store from './vuex/index' //引入状态管理 store
import mixins from './js/mixins'
Vue.use(mixins);

import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import headerView from './components/header.vue'
Vue.component('header-view',headerView)

Vue.prototype.baseUrl =  '';

Vue.config.productionTip = false;
require('./css/index.scss');
// console.log(myColor,'888')
// 样式
// import "@element-theme/theme-changed.scss";
//导入element-theme-chalk的变量名
// import "../../node_modules/element-theme-chalk/src/mixins/mixins.scss";
import ElementUI from 'element-ui';
// import 'element-variables.scss';

import { initThemeColor,changeThemeColor } from './js/themeColorClient'
// Vue.use(changeThemeColor)
Vue.prototype.initThemeColor = initThemeColor;
Vue.prototype.changeThemeColor = changeThemeColor;

import 'vant/lib/index.css'
Vue.use(ElementUI);
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	    document.title = to.meta.title
	}
	let myColor = '';
	if(!!localStorage.getItem('theme_color')){
		myColor = localStorage.getItem('theme_color')
	}else{
		initThemeColor();
	}
	Vue.prototype.myCommomColor = myColor;
	// console.log(localStorage.getItem('theme_color'),myColor)
	if(to.name == 'home'){
		store.dispatch('setIndex', 0);
	}else if(to.name == 'news'){
		store.dispatch('setIndex', 1);
	}else if(to.name == 'lightweight'){
		store.dispatch('setIndex', 2);
	}else if(to.name == 'my'){
		store.dispatch('setIndex', 3);
	}
	
	window.scrollTo(0,0);
	next();
});


new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
