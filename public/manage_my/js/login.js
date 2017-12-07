$(function(){

    $('button[type="submit"]').on('click',function(event){
        event.preventDefault();
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$("form").serialize(),
            sucess:function(backdata){
                console.log(backdata);
            },
            error:function(){
                console.log(获取数据失败);
            }
        })
    })
})