/**
 * Created by kennyhu on 2018/4.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'
import {getCookie,signOut} from '../utils/authService'

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
// Vue.http.options.credentials = true;

Vue.http.interceptors.push((req,next) => {
    req.headers = req.headers || {};
    if(getCookie('token')){
        req.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g,'')
    }
    next((res) => {
        if(res.status === 401){
            signOut();
            window.location.pathname = '/login'
        }
    })
})


export const BaseResource = Vue.resource(API_ROOT + '{/id}/')

export const AuthResource = Vue.resource(API_ROOT + '{/id}');
export const NoteResource = Vue.resource(API_ROOT + '{/id}{/controller}');
export const UserResource = Vue.resource(API_ROOT + '{/id}');
