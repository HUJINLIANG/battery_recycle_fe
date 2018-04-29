<template>
    <div class="wrap-container">
        <div class="note-list">
            <!--<ul>-->
            <div v-for="item in rankList" class="note-item">
                <div class="inner-item" :class="item.color">
                    <ul>
                        <li>{{item.name}}</li>
                        <li>{{item.mon}}</li>
                    </ul>
                </div>

            </div>
            <!--</ul>-->
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
                rankList:state => state.rankList.list
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
