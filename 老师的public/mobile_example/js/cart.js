/**
 * Created by HUCC on 2017/11/14.
 */
$(function () {

  //思路
  // 1. 发送ajax请求，获取购物车数据
  //2. 下拉刷新功能
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识
      //下拉刷新
      down : {
        //下拉时，会触发这个function
        auto:true,
        callback:function(){

          //发送ajax请求
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (data) {
              setTimeout(function () {
                tools.checkLogin(data);
                console.log(data);
                $(".mui-table-view").html( template("tpl", {data:data}) );

                $(".lt_total .total").html("00.00");

                //结束下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000);
            }
          });

        }
      }
    }
  });



  //删除功能
  //1. 给删除按钮注册委托事件
  //2. 获取到当前购物车的id
  //3. 发送ajax请求，删除成功之后，重新渲染页面
  $(".lt_content").on("tap", ".btn_delete_cart", function () {

    //获取到当前的id
    var id = $(this).data("id");

    mui.confirm("您是否要删除这件商品?","温馨提示",["是","否"],function (e) {
      if(e.index === 0){
        //发送ajax请求
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{
            id:id
          },
          success:function (data) {
            if(data.success){
              //成功之后，需要手动的下拉刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });



  });




  //编辑功能
  //1. 给编辑按钮注册点击事件
  //2. 获取到当前的id
  //3. 发送ajax请求，获取当前商品的详细的信息
  //4. 修改信息
  //5. 点击确定按钮，发送ajax请求，保存
  //6. 重新渲染
  $(".lt_content").on("tap", ".btn_edit_cart", function () {

    var data = this.dataset;

    //渲染一个模板，修改商品
    var html = template("tpl2", data);
    //去除html中所有的换行，
    html = html.replace(/\n/g, "");

    //显示confirm框
    mui.confirm(html,"编辑商品",["确定","取消"], function (e) {
      if(e.index === 0){
        //点击了确定按钮，获取参数，发送ajax请求
        var id = data.id;
        var size = $(".lt_edit_size span.now").html();
        var num =  $(".lt_edit_num .mui-numbox-input").val();

        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function (data) {
            if(data.success){
              //手动下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });

    //选择尺码，lt_edit_size下span注册
    $(".lt_edit_size span").on("tap", function () {
      $(this).addClass("now").siblings().removeClass("now");
    });


    //初始化数字框
    mui(".mui-numbox").numbox();


  });



  //给要所有的checkbox注册点击事件
  $(".lt_content").on("change", ".ck", function () {

    //获取到选中的checkbox

    //计算总金额
    var total = 0;
    $(".ck:checked").each(function () {

      //获取当前元素的价钱和数量。
      total += this.dataset.price * this.dataset.num;

    });

    //保留2位小数
    $(".lt_total .total").html(total.toFixed(2));

  });

});