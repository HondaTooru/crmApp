import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index')
const Login = () => import('@/page/login')
const AppHome = () => import('@/page/home/apphome')
const MyWork = () => import('@/page/mywork/mywork')
const Clue = () => import('@/page/clue/clue')
const AddClue = () => import('@/page/clue/clueAdd')
const ClueEdit = () => import('@/page/clue/cluedit')
const ClueInfo = () => import('@/page/clue/clueinfo')
const TaskList = () => import('@/page/clue/task')
const AllRevisit = () => import('@/page/clue/allrevisit')
const WriteClue = () => import('@/page/clue/writeclue')

const SettingList = () => import('@/page/setting/settingList')
const SettingView = () => import('@/page/setting/settingView')
const ViewList = () => import('@/page/setting/viewList')
const Contract = () => import('@/page/contract/contract')
const AddContract = () => import('@/page/contract/contractAdd')
const Customer = () => import('@/page/customer/customer')
const AddCustomer = () => import('@/page/customer/customerAdd')

const Product = () => import('@/page/product/product')
const ProductAdd = () => import('@/page/product/productAdd')
const Contact = () => import('@/page/contact/contact')
const AddContact = () => import('@/page/contact/contactAdd')

const Opportunities = () => import('@/page/opportunities/opportunities')
const OpportunitiesAdd = () => import('@/page/opportunities/opportunitiesAdd')
const Payment = () => import('@/page/payment/payment')
const Received = () => import('@/page/payment/Received')
const PaymentRecord = () => import('@/page/payment/paymentRecord')
const PaymentMark = () => import('@/page/payment/paymentMark')
const ContractList = () => import('@/page/contractlist/contractlist')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        { path: '', component: AppHome, meta: { title: '首页' } },
        { path: 'mywork', component: MyWork, meta: { title: '工作' } },
        { path: 'settinglist', name: 'settinglist', component: SettingList, meta: { title: '设置' } },
        { path: 'settingview', name: 'settingview', component: SettingView, meta: { title: '功能设置' } },
        { path: 'clue', name: 'clue', component: Clue },
        { path: 'clueinfo/:id', name: 'clueinfo', component: ClueInfo, meta: { title: '线索详情' } },
        { path: 'clueAdd', name: 'clueAdd', component: AddClue, meta: { title: '新增线索' } },
        { path: 'cluedit/:id', name: 'cluedit', component: ClueEdit, meta: { title: '线索详情' } },
        { path: 'task/:id', name: 'task', component: TaskList, meta: { title: '任务列表' } },
        { path: 'allrevisit/:id', name: 'allrevisit', component: AllRevisit, meta: { title: '跟进记录' } },
        { path: 'viewlist', name: 'viewlist', component: ViewList, meta: { title: '功能设置' } },
        { path: 'contract', name: 'contract', component: Contract },
        { path: 'contractAdd', name: 'contractAdd', component: AddContract, meta: { title: '新增合同' } },
        { path: 'customer', name: 'customer', component: Customer },
        { path: 'customerAdd', name: 'customerAdd', component: AddCustomer, meta: { title: '新增客户' } },
        { path: 'writeclue/:id', name: 'writeclue', component: WriteClue, meta: { title: '新增线索跟进' } },

        { path: 'product', name: 'product', component: Product, meta: { title: '产品列表' } },
        { path: 'productAdd', name: 'productAdd', component: ProductAdd, meta: { title: '新增产品' } },
        { path: 'contact', name: 'contact', component: Contact },
        { path: 'contactAdd', name: 'contactAdd', component: AddContact, meta: { title: '新增联系人' } },

        { path: 'opportunity', name: 'opportunity', component: Opportunities, meta: { title: '商机' } },
        { path: 'opportunityAdd', name: 'opportunityAdd', component: OpportunitiesAdd, meta: { title: '新增商机' } },
        { path: 'payment', name: 'payment', component: Payment },
        { path: 'received', name: 'received', component: Received, meta: { title: '新增回款计划' } },
        { path: 'paymentRecord', name: 'paymentRecord', component: PaymentRecord, meta: { title: '新增回款记录' } },
        { path: 'paymentMark', name: 'paymentMark', component: PaymentMark, meta: { title: '新增开票记录' } },
        { path: 'contract_list', name: 'contract_list', component: ContractList, meta: { title: '合同清单' } }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
