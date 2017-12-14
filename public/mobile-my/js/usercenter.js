$(function(){
    // 退出登录
    $('button').click(function(){
        $.get('/user/logout',function(backdata){
            console.log(baackdata);
            if(backdata.success){
                window.location.href='./login.html';
            }
        })
    })
})