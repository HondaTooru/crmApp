import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/page/home/apphome'
// import MyWork from '@/page/mywork/mywork'
const MyWork = () => import('@/page/mywork/mywork').then(m => m.default)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: AppHome
    },
    {
      path: '/mywork',
      component: MyWork
    }
  ]
})
