//项目中专门用来启动数据库 

var moogoose = require('mongoose');


moogoose.connect('mongodb://localhost/petStore')

var Schema = moogoose.Schema;

//订单数据数据库集合
var orderFormSchema  = new Schema({
    userid:{//用户id(服务器生成)
        type:String,  
        required:true
    },
    serial:{//商品序号
        type:Number,
        required:true
    },
    specification:{//商品规格
        type:String,
        required:true
    },
    amount:{//购买数量
        type:Number,
        required:true
    },
    sum:{//商品总价格(服务器生成)
        type:Number,
        required:true
    },
    orderNumber :{//订单编号(服务器生成)
        type:Number,
        required:true
    },
    creationTime:{//创建时间(服务器生成)
        type:String,
        required:true
    },
    shop:{//消费门店
        type:String,
        required:true
    },
    site:{//收货地址
        type:String,
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
    status:{//状态
        type:Number,
        required:true
    }
})

//直接导出模型构造函数
module.exports = moogoose.model('OrderForm',orderFormSchema);