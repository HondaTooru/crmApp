import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index')
const Login = () => import('@/page/login')
const AppHome = () => import('@/page/home/apphome')
const MyWork = () => import('@/page/mywork/mywork')
const Clue = () => import('@/page/clue/clue')
const SettingList = () => import('@/page/setting/settingList')
const SettingView = () => import('@/page/setting/settingView')
const ViewList = () => import('@/page/setting/viewList')
const Contract = () => import('@/page/contract/contract')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        { path: '', component: AppHome, meta: { keepAlive: true } },
        { path: 'mywork', component: MyWork, meta: { keepAlive: true } },
        { path: 'clue', name: 'clue', component: Clue },
        { path: 'settinglist', name: 'settinglist', component: SettingList },
        { path: 'settingview', name: 'settingview', component: SettingView },
        { path: 'viewlist', name: 'viewlist', component: ViewList },
        { path: 'contract', name: 'contract', component: Contract }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
