let webUrl = '';
let protocolStr = document.location.protocol;
if (protocolStr == "http:") {
	webUrl = ''
} else if (protocolStr == "https:") {
	webUrl = ''
}
import request from './request'
import axios from 'axios'
export default {
	install: (Vue) => {
		let $this = Vue.prototype;
		let fnObj = {
			request,
			webUrl,
			configInfo: null,
			// 导航栏跳转
			toNavPage(name) {
				let housetype = '';
				if (name.indexOf('?') != -1) {
					housetype = name.split('?')[1].split('=')[1];
				}
				if (name !== this.$route.name && this.$route.query.housetype !== housetype) {
					this.$router.push({ path: '/' + name });
				}
			},
			//filters參數
			filters(obj) {
				let ret = 'filters=';
				for (let var1 in obj) {
					ret += var1 + ':' + obj[var1] + ';';
				}
				return ret
			},
			//检测页面是否登录·
			isLogin() {
				let tradeToken = sessionStorage.getItem('tradeToken')
				return new Promise((resolve, reject) => {
					if (!!tradeToken) {
						resolve()
					} else {
						return this.$router.replace({
							path: '/login'
						})
					}
				})

			},
			//登录
			login(name, password) {
				let params = {
					name,
					password
				}
				return new Promise((resolve, reject) => {
					request('userLogin', params, 'post').then((data) => {
						sessionStorage.setItem('tradeToken', data.data.token)
						resolve()
					}).catch(() => {
						!!reject && reject()
					})
				})

			},
			//上传图片
			uploadPublic(data) {
				return new Promise((resolve, reject) => {
					axios.post(this.baseUrl + '/uploadPublic', data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}).then(res => {
						resolve(res.data);
					}).catch(err => {
						!!reject && reject();
					});
				});
			},
			// 富文本图片处理
			detailContent(data) {
				let content = data;
				if(!!content){
					const regex = new RegExp('<img', 'gi');
					content = content.replace(regex, `<img style="max-width:100%;display:block;margin:0 auto;"`);
					return content
				}
			},
		}
		for (let key in fnObj) {
			$this[key] = fnObj[key]
		}
	},
}