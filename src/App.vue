<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.flex{
	display: flex;
}
.flex-item{
	flex: 1;
}
.flex-align-center{
	align-items: center;
}
.flex-justify-center{
	justify-content: center;
}
</style>
