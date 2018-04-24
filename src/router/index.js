import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index')
const Login = () => import('@/page/login')
const AppHome = () => import('@/page/home/apphome')
const MyWork = () => import('@/page/mywork/mywork')
const Clue = () => import('@/page/clue/clue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        { path: '', component: AppHome },
        { path: 'mywork', component: MyWork },
        { path: 'clue', name: 'clue', component: Clue }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
