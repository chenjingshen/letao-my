$(function(){
    $('button').click(function(){
        $.ajax({
            url:'/user/logout',
            success:function(bacKData){
                console.log(bacKData);
                if(bacKData.success){
                    window.location.href = './login.html';
                }
            }
        })
    })
})