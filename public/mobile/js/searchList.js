/**
 * Created by HUCC on 2017/11/13.
 */
$(function () {

  var currentPage = 1;
  var pageSize = 100;


  //1. 获取地址栏的参数，设置到文本框的value值
  var key = tools.getParam("key");
  $(".lt_search input").val(key);


  //封装一个函数，这个函数可以发送ajax请求，渲染页面
  function render() {
    //2. 发送ajax请求，获取关键字对应的商品结果

    //判断是否需要发送排序的参数, 获取选中的那个a标签的type属性。
    var type = $(".lt_sort a[data-type].now").data("type");
    var value = $(".lt_sort a[data-type].now").find("span").hasClass("fa-angle-down")?2:1;

    var obj = {};
    obj.proName = key;
    obj.page = currentPage;
    obj.pageSize = pageSize;

    //如果渲染时，发现排序字段有now的属性，说明需要排序
    if(type){
      obj[type] = value;
    }



    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (data) {


        setTimeout(function () {
          console.log(data);
          $(".lt_product").html(template("tpl", data));
        }, 1000);

      }
    });
  }

  render();


  //点击搜索按钮，需要获取到key，重新渲染
  $(".lt_search button").on("click", function () {
    //获取key
    key = $(".lt_search input").val().trim();
    if (key === "") {
      mui.toast("请输入搜索内容");
      return false;
    }


    //点击搜索的时候，需要清空排序的条件
    $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");



    $(".lt_product").html('<div class="loading"></div>');

    //重新渲染
    render();
  });


  //排序功能
  //1. 首先给 lt_sort下的a标签（带有data-type属性）注册点击事件
  //2. 如果当前a标签已经有now这个类，需要切换a标签的箭头方向
  //如果当前a标签没有now这个类，让当前a标签添加上这个类，同时移除其他a标签now这个类，并且让所有的a标签的箭头都向下
  /*$(".lt_sort a[data-type]").click(function () {
    var $this = $(this);

    if ($this.hasClass("now")) {
      //说明有这个类
      //找到当前a下的span，把fa-angle-down这个类改成fa-angle-up
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      //没有这个类
      $(this).addClass("now").siblings().removeClass("now");
      //让所有的a标签的箭头全部向下
      $(".lt_sort a").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }


    //获取排序字段
    var type = $this.data("type");
    //判断是下箭头的话，降序，value是2   否则value是1
    var value = $(this).find("span").hasClass("fa-angle-down") ? 2 : 1;

    var obj = {};
    obj[type] = value;
    obj.page = currentPage;
    obj.pageSize = pageSize;
    obj.proName = key;

    //2. 发送ajax请求，获取关键字对应的商品结果
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (data) {
        console.log(data);

        $(".lt_product").html(template("tpl", data));

      }
    });

  });*/


  //排序功能
  $(".lt_sort [data-type]").on("click", function () {

    //修改样式
    var $this = $(this);
    if($this.hasClass("now")){
      //换箭头
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
      $this.addClass("now").siblings().removeClass("now");
      //让所有的箭头都向下
      $(".lt_sort a").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    $(".lt_product").html('<div class="loading"></div>');
    render();

  });


});