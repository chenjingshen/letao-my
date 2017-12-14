/**
 * Created by HUCC on 2017/11/13.
 */
$(function () {

  //1. 获取参数中productId
  var productId = tools.getParam("productId");

  //2. 发送ajax请求，获取商品详情
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    success:function (data) {

      //var sizeArray = [];
      //var temp = data.size.split("-");
      //for(var i = +temp[0]; i <= temp[1]; i++){
      //  sizeArray.push(i);
      //}
      //
      //data.sizeArray = sizeArray;
      //
      console.log(data);

      $(".mui-scroll").html( template("tpl", data) );

      //渲染完成后，需要重新初始化轮播图
      mui(".mui-slider").slider({
        interval:1000
      });

      //注册事件，选择尺码
      $(".lt_size span").off().on("click", function () {
        $(this).addClass("now").siblings().removeClass("now");
      });


      //手动初始化数字框
      mui(".mui-numbox").numbox();

    }
  })



  //3. 添加到购物车
  $(".btn_add_cart").on("click", function () {
    //发送ajax请求


    //尺码
    var size = $(".lt_size span.now").html();
    if(!size){
      mui.toast("请选择商品的尺码");
      return false;
    }

    //库存
    var num = $(".mui-numbox-input").val();


    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:productId,
        size:size,
        num:num
      },
      success:function (data) {

        tools.checkLogin(data);

        if(data.success){
          //添加成功
          mui.confirm("添加商品成功","温馨提示",["去购物车","继续浏览"],function(e){
            if(e.index === 0){
              location.href = "cart.html";
            }
          });
        }
      }
    });


  });



});