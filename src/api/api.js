import Vue from 'vue'
import qs from 'qs'

export const USER_KEY = 'crm_user_data'
const formatData = { transformRequest: data => qs.stringify(data) }
const urls = '/crm/api/all_customer_type'
const prems = [ {name: 'customer_status'}, {name: 'customer_source'}, {name: 'industry'}, {name: 'customer_type'}, {name: 'size'} ]
const USER = JSON.parse(localStorage.getItem('crm_user_data')) || ''
const USERID = { customer_id: USER.customer_id, uid: USER.id }

const mRequest = parmas => { return Vue.http.post(urls, Object.assign({}, USERID, parmas)).then(res => res.data) }

export const ERR_OK = 1
export const CustomerApi = () => { return Vue.http.all(prems.map(mRequest)).then(Vue.http.spread((q, w, e, r, y) => [q, w, e, r, y])) }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', params, formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', params, formatData).then(res => res.data) }
export const AddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/add', params, formatData).then(res => res.data) }
export const SaveAddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/save_add', params, formatData).then(res => res.data) }

const AllStatusApi = () => { return Vue.http.post('/crm/api/all_status', USERID, formatData).then(res => res.data) }
const AllSourceApi = () => { return Vue.http.post('/crm/api/all_source', USERID, formatData).then(res => res.data) }
const AllAdminApi = () => { return Vue.http.post('/crm/api/all_admin', USERID, formatData).then(res => res.data) }
const AllDepartmentApi = () => { return Vue.http.post('/crm/api/all_department', USERID, formatData).then(res => res.data) }
export const AllClueAddAPi = () => { return Vue.http.all([AllStatusApi(), AllSourceApi(), AllAdminApi(), AllDepartmentApi()]).then(Vue.http.spread((s, e, c, m) => [s, e, c, m])) }

export const SearchApi = parmas => { return Vue.http.post('/crm/Api_2/search_filed', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SlideApi = parmas => { return Vue.http.post('/crm/dashboard/taglist', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const MenuApi = parmas => { return Vue.http.post('/crm/api/menu', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const SavesearchAPi = parmas => { return Vue.http.post('/crm/Api_2/save_own_search_field', Object.assign({}, USERID, parmas)).then(res => res.data) }
export const ChooseListApi = name => { return Vue.http.post('/crm/' + name + '/table_field', USERID).then(res => res.data) }
