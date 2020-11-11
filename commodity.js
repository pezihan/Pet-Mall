var moogoose = require('mongoose');


moogoose.connect('mongodb://localhost/petStore')

var Schema = moogoose.Schema;

//用户表
var usersSchema = new Schema({
    serial:{//商品编号
        type:Number,
        required:true
    },
    headline:{//商品标题
        type:String,
        required:true
    },
    imgSrc:{//主图地址
        type:String,
        required:true
    },
    unitCost:{//单价
        type:Number,
        required:true
    }
})

//直接导出模型构造函数
module.exports  = moogoose.model('Commodity',usersSchema);