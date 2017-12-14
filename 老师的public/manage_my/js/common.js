$(function () {

    // // 判断是否登陆
    // // [判断用户是否登陆]
    // $.ajax({
    //     url: '/employee/checkRootLogin',
    //     success: function (backData) {
    //         console.log(backData);
    //         // 如果success 为true 登陆
    //         // 如果error 为400 打回 login
    //         if (backData.error == 400) {
    //             window.location.href = './login.html';
    //         }
    //     }
    // })

    // 找到header中的第一个a 点击 隐藏左边 变大 右边
    $(".lt_main a.glyphicon-qrcode").first().click(function () {
        $('.lt_aside').toggle();
        $('.lt_main').toggleClass("fullScreen");
    })

    // 弹出确认modal
    $(".lt_main a.glyphicon-log-out").click(function () {
        // js 弹框
        $('.modal-sure').modal('show');
    })

    // 关闭modal 调用登出接口
    $('.modal-sure button.btn-danger').click(function () {
        // js 关框
        $('.modal-sure').modal('hide');
        // 调用登出接口
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (backData) {
                // 去login
                window.location.href = './login.html';
            }
        })

    })

    // 侧边栏 展开 收起
    $('.lt_aside ul >li:eq(1)>a').click(function(){
        console.log('你点我啦');
        $(this).siblings('ol').slideToggle();
    })
})