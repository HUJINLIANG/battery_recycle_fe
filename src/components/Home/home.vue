<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <div class="qr-btn" node-type="qr-btn">
                    扫一扫
                    <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码1" />
                </div>
                <div class="result-qrcode" style="display: none;">
                </div>
                <a style="line-height: 49px;color: #FFFAFF; width: 44px;font-size: 14px;text-align: center;" v-link="{path:'/nearby',activeClass:'router-active',exact: true}">
                    附近站点
                </a>
                <div class="score-detail">
                    <a class="" v-link="{path:'/detail',activeClass:'router-active',exact: true}">
                        积分明细
                    </a>
                </div>
            </div>

            <div class="user-container">
                <a class="avatar" href="javascript:;" :title="auth.user.nickName || '匿名'">
                    <img :src="auth.user.iconPath || defaultAvatar">
                </a>
                <div class="exchange-nickname">
                    {{auth.user.nickName || '匿名'}}
                </div>
                <div class="qb">
                    <div>{{auth.user.qb}} Q币</div>
                    <div>
                        <a class="" v-link="{path:'/exchange',activeClass:'router-active',exact: true}">
                            兑换
                        </a>
                    </div>
                </div>
            </div>

            <div class="ranklist-container">
                <div class="ranklist-header">
                    排行榜
                </div>
                <div class="rankitem rank-head">
                    <div>{{auth.rank.rank}}</div>
                    <div>{{auth.user.nickName}}</div>
                    <div>{{auth.rank.totalbalance}}</div>
                </div>
                <div style="height: 200px;overflow: auto;">
                    <div v-for="(index,item) in rankList" class="rankitem">
                        <div>{{index+1}}</div>
                        <div>{{item.nickName}}</div>
                        <div>{{item.totalBalance}}</div>
                    </div>
                </div>
                <div class="logout-btn">
                    <a href="javascript:;" @click="logout" title="退出登录">
                        退出登录
                    </a>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                        <h4 style="font-size: 15px;" class="modal-title" id="myModalLabel">您好，感谢您本次为环保事业做出的贡献！本次您投放的电池数量为：</h4>
                    </div>
                    <div class="modal-body">
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">0号电池</div>
                            <div id="battery0">0个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">1号电池</div>
                            <div id="battery1">0个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">5号电池</div>
                            <div id="battery5">0个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-battery"></i>
                            </div>
                            <div class="battery-type">7号电池</div>
                            <div id="battery7">0个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-circle"></i>
                            </div>
                            <div class="battery-type">纽扣电池</div>
                            <div id="battery8">0个</div>
                        </div>
                        <div class="batteryinfo">
                            <div>
                                <i class="fa fa-btc"></i>
                            </div>
                            <div class="battery-type">可兑换积分</div>
                            <div id="score">0</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="cancel">取消</button>
                        <button type="button" class="btn btn-primary" @click="done">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cookie" style="display: none;">
            {{auth.token}}
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

    .jsbridge {
        height: 200px;
        width: 200px;
        background-color: red;
    }

    .upimg {
        height: 200px;
        width: 200px;
        background-color: green;
        margin-bottom: 50px;
    }

    .qr-btn{
        position: absolute;
        right: 11px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        line-height: 50px;
        color: #FFFAFF;
        width: 44px;
        font-size: 14px;
    }

    input[node-type=jsbridge]{
        visibility: hidden;
    }
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,logout,getRankList,batteryConfirm} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
                rankList:state => state.rankList.list,

            },
            actions:{
                getUserInfo,getNoteList,deleteNote,logout,getRankList,batteryConfirm
            }
        },
        created(){
            this.getUserInfo({cookie:this.auth.token});
            this.getRankList()
            console.log(this.auth.token)
        },
        ready() {
            Qrcode.init($('[node-type=qr-btn]'));
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
            cancel(){
                this.batteryConfirm({
                    cookie: this.auth.token,
                    orderID: $('.result-qrcode').html(),
                    isConfirm: 0
                })
                setTimeout(function () {
                    location.reload();
                },500)

            },
            done(){
                this.batteryConfirm({
                    cookie: this.auth.token,
                    orderID: $('.result-qrcode').html(),
                    isConfirm: 1
                },{cookie:this.auth.token})
                setTimeout(function () {
                    location.reload();
                },500)
            },
            show() {
                $('#myModal').modal({
                    backdrop:'static'
                })
            }
        },
        data(){
            return {
                ordId : '',
                defaultAvatar:defaultAvatar
            }
        }
    }
</script>
