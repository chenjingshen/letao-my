$(function () {

    // 点击登录按钮登录
    $('button[type=submit]').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/user/login',
            data: $('form').serialize(),
            type: 'post',
            success: function (backdata) {
                console.log(backdata);
                if (backdata.success) {
                    mui.toast('登录成功');
                    setTimeout(function () {
                        // 从哪来回哪去
                        window.history.back();
                    }, 1000);
                } else {

                    mui.toast('你是本人吗！');
                }

            }
        })
    })

})