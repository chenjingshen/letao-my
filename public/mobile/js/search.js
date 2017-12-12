/**
 * Created by HUCC on 2017/11/13.
 */

$(function () {


  function getHistory() {
    //1. 先获取到localStorage的记录,如果获取时，发现没有这条记录，给一个默认值，就是空数组
    var history = localStorage.getItem("lt_search_history") || '[]';
    //转换成数组，返回
    return JSON.parse(history);
  }

  function render() {
    //渲染的搜索历史列表
    //1. 获取搜索历史
    var arr = getHistory();
    //使用模板渲染出来
    var html = template("tpl", {arr: arr});
    $(".lt_history").html(html);
  }


  //页面加载渲染一次
  render();


  //清空操作
  $(".lt_history").on("click", ".btn_empty", function () {
    //1. message
    //2. title
    //3. btnValue 注意是一个数组
    //4. 点击确认或者取消会执行
    mui.confirm("您确定要清空历史记录吗？", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        //1. 删除lt_search_history
        localStorage.removeItem("lt_search_history");
        //2. 重新渲染
        render();
      }
    });


  });


  //删除操作
  $(".lt_history").on("click", ".btn_delete", function () {

    var $this = $(this);

    mui.confirm("您确定要删除这条历史吗?", "温馨提示", ["否", "是"], function (e) {
      if (e.index === 1) {

        //1. 获取下标
        var index = $this.data("index");
        //2. 获取历史记录
        var arr = getHistory();
        //3. 删除数组的对应下标
        // pop()：删除最后一个   shift():删除第一个
        // slice() 截取数组（不会改变数组）
        // splice() 拼接数组(会改变元素)
        arr.splice(index, 1);
        console.log(arr);
        //4. 重新设置lt_search_history
        localStorage.setItem("lt_search_history", JSON.stringify(arr));

        //5. 重新渲染
        render();
      }
    })

  });


  //增加操作
  $(".lt_search button").on("click", function () {

    //清除两边的空格
    var key = $(".lt_search input").val().trim();
    //清空原来的记录
    $(".lt_search input").val('');
    if (key === "") {
      mui.toast("请输入搜索内容");
      return false;
    }


    //获取历史记录
    var arr = getHistory();

    //添加到历史记录中的第一个
    //判断key在数组中是否存在，如果存在，删除即可。
    var index = arr.indexOf(key);//获取key在arr中第一次出现的索引
    if (index != -1) {
      //存在，删除
      arr.splice(index, 1);
    }

    //如果数组的长度>=10，删除最后一个
    if (arr.length >= 10) {
      arr.pop();
    }


    //无论如何，都需要把数据添加第一项
    arr.unshift(key);


    //重新存储到lt_search_history
    localStorage.setItem("lt_search_history", JSON.stringify(arr));

    //重新渲染
    render();


    //让页面跳转到搜索结果页面, 并且把搜索的内容传递过去
    location.href = "searchList.html?key="+key;


  });


});