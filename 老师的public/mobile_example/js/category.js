/**
 * Created by HUCC on 2017/11/11.
 */

$(function () {

  //发送ajax请求，获取一级分类的数据
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (data) {
      console.log(data);

      var html = template("tpl", data);
      $(".lt_category_l .mui-scroll").html( html );

      //渲染完一级分类后，渲染二级分类（默认渲染data.rows[0]）
      renderSecond(data.rows[0].id);
    }
  });


  //渲染哪个一级分类下的二级分类
  function renderSecond(id){
    $.ajax({
      type:"get",
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function (data) {
        console.log(data);
        var html = template("tpl2", data);
        $(".lt_category_r .mui-scroll").html( html );

      }
    });
  }


  //给一级分类下的所有的li标签注册委托事件
  $(".lt_category_l").on("click", "li", function () {
    $(this).addClass("now").siblings().removeClass("now");
    //动态渲染二级分类
    var id = $(this).data("id");
    renderSecond(id);


    //滚动到顶部
    //获取页面中的滚动实例，有两个，我们需要第二个
    var temp = mui('.mui-scroll-wrapper').scroll()[1];
    //让第二个滚动滚动0，0位置
    temp.scrollTo(0,0,500);//100毫秒滚动到顶
  });

});
