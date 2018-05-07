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

const mRequest = parmas => { return Vue.http.post(urls, Object.assign({}, USERID, parmas)).then(res => res.data) }
const opRequest = parmas => { return Vue.http.post(oppo, Object.assign({}, USERID, parmas)).then(res => res.data) }
export const ERR_OK = 1
export const oppoApi = () => { return Vue.http.all(oparmas.map(opRequest)).then(Vue.http.spread((q, w, e) => [q, w, e])) }
export const CustomerApi = () => { return Vue.http.all(prems.map(mRequest)).then(Vue.http.spread((q, w, e, r, y) => [q, w, e, r, y])) }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', Object.assign({}, USERID, params), formatData).then(res => res.data) }
export const AddApi = name => { return Vue.http.post('/crm/' + name + '/add', USERID, formatData).then(res => res.data) }
export const SaveAddApi = (parmas, name, o) => { return Vue.http.post('/crm/' + name + '/' + o, Object.assign({}, USERID, parmas), formatData).then(res => res.data) }
const AllStatusApi = () => { return Vue.http.post('/crm/api/all_status', USERID, formatData).then(res => res.data) }
const AllSourceApi = () => { return Vue.http.post('/crm/api/all_source', USERID, formatData).then(res => res.data) }
export const AllDepartmentApi = () => { return Vue.http.post('/crm/api/all_department', USERID, formatData).then(res => res.data) }
export const AllAdminApi = () => { return Vue.http.post('/crm/api/all_admin', USERID, formatData).then(res => res.data) }
export const AllClueAddAPi = () => { return Vue.http.all([AllStatusApi(), AllSourceApi(), AllAdminApi(), AllDepartmentApi()]).then(Vue.http.spread((s, e, c, m) => [s, e, c, m])) }
export const AllCustomer = parmas => { return Vue.http.post('/crm/api/all_customer', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SearchApi = parmas => { return Vue.http.post('/crm/Api_2/search_filed', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SlideApi = parmas => { return Vue.http.post('/crm/dashboard/taglist', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const MenuApi = parmas => { return Vue.http.post('/crm/api/menu', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SavesearchAPi = parmas => { return Vue.http.post('/crm/Api_2/save_own_search_field', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const ChooseListApi = name => { return Vue.http.post('/crm/' + name + '/table_field', USERID).then(res => res.data) }
export const PayWayApi = params => { return Vue.http.post('/crm/api/all_pay_way', Object.assign({}, USERID, params)).then(res => res.data) }
export const ContractTypeApi = () => { return Vue.http.post('/crm/api/all_contract_type', Object.assign({}, USERID)).then(res => res.data) }
export const ContractStatus = () => { return Vue.http.post('/crm/api/all_contract_status', Object.assign({}, USERID)).then(res => res.data) }
