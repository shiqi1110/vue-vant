import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			component: () => import( /* webpackChunkName: "home" */ './views/home.vue'),
			name: 'home',
			meta: {
			    title: "首页",
			}
		},
		{
			path: '/login',
			component: () => import('./views/Login.vue'),
			name: 'login',
			meta: {
			    title: "登陆",
			}
		},
		{
			path: '/404',
			component: () => import('./views/404.vue'),
			name: '404',
			meta: {
			    title: "404",
			}
		},
		{
			path: '/news',
			component: () => import( './views/news/news.vue'),
			name: 'news',
			meta: {
			    title: "新闻列表",
			}
		},
		{
			path: '/newsDetails',
			component: () => import( './views/news/newsDetails.vue'),
			name: 'newsDetails',
			meta: {
			    title: "新闻详情",
			}
		},
		{
			path: '/my',
			component: () => import('./views/my/my.vue'),
			name: 'my',
			meta: {
			    title: "我的",
			}
		},
		{
			path: '/lightweight',
			component: () => import('./views/lightweight/lightweight.vue'),
			name: 'lightweight',
			meta: {
			    title: "K线图",
			}
		},
		{
			path: '/wavesurfer',
			component: () => import('./views/my/wavesurfer.vue'),
			name: 'wavesurfer',
			meta: {
			    title: "wavesurfer",
			}
		},
		{
			path: '/indexBar',
			component: () => import('./views/my/indexBar.vue'),
			name: 'indexBar',
			meta: {
			    title: "索引",
			}
		},
		{
			path: '/drawer',
			component: () => import('./views/my/drawer.vue'),
			name: 'drawer',
			meta: {
			    title: "抽屉",
			}
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});