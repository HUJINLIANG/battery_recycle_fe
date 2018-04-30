import {BALANCE_DETAIL} from '../types'

const state = {
    list:[
        {
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },{
            item:'兑换',
            time:'20160712',
            change: '+100'
        },

    ]
};

const mutations = {
    [BALANCE_DETAIL](state,actions){
        state.list = actions.data
    },
}

export default {
    state,mutations
}