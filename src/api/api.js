import Vue from 'vue'
import qs from 'qs'
const formatData = { transformRequest: data => qs.stringify(data) }

export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
export const USERID = { customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id, uid: JSON.parse(localStorage.getItem(USER_KEY)).id }
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, formatData).then(res => res.data) }
export const IndexApi = (params, name) => { return Vue.http.post('crm/' + name + '/index', params, formatData).then(res => res.data) }
export const ContractListApi = params => { return Vue.http.post('/crm/ContractList/contract_list', params, formatData).then(res => res.data) }
export const AddApi = (params, name) => { return Vue.http.post('/crm/' + name + '/add', params, formatData).then(res => res.data) }

export const SlideApi = params => { return Vue.http.post('/crm/dashboard/taglist', params).then(res => res.data) }
export const MenuApi = params => { return Vue.http.post('/crm/api/menu', params).then(res => res.data) }
export const ChooseListApi = (params, name) => { return Vue.http.post('/crm/' + name + '/table_field', params).then(res => res.data) }
export const SearchApi = params => { return Vue.http.post('/crm/Api_2/search_filed', params).then(res => res.data) }
export const SavesearchAPi = params => { return Vue.http.post('/crm/Api_2/save_own_search_field', params).then(res => res.data) }
