/**
 * Created by kennyhu on 2018/4.
 */

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon')

var app = new express();
var port = process.env.PORT || 8400;

app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(path.join(__dirname,'public','icon-192.png')))

app.get('*',function(req,res){
    return res.sendFile(__dirname + '/public/index.html')
})

app.listen(port,function(err){
    if(err){
        console.log(err)
    }
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
})