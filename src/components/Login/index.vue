<template>
    <div class="out-container">
        <div class="wrap-container">

            <div class="out-container">
                <div class="login-box">
                    <div class="loginForm">
                        <img :src="icon" class="login-icon">
                            <validator name="loginValidation">
                                <form class="login-form form-horizontal" @submit.prevent="login($loginValidation)" novalidate>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input style="color: #ffffff;" v-model="user.OpenID" v-validate:OpenID="{required:true}"
                                                   class="form-control" placeholder="账号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input style="color: #ffffff;" v-model="user.Password" v-validate:password="{required:true}"
                                                   type="password" class="form-control" :class="[$loginValidation.password.invalid?'ng-invalid':'ng-valid']" placeholder="密码">
                                        </div>
                                    </div>
                                    <div class="actions-container">
                                        <a class="signup-btn" v-link="{path:'/signup',activeClass:'router-active',exact: true}">
                                            注册
                                        </a>
                                        <button class="btn btn-primary" type="submit" id="login-btn" :disabled="$loginValidation.invalid">登录</button>
                                    </div>
                                </form>
                            </validator>
                    </div>
                </div>
            </div>
            </div>
    </div>

</template>
<style>
    .signup-btn {
        color: #fff;
        border: none;
        padding: 6px 12px;
        font-size: 18px;
        vertical-align: middle;
    }
    .login-icon {
        vertical-align: middle;
        position: absolute;
        top: -134px;
        margin: auto auto;
        left: 0;
        right: 0;
        width: 120px;
        height: 120px;
        z-index: 100;
    }
</style>
<script>
    import {localLogin} from '../../vuex/actions'
    import SnsLogin from './SnsLogin.vue'
    import icon from '../../assets/images/icon-191.png'

    export default {
        el(){
            return '#loginForm'
        },
        components:{
            SnsLogin
        },
        vuex:{
            getters:{
                token:({auth}) => auth.token
            },
            actions:{
                localLogin
            }
        },
        validators:{
            email:function(val){
                return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)
            }
        },
        data()
        {
            return {
                user: {
                    OpenID: '',
                    Password: ''
                },
                icon:icon
            }
        },
        route:{
            activate(transition){

                this.token?transition.redirect('/'):transition.next()
            }
        },
        ready(){

        },
        methods:{
            login(loginValidation){
                if(loginValidation.valid){
                    this.localLogin(this.user)
                }
            }
        },
        created(){
            console.log(this.token)
        }
    }

</script>
