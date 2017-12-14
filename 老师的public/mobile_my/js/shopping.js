$(function () {

    /*
        需求1
            初始化下拉刷新
            刷新获取数据
    */
    mui.init({
        pullRefresh: {
            container: ".lt_content", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // console.log('哈哈哈');
                    // mui('.lt_content').pullRefresh().endPulldown();
                    // ajax获取 购物车数据
                    $.ajax({
                        url: "/cart/queryCart",
                        success: function (backData) {
                            console.log(backData);
                            // 渲染页面
                            $("#OA_task_2").html(template('car', backData));
                            setTimeout(function () {
                                mui('.lt_content').pullRefresh().endPulldownToRefresh();
                            }, 400)
                        }
                    })



                } //pullfresh-function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    /*
        需求2
            点击垃圾箱 删除这一行
        click 配合侧滑 无法触发
        需要使用 tap
    */
    $('#OA_task_2').on('tap', 'span.fa-trash-o', function () {
        console.log('删');
        var removeId = $(this).attr('data-id');
        $.ajax({
            url: "/cart/deleteCart",
            data: {
                id: [removeId]
            },
            success: function (backData) {
                console.log(backData)
                // 如果成功了
                if (backData.success) {
                    // 人为刷新一下
                    mui('.lt_content').pullRefresh().pulldownLoading();
                }
            }
        })
    })

    /*
        需求3
            点击计算总价格
    */
    $('#OA_task_2').on('click', 'input[type=checkbox]', function () {
        // console.log('click');
        // 获取 自己的金额 
        var price = $(this).parent().next().find('span.price').html();
        console.log(price);
        // 数量
        var num = parseInt($(this).parent().next().find('span.num').html());
        console.log(num);
        // 总价
        var totalPrice = num * price;
        var currentMoney = parseInt($('.lt_order_list i').html());

        console.log($(this).prop('checked'));

        if ($(this).prop('checked')) {
            // true
            // console.log('add');
            // 设置给 底部的span
            currentMoney += totalPrice;
        } else {
            // false
            currentMoney -= totalPrice;
        }

        // 赋值给标签
        $('.lt_order_list i').html(currentMoney);

    })
})