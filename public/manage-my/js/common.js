$(function(){

    $.get('/employee/checkRootLogin',function(backdata){
        // console.log(backdata);
        if(backdata.error==400){
            window.location.href='./login.html';
        }
    })

    // 显示和隐藏左边头像
    $('a.glyphicon-align-justify').click(function(){
        $('#login-aside').toggle();
        $('#login-main').toggleClass('qiehuan');
    })


    // 弹出模态框
    $('.glyphicon-share').click(function(){
        $('.modal-tuichu').modal('show')
    })
    $('.modal-tuichu .btn-danger').click(function(){
        $('.modal-tuichu').modal('hide');
        // 调用登出接口
        $.get('/employee/employeeLogout',function(backdata){

            window.location.href='./login.html'
        })
    })

    $('span.glyphicon-list').parent('a').click(function(){
        // console.log(111);
        // console.log(this);
        $(this).siblings('ol').slideToggle();
    })
})