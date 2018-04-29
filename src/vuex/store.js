/**
 * Created by jialao on 2016/9/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import auth from './modules/auth'
import changeDetail from './modules/changeDetail'
import showDialog from './modules/showDialog'
import rankList from './modules/rankList'

import noteDetail from './modules/note.detail'
import noteList from './modules/note.list'
import detailList from './modules/detaillist'
import showmsg from './modules/showmsg'

Vue.use(Vuex)
Vue.config.warnExpressionErrors = false;
Vue.config.debug = true;

export default new Vuex.Store({
    modules:{
        auth,
        changeDetail,
        showDialog,
        rankList,
        detailList,

        noteDetail,
        noteList,
        showmsg
    },
    middlewares
})