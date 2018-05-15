import Vue from 'vue'
import qs from 'qs'

export const USER_KEY = 'crm_user_data'
const formatData = { transformRequest: data => qs.stringify(data) }
const urls = '/crm/api/all_customer_type'
const oppo = '/crm/api/all_oppo'
const prems = [ {name: 'customer_status'}, {name: 'customer_source'}, {name: 'industry'}, {name: 'customer_type'} ]
const oparmas = [ {stype: 'opportunity_source'}, {stype: 'sale_stage'}, {stype: 'opportunity_type'} ]
const USER = JSON.parse(localStorage.getItem('crm_user_data')) || ''
const USERID = { customer_id: USER.customer_id, uid: USER.id }

export const DetailApi = (pamras, name) => { return Vue.http.post('/crm/' + name + '/detail', Object.assign({}, USERID, pamras)).then(res => res.data) }
const mRequest = parmas => { return Vue.http.post(urls, Object.assign({}, USERID, parmas)).then(res => res.data) }
const opRequest = parmas => { return Vue.http.post(oppo, Object.assign({}, USERID, parmas)).then(res => res.data) }
export const ERR_OK = 1
export const oppoApi = () => { return Vue.http.all(oparmas.map(opRequest)).then(Vue.http.spread((q, w, e) => [q, w, e])) }
export const pContractApi = parmas => { return Vue.http.post('/crm/Payment/contract', Object.assign({}, USERID, parmas)).then(res => res.data) }
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
export const ClueTransfer = params => { return Vue.http.post('/crm/clue/remove', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const BeCustomer = (params, name) => { return Vue.http.post('/crm/clue/be_customer' + name, Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const ApprovalLog = params => { return Vue.http.post('/crm/api/write_approval_log', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const Approval = params => { return Vue.http.post('/crm/customer/approval', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const GetLog = (params, name) => { return Vue.http.post('/crm/' + name + '/log', Object.assign({}, USERID, params), formatData).then(res => res.data) }

export const PlanRecord = params => { return Vue.http.post('/crm/Payment/plan_record', Object.assign({}, USERID, params)).then(res => res.data) }
export const qishuApi = params => { return Vue.http.post('/crm/Payment/qishu', Object.assign({}, USERID, params)).then(res => res.data) }
export const AddqishuApi = params => { return Vue.http.post('/crm/Payment/add_plan_save', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const CustomerApi = () => { return Vue.http.all(prems.map(mRequest)).then(Vue.http.spread((q, w, e, r) => [q, w, e, r])) }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const AddApi = (name, acct) => { return Vue.http.post('/crm/' + name + '/add' + acct, USERID, formatData).then(res => res.data) }
export const SaveAddApi = (parmas, name, o) => { return Vue.http.post('/crm/' + name + '/' + o, Object.assign({}, USERID, parmas), formatData).then(res => res.data) }
export const AllStatusApi = () => { return Vue.http.post('/crm/api/all_status', USERID, formatData).then(res => res.data) }
export const AllVisitApi = () => { return Vue.http.post('/crm/api/all_visit', USERID, formatData).then(res => res.data) }
export const WhiteClueList = () => { return Vue.http.all([AllVisitApi(), AllStatusApi()]).then(Vue.http.spread((q, e) => [q, e])) }

const AllSourceApi = () => { return Vue.http.post('/crm/api/all_source', USERID, formatData).then(res => res.data) }
export const CludEdit = params => { return Vue.http.post('/crm/clue/edit', Object.assign({}, params, USERID)).then(res => res.data) }

export const AllDepartmentApi = () => { return Vue.http.post('/crm/api/all_department', USERID, formatData).then(res => res.data) }
export const AllAdminApi = () => { return Vue.http.post('/crm/api/all_admin', USERID, formatData).then(res => res.data) }
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
const ContractStatusApi = () => { return Vue.http.post('/crm/api/all_contract_status', Object.assign({}, USERID)).then(res => res.data) }
const Tickettype = () => { return Vue.http.post('/crm/api/all_ticket_type', Object.assign({}, USERID)).then(res => res.data) }
export const contactList = () => { return Vue.http.all([AllAdminApi(), AllCustomer()]).then(Vue.http.spread((r, e) => [r, e])) }
export const PaymentMark = () => { return Vue.http.all([AllAdminApi(), AllCustomer(), pContractApi(), Tickettype()]).then(Vue.http.spread((r, e, q, s) => [r, e, q, s])) }
export const AddTicket = parmas => { return Vue.http.post('/crm/payment/add_ticket', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const RevisitApi = params => { return Vue.http.post('/crm/revisit/index', Object.assign({}, USERID, params)).then(res => res.data) }

export const CListApi = () => { return Vue.http.all([PayWayApi(), ContractTypeApi(), ContractStatusApi(), AllCustomer(), AllAdminApi()]).then(Vue.http.spread((q, e, s, r, t) => [q, e, s, r, t])) }
