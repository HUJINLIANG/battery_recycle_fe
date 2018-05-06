/**
 * Created by kennyhu on 2018/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import auth from './modules/auth'
import showDialog from './modules/showDialog'
import rankList from './modules/rankList'
import detailList from './modules/detaillist'
import showmsg from './modules/showmsg'

Vue.use(Vuex)
Vue.config.warnExpressionErrors = false;
Vue.config.debug = true;

export default new Vuex.Store({
    modules:{
        auth,
        showDialog,
        rankList,
        detailList,
        showmsg
    },
    middlewares
})