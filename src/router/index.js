import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/index') // 首页
const Login = () => import('@/page/login') // 登录
const AppHome = () => import('@/page/home/apphome') // 首页
const NoticeShow = () => import('@/page/home/noticeshow') // 公告详情
const NoticeMore = () => import('@/page/home/noticemore') // 更多公告
const MyWork = () => import('@/page/mywork/mywork')  // 我的工作
const Clue = () => import('@/page/clue/clue')  //  线索列表
const AddClue = () => import('@/page/clue/clueAdd')  //  新增线索
const ClueEdit = () => import('@/page/clue/cluedit')  //  线索编辑
const ClueInfo = () => import('@/page/clue/clueinfo') // 线索详情
const TaskList = () => import('@/page/common/task') //  任务列表
const AllRevisit = () => import('@/page/common/allrevisit') //  跟进记录
const WriteClue = () => import('@/page/clue/writeclue') //  撰写线索跟进记录
const Transfer = () => import('@/page/common/transfer') //  线索转成客户
const ClueTransferc = () => import('@/page/clue/transformc')  //  线索转移给他人
const Log = () => import('@/page/common/log')  // 操作日志
const ClueattchMent = () => import('@/page/clue/clueattchment') // 附件
const Checks = () => import('@/page/clue/checks')  // 查重

const Notifications = () => import('@/page/panel/notifications') // 通知
const Center = () => import('@/page/panel/setinfos') // 个人信息
const UpdatePass = () => import('@/page/panel/updatepass') // 修改密码

const SettingList = () => import('@/page/setting/settingList')
const SettingView = () => import('@/page/setting/settingView')
const ViewList = () => import('@/page/setting/viewList')
const Contract = () => import('@/page/contract/contract') // 合同列表
const ContractInfo = () => import('@/page/contract/contractinfo') // 合同详情
const AddContract = () => import('@/page/contract/contractAdd') // 合同商机
const WriteContract = () => import('@/page/contract/writecontract') // 撰写合同跟进
const ContractAudited = () => import('@/page/contract/audited')  // 合同编辑
const Plan = () => import('@/page/contract/plan')  // 回款计划~
const ListInfo = () => import('@/page/contractlist/listinfo')  // 合同清单详细信息

const Customer = () => import('@/page/customer/customer')  //  客户列表
const AddCustomer = () => import('@/page/customer/customerAdd') //  新增客户
const CustomerAudited = () => import('@/page/customer/audited')  // 客户编辑
const CustomerInfo = () => import('@/page/customer/customerinfo')  // 客户详情

const Common = () => import('@/page/customer/common') // 公海列表
const CustomerCommon = () => import('@/page/common/common')  // 公海
const Mark = () => import('@/page/mywork/mark')  // 跟新记录
const WriteCustomer = () => import('@/page/customer/writecustomer') // 撰写线索跟进

const Product = () => import('@/page/product/product') // 产品列表
const ProductAdd = () => import('@/page/product/productAdd')  // 添加产品
const ProductInfo = () => import('@/page/product/productinfo') // 产品详情

const Contact = () => import('@/page/contact/contact') // 联系人列表
const ContactAbout = () => import('@/page/contact/contactabout') // 联系人相关联系
const AddContact = () => import('@/page/contact/contactAdd')  // 添加联系人
const ContactInfo = () => import('@/page/contact/contactinfo')  // 编辑联系人
const ContactOppo = () => import('@/page/contact/contactoppo') // 联系人商机

