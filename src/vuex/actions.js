/**
 * Created by jialao on 2016/9/16.
 */
import api from '../api'
import * as types from './types'
import {saveCookie,signOut } from '../utils/authService'

export const localLogin = (store,userInfo) => {
    api.localLogin(userInfo).then(response => {
        if(!response.result === 'ok'){
            return showMsg(store,response.msg || '登录失败')
        }
        const token = response.cookie;
        saveCookie('token',token);
        getUserInfo(store)
        store.dispatch(types.LOGIN_SUCCESS,{token:token});
        showMsg(store,'登录成功','success');
        store.router.go({path:'/'})

    }).catch(error => {
        console.log(error)
        return showMsg(store,error.data.error_msg || '登录失败')
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

export const getUserInfo = ({dispatch},userInfo) => {
    api.getMe(userInfo).then(response => {
        if(!response.result === 'ok'){
            console.log('获取信息失败')
        }
        dispatch(types.USERINFO_SUCCESS,{user:response})
    }).catch(response => {
        console.log('获取用户资料失败')
    })
}

export const getRankList = ({dispatch}) => {
    api.getRankList().then(response => {
        const json = response.data;
        dispatch(types.RANK_LIST,{data:json})
    }).catch(response => {
        console.log('获取排名失败')
    })
}

export const getBalanceDetail = ({dispatch},userInfo) => {
    api.getBalanceDetail(userInfo).then(response => {
        const json = response.data;
        dispatch(types.BALANCE_DETAIL,{data:json})
    }).catch(response => {
        console.log('获取积分明细失败')
    })
}

export const balanceChange = (store,changeInfo) => {
    api.balanceChange(changeInfo).then(response => {
        if(!response.result === 'ok'){
            return showMsg(store,response.msg || '兑换失败')
        }
        showMsg(store,'兑换成功','success');
        store.router.go({path:'/'})
    }).catch(response => {
        return showMsg(store,response.msg || '网络出错')
    })
}

export const batteryConfirm = (store,confirmInfo,userInfo) => {
    api.batteryConfirm(confirmInfo).then(response => {
        if(!response.result === 'ok'){
            return showMsg(store,'交易失败')
        }
        showMsg(store,'交易成功','success');
        getUserInfo(store,userInfo)
    }).catch(response => {
        return showMsg(store,'网络出错')
    })
}

export const getNoteList = (store) => {
    api.getNoteList().then(response => {
        const json = response.data;
        store.dispatch(types.NOTE_LIST,{data:json.data})
    }).catch(response => {
        console.log('获取note列表错误')
    })
}

export const getNoteDetail = (store,id) => {
    

    
    api.getNoteDetail(id).then(response => {
        
        store.dispatch(types.NOTE_DETAIL,{data:response.data.data})
    }).catch(response => {
        
        showMsg(store,response.data.error_msg || '获取失败')
    })
}

export const addNote = (store,data) =>{
    api.addNote(data).then(response => {
        store.dispatch(types.ADD_NOTE,{data:response.data.data})
        showMsg(store,'添加成功','success');
        store.router.go({name:'home'})
    }).catch(response => {
        showMsg(store,response.data.error_msg || '添加失败')
    })
}

export const updateNote = (store,data) => {
    api.updateNote(data).then(response => {
        store.dispatch(types.UPDATE_NOTE,{data:response.data.data})
        store.router.go({name:'home'});
        showMsg(store,'更新成功','success');
    }).catch(response => {
        showMsg(store,response.data.error_msg || '获取失败')
    })
}

export const deleteNote = (store,id,index) => {
    api.deleteNote(id).then(response => {
        store.dispatch(types.DELETE_NOTE,{index:index})
    }).catch(response => {
        showMsg(store,response.data.error_msg || '删除失败')
    })
}