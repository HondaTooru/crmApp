import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index')
const Login = () => import('@/page/login')
const AppHome = () => import('@/page/home/apphome')
const MyWork = () => import('@/page/mywork/mywork')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      // redirect: 'apphome',
      children: [
        { path: '', component: AppHome },
        { path: 'mywork', component: MyWork }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
