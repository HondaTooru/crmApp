import Vue from 'vue'
import qs from 'qs'

export const USER_KEY = 'crm_user_data'
const formatData = { transformRequest: data => qs.stringify(data) }
const urls = '/crm/api/all_customer_type'
const prems = [ {name: 'customer_status'}, {name: 'customer_source'}, {name: 'industry'}, {name: 'customer_type'}, {name: 'size'} ]
const USERID = { customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id, uid: JSON.parse(localStorage.getItem(USER_KEY)).id }
const mRequest = parmas => { return Vue.http.post(urls, Object.assign({}, USERID, parmas)).then(res => res.data) }

export const ERR_OK = 1
export const CustomerApi = () => { return Vue.http.all(prems.map(mRequest)).then(Vue.http.spread((q, w, e, r, y) => [q, w, e, r, y])) }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', params, formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', params, formatData).then(res => res.data) }
export const AddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/add', params, formatData).then(res => res.data) }
export const SaveAddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/save_add', params, formatData).then(res => res.data) }

const AllStatusApi = params => { return Vue.http.post('/crm/api/all_status', params, formatData).then(res => res.data) }
const AllSourceApi = params => { return Vue.http.post('/crm/api/all_source', params, formatData).then(res => res.data) }
const AllAdminApi = params => { return Vue.http.post('/crm/api/all_admin', params, formatData).then(res => res.data) }
const AllDepartmentApi = params => { return Vue.http.post('/crm/api/all_department', params, formatData).then(res => res.data) }

export const AllClueAddAPi = params => { return Vue.http.all([AllStatusApi(params), AllSourceApi(params), AllAdminApi(params), AllDepartmentApi(params)]).then(Vue.http.spread((s, e, c, m) => [s, e, c, m])) }
export const SearchApi = params => { return Vue.http.post('/crm/Api_2/search_filed', params).then(res => res.data) }
export const SlideApi = params => { return Vue.http.post('/crm/dashboard/taglist', params).then(res => res.data) }
export const MenuApi = params => { return Vue.http.post('/crm/api/menu', params).then(res => res.data) }
export const SavesearchAPi = params => { return Vue.http.post('/crm/Api_2/save_own_search_field', params).then(res => res.data) }
export const ChooseListApi = (params, name) => { return Vue.http.post('/crm/' + name + '/table_field', params).then(res => res.data) }
