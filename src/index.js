/**
 * Created by jialao on 2016/9/15.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import configRouter from './routes'
import App from './components/App.vue'
import store from './vuex/store'
import * as filters from './utils/filters'
import {sync} from 'vuex-router-sync'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toast/dist/vue-toast.min.css'
import './assets/less/index.less'
// import Mint from 'mint-ui';
// Vue.use(Mint);

require('bootstrap')



Vue.use(VueRouter);
Vue.use(VueValidator);
Object.keys(filters).forEach(k => {
    Vue.filter(k,filters[k])
})


const router = new VueRouter({
    history:true,
    saveScrollPosition:true,
    suppressTransitionError:true
})

configRouter(router)
sync(store,router)

router.start(Vue.extend(App),'#root');

// // 注册 service worker
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function (registration) {
//         // 注册成功
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }).catch(function (err) {
//         // 注册失败 :(
//         console.log('ServiceWorker registration failed: ', err);
//     });
// }

window.router = router