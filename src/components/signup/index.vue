<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <a class="logout" v-link="{path:'/login',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>
            </div>
            <img :src="icon" class="login-icon">
            <div class="out-container">
                <div class="login-box">
                    <div class="loginForm">
                        <!--<div class="form-container">-->
                        <validator name="loginValidation">
                            <form class="login-form form-horizontal" @submit.prevent="login($loginValidation)" novalidate>
                                <div class="form-group">
                                    <div class="input-group">
                                        <!--<div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>-->
                                        <input style="color: #ffffff;" v-model="user.OpenID" v-validate:OpenID="{required:true}"
                                               class="form-control" placeholder="QQ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <!--<div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>-->
                                        <input style="color: #ffffff;" v-model="user.Nickname" v-validate:nickname="{required:true}"
                                               class="form-control" placeholder="昵称">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <!--<div class="input-group-addon"><i class="fa fa-unlock-alt"></i></div>-->
                                        <input style="color: #ffffff;" v-model="user.Password" v-validate:password="{required:true}"
                                               class="form-control" :class="[$loginValidation.password.invalid?'ng-invalid':'ng-valid']" placeholder="密码">
                                    </div>
                                </div>
                                <div id="signin-container" class="actions-container">
                                    <button class="btn btn-primary" type="submit" id="login-btn" :disabled="$loginValidation.invalid">注册</button>
                                </div>
                                <!--<div class="form-group">-->
                                <!--<button class="btn btn-primary btn-lg btn-block" type="submit" id="login-btn" :disabled="$loginValidation.invalid">登录</button>-->
                                <!--</div>-->
                            </form>
                        </validator>
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .signup-btn {
        color: #fff;
        /* background-color: #50a089; */
        /* border-color: #4BB283; */
        border: none;
        padding: 6px 12px;
        font-size: 18px;
        vertical-align: middle;
    }
    .login-icon {
        vertical-align: middle;
        position: absolute;
        top: 128px;
        /* bottom: 0; */
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
                    Password: '',
                    Nickname: ''
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
                    this.localLogin(this.user)
                }
            }
        },
        created(){

        }
    }

</script>
