$(function(){
    /*
        需求1
            点击登陆按钮登陆
    */ 
    $('form button[type=submit]').click(function(event){
        event.preventDefault();
        $.ajax({
            url:"/user/login",
            data:$('form').serialize(),
            type:"post",
            success:function(backData){
                console.log(backData);
                if(backData.success){
                    mui.toast("欢迎回来");
                    setTimeout(function(){
                        // 从哪来 回哪去
                        window.history.back();
                    },1000)
                }else{
                    mui.toast("你是本人吗!!!!😘");
                }
            }
        })
    })
})