//项目中专门用来启动数据库 

var moogoose = require('mongoose');


moogoose.connect('mongodb://localhost/petStore')

var Schema = moogoose.Schema;

//用户表数据库集合
var usersSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//直接导出模型构造函数
module.exports = moogoose.model('user',usersSchema);