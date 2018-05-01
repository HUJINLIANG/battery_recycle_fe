<template>
    <div>
        <div class="qr-btn" node-type="qr-btn">扫描二维码1
            <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码1" />
        </div>
    </div>
    <div>
        <div class="qr-btn" node-type="qr-btn">扫描二维码2
            <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码2" />
        </div>
    </div>
    <div class="result-qrcode">
    </div>
</template>
<style>

    /*#video {display: block;margin:1em auto;width:180px;height:180px;}*/
</style>
<script>
    import {addNote,showMsg} from '../../vuex/actions'
    import $ from 'jquery'
    import jQuery from 'jquery'
    import {API_ROOT}  from '../../config'

    export default{
        vuex:{
            getters:{

            },
            actions:{
                addNote,showMsg
            }
        },
        methods:{
            save(){
                var instance = this;
                var obj = {
                    content:$('.note-content').html(),
                    color:instance.color
                }

                if(instance.calltime !== ''){
                    obj.calltime = instance.calltime
                }

                this.addNote(obj);
            },
            back(){
                this.$route.router.go({name:'home'})
            },
            upload(){


                var uploadForm = $('#uploadForm')[0]

                var formData = new FormData(uploadForm);
                let url = API_ROOT + '/note/upload';

                $.ajax({
                    url:url,
                    type:'POST',
                    data:formData,
                    async:false,
                    cache:false,
                    contentType:false,
                    processData:false,
                    success:function(data){

                        console.log(data)


                        if(200 === data.code){
                            this.showMsg('上传成功','success')
                            $('.note-content').append('<img src="'+data.msg.url+'" />');
                            this.showUPanel()

                        }else{
                            this.showMsg('上传失败')
                        }
                    }.bind(this),
                    error:function(data){

                        debugger;

                        this.showMsg("与服务器发生错误")
                    }.bind(this)
                })
            },
            showCPanel(){
                if(this.showColorPanel){
                    this.showColorPanel = false;
                    this.nowShow = '';
                }else{
                    this.showColorPanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showColorPanel';
                }
            },
            showTPanel(){
                if(this.showTimePanel){
                    this.showTimePanel = false;
                    this.nowShow = '';
                }else{
                    this.showTimePanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showTimePanel';
                }
            },
            showUPanel(){
                if(this.showUploadPanel){
                    this.showUploadPanel = false;
                    this.nowShow = '';
                }else{
                    this.showUploadPanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showUploadPanel';
                }
            },
            chooseColor(color){
                this.color = color;
                this.showCPanel();
            },
            timechange(){
                this.showTPanel();
            }
        },
        data(){
            return {
                current:new Date(),
                showColorPanel:false,
                showTimePanel:false,
                showUploadPanel:false,
                text:'',
                color:'color1',
                calltime:'',
                nowShow:''

            }
        },
        created(){

        },
        ready() {
            Qrcode.init($('[node-type=qr-btn]'));
        }

    }
</script>
