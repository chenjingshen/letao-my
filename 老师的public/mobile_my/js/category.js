$(function(){
    /*
        需求1
            页面打开 获取数据
            渲染页面
            默认高亮第一个
    */
    $.ajax({
        url:"/category/queryTopCategory",
        success:function(backData){
            console.log(backData);
            $('.content_left ul').html(template("leftList",backData));
            // 人为调用第一个a的 点击事件
            $('.content_left li').first().children('a').click();
        }
    })

    /*
        需求2
            点击高亮
            tap 早期为了解决click延迟
            click延迟 基本没有了  
                设置视口
            ajax获取对应的分类数据

    */ 
    $('.content_left ul').on("click",'a',function(){
        // 高亮自己
        // 排他
        $(this).parent().addClass('active').siblings().removeClass('active');

        // 获取 当前点击的 
        var clickId = $(this).attr('data-id');
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:clickId
            },
            success:function(bacKData){
                console.log(bacKData);
                // 渲染页面
                $('.content_right ul').html(template('rightList',bacKData));
            }
        })
    })
})