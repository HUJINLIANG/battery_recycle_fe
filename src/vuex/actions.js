/**
 * Created by kennyhu on 2018/4.
 */
import api from '../api'
import * as types from './types'
import {API_ROOT} from "../config";
import {saveCookie,signOut } from '../utils/authService'

export const localLogin = (store,userInfo) => {
    $.ajax({
        url: API_ROOT + '/login/',
        type: 'post',
        data: userInfo,
        success: function (response) {
            if(response.result !== 'ok'){
                return showMsg(store,response.msg || '登录失败')
            }
            const token = response.cookie;
            saveCookie('token',token);
            store.dispatch(types.LOGIN_SUCCESS,{token:token});
            showMsg(store,'登录成功','success');
            store.router.go({path:'/'})
        },
        error: function (error) {
            console.log(error)
            return showMsg(store,error.error_msg || '登录失败')
        }
    })
}

export const signup = (store,userInfo) => {
    $.ajax({
        url: API_ROOT + '/register/',
        type: 'post',
        data: userInfo,
        success: function (response) {
            if(response.result !== 'ok'){
                return showMsg(store,response.msg || '注册失败')
            }
            showMsg(store,'注册成功','success');
            const token = response.cookie;
            saveCookie('token',token);
            store.dispatch(types.LOGIN_SUCCESS,{token:token});

            store.router.go({path:'/'})
        },
        error: function (error) {
            console.log(error)
            return showMsg(store,'注册失败')
        }
    })
}

export const logout = ({dispatch,router}) => {
    signOut();
    dispatch(types.LOGOUT_USER);
    window.location.pathname = '/login'
};

export const showMsg = ({dispatch},content,type='error') => {
    
    dispatch(types.SHOW_MSG,{content:content,type:type})
}

export const hideMsg = ({dispatch}) => {
    
    dispatch(types.HIDE_MSG)
}

export const getUserInfo = (store,userInfo) => {
    $.ajax({
        url: API_ROOT + '/getUserInfo/',
        type: 'post',
        data: userInfo,
        success: function (response) {
            if(response.result !== 'ok'){
                console.log('获取信息失败')
                return ;
            }
            store.dispatch(types.USERINFO_SUCCESS,{user:response})
        },
        error: function (error) {
            showMsg(store,'获取用户资料失败')
        }
    })
}

export const getRankList = (store) => {
    $.ajax({
        url: API_ROOT + '/getRankingList/',
        type: 'get',
        success: function (response) {
            const json = response.data;
            store.dispatch(types.RANK_LIST,{data:json})
            var user = store.state['auth'].user.nickName;
            for (let i = 0;i < json.length ;i++) {
                if (user === json[i].nickName) {
                    store.dispatch(types.RANK_ME,{
                        rank : i + 1,
                        totalbalance:  json[i].totalBalance
                    })
                    return ;
                }
            }
        },
        error: function (error) {
            showMsg(store,'获取排名失败')
        }
    })
}

export const getBalanceDetail = (store,userInfo) => {
    $.ajax({
        url: API_ROOT + '/getBalanceDetail/',
        type: 'post',
        data: userInfo,
        success: function (response) {
            const json = response.data;
            store.dispatch(types.BALANCE_DETAIL,{data:json})
        },
        error: function (error) {
            showMsg(store,'获取积分明细失败')
        }
    })
    // api.getBalanceDetail(userInfo).then(response => {
    //     const json = response.data;
    //     dispatch(types.BALANCE_DETAIL,{data:json})
    // }).catch(response => {
    //     console.log('获取积分明细失败')
    // })
}

export const balanceChange = (store,changeInfo) => {
    $.ajax({
        url: API_ROOT + '/balanceChange/',
        type: 'post',
        data: changeInfo,
        success: function (response) {
            if(response.result !== 'ok'){
                return showMsg(store,response.msg || '兑换失败')
            }
            showMsg(store,'兑换成功','success');
            store.router.go({path:'/'})
        },
        error: function (error) {
            return showMsg(store,error.msg || '网络出错')
        }
    })
}

export const batteryConfirm = (store,confirmInfo,userInfo) => {
    $.ajax({
        url: API_ROOT + '/batteryConfirm/',
        type: 'post',
        data: confirmInfo,
        success: function (response) {
            if(response.result !== 'ok'){
                return showMsg(store,'订单无效')
            }
            if (confirmInfo.isConfirm) {
                showMsg(store,'交易成功','success');
            } else {
                showMsg(store,'交易已取消','success');
            }
        },
        error: function (error) {
            return showMsg(store,'网络出错')
        }
    })
}

