<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">积分兑换</span>
                <a class="logout" v-link="{path:'/',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>
                <div class="exchange-rule">
                    <a class="" v-link="{path:'/rule',activeClass:'router-active',exact: true}">
                        规则说明
                    </a>
                </div>
            </div>

            <div class="exchange-container">
                <a class="avatar" href="javascript:;" :title="auth.user.nickName || '匿名'">
                    <img :src="auth.user.iconPath || defaultAvatar">
                </a>
                <div class="exchange-nickname">
                    {{auth.user.nickName || '匿名'}}
                </div>
                <div class="score">
                    <div style="display: flex;background: rgba(255,255,255,0.3);padding: 10px 0px">
                        <div>现有积分</div>
                        <div>{{auth.user.balance}}</div>
                    </div>
                </div>
                <div class="qb">
                    <div style="display: flex;background: rgba(255,255,255,0.3);padding: 10px 0px">
                        <div>本次兑换</div>
                        <div>
                            <i @click="minus" class="minus fa fa-minus"></i>
                            <span class="qbNum">{{qbNum}}</span>QB
                            <i @click="add" class="add fa fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>

            <button class="exchange-submit" @click="submit">确认</button>
        </div>

    </div>
</template>
<style>

</style>
<script>

    import {getUserInfo,balanceChange, showMsg} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
            },
            actions:{
                showMsg,balanceChange,getUserInfo
            }
        },
        created(){
            if(this.auth.token && !this.auth.user){
                this.getUserInfo({cookie:this.auth.token});
            }
        },
        route:{
            activate(transition){
                !this.auth.token?transition.redirect('/login'):transition.next()
            }
        },
        methods:{
            add(){
                var max = Math.floor(this.auth.user.balance / 100);
                if (this.qbNum + 1 <= max) {
                    this.qbNum++;
                } else {
                    this.qbNum = 0
                }
            },
            minus() {
                var min = 0;
                var max = Math.floor(this.auth.user.balance / 100);
                if (this.qbNum - 1 >= min) {
                    this.qbNum--;
                } else {
                    this.qbNum = max;
                }
            },
            submit() {
                if (this.qbNum > 0) {
                    this.balanceChange({
                        cookie: this.auth.token,
                        number: this.qbNum
                    })
                } else {
                    this.showMsg('兑换QB不能为0')
                }
            }
        },
        data(){
            return {
                defaultAvatar:defaultAvatar,
                qbNum: 0
            }
        }
    }
</script>
