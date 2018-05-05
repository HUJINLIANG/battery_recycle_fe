/**
 * Created by kennyhu on 2018/4.
 */
import {NOTE_DETAIL,ADD_NOTE,DELETE_NOTE,UPDATE_NOTE} from '../types'

const state = {
    item:{}
};

const mutations = {
    [NOTE_DETAIL](state,action){
        if(!action.data.calltime){
            action.data.calltime = ''
        }
        state.item = action.data;
    },
    [UPDATE_NOTE](state,action){
        state.item = action.data;
    }
}

export default {
    state,mutations
}