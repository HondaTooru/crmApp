import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import AppHome from '@/page/home/apphome'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/index', name: 'index', component: AppHome }
      ],
      redirect: '/index'
    }
  ]
})
