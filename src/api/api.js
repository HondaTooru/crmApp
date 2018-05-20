import Vue from 'vue'
import qs from 'qs'

export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
const formatData = { transformRequest: data => qs.stringify(data) }
const urls = '/crm/api/all_customer_type'
const oppo = '/crm/api/all_oppo'
const prems = [ {name: 'customer_status'}, {name: 'customer_source'}, {name: 'industry'}, {name: 'customer_type'} ]
const oparmas = [ {stype: 'opportunity_source'}, {stype: 'sale_stage'}, {stype: 'opportunity_type'} ]
export const USER = JSON.parse(localStorage.getItem(USER_KEY))
const USERID = { customer_id: USER.customer_id, uid: USER.id } // 用户ID

export const DetailApi = (pamras, name) => { return Vue.http.post('/crm/' + name + '/detail', Object.assign({}, USERID, pamras)).then(res => res.data) }
const mRequest = parmas => { return Vue.http.post(urls, Object.assign({}, USERID, parmas)).then(res => res.data) }
const opRequest = parmas => { return Vue.http.post(oppo, Object.assign({}, USERID, parmas)).then(res => res.data) }
export const oppoApi = () => { return Vue.http.all(oparmas.map(opRequest)).then(Vue.http.spread((q, w, e) => [q, w, e])) } // 获取商机全部状态
export const OppoStage = params => { return Vue.http.post(oppo, Object.assign({}, USERID, params)).then(res => res.data) }
export const pContractApi = parmas => { return Vue.http.post('/crm/Payment/contract', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const PaymentIndex = parmas => { return Vue.http.post('/crm/payment/index', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const Notice = parmas => { return Vue.http.post('/crm/dashboard/notice', Object.assign({}, USERID, parmas)).then(res => res.data) } // 公告栏
export const NoticeShow = parmas => { return Vue.http.post('/crm/dashboard/show', Object.assign({}, USERID, parmas)).then(res => res.data) } // 公告详情

export const SaleReport = params => { return Vue.http.post('/crm/dashboard/sale_report', Object.assign({}, USERID, params)).then(res => res.data) } // 销售简报
export const pContractInfoApi = params => { return Vue.http.post('/crm/Payment/contract_info', Object.assign({}, USERID, params)).then(res => res.data) }
export const TaskListApi = params => { return Vue.http.post('/crm/api/task', Object.assign({}, USERID, params)).then(res => res.data) }
export const TaskDone = params => { return Vue.http.post('/crm/api/task_done', Object.assign({}, USERID, params)).then(res => res.data) }
export const TaskAdd = params => { return Vue.http.post('/crm/api/task_add', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const EditSave = (params, name) => { return Vue.http.post('/crm/' + name + '/edit_save', Object.assign({}, USERID, params)).then(res => res.data) }
export const DelThis = (params, name) => { return Vue.http.post('/crm/' + name + '/del', Object.assign({}, USERID, params)).then(res => res.data) }
export const DelVisit = params => { return Vue.http.post('/crm/revisit/del_visit_record', Object.assign({}, USERID, params)).then(res => res.data) }
export const DelComment = params => { return Vue.http.post('/crm/revisit/del_comment', Object.assign({}, USERID, params)).then(res => res.data) }
export const SaveComment = params => { return Vue.http.post('/crm/revisit/save_comment', Object.assign({}, USERID, params)).then(res => res.data) }
export const WriteRecord = params => { return Vue.http.post('/crm/api/visit_record_write', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const TransferRemove = (params, name) => { return Vue.http.post('/crm/' + name + '/remove', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const BeCustomer = (params, name) => { return Vue.http.post('/crm/clue/be_customer' + name, Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const ApprovalLog = params => { return Vue.http.post('/crm/api/write_approval_log', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const Approval = (params, name) => { return Vue.http.post('/crm/' + name + '/approval', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const GetLog = (params, name) => { return Vue.http.post('/crm/' + name + '/log', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const CousterType = () => { return Vue.http.post(urls, Object.assign({}, USERID, prems[0])).then(res => res.data) }  // 客户状态
export const SingleEditSave = params => { return Vue.http.post('/crm/customer/single_edit_save', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const AllCommon = () => { return Vue.http.post('/crm/api/all_common', USERID).then(res => res.data) } // 公海列表
export const RemoveCommon = params => { return Vue.http.post('/crm/customer/remove_common', Object.assign({}, USERID, params)).then(res => res.data) } // 转移至公海
export const ChecksApi = params => { return Vue.http.post('/crm/api/search', Object.assign({}, USERID, params)).then(res => res.data) } // 查重
export const AllSearchField = params => { return Vue.http.post('/crm/api/all_search_field', Object.assign({}, USERID, params)).then(res => res.data) } // 获取查重字段信息
export const NotificationsRead = params => { return Vue.http.post('/crm/Notifications/tag_read', Object.assign({}, USERID, params)).then(res => res.data) } // 标记通知已读
export const Notifications = params => { return Vue.http.post('/crm/Notifications/index', Object.assign({}, USERID, params)).then(res => res.data) } // 获取通知列表
export const DelAllNotifications = () => { return Vue.http.post('/crm/Notifications/del_all', Object.assign({}, USERID)).then(res => res.data) } // 清除所有通知
export const MemberInfo = () => { return Vue.http.post('/crm/api/member_info', Object.assign({}, USERID)).then(res => res.data) } // 读取个人信息
export const SaveMemberInfo = params => { return Vue.http.post('/crm/api/save_member_info', Object.assign({}, USERID, params)).then(res => res.data) } // 读取个人信息
export const Upload = params => { return Vue.http.post('/crm/api/upload', Object.assign({}, USERID, params)).then(res => res.data) }  // 头像上传
export const UpdataPass = params => { return Vue.http.post('/crm/api/change_pwd', Object.assign({}, USERID, params)).then(res => res.data) }  // 修改密码
export const DelProduct = params => { return Vue.http.post('/crm/product/del_product', Object.assign({}, USERID, params), formatData).then(res => res.data) } // 删除产品
export const ListDetail = params => { return Vue.http.post('/crm/ContractList/contract_list_detail', Object.assign({}, USERID, params), formatData).then(res => res.data) } // 合同清单详细信息

export const PlanRecord = params => { return Vue.http.post('/crm/Payment/plan_record', Object.assign({}, USERID, params)).then(res => res.data) }
export const TicketRecord = params => { return Vue.http.post('/crm/Payment/ticket_record', Object.assign({}, USERID, params)).then(res => res.data) }
export const qishuApi = params => { return Vue.http.post('/crm/Payment/qishu', Object.assign({}, USERID, params)).then(res => res.data) }
export const AddqishuApi = params => { return Vue.http.post('/crm/Payment/add_plan_save', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const CustomerApi = () => { return Vue.http.all(prems.map(mRequest)).then(Vue.http.spread((q, w, e, r) => [q, w, e, r])) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const ContractListApi = (params, name) => { return Vue.http.post('/crm/' + name + '/contract_list', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const AddApi = (name, acct) => { return Vue.http.post('/crm/' + name + '/add' + acct, USERID, formatData).then(res => res.data) }
export const SaveAddApi = (parmas, name, o) => { return Vue.http.post('/crm/' + name + '/' + o, Object.assign({}, USERID, parmas), formatData).then(res => res.data) }
export const AllStatusApi = () => { return Vue.http.post('/crm/api/all_status', USERID, formatData).then(res => res.data) }
export const AllVisitApi = () => { return Vue.http.post('/crm/api/all_visit', USERID, formatData).then(res => res.data) }
export const CustomerCommon = parmas => { return Vue.http.post('/crm/CustomerCommon/index', Object.assign({}, USERID, parmas), formatData).then(res => res.data) }
export const ContactListApi = params => { return Vue.http.post('/crm/contact/contact_list', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const BeContact = params => { return Vue.http.post('/crm/opportunities/be_contract', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const BeContactSave = params => { return Vue.http.post('/crm/opportunities/be_contract_save', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const PlanRecordDetail = params => { return Vue.http.post('/crm/payment/plan_record_detail', Object.assign({}, USERID, params), formatData).then(res => res.data) }
// export const WhiteClueList = () => { return Vue.http.post([AllVisitApi(), AllStatusApi()]).then(Vue.http.spread((q, e) => [q, e])) }

const AllSourceApi = () => { return Vue.http.post('/crm/api/all_source', USERID, formatData).then(res => res.data) }
export const CludEdit = params => { return Vue.http.post('/crm/clue/edit', Object.assign({}, params, USERID), formatData).then(res => res.data) }
export const ContactOppo = params => { return Vue.http.post('/crm/contact/contact_oppo', Object.assign({}, params, USERID)).then(res => res.data) }
export const AllChooseContact = params => { return Vue.http.post('/crm/opportunities/all_choose_contact', Object.assign({}, params, USERID)).then(res => res.data) }
export const allContactRole = params => { return Vue.http.post('/crm/api/all_contact_role', Object.assign({}, params, USERID)).then(res => res.data) } //  联系人角色
export const SaveContact = params => { return Vue.http.post('/crm/opportunities/save_contact', Object.assign({}, params, USERID)).then(res => res.data) } // 添加联系人

export const AllDepartmentApi = () => { return Vue.http.post('/crm/api/all_department', USERID, formatData).then(res => res.data) }
export const Top3Api = params => { return Vue.http.post('/crm/dashboard/top3', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const AllAdminApi = () => { return Vue.http.post('/crm/api/all_admin', USERID, formatData).then(res => res.data) }
export const SalesList = params => { return Vue.http.post('/crm/Reports/sales_funnel_list', Object.assign({}, params, USERID), formatData).then(res => res.data) }
export const VisitList = params => { return Vue.http.post('/crm/Reports/visit_record_list', Object.assign({}, params, USERID), formatData).then(res => res.data) }
export const DepUser = params => { return Vue.http.post('/crm/Reports/dep_user', Object.assign({}, params, USERID), formatData).then(res => res.data) }
export const DelPayment = params => { return Vue.http.post('/crm/Payment/del_plan', Object.assign({}, params, USERID), formatData).then(res => res.data) } // 删除回款计划
export const PlanField = params => { return Vue.http.post('/crm/Payment/plan_table_field', Object.assign({}, params, USERID), formatData).then(res => res.data) } // 搜索字段名

export const AllClueAddAPi = () => { return Vue.http.all([AllStatusApi(), AllSourceApi(), AllAdminApi(), AllDepartmentApi()]).then(Vue.http.spread((s, e, c, m) => [s, e, c, m])) }
export const AllCustomer = parmas => { return Vue.http.post('/crm/api/all_customer', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SearchApi = parmas => { return Vue.http.post('/crm/Api_2/search_filed', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SlideApi = parmas => { return Vue.http.post('/crm/dashboard/taglist', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const MenuApi = parmas => { return Vue.http.post('/crm/api/menu', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SavesearchAPi = parmas => { return Vue.http.post('/crm/Api_2/save_own_search_field', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const ChooseListApi = name => { return Vue.http.post('/crm/' + name + '/table_field', USERID).then(res => res.data) }
const PayWayApi = parmas => { return Vue.http.post('/crm/api/all_pay_way', Object.assign({}, USERID, parmas)).then(res => res.data) }
const PayTypeApi = parmas => { return Vue.http.post('/crm/api/all_pay_type', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const payRecord = () => { return Vue.http.all([PayWayApi(), PayTypeApi(), AllAdminApi(), AllCustomer()]).then(Vue.http.spread((q, e, r, s) => [q, e, r, s])) }
export const addRecordApi = parmas => { return Vue.http.post('/crm/payment/add_plan_record', Object.assign({}, USERID, parmas)).then(res => res.data) }
const ContractTypeApi = () => { return Vue.http.post('/crm/api/all_contract_type', Object.assign({}, USERID)).then(res => res.data) }
export const ContractStatusApi = () => { return Vue.http.post('/crm/api/all_contract_status', Object.assign({}, USERID)).then(res => res.data) }
const Tickettype = () => { return Vue.http.post('/crm/api/all_ticket_type', Object.assign({}, USERID)).then(res => res.data) }
export const contactList = () => { return Vue.http.all([AllAdminApi(), AllCustomer()]).then(Vue.http.spread((r, e) => [r, e])) }
export const PaymentMark = () => { return Vue.http.all([AllAdminApi(), AllCustomer(), pContractApi(), Tickettype()]).then(Vue.http.spread((r, e, q, s) => [r, e, q, s])) }
export const AddTicket = parmas => { return Vue.http.post('/crm/payment/add_ticket', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const RevisitApi = params => { return Vue.http.post('/crm/revisit/index', Object.assign({}, USERID, params)).then(res => res.data) }
export const Pdetail = parmas => { return Vue.http.post('/crm/payment/plan_detail', Object.assign({}, USERID, parmas)).then(res => res.data) }

export const CListApi = () => { return Vue.http.all([PayWayApi(), ContractTypeApi(), ContractStatusApi(), AllCustomer(), AllAdminApi()]).then(Vue.http.spread((q, e, s, r, t) => [q, e, s, r, t])) }