const OppoAddContact = () => import('@/page/opportunities/addcontact') // 商机增加联系人
const Opportunities = () => import('@/page/opportunities/opportunities') // 商机列表
const OpportunitiesAdd = () => import('@/page/opportunities/opportunitiesAdd') // 增加商机
const OpportunitiesInfo = () => import('@/page/opportunities/opportunitiesinfo') // 商机详情
const OpportunitiesEdit = () => import('@/page/opportunities/opportunitiesedit') // 商机编辑
const WriteOpportunities = () => import('@/page/opportunities/writeopportunities') // 撰写商机跟进
const Oppoc = () => import('@/page/opportunities/oppoc')  // 转成合同

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
        { path: 'log/:name/:id', name: 'log', component: Log, meta: { title: '操作日志' } },

        { path: 'transfer/:type', name: 'transfer', component: Transfer, meta: { title: '转移线索' } },
        { path: 'clueattchment/:id', name: 'clueattchment', component: ClueattchMent, meta: { title: '附件' } },
        { path: 'transformc', name: 'transformc', component: ClueTransferc, meta: { title: '转成客户' } },
        { path: 'task/:id/:type', name: 'task', component: TaskList, meta: { title: '任务列表' } },
        { path: 'allrevisit/:id/:type', name: 'allrevisit', component: AllRevisit, meta: { title: '跟进记录' } },

        { path: 'viewlist', name: 'viewlist', component: ViewList, meta: { title: '功能设置' } },
        { path: 'contract', name: 'contract', component: Contract },
        { path: 'contractAdd', name: 'contractAdd', component: AddContract, meta: { title: '新增合同' } },
        { path: 'customer', name: 'customer', component: Customer },
        { path: 'customerinfo/:id', name: 'customerinfo', component: CustomerInfo, meta: { title: '客户详情' } },
        { path: 'customerAdd', name: 'customerAdd', component: AddCustomer, meta: { title: '新增客户' } },
        { path: 'common', name: 'common', component: Common, meta: { title: '转移至公海' } },
        { path: 'customeraudited/:id', name: 'customeraudited', component: CustomerAudited, meta: { title: '客户详情' } },
        { path: 'contractinfo/:id', name: 'contractinfo', component: ContractInfo, meta: { title: '合同详情' } },
        { path: 'contractaudited/:id', name: 'contractaudited', component: ContractAudited, meta: { title: '合同详情' } },
        { path: 'writecontract/:id', name: 'writecontract', component: WriteContract, meta: { title: '新增合同跟进' } },
        { path: 'plan', name: 'plan', component: Plan, meta: { title: '回款计划' } },
        { path: 'customercommon', name: 'customercommon', component: CustomerCommon, meta: { title: '公海' } },

        { path: 'writeclue/:id', name: 'writeclue', component: WriteClue, meta: { title: '新增线索跟进' } },
        { path: 'writecustomer/:id', name: 'writecustomer', component: WriteCustomer, meta: { title: '新增客户跟进' } },
        { path: 'checks/:type', name: 'checks', component: Checks, meta: { title: '查重信息' } },
        { path: 'center', name: 'center', component: Center, meta: { title: '个人信息' } },
        { path: 'notifications', name: 'notifications', component: Notifications, meta: { title: '通知中心' } },
        { path: 'noticeshow/:id', name: 'noticeshow', component: NoticeShow, meta: { title: '公告详情' } },
        { path: 'noticemore', name: 'noticemore', component: NoticeMore, meta: { title: '公告列表' } },
        { path: 'updatepass', name: 'updatepass', component: UpdatePass, meta: { title: '修改密码' } },
        { path: 'product', name: 'product', component: Product, meta: { title: '产品列表' } },
        { path: 'productAdd', name: 'productAdd', component: ProductAdd, meta: { title: '新增产品' } },
        { path: 'productinfo/:id', name: 'productinfo', component: ProductInfo, meta: { title: '产品详情' } },

        { path: 'contact', name: 'contact', component: Contact },
        { path: 'contactAdd', name: 'contactAdd', component: AddContact, meta: { title: '新增联系人' } },
        { path: 'contactabout/:id', name: 'contactabout', component: ContactAbout, meta: { title: '相关联系' } },
        { path: 'contactinfo/:id', name: 'contactinfo', component: ContactInfo, meta: { title: '联系人详情' } },
        { path: 'contactoppo/:id', name: 'contactoppo', component: ContactOppo, meta: { title: '商机' } },
        { path: 'mark', name: 'mark', component: Mark, meta: { title: '跟进记录' } },

        { path: 'opportunity', name: 'opportunity', component: Opportunities, meta: { title: '商机' } },
        { path: 'oppoc/:id', name: 'oppoc', component: Oppoc, meta: { title: '转成合同' } },
        { path: 'opportunityAdd', name: 'opportunityAdd', component: OpportunitiesAdd, meta: { title: '新增商机' } },
        { path: 'opportunitiesinfo/:id', name: 'opportunitiesinfo', component: OpportunitiesInfo, meta: { title: '商机详情' } },
        { path: 'opportunitiesedit/:id', name: 'opportunitiesedit', component: OpportunitiesEdit, meta: { title: '商机详情' } },
        { path: 'oppoaddcontact/:id', name: 'oppoaddcontact', component: OppoAddContact, meta: { title: '添加联系' } },
        { path: 'writeopportunities/:id', name: 'writeopportunities', component: WriteOpportunities, meta: { title: '新增商机跟进' } },

        { path: 'payment', name: 'payment', component: Payment },
        { path: 'received', name: 'received', component: Received, meta: { title: '新增回款计划' } },
        { path: 'paymentRecord', name: 'paymentRecord', component: PaymentRecord, meta: { title: '新增回款记录' } },
        { path: 'paymentMark', name: 'paymentMark', component: PaymentMark, meta: { title: '新增开票记录' } },
        { path: 'contract_list', name: 'contract_list', component: ContractList, meta: { title: '合同清单' } },
        { path: 'listinfo/:id', name: 'listinfo', component: ListInfo, meta: { title: '合同清单详情' } }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
