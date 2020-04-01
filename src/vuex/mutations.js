import state from './state'
// import * as type from './type.js'
import {
	Dialog
} from 'vant';
const mutations = {

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
	//设置颜色
	SET_COLOR(state, data) {
		state.nowColor = data
		localStorage.setItem("nowColor", JSON.stringify(state.nowColor));
	}
}

export default mutations