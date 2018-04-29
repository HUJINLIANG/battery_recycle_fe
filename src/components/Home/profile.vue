<template>
    <div class="wrap-container">

    </div>
</template>
<style>
    /*.msgbox {*/
        /*position: fixed;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*-webkit-transform: translate3d(-50%, -50%, 0);*/
        /*transform: translate3d(-50%, -50%, 0);*/
        /*background-color: #fff;*/
        /*width: 85%;*/
        /*border-radius: 3px;*/
        /*font-size: 16px;*/
        /*-webkit-user-select: none;*/
        /*overflow: hidden;*/
        /*-webkit-backface-visibility: hidden;*/
        /*backface-visibility: hidden;*/
        /*-webkit-transition: .2s;*/
        /*transition: .2s;*/
    /*}*/
    /*.msgbox-header {*/
        /*padding: 15px 0 0;*/
    /*}*/
    /*.msgbox-content {*/
        /*padding: 10px 20px 15px;*/
        /*border-bottom: 1px solid #ddd;*/
        /*min-height: 36px;*/
        /*position: relative;*/
    /*}*/
    /*.msgbox-input {*/
        /*padding-top: 15px;*/
    /*}*/
    /*.msgbox-input input {*/
        /*border: 1px solid #dedede;*/
        /*border-radius: 5px;*/
        /*padding: 4px 5px;*/
        /*width: 100%;*/
        /*-webkit-appearance: none;*/
        /*-moz-appearance: none;*/
        /*appearance: none;*/
        /*outline: none;*/
    /*}*/
    /*.msgbox-input input.invalid {*/
        /*border-color: #ff4949;*/
    /*}*/
    /*.msgbox-input input.invalid:focus {*/
        /*border-color: #ff4949;*/
    /*}*/
    /*.msgbox-errormsg {*/
        /*color: red;*/
        /*font-size: 12px;*/
        /*min-height: 18px;*/
        /*margin-top: 2px;*/
    /*}*/
    /*.msgbox-title {*/
        /*text-align: center;*/
        /*padding-left: 0;*/
        /*margin-bottom: 0;*/
        /*font-size: 16px;*/
        /*font-weight: 700;*/
        /*color: #333;*/
    /*}*/
    /*.msgbox-message {*/
        /*color: #999;*/
        /*margin: 0;*/
        /*text-align: center;*/
        /*line-height: 36px;*/
    /*}*/
    /*.msgbox-btns {*/
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
    /*}*/
    /*.msgbox-btn {*/
        /*line-height: 35px;*/
        /*display: block;*/
        /*background-color: #fff;*/
        /*-webkit-box-flex: 1;*/
        /*-ms-flex: 1;*/
        /*flex: 1;*/
        /*margin: 0;*/
        /*border: 0;*/
    /*}*/
    /*.msgbox-btn:focus {*/
        /*outline: none;*/
    /*}*/
    /*.msgbox-btn:active {*/
        /*background-color: #fff;*/
    /*}*/
    /*.msgbox-cancel {*/
        /*width: 50%;*/
        /*border-right: 1px solid #ddd;*/
    /*}*/
    /*.msgbox-cancel:active {*/
        /*color: #000;*/
    /*}*/
    /*.-msgbox-confirm {*/
        /*color: #26a2ff;*/
        /*width: 50%;*/
    /*}*/
    /*.msgbox-confirm:active {*/
        /*color: #26a2ff;*/
    /*}*/
    /*.msgbox-bounce-enter {*/
        /*opacity: 0;*/
        /*-webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);*/
        /*transform: translate3d(-50%, -50%, 0) scale(0.7);*/
    /*}*/
    /*.msgbox-bounce-leave-active {*/
        /*opacity: 0;*/
        /*-webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);*/
        /*transform: translate3d(-50%, -50%, 0) scale(0.9);*/
    /*}*/
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,logout} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'
    import { MessageBox } from 'mint-ui';


    export default{
        vuex:{
            getters:{
                rankList:state => state.rankList.list
            },
            actions:{

            }
        },
        created(){
            // 拉list数据
            MessageBox({
                title: 'Notice',
                message: 'Are you sure?',
                showCancelButton: true
            });
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

        },
        data(){
            return {

            }
        },
        events : {

        }
    }
</script>