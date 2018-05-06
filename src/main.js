 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './test'
import Vuex from 'vuex'
import router from './router'
import { sync } from 'vuex-router-sync'
import { TransferDom, AjaxPlugin, CloseDialogsPlugin, AlertPlugin, LoadingPlugin, BusPlugin, ToastPlugin, Group, Cell } from 'vux'
import 'font-awesome/css/font-awesome.css'
Vue.directive('transfer-dom', TransferDom)
Vue.use(Vuex)

FastClick.attach(document.body)
// no transitoin in demo site
const shouldUseTransition = !/transition=none/.test(location.href)
const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    isLoading: false,
    gobalSett: false,
    direction: shouldUseTransition ? 'forward' : ''
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateGobalSett (state, payload) {
      state.gobalSett = payload.gobalSett
    },
    updateDirection (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

// plugin
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(ToastPlugin, {type: 'text', position: 'top'})
Vue.component('group', Group)
Vue.component('Cell', Cell)

// axios 参数转换
Vue.prototype.$http.defaults.baseURL = 'http://admin.sinlu.net'
// Vue.prototype.$http.defaults.transformRequest = [data => qs.stringify(data)]
// Vue.prototype.$http.interceptors.request.use(config => {})
Vue.prototype.$http.interceptors.request.use(config => {
  store.commit('updateLoadingStatus', {isLoading: true})
  return config
}, error => {
  store.commit('updateLoadingStatus', {isLoading: false})
  return Promise.reject(error)
})

Vue.prototype.$http.interceptors.response.use(response => {
  store.commit('updateLoadingStatus', {isLoading: false})
  return response
}, error => {
  store.commit('updateLoadingStatus', {isLoading: false})
  return Promise.reject(error)
})
Vue.use(CloseDialogsPlugin, router)
sync(store, router)
// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  if (!localStorage.getItem('crm_user_data') && to.path !== '/login') {
    next({name: 'login'})
    return
  }
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  store,
  render: h => h(App)
})
