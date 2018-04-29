<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">积分详情</span>
                <a class="logout" v-link="{path:'/',activeClass:'router-active',exact: true}">
                    <i class="fa fa-chevron-left"></i>
                </a>

            </div>

            <div class="detail-container">
                <div v-for="item in detailList" class="detail-item">
                    <div>{{item.item}}</div>
                    <div>{{item.time}}</div>
                    <div>{{item.change}}</div>
                </div>
            </div>
        </div>

    </div>
</template>
<style>
    /*body{*/
    /*background-color:#ff0000;*/
    /*}*/
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,logout} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                detailList:state => state.detailList.list
            },
            actions:{

            }
        },
        created(){
            // 拉list数据
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
        }
    }
</script>
