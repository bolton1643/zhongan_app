import Vue from 'vue'
import App from './App'
import store from './store'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import indexgroup from './pages/indexgroup/home.vue'
Vue.component('indexgroup',indexgroup)

import messagelist from './pages/message/messagelist.vue'
Vue.component('messagelist',messagelist)

import messagehome from './pages/manage/home.vue'
Vue.component('messagehome',messagehome)

import my from './pages/my/my.vue'
Vue.component('my',my)

Vue.prototype.$store = store


import api from './api/user.js'
import request from './common/httpRequest.js'
// import websocket from './common/websocketStore.js'
Vue.prototype.$request = request
Vue.prototype.$api = api


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



