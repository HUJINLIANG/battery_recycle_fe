<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title" style="font-weight:bold; color: #FFFAFF">附近站点</span>
                <a class="logout" v-link="{path:'/',activeClass:'router-active',exact: true}">
                    <i class="fa fa-angle-left"></i>
                </a>
                <div class="qr-btn">
                    {{city || '位置未知'}}
                </div>
            </div>

            <div id="container"></div>
        </div>
    </div>
</template>
<style>
    #container{height:500px}
</style>
<script>

    import {getBalanceDetail} from '../../vuex/actions'
    import {API_ROOT} from "../../config";

    var opts = {
        width : 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title : "设备位置" , // 信息窗口标题
        enableMessage:true//设置允许信息窗发送短息
    };
    function openInfo(content,e,map){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }

    function addMarker(map,point,content,title){
        var content = '<div style="margin:0;line-height:20px;padding:2px;">可投放数剩余' +
            content
            '</div>';

        //创建检索信息窗口对象
        var searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title  : title,      //标题
            width  : 290,             //宽度
            height : 105,              //高度
            panel  : "panel",         //检索结果面板
            enableAutoPan : true,     //自动平移
            searchTypes   :[
                BMAPLIB_TAB_SEARCH,   //周边检索
                BMAPLIB_TAB_TO_HERE,  //到这里去
                BMAPLIB_TAB_FROM_HERE //从这里出发
            ]
        });
        var marker = new BMap.Marker(point); //创建marker对象
        marker.enableDragging(); //marker可拖拽
        marker.addEventListener("click", function(e){
            searchInfoWindow.open(marker);
        })
        marker.disableDragging();
        map.addOverlay(marker); //在地图中添加marker
    }

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
        data() {
            return {
                map : null,
                city : ''
            }
        },
        ready() {
            // 百度地图API功能
            this.map = new BMap.Map("container");
            var point = new BMap.Point(116.331398,39.897445);
            this.map.centerAndZoom(point,12);
            this.map.enableScrollWheelZoom(true);
            var me = this;

            var myCity = new BMap.LocalCity();
            myCity.get(function(result){
                me.map.centerAndZoom(point,12);

                var cityName = result.name;
                me.city = cityName
                me.map.setCenter(cityName);

                $.ajax({
                    url: API_ROOT + '/boxDetail/',
                    type: 'post',
                    data: {
                        city: cityName.slice(0,cityName.length-1)
                    },
                    success: function (response) {
                        if(response.result !== 'ok'){
                            return ;
                        }
                        for (let i = 0; i < response.data.length;i++) {
                            addMarker(me.map,new BMap.Point(response.data[i].coordinate.split(',')[1],response.data[i].coordinate.split(',')[0]),response.data[i].remain,response.data[i].location)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            });

        },
        created(){

        },
        components: {

        }

    }

</script>
