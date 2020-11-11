var fs = require('fs');
var User = require('./petStore');//用户登录注册集合
var Shop = require('./petStoreshop');//购物车集合
var Comm = require('./commodity');//商品集合

//专门用来包装路由的
var express = require('express');
const { json } = require('body-parser');

//1.创建一个路由容器
var router = express.Router();

var oTop = null;//上一次页面记录
router.get('/',function(req,res){
    res.redirect('/public/index.html');
})

router.get('/login',function(req,res){
    res.render('login.html')
})

//注册
router.post('/login',function(req,res){
    User.findOne({
        username:req.body.username
    },function(err,data){
        if(err){
            return res.status(500).json({
                success:500,
                message:'服务器忙'
            });
        }
        if(data){
            return res.status(200).json({
                success:1,
                message:'用户名已被注册'
            });
        }

         new User(req.body).save(function(err){
            if(err){
                return res.status(500).json({
                    success:500,
                    message:'服务器忙'
                });
            }
            res.status(200).json({
                success:0,
                message:'注册成功'
            })
        });
    })
})

//登录
router.post('/register',function(req,res){
    User.findOne({
        username:req.body.username,
        password:req.body.password
    },function(err,user){
        if(err){
            return res.status(500).json({
                success:500,
                message:'服务器忙'
            });
        } 
        if(!user){
            return res.status(200).json({
                success:1,
                message:'用户名或密码错误'
            });
        }

        //登录成功，通过Session记录登录状态
        req.session.user = user;
        res.status(200).json({
            success:0,
            message:'登录成功',
            oTop:oTop
        })
        oTop = null;
    })
})

router.get('/shopping',function(req,res){//跳转到购物车
    var verify = req.session.user;//从浏览器获取session验证
    if(verify){
        Shop.find({
            $or:[{userid:verify._id}&&{status:200}]
        },function(err,data){
            if(err){
                return res.static(500).send('Server error.');
            }
            res.render('shopping.html',{
                shop:data
            })
        })
    }else{
        res.redirect('/login');
    }
})

router.get('/Allorders',function(req,res){//跳转到购物车
    var verify = req.session.user;//从浏览器获取session验证
    if(verify){
        Shop.find({
            $or:[{userid:verify.id}&&{status:300}]
        },function(err,data){
            if(err){
                return res.static(500).send('Server error.');
            }
            res.render('allorders.html',{
                shop:data
            })
        })
    }else{
        res.redirect('/login');
    }
})


router.post('/addShopping',function(req,res){//商品加入购物车
     var verify = req.session.user;//从浏览器获取session验证
   oTop = req.body.ourl;
    delete req.body.ourl;
    if(verify){
        User.findOne({
            username:verify
        },function(err,data){
            if(err){
                return res.status(500).json({
                    success:400,
                    message:'用户数据错误，请重新登录！'
                });
            }
            Comm.findOne({
                serial:req.body.serial
            },function(err,data){
                if(err){
                    return res.status(500).json({
                        success:1,
                        message:'没有此条商品数据'
                    });
                }

                function numTestCode(n){//生成数字随机码
                    var arr = [];
                    for(var i = 0;i < n;i++){
                        var num = parseInt(Math.random()*10);
                        arr.push(num);
                    }
                    return arr.join("");
                }
                var dateTimes = new Date();
                dateTime = dateTimes.getFullYear()+ '-' + (dateTimes.getMonth()+ 1) + '-' + dateTimes.getDate() + ' ' + dateTimes.getHours() + ':' + dateTimes.getMinutes() + ':' + dateTimes.getSeconds();

                req.body.userid = verify._id;
                req.body.creationTime = dateTime;
                req.body.orderNumber = numTestCode(12);
                req.body.sum = data.unitCost * req.body.amount;
                req.body.headline = data.headline;
                req.body.imgSrc = data.imgSrc;
                req.body.status = 200;
               
                new Shop(req.body).save(function(err){
                if(err){
                    return res.status(500).json({
                        success:500,
                        message:'服务器忙,订单提交失败'
                    });
                }
                res.status(200).json({
                    success:0,
                    message:'添加成功'
                })
            });
            })
        });
    }else{
        res.status(200).json({
            success:1,
            message:'请先登录'
        })
    }
})

//删除单条订单数据
router.post('/deleteorderForm',function(req,res){
    var verify = req.session.user;//从浏览器获取session验证
    var str = req.body.id;
    if(verify){
        Shop.remove({
            _id:str
        },function(err){
            if(err){
                return res.status(500).json({
                    success:500,
                    message:'服务器忙，请稍后重试'
                });  
            }
            res.status(200).json({
                success:0,
                message:'删除成功'
            })
        })
    }else{
        res.status(200).json({
            success:1,
            message:'服务器错误'
        })
    }
})

//批量删除订单数据
router.get('/deleteorderForms',function(req,res){
    var verify = req.session.user;//从浏览器获取session验证
    var deles = req.query.id;
    if(verify){
        Shop.remove({
            _id:{$in:deles}
        },function(err){
            if(err){
                return res.status(500).json({
                    success:500,
                    message:'服务器忙，请稍后重试'
                });  
            }
            res.status(200).json({
                success:0,
                message:'删除成功'
            })
        })
    }else{
        res.status(200).json({
            success:1,
            message:'服务器错误'
        })
    }
})

router.post('/condition',function(req,res){//导航栏获取用户名
    var verify = req.session.user;//从浏览器获取session验证
    if(verify){
        res.status(200).json({
            success:0,
            message:verify.username
        })
    }else{
        res.status(200).json({
            success:1,
            message:"点击登录"
        }) 
    }
})

router.get("/shoppings",function(req,res){//订单支付
    var verify = req.session.user;//从浏览器获取session验证
    var deles = req.query.id;
     if(verify){
         var conditions = {_id:deles};
         var update = {$set:{status:300}};
        Shop.updateMany(conditions,update,function(err){//批量更新   update只更新单条
            if(err){
                return res.status(500).json({
                    success:500,
                    message:'服务器忙，请稍后重试'
                });  
            }
            res.status(200).json({
                success:0,
                message:'支付成功'
            })
        })
     }else{
         res.status(200).json({
             success:1,
             message:'请先登录'
         })
     }
})

router.get("/exit",function(req,res){//退出登录
    req.session.user = null;//清除登录状态
    res.status(200).json({
        success:0,
        message:"已清除登录状态"
    })
})
module.exports = router;