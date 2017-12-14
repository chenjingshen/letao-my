$(function () {
    /*
        需求1
            获取 url中的数据
            填充到 搜索框中    
            window.location.href 获取整个url 太长了
            window.location.search 获取 搜索的地址
    */
    // console.log(window.location.href);
    console.log(window.location.search);
    // 如果只写第一个 那么 只是切割 返回 切好的数据
    var searchString = window.location.search.slice(1);
    console.log(searchString)
    var result = searchString.split('=');
    // console.log(result);
    var searchKey = result[1];
    // 解决中文编码问题 
    searchKey = decodeURI(searchKey);

    // 设置到input中
    $('form input').val(searchKey);


    /*
        需求2
            ajax搜索数据
            渲染页面
    */
    function getData(option) {
        // 添加类名
        $('.lt_content').addClass('loading');
        // 清除所有内容
        $('.product-list ul').html('');

        $.ajax({
            url: "/product/queryProduct",
            data: {
                page: 1,
                pageSize: 998,
                proName: option.searchKey,
                // 逻辑短路 或
                price: option.priceOrder || 2,
                // 价格排序
                num: option.numOrder || 2
            },
            success: function (bacKData) {
                console.log(bacKData);
                setTimeout(function () {
                    $('.product-list ul').html(template('product', bacKData));
                    // 移除类名
                    $('.lt_content').removeClass('loading');

                }, 2000)
            }
        })
    }

    getData({
        searchKey: searchKey
    });


    /*
        需求3
            点击form 中的button
            ajax获取数据
    */
    $('form button').click(function (e) {
        e.preventDefault();

        // 获取 自己的兄弟的数据
        // 调用函数
        getData($(this).prev().val())
    })

    /*
        需求4
            点击切换 箭头 颜色
    */
    $('.price-option').click(function () {
        // 切换class
        $(this).parent().toggleClass('active');
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
    /*
        需求5
            点击切换 箭头 颜色
    */
    $('.num-option').click(function () {
        // 切换class
        $(this).parent().toggleClass('active');
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

    /*
        需求6
            点击立即购买 去详情页
            同时带上id
    */ 
    $('.product-list').on('click','button',function(){
        var id =$(this).attr("data-id");
        // console.log(id);
        window.location.href = './product.html?id='+id;
    })
})