import {BALANCE_DETAIL} from '../types'

const state = {
    list:[

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