/**
 * Created by HUCC on 2017/11/14.
 */
$(function () {

  //1. 获取验证码
  $(".btn_getcode").on("click", function (e) {
    e.preventDefault();

    var $this = $(this);
    //只要一点击，我们需要先禁用按纽
    $(this).addClass("disabled").prop("disabled", true).text("正在发送中....");


    //发送ajax请求
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (data) {
        //我们获取到验证码，直接打印，相当于手机获取到了验证
        console.log(data.vCode);

        //开启倒计时，让用户60秒后可以再次点击
        var count = 5;
        var timer = setInterval(function () {
          count--;
          $this.text(count + "秒后再次发送");

          //如果count小于等于0了，恢复
          if (count <= 0) {
            $this.removeClass("disabled").prop("disabled", false).text("获取验证码");
            //清除定时器
            clearInterval(timer);
          }
        }, 1000);

      }
    });

  });


  //2. 注册
    //思路：
    // 1. 给注册按钮注册点击事件
    // 2. 获取表单数据
    // 3. 对表单数据做验证
    // 4. 验证成功后，发送ajax请求
    // 5. 注册成功后，跳转到登录页面

  $(".btn_register").on("click", function () {
    //获取表单数据
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();


    if(!username){
      mui.toast("请输入用户名");
      return false;
    }

    if(!password){
      mui.toast("请输入密码");
      return false;
    }

    if(!repassword){
      mui.toast("请输入确认密码");
      return false;
    }

    if(password != repassword){
      mui.toast("两次密码不一致");
      return false;
    }

    if(!mobile){
      mui.toast("请输入手机号");
      return false;
    }

    //正则校验不通过
    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast("请输入正确的手机号");
      return false;
    }


    //校验验证码
    if(!vCode){
      mui.toast("请输入验证码");
      return false;
    }


    //发送ajax请求
    $.ajax({
      type:"post",
      url:"/user/register",
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function (data) {
        if(data.success){
          mui.toast("恭喜你，注册成功，一秒后跳转到登录页");
          setTimeout(function () {
            location.href = "login.html";
          },1000);
        }else {
          mui.toast(data.message);
        }
      }
    });


  });

});