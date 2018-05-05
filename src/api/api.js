import Vue from 'vue'
import qs from 'qs'
const formatData = { transformRequest: data => qs.stringify(data) }
const USER = JSON.parse(localStorage.getItem('crm_user_data')) || ''
export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
export const USERID = { customer_id: USER.customer_id, uid: USER.id }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', Object.assign(USERID, params), formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', Object.assign(USERID, params), formatData).then(res => res.data) }
export const AddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/add', Object.assign(USERID, params), formatData).then(res => res.data) }

export const AllStatusApi = params => { return Vue.http.post('/crm/api/all_status', Object.assign(USERID, params), formatData).then(res => res.data) }
export const AllSourceApi = params => { return Vue.http.post('/crm/api/all_source', Object.assign(USERID, params), formatData).then(res => res.data) }
export const AllAdminApi = params => { return Vue.http.post('/crm/api/all_admin', Object.assign(USERID, params), formatData).then(res => res.data) }
export const AllDepartmentApi = params => { return Vue.http.post('/crm/api/all_department', Object.assign(USERID, params), formatData).then(res => res.data) }

export const SearchApi = params => { return Vue.http.post('/crm/Api_2/search_filed', Object.assign(USERID, params)).then(res => res.data) }
export const SlideApi = params => { return Vue.http.post('/crm/dashboard/taglist', Object.assign(USERID, params)).then(res => res.data) }
export const MenuApi = params => { return Vue.http.post('/crm/api/menu', Object.assign(USERID, params)).then(res => res.data) }

export const SavesearchAPi = params => { return Vue.http.post('/crm/Api_2/save_own_search_field', params).then(res => res.data) }
export const ChooseListApi = (params, name) => { return Vue.http.post('/crm/' + name + '/table_field', params).then(res => res.data) }
