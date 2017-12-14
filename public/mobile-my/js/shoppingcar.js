$(function () {
    // 初始化下拉刷新 刷新获取数据
    mui.init({

        pullRefresh: {
            container: "#content", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // ajax获取购物车数据
                    $.ajax({
                        url: '/cart/queryCart',
                        success: function (backdata) {
                            console.log(backdata);
                            // 渲染页面
                            $('.mui-clearfix').html(template('car-tem', backdata));
                            setTimeout(function () {
                                mui('#content').pullRefresh().endPulldownToRefresh();
                            }, 1000);
                        }
                    })
                }
            }
        }
    })

    // 点击垃圾箱删除这一行 click配合侧滑 无法触发 需要使用tap事件
    $('.mui-clearfix').on('tap','span.fa-trash-o',function(){
        console.log('删');
        var removeId=$(this).attr('data-id');
        $.ajax({
            url:'/cart/deleteCart',
            data:{
                id:[removeId]
            },
            success:function(backdata){

                console.log(backdata);
                // 如果成功了
                if(backdata.success){
                    // 人为刷新一下
                    mui('#content').pullRefresh().pulldownLoading();
                }
            }
        })
    })

    // 计算总价格
    $('.mui-clearfix').on('click','input[type=checkbox]',function(){
        // 获取自己的金额
        var price = parseInt($(this).parent().next().find('span.price').html());
        console.log(price);
        // 数量
        var num = parseInt($(this).parent().next().find('span.num').html());
        console.log(num);
        // 总价
        var totalPrice=num*price;
        var currentMoney=parseInt($('#order i').html());
        if($(this).prop('checked')){
            // 设置给底部的span
            currentMoney+=totalPrice;
        }else{
            currentMoney-=totalPrice;
        }
        // 赋值给标签
        $('#order i').html(currentMoney);
    })

})