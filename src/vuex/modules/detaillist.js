import {RANK_LIST} from '../types'

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
    [RANK_LIST](state,actions){
        state.list = actions.data
    },
}

export default {
    state,mutations
}