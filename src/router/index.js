import Vue from 'vue'
import Router from 'vue-router'
const AppHome = () => import('@/page/home/AppHome')
const MyWork = () => import('@/page/mywork/mywork')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: AppHome
    },
    {
      path: '/mywork',
      component: MyWork,
      props: {appSetting: false}
    }
  ]
})
