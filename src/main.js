// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { TransferDom } from 'vux'
import 'font-awesome/css/font-awesome.css'
Vue.directive('transfer-dom', TransferDom)
FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  render: h => h(App)
})
