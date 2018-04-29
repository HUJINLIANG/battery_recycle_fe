<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">LE RECYCLE</span>
                <a class="add" @click="addNote">
                    <i class="fa fa-qrcode"></i>
                </a>
                <!--<a class="avatar" href="javascript:;" :title="auth.user.nickname">-->
                    <!--<img :src="auth.user.avatar || defaultAvatar">-->
                <!--</a>-->
                <a class="logout" href="javascript:;" @click="logout" title="退出登录">
                    <i class="fa fa-sign-out"></i>
                </a>

            </div>

            <div class="user-container">
                <a class="avatar" href="javascript:;" :title="auth.user.nickname || 'hjl'">
                    <img :src="defaultAvatar">
                </a>
                <div class="nickname">
                    <div>昵称</div>
                    <div>{{auth.user.nickname || 'hjl'}}</div>
                </div>
                <div class="qb">
                    <div>已兑QB</div>
                    <div>{{auth.user.qb || 100}}</div>
                </div>
                <div class="score">
                    <div style="text-align: left;">积分</div>
                    <div>{{auth.user.score || 100}}</div>
                    <div style="text-align: right;">
                        <a class="" v-link="{path:'/detail',activeClass:'router-active',exact: true}">
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="change">
                    <div style="text-align: left;">兑换</div>
                    <div style="text-align: right;">
                        <a class="" v-link="{path:'/exchange',activeClass:'router-active',exact: true}">
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="ranklist-container">
                <div class="rankitem">
                    <div>排名</div>
                    <div>昵称</div>
                    <div>积分</div>
                </div>
                <div v-for="item in rankList" class="rankitem">
                    <div>{{item.rank}}</div>
                    <div>{{item.nickname}}</div>
                    <div>{{item.score}}</div>
                </div>
            </div>
        </div>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 style="font-size: 15px;" class="modal-title" id="myModalLabel">您好，感谢您本次为环保事业做出的贡献！本次您投放的电池数量为：</h4>
                    </div>
                    <div class="modal-body">
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">0号电池</div>
                            <div>5个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">1号电池</div>
                            <div>5个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">5号电池</div>
                            <div>5个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">7号电池</div>
                            <div>5个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-circle"></i>
                            </div>
                            <div class="battery-type">纽扣电池</div>
                            <div>5个</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .btn-container .router-active{
        border-radius: 14px;
        color: black;
    }
    .btn-container{
        display: flex;
        flex-direction: row;
        margin: 90px 50px 40px 50px;
    }
    .btn-container div{

    }
    .btn-container a{
        flex: 1;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        height: 50px;
        line-height: 40px;
        color: #4BB283;
        font-weight: 100;
        border: 5px solid white;
    }
    .out-container{
        border-top: 3px solid #4BB283;
    }


</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,logout,getRankList} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
                rankList:state => state.rankList.list,

            },
            actions:{
                getUserInfo,getNoteList,deleteNote,logout,getRankList
            }
        },
        created(){

            if(this.auth.token && !this.auth.user){
                this.getUserInfo();
                this.getRankList()
            }
            console.log(this.auth.token)
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
            showDetail(nid){
                this.$route.router.go({name:'note',params:{nid}})
            },
            addNote(){
                this.$route.router.go({name:'new'})
            },
            deleteNote(id,index){
                this.deleteNote(id,index);
            }
        },
        data(){
            return {
                defaultAvatar:defaultAvatar
            }
        }
    }
</script>
