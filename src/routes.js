/**
 * Created by kennyhu on 2018/4.
 */


export default function(router){
    router.map({
        '/detail':{
            name:'detail',
            component:require('./components/Change/index.vue')
        },
        '/':{
            name:'home',
            component:require('./components/Home/home.vue'),
        },
        '/login':{
            name:'login',
            component:require('./components/Login/index.vue')
        },
        '/exchange':{
            name:'exchange',
            component:require('./components/exchange/index.vue'),
        },
        '/rule':{
            name:'exchangerule',
            component:require('./components/exchangerule/index.vue')
        },
        '/signup':{
            name:'signup',
            component:require('./components/signup/index.vue')
        },
        '*': {
            name:'nofound',
            component:require('./components/NotFound.vue')
        }
    })
}