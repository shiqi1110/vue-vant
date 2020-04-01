const actions = {

	//设置当前导航索引
	setIndex({
		commit
	}, data) {
		commit('SET_INDEX', data)
	},

	//设置当前标题
	setTitle({
		commit
	}, data) {
		commit('SET_TITLE', data)
	},

	//设置颜色
	setColor({
		commit
	}, data) {
		commit('SET_COLOR', data)
	},

}

export default actions
