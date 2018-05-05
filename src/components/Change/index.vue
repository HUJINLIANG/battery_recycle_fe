<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">积分明细</span>
                <a class="logout" v-link="{path:'/',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>

            </div>

            <div class="detail-container">
                <div v-for="item in detailList" class="detail-item">
                    <div>{{item.item}}</div>
                    <div style="flex: 2;">{{item.time | time}}</div>
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

    import {getBalanceDetail} from '../../vuex/actions'

    export default{
        vuex:{
            getters:{
                detailList:state => state.detailList.list,
                auth:state => state.auth
            },
            actions:{
                getBalanceDetail
            }
        },
        filters: {
            time: function (value) {
                return value.slice(0,10)
            }
        },
        created(){
            if(this.auth.token){
                this.getBalanceDetail({cookie:this.auth.token});
            }
            console.log(this.auth.token)
        }

    }
</script>
