import {RANK_LIST} from '../types'

const state = {
    list:[

    ]
};

const mutations = {
    [RANK_LIST](state,actions){
        state.list = actions.data
    }
}

export default {
    state,mutations
}