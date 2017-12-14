/**
 * Created by HUCC on 2017/11/11.
 */

//区域滚动功能
mui(".mui-scroll-wrapper").scroll({
  indicators: false
});


//轮播图自动播放功能
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
});


//封装了一个tools工具类，里面提供了getParamObj可以获取所有的参数，返回一个对象
//getParam方法，传进来一个key，返回对应的值。
var tools = {
  getParamObj: function () {
    // bom中有一个内置对象  location 对应了浏览器的地址栏。

    //通过location.search 可以获取到地址栏的参数
    var search = location.search;

    //1. 获取参数，如果有中文，需要对地址进行解码， decodeURI
    search = decodeURI(search);

    //2. 把参数的?截取掉  slice substr substring
    //截取从start 到 end，不包含end
    search = search.slice(1);  //不一样的地方：slice可以传负数  substring不可以传负数

    //3. 需要把search参数转换成obj对象，方便获取任意参数
    var arr = search.split("&");
    var obj = {};

    //遍历arr数组，把数组中=前面的当成obj的属性名  把数组中=后面的当前obj的属性值
    for (var i = 0; i < arr.length; i++) {
      var k = arr[i].split("=")[0];//属性名
      var v = arr[i].split("=")[1];//属性值
      obj[k] = v;
    }
    return obj;
  },
  getParam: function (key) {
    return this.getParamObj()[key];
  },
  //检测用户是否登录
  checkLogin:function (data) {
    if(data.error === 400){
      location.href = "login.html?retUrl="+location.href;
    }
  }
  //作业：var obj = {name:"zs", age:18, desc:"呵呵"}  转换成字符串  name=zs&age=18&desc=呵呵
}