$(function () {

    function getHistory() {

        var history = window.localStorage.getItem('search_history');
        // console.log(history);
        // 如果没有，弄一个空数组
        if (history == null) {
            history = [];
        } else {
            // 如果有，将字符串转化成数组
            history = JSON.parse(history);
        }
        // 返回
        return history;
    }
    // 渲染到页面上
    function renderList() {
        // 获取历史记录
        var history = getHistory();
        // 渲染
        $('.history-list ul').html(template('search-tem', history));
    }

    /*需求一
        点击搜索按钮 保存输入的内容 到localStroage中
        非空判断
            为空提示不跳转，反之跳转
    */
    $('form button').click(function (event) {
        // 获取输入的内荣 prev找到上一个兄弟元素
        var searchValue = $(this).prev().val().trim();
        if (searchValue == "") {
            // 阻止默认行为
            event.preventDefault();
            // 用mui的提示框来写事件
            mui.alert('请输入内容', '友情提示', '我知道啦', function (e) {
                // console.log(e);
            });
            return false;
        }

        // 获取数据
        var history = getHistory();
        // 判断数组中是否有这个数据
        var index = history.indexOf(searchValue);
        if (index != -1) {
            // 这个数据是存在的
            history.splice(index, 1);
        }
        // 追加数据
        history.unshift(searchValue);
        // 数据常驻 保存到localStorage中
        window.localStorage.setItem('search_history', JSON.stringify(history));
        // 渲染到页面上
        renderList()
    })
    // 页面打开渲染数据
    renderList();
    // 点击xx删除数据
    $('.history-list').on('click','i.mui-icon-closeempty',function(){
        // 删除数组中的对应数据
        // 获取数据
        var history=getHistory();
        // 删除数据 数组如何删除元素
        var clickIndex=$(this).parent().index();
        history.splice(clickIndex,1);
        // 写入localStorage
        window.localStorage.setItem('search_history', JSON.stringify(history));
        // 重新渲染
        renderList();
    })

    // 清空数据
    $('.search-history i').click(function(){
        // 清空
        mui.confirm('你确定要全部清空密吗','淡定',['我确定','算啦'],function(e){
            // console.log(e);
            // 清除数据
            if(e.index==0){
                window.localStorage.removeItem('search_history');
            }
            // 渲染页面
            renderList();
        })
    })


})