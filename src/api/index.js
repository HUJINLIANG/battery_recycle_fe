/**
 * Created by jialao on 2016/9/16.
 */
import {AuthResource,NoteResource,UserResource,BaseResource} from './resources'

export default {
    localLogin: function(data){
        return BaseResource.save({id:'login'},data);  //openID,password
    },
    getRankList: function(data){
        return BaseResource.get({id:'getRankingList'});
    },
    getMe: function(data){
        return BaseResource.save({id:'getUserInfo'},data);   //cookie
    },
    getBalanceDetail: function(data){
        return BaseResource.save({id:'getBalanceDetail'},data);   //cookie
    },
    balanceChange: function(data){
        return BaseResource.save({id:'balanceChange'},data);      //cookie number
    },
    batteryConfirm: function(data){
        return BaseResource.save({id:'batteryConfirm'},data);   //cookie orderID  isConfirm
    },
    getNoteList: function(){
        return NoteResource.get({id:'getNoteList'})
    },
    getNoteCount: function(){
        return NoteResource.get({id:'getNoteCount'})
    },
    addNote: function(data){
        return NoteResource.save({id:'addNote'},data);
    },
    getNoteDetail: function(id){

        return NoteResource.get({controller:'getNoteDetail',id:id});
    },
    updateNote: function(pack){
        
        
        return NoteResource.update({id:pack.id,controller:'updateNote'},pack.obj);
    },
    deleteNote: function(id){
        return NoteResource.remove({id:id,controller:'deleteNote'}); 
    },
    // getMe: function(){
    //     return UserResource.get({id:'me'})
    // }

}