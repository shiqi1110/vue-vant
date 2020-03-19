'use strict';
import Vue from 'vue'
import axios from 'axios'
import * as qs from 'qs';
let apiUrl = ''
let protocolStr = document.location.protocol;
if(protocolStr == "http:"){
   apiUrl = ''
}else if(protocolStr == "https:"){
	apiUrl = ''
}
/**
 * 向外部暴漏一个函数 request
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求方法，默认为GET
 */
let $this = Vue.prototype, requestAmount = 0

const request = (url = '', data = {}, type = 'GET', postType) => {
	requestAmount++;
	// $this.loading.show()

	url = apiUrl + url
	let headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		// 'Accept-Language': $this.locale
	};
	let tradeToken = sessionStorage.getItem('tradeToken')
	if (postType == 'json') {
		headers['Content-Type'] = 'application/json;charset=utf-8';
	}
	if (postType === 'from') {
		headers['Content-Type'] = 'multipart/form-data';
	}
	if (!!tradeToken) {
		headers['Authorization'] = 'Bearer ' + tradeToken
	}
	// 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
	return new Promise((resolve, reject) => {
		// （利用axios）异步执行ajax请求
		let promise // 这个内部的promise用来保存axios的返回值(promise对象)
		if (type === 'GET') {
			// 准备 url query 参数数据
			let dataStr = '' // 数据拼接字符串，将data连接到url
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&'
			})
			if (dataStr !== '') {
				// 把最后的&去掉，拼成完整的url
				dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
				url = url + '?' + dataStr
			}
			promise = axios.get(url, {
				headers
			})
		} else if (postType == 'json') {
			promise = axios.post(url, data, {
				headers
			})
		} else if (type === 'put') {
			promise = axios.put(url, qs.stringify(data), {
				headers
			})
		} else {
			promise = axios.post(url, qs.stringify(data), {
				headers
			})
		}
		promise.then(response => {
			requestAmount--;
			if(requestAmount === 0){
				// $this.loading.hide()
			}
			// 成功回调
			if ((type === 'post' || type === 'POST' || type === 'put') && !!response.data.msg) {
				$this.toast(response.data.msg)
			}
			resolve(response.data)
		})
		.catch(error => {
			requestAmount--;
			if(requestAmount === 0){
				// $this.loading.hide()
			}

			if (error.response.data.msg) {
				$this.toast(error.response.data.msg)
			}
			if (error.response.status === 11) {

			}
			// 失败回调reject()
			!!reject && reject(error)
		})

	})
}

export default request
