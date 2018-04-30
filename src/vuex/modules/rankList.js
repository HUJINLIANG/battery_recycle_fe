import {RANK_LIST} from '../types'

const state = {
    list:[
        {
            nickname:'111111',
            score:'900',
            rank: 1
        },
        {
            nickname:'111111',
            score:'900',
            rank: 2
        },{
            nickname:'111111',
            score:'900',
            rank: 3
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        },{
            nickname:'111111',
            score:'900',
            rank: 4
        }
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