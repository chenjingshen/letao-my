$(function () {

    $.get('/category/queryTopCategory', function (backdata) {
        // console.log(backdata);
        $('.content-left ul').html(template('left-tem', backdata));

        // 人为调用第一个a的点击事件，默认显示的是第一个a中的内容
        $('.content-left li').first().children('a').click();
    })

    // 点击左边的导航栏对应右边的内容
    $('.content-left ul').on('click', 'a', function () {
        var leftId = $(this).attr('data-id');
        $(this).parent().addClass('active').siblings().removeClass('active');
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:leftId},
            success:function(backdata){
                $('.content-right ul').html(template('right-tem',backdata));
            }
        })
    })
})