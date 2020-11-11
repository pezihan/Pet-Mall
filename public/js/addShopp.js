
    				/* 加入购物车 */
                    $(".shade-1 input").eq(0).click(function(){
                        location.assign("/shopping");
                    })
                    var specification = null;
                    $(".label_box").on("click","div",function(){
                        specification = $(this).html();
                    })
                    $(".btnos").click(function(){
                        if(specification == null){
                            alert("请选择产品规格");
                        }else if($(".Selct input").val() == ""){
                            alert("请填写收货地址")
                        }else{
                            var petShop = {
                            serial:add,//商品序号
                            specification:specification,//商品规格
                            amount:parseInt($(".box-up input").val()),//购买数量
                            shop:"邮寄方式",//消费门店
                            site:$(".Selct input").val(),//收货地址
                            ourl:window.location.pathname
                            }
                            $.ajax({
                                type:"post",
                                url:"/addShopping",
                                data:petShop,
                                dataType:"json",
                                success:function(data,statusText,xhr){
                                    if(data.success != 0){
                                        alert(data.message);
                                        location.assign("/login");
                                    }else{
                                        $("#shade").show();
                                    }
                                },
                                error:function(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
