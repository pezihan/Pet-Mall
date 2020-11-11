var express = require('express');
var router = require('./router');

var session = require('express-session');

var bodyParser = require('body-parser');

var app =  express();

app.use('/node_modules',express.static('./node_modules/'));
app.use('/public',express.static('./public/'));

app.engine('html',require('express-art-template'));

//配置模板引擎和body-parser一定要在挂在路由之间
//配置body-parser 中间件 (插件，专门用来解析表单POST请求体)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

//把路由容器挂载到app服务中
app.use(router); 

app.use(function(req,res){
    res.send('<h1>页面丢失了</h1>');
})

app.listen(3000,function(){
    console.log('The pet store has been successfully launched,running 3000....')
})