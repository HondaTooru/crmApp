// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import { TransferDom } from 'vux'
import 'font-awesome/css/font-awesome.css'
Vue.directive('transfer-dom', TransferDom)
Vue.use(Vuex)
FastClick.attach(document.body)

const store = new Vuex.Store({})
store.registerModule('app', {
  state: { isLoading: false },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  render: h => h(App)
})
