// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Vuex from 'vuex'
Vue.use(Vuex)

import App from './App'

Vue.use(ElementUI);

import Mint from 'mint-ui';
import '../node_modules/mint-ui/lib/style.css'
Vue.use(Mint);

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
Vue.prototype.$http = axios

// 复制粘贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import websocket from 'vue-native-websocket'
Vue.prototype.$websocket = websocket
// Vue.use(websocket, 'ws://192.168.0.121:3001', {
Vue.use(websocket, 'ws://47.113.113.117:3001', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3001, // (Number) how long to initially wait before attempting a new (1000)
  format: 'JSON'
})

import adminRouter from './router/admin.js'
import userRouter from './router/user.js'

// 默认为PC端(管理员)
var router = adminRouter

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MicroMessenger|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  router = userRouter
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
