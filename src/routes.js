/**
 * Created by jialao on 2016/9/15.
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
        '/note/:nid':{
            name:'note',
            component:require('./components/Note/index.vue')
        },
        '/new':{
            name:'new',
            component:require('./components/New/index.vue')
        },
        '*': {
            name:'nofound',
            component:require('./components/NotFound.vue')
        }
    })
}