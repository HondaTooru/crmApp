import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index')
const Login = () => import('@/page/login')
const AppHome = () => import('@/page/home/apphome')
const MyWork = () => import('@/page/mywork/mywork')
const Clue = () => import('@/page/clue/clue')
const ClueAdd = () => import('@/page/clue/clueAdd')

const SettingList = () => import('@/page/setting/settingList')
const SettingView = () => import('@/page/setting/settingView')
const ViewList = () => import('@/page/setting/viewList')
const Contract = () => import('@/page/contract/contract')
const Customer = () => import('@/page/customer/customer')
const Product = () => import('@/page/product/product')
const Contact = () => import('@/page/contact/contact')
const Opportunities = () => import('@/page/opportunities/opportunities')
const Payment = () => import('@/page/payment/payment')
const ContractList = () => import('@/page/contractlist/contractlist')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        { path: '', component: AppHome },
        { path: 'mywork', component: MyWork },
        { path: 'settinglist', name: 'settinglist', component: SettingList },
        { path: 'settingview', name: 'settingview', component: SettingView },
        { path: 'clue', name: 'clue', component: Clue },
        { path: 'clueAdd', name: 'clueAdd', component: ClueAdd },
        { path: 'viewlist', name: 'viewlist', component: ViewList },
        { path: 'contract', name: 'contract', component: Contract },
        { path: 'customer', name: 'customer', component: Customer },
        { path: 'product', name: 'product', component: Product },
        { path: 'contact', name: 'contact', component: Contact },
        { path: 'opportunity', name: 'opportunity', component: Opportunities },
        { path: 'payment', name: 'payment', component: Payment },
        { path: 'contract_list', name: 'contract_list', component: ContractList }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
