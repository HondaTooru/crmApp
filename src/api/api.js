import Vue from 'vue'
import qs from 'qs'
export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, { transformRequest: data => qs.stringify(data) }).then(res => res.data) }
export const IndexApi = params => { return Vue.http.post('crm/clue/index', params).then(res => res.data) }
export const SlideApi = params => { return Vue.http.post('/crm/dashboard/taglist', params).then(res => res.data) }
export const MenuApi = params => { return Vue.http.post('/crm/api/menu', params).then(res => res.data) }
export const SearchApi = params => { return Vue.http.post('/crm/Api_2/search_filed', params).then(res => res.data) }
export const SavefieldApi = params => { return Vue.http.post('/crm/Api_2/save_own_search_field', params).then(res => res.data) }
