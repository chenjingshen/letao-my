/**
 * Created by HUCC on 2017/11/14.
 */
$(function () {

  //发送ajax请求，获取个人信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function (data) {
      //如果没登录，跳转到登录页面
      tools.checkLogin(data);


      //渲染模板
      $(".userinfo").html( template("tpl", data) );

    }
  });


  //退出功能
  $(".lt_logout a").on("click", function () {

    //发送退出的ajax请求
    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function(data){
        if(data.success){
          location.href = "login.html";
        }

      }
    });

  });


});