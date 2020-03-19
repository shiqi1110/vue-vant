import state from './state'
// import * as type from './type.js'
import {
	Dialog
} from 'vant';
const mutations = {
	//水果数据
	SET_FRUIT(state, data) {
		state.fruitData = data;
		localStorage.setItem("fruitData", JSON.stringify(state.fruitData));
	},
	//购物车
	ADD_CARTS(state, data) {
		state.carts.push(data);
		localStorage.setItem("carts", JSON.stringify(state.carts));
	},
	//购物车删除
	shanchu: (state, index) => {
		Dialog.confirm({
			title: '确认删除',
			message: '您确认删除嘛？'
		}).then(() => {
			state.carts.splice(index, 1)
			localStorage.setItem("carts", JSON.stringify(state.carts));
		}).catch(() => {});
	},
	//订单
	SET_ORDERS(state, data) { //本次结算订单
		state.orders = data
		localStorage.setItem("orders", JSON.stringify(state.orders));
	},
	//获取全部订单
	GET_ORDERS(state, data) {
		state.ordersList.push(data);
		localStorage.setItem("ordersList", JSON.stringify(state.ordersList));
	},
	//当前操作订单
	SET_CURRENTORDER(state, data) {
		state.currentOrder = data
		localStorage.setItem("currentOrder", JSON.stringify(state.currentOrder));
	},

	//地址列表
	SET_ADDRESSLIST(state, data) {
		state.addressList = data;
		localStorage.setItem("addressList", JSON.stringify(state.addressList));
	},


	//设置当前地址
	DEFAULT_ADDRESS(state, data) {
		state.defaultAddress = data
		//先将地址列表的默认地址都设置为false
		state.addressList.forEach((item, index) => {
			item.is_default = false
		});
		var addressId = data.id;
		//再讲当前选中地址设置为true
		state.addressList.forEach((item, index) => {
			if (item.id === addressId) {
				item.is_default = true
			}
		});
		console.log(state.addressList);
		localStorage.setItem("addressList", JSON.stringify(state.addressList));
	},
	//新增时清空当前编辑地址，避免新增输入框里面有编辑地址时的内容
	EMPTY_ADDRESS(state) {
		state.addressEdit = {};
		localStorage.setItem("addressEdit", JSON.stringify(state.addressEdit));
	},
	//获取全部文章
	GET_ARTICLE(state, data) {
		state.articles = data
		localStorage.setItem("articles", JSON.stringify(state.articles));
	},

	//收藏文章
	SET_ARTICLE(state, data) {
		var collectId = data.id;
		if (data.isCollected) {
			state.articles.forEach((item) => {
				if (item.id === collectId) {
					item.isCollected = false
				}
			});
			state.articlesCollect.forEach((item, index) => {
				if (item.id === collectId) {
					state.articlesCollect.splice(index, 1);
				}
			})
		} else {
			state.articles.forEach((item) => {
				if (item.id === collectId) {
					item.isCollected = true
				}
			});
			state.articlesCollect.push(data);
		}
		localStorage.setItem("articles", JSON.stringify(state.articles));
		localStorage.setItem("articlesCollect", JSON.stringify(state.articlesCollect));
	},
	//点赞文章
	PRAISE_ARTICLE(state, data) {},
	//收藏商品
	COLLECT_GOODS(state, data) {
		var collectId = data.id;
		if (data.isCollected) {
			state.fruitData.forEach((item, index) => {
				if (item.id === collectId) {
					item.isCollected = false
				}
			})
			state.fruitData.forEach((item, index) => {
				if (item.id === collectId) {
					state.goodsCollect.splice(index, 1);
				}
			})
		} else {
			state.fruitData.forEach((item, index) => {
				if (item.id === collectId) {
					item.isCollected = true
				}
			});
			state.goodsCollect.push(data);
		}
		localStorage.setItem("goodsCollect", JSON.stringify(state.goodsCollect));
		localStorage.setItem("fruitData", JSON.stringify(state.fruitData));
	},
	//文章删除
	del: (state, index) => {
		MessageBox.confirm('确定取消收藏该文章么？').then(action => {
			state.article.splice(index, 1)
			localStorage.setItem("article", JSON.stringify(state.article));
		})
	},
	//商品删除
	cancel: (state, index) => {
		MessageBox.confirm('确定取消收藏该商品么？').then(action => {
			state.collections.splice(index, 1)
			localStorage.setItem("collections", JSON.stringify(state.collections));
		})
	},
	laji: (state, index) => {
		MessageBox.confirm('确定删除收货地址么？').then(action => {
			state.address.splice(index, 1)
			localStorage.setItem("address", JSON.stringify(state.address));
		})
	},
	//订单删除
	delOrders: (state, index) => {
		Dialog.confirm({
			title: '确认删除',
			message: '确定删除该订单么？'
		}).then(() => {
			state.ordersList.splice(index, 1)
			localStorage.setItem("ordersList", JSON.stringify(state.ordersList));
		}).catch(() => {});
	},

	//数量加
	add(state, index) {
		state.carts[index].value++
	},
	//数量减
	reduce(state, index) {
		state.carts[index].value == 1 ? state.carts[index].value = 1 : state.carts[index].value--
	},

	settlement: (state, data) => {
		state.carts = [];
		localStorage.setItem("carts", JSON.stringify(state.carts));
	},



	/*分界线*/

	//设置当前导航索引
	SET_INDEX(state, data) {
		state.nowIndex = data
		localStorage.setItem("nowIndex", JSON.stringify(state.nowIndex));
	},
	//设置当前标题
	SET_TITLE(state, data) {
		state.nowTitle = data
		localStorage.setItem("nowTitle", JSON.stringify(state.nowTitle));
	},
	//设置sessionId
	SET_SESSIONID(state, data) {
		state.sessionId = data
		localStorage.setItem("sessionId", JSON.stringify(state.sessionId));
	},
	//设置当前地址编辑对象
	SET_ADDRESSEDIT(state, data) {
		state.addressEdit = data
		localStorage.setItem("addressEdit", JSON.stringify(state.addressEdit));
	},
	//设置缓存记录
	SET_HISTORYRECORD(state, data) {
		state.historyRecord = data
		localStorage.setItem("historyRecord", JSON.stringify(state.historyRecord));
	},
	//设置qq缓存
	SET_QQMESSIGE(state, data) {
		state.QQMessige = data
		sessionStorage.setItem("QQMessige", JSON.stringify(state.QQMessige));
	},
	//设置第三方类型
	SET_THREETYPE(state, data) {
		state.threeType = data
		localStorage.setItem("threeType", JSON.stringify(state.threeType));
	},
	//设置购物车类型
	SET_CARTTYPE(state, data) {
		state.cartType = data
		localStorage.setItem("cartType", JSON.stringify(state.cartType));
	},
	//设置购物车数组id
	SET_CARTARR(state, data) {
		state.cartArr = data
		localStorage.setItem("cartArr", JSON.stringify(state.cartArr));
	},
	// 立即购买
	SET_BUYNOWDATA(state, data) {
		state.buyNowData = data
		localStorage.setItem("buyNowData", JSON.stringify(state.buyNowData));
	},
}

export default mutations