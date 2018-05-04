<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">积分兑换</span>
                <a class="logout" v-link="{path:'/',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>

            </div>

            <div class="exchange-container">
                <a class="avatar" href="javascript:;" :title="auth.user.nickname || 'hjl'">
                    <img :src="defaultAvatar">
                </a>
                <div class="score">
                    <div style="display: flex;background: rgba(255,255,255,0.3);padding: 10px 0px">
                        <div>现有积分</div>
                        <div>{{auth.user.score || '100'}}</div>
                    </div>
                </div>
                <div class="qb">
                    <div style="display: flex;background: rgba(255,255,255,0.3);padding: 10px 0px">
                        <div>本次兑换</div>
                        <div>
                            <i @click="minus" class="minus fa fa-minus"></i>
                            <span class="qbNum">{{qbNum}}</span>
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
    /*body{*/
    /*background-color:#ff0000;*/
    /*}*/
    /*.vue-toast-manager_container.\--right .vue-toast_container {*/
        /*right: 136px;*/
    /*}*/
    /*.vue-toast-manager_container.\--top .vue-toast_container {*/
        /*top: 320px;*/
    /*}*/
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,balanceChange, showMsg} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
            },
            actions:{
                showMsg,balanceChange
            }
        },
        created(){

        },
        route:{
            data(transition){
                transition.next()
            },
            activate(transition){
                !this.auth.token?transition.redirect('/login'):transition.next()
            }
        },
        methods:{
            add(){
                var max = this.auth.user.score / 100;
                if (this.qbNum + 1 <= max) {
                    this.qbNum++;
                } else {
                    this.showMsg('已达可兑换上限')
                }
            },
            minus() {
                var min = 0;
                if (this.qbNum - 1 >= min) {
                    this.qbNum--;
                } else {
                    this.showMsg('不能再少了')
                }
            },
            submit() {
                if (this.qbNum > 0) {
                    this.balanceChange({
                        cookie: this.auth.cookie,
                        number: this.qNumk
                    })
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
