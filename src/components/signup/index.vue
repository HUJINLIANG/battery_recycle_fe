<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <a class="logout" v-link="{path:'/login',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>
            </div>

            <div class="out-container">
                <div class="login-box">
                    <div class="loginForm">
                        <img :src="icon" class="login-icon">
                        <validator name="loginValidation">
                            <form class="login-form form-horizontal" @submit.prevent="login($loginValidation)" novalidate>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input style="color: #ffffff;" v-model="user.OpenID" v-validate:OpenID="{required:true}"
                                               class="form-control" placeholder="用户名">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input style="color: #ffffff;" v-model="user.QQ" v-validate:QQ="{required:true}"
                                               class="form-control" placeholder="QQ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input style="color: #ffffff;" v-model="user.Password" v-validate:Password="{required:true}"
                                               type="password" class="form-control" :class="[$loginValidation.password.invalid?'ng-invalid':'ng-valid']" placeholder="密码">
                                    </div>
                                </div>
                                <div id="signin-container" class="actions-container">
                                    <button class="btn btn-primary" type="submit" id="login-btn" :disabled="$loginValidation.invalid">注册</button>
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
    import {signup,showMsg} from '../../vuex/actions'
    import icon from '../../assets/images/icon-191.png'
    export default {
        el(){
            return '#loginForm'
        },
        components:{

        },
        vuex:{
            getters:{

            },
            actions:{
                signup,showMsg
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
                    Password: '',
                    QQ: ''
                },
                icon
            }
        },
        route:{

        },
        ready(){

        },
        methods:{
            login(loginValidation){
                if(loginValidation.valid){
                    if(!/^[1-9]\d{4,10}$/.test(this.user.QQ)) {
                        this.showMsg('QQ号格式错误');
                        return ;
                    }
                    if (!/^[0-9a-zA-Z]+$/.test(this.user.OpenID)) {
                        this.showMsg('用户名只能包含数字和字母');
                        return ;
                    }
                    this.signup(this.user)
                }
            }
        },
        created(){

        }
    }

</script>
