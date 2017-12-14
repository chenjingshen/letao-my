$(function () {
    // 获取通过url传递过来的数据  key=value
    var searchKV = window.location.search.slice(1);
    var id = searchKV.split('=')[1];
    console.log(id);
    // ajax查询商品的详细信息
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (backdata) {
            console.log(backdata);
            // 调用模板引擎
            var result = template('product-tem', backdata);
            // 填入页面
            $('.mui-scroll').html(result);
            // 根据数据动态生成span30-45
            var startSize = parseInt(backdata.size.split('-' [0]));
            var endSize = parseInt(backdata.size.split('-')[1]);
            // 循环生成span
            for (var i = startSize; i <= endSize; i++) {
                $("<span>" + i + "</span>").appendTo('.size-list');
            }

            // 因为自己动态添加了轮播图需要自己手动初始化
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                // interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 为第一个 轮播点 增加 mui-active类名即可
            $('.mui-slider-indicator').children('div').first().addClass('mui-active');

            // 初始化 数字选择
            mui('.mui-numbox').numbox()
        }

    })
    // 点击尺码span高亮自己排他
    $('.mui-scroll').on('click', 'ul li:nth-child(3) span+span', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })


    // 点击加入购物车 如果没有登录会有提示 根据提示跳转到登录页即可
    $('#footer .mui-btn-danger').click(function(){
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:id,
                num:$(".mui-numbox-input").val(),
                size:$('span.active').html()
            },
            success:function(backdata){
                console.log(backdata);
                if(backdata.error==400){
                    window.location.href='./login.html';
                }
            }
        })
    })

})