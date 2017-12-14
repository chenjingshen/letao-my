$(function () {
    /*
           需求1
               获取 url中的数据
               填充到 搜索框中    
               window.location.href 获取整个url 太长了
               window.location.search 获取 搜索的地址
       */

    console.log(window.location.search);
    // 如果只是写第一个，那么只是切割返回切割好的数据 去掉问号
    var searchString=window.location.search.slice(1);
    var result=searchString.split('=');
    var searchKey=result[1];
    // 解决中文编码问题
    searchKey=decodeURI(searchKey);
    // 设置到input中
    $('form input').val(searchKey);

    // ajax获取数据 渲染页面
    function getData(option){
        // 添加类名
        $('#content').addClass('loading');
        // 清除所有内容
        $('.content-goods ul').html('');
        $.ajax({
            url:'/product/queryProduct',
            data:{
                page: 1,
                pageSize: 998,
                proName: option.searchKey,
                // 逻辑短路 或
                price: option.priceOrder || 2,
                // 价格排序
                num: option.numOrder || 2
            },
            success:function(backdata){
                console.log(backdata);
                setTimeout(function(){
                    $('.content-goods ul').html(template('searchlist-tem',backdata));
                    // 移除类名
                    $('#content').removeClass('loading');
                },1000)
            }
        })
    }
    getData({
        searchKey:searchKey
    });

    // 点击form中的button ajax获取数据
    $('form button').click(function(e){
        e.preventDefault();
        // 调用函数或缺自己兄弟的数据
        getData($(this).prev().val());
    })

    // 点击切换箭头和颜色
    $('.price-option').click(function(){
        // 增加calss
        $(this).parent().addClass('active');
        // 切换自己的类名
        $(this).children('span').toggleClass("fa-angle-up").toggleClass('fa-angle-down');


        // 箭头朝下 降序
        if ($(this).children('span').hasClass('fa-angle-down')) {
            getData({
                searchKey: searchKey,
                priceOrder: 2
            });
        } else {
            // 箭头朝上 升序
            getData({
                searchKey: searchKey,
                priceOrder: 1
            });
        }
    })

    // 点击切换箭头和颜色
    $('.num-option').click(function(){
        // 增加calss
        $(this).parent().addClass('active');
        // 切换自己的类名
        $(this).children('span').toggleClass("fa-angle-up").toggleClass('fa-angle-down');


        // 箭头朝下 降序
        if ($(this).children('span').hasClass('fa-angle-down')) {
            getData({
                searchKey: searchKey,
                numOrder: 2
            });
        } else {
            // 箭头朝上 升序
            getData({
                searchKey: searchKey,
                numOrder: 1
            });
        }
    })


    // 点击立即购买去详情页 同事带上id
    $('.content-goods').on('click','input',function(){
        var id=$(this).attr('data-id');
        console.log(id);
        window.location.href='./product.html?id='+id;
    })

})