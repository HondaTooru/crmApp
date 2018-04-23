import Vue from 'vue'
import qs from 'qs'
export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params, { transformRequest: data => qs.stringify(data) }).then(res => res.data) }
export const IndexApi = () => { return Vue.http.post('crm/clue/index').then(res => res.data) }
export const SlideApi = params => { return Vue.http.post('/crm/dashboard/taglist', params).then(res => res.data) }
export const MenuApi = params => { return Vue.http.post('/crm/api/menu', params).then(res => res.data) }
