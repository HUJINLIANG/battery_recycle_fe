/**
 * Created by kennyhu on 2018/4.
 */
import {LOGIN_SUCCESS,USERINFO_SUCCESS,LOGOUT_USER} from '../types'
import {getCookie} from '../../utils/authService';

// 模拟登陆
// var token = getCookie('token')
var token = getCookie('token')



const state = {
    token: token || null,
    user:null
};

const mutations = {
    [LOGIN_SUCCESS](state,action){
        state.token = action.token;

        console.log(state.token)

    },
    [USERINFO_SUCCESS](state,action){
        state.user = action.user;
    },
    [LOGOUT_USER](state,action){    
        state.token = null;
        state.user = null;
    }
};

export default {
    state,mutations
}