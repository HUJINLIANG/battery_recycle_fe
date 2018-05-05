<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">规则说明</span>
                <a class="logout" v-link="{path:'/exchange',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>

            </div>

            <div class="detail-container">
                <div  class="detail-item">
                    <div>0号电池</div>
                    <div>50分/节</div>
                </div>
                <div  class="detail-item">
                    <div>1号电池</div>
                    <div>40分/节</div>
                </div>
                <div  class="detail-item">
                    <div>5号电池</div>
                    <div>20分/节</div>
                </div>
                <div  class="detail-item">
                    <div>7号电池</div>
                    <div>10分/节</div>
                </div>
                <div  class="detail-item">
                    <div>纽扣电池</div>
                    <div>10分/节</div>
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


    export default{
        vuex:{
            getters:{

            },
            actions:{

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

        },
        data(){
            return {

            }
        }
    }
</script>
