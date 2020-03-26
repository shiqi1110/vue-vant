const state={
	nowIndex:localStorage.getItem("nowIndex")?JSON.parse(localStorage.getItem("nowIndex")):0,
	nowTitle:localStorage.getItem("nowTitle")?JSON.parse(localStorage.getItem("nowTitle")):'',
}

export default state