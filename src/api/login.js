import Vue from 'vue'

export const ERR_OK = 1
export const USER_KEY = 'crm_user_data'
export const LoginApi = params => { return Vue.http.post('/crm/api/login', params).then(res => res.data) }
