$(function () {
    /*
        需求1
            获取通过url传递过来的数据
    */
    var searchKV = window.location.search.slice(1); //?key=value
    var id = searchKV.split('=')[1];
    console.log(id);

    /*
        需求2
            ajax查询商品的详细信息
    */
    $.ajax({
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function (backData) {
            console.log(backData);
            // 调用模板引擎
            var result = template('product', backData);
            console.log(result);

            // 填入页面
            $('.mui-scroll').html(result);

            // 根据数据 生成span 30-45
            var startSize = parseInt(backData.size.split('-')[0]);
            var endSize = parseInt(backData.size.split('-')[1]);

            for(var i = startSize;i<=endSize;i++){
                // console.log(i);
                $("<span class='size'>"+i+"</span>").appendTo('.size-list');
            }


            // 因为自己动态添加了 轮播图 需要自己手动初始化
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                // interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 为第一个 轮播点 增加 mui-active类名即可
            $('.mui-slider-indicator').children('div').first().addClass('mui-active');

            // 初始化 数字选择
            mui('.mui-numbox').numbox()

            // mui('.mui-scroll-wrapper').scroll({
            //     deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
            //     indicators: false //是否显示滚动条
        
            // });

            
        }
    })

    /*
        需求3
            点击尺码span  高亮自己 排他
    */ 
    $(".mui-scroll").on('click','span.size',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })

    /*
        需求4
            点击加入购物车
            如果没用登陆 会有提示 
            根据提示 跳转到 登陆页即可
    */ 
    $(".lt_footer .mui-btn-danger").click(function(){
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:id,
                num:$(".mui-numbox-input").val(),
                size:$('span.active').html(),
            },
            success:function(bacKData){
                console.log(bacKData);
                if(bacKData.error==400){
                    window.location.href = './login.html';
                }

            }
        })
    })
})