$(function () {

    // 抽取的函数
    function getHistory() {
        var history = window.localStorage.getItem('search_history');
        // console.log(history);
        // 如果没有 弄一个空数组
        if (history == null) {
            history = [];
        } else {
            // 如果有 string->arr
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
        $('.history-list ul').html(template('searchList', history));
    }
    /*
        需求1
            点击搜索按钮 保存输入的内容 到localStroage中
            非空判断
                为空 提示 不跳转
                反之 跳转
    */
    $('form button').click(function (event) {
        // 获取输入的内容
        var searchValue = $(this).prev().val().trim();
        // console.log(searchValue);

        if (searchValue == "") {
            // 阻止默认行为
            event.preventDefault();
            // alert('哥们,请输入内容');
            mui.alert("兄弟,不要调皮哦", "友情提示", "我知道啦!", function (e) {
                console.log(e);
            });
            return false;
        }

        // 获取数据
        // window.localStorage.setItem('search_history',searchValue);
        var history = getHistory();

        // 判断数组中是否有这个数据
        var index = history.indexOf(searchValue);
        // console.log(index);
        if (index != -1) {
            // 这个数据是存在的
            history.splice(index, 1);
        }


        // 追加数据
        history.unshift(searchValue);

        // 数据常驻 保存到 localStorage中
        window.localStorage.setItem('search_history', JSON.stringify(history));

        // 渲染到页面上
        renderList();
    })

    /*
        需求2
            页面打开 渲染数据
    */
    renderList();

    /*
        需求3 
            点击xx 删除数据
    */
    $('.history-list').on('click', 'span.fa-close', function () {
        // 删除 数组中的 对应数据
        // console.log('click');
        // 获取数据
        var history = getHistory();

        // 删除数据 数组如何删除元素
        var clickIndex = $(this).parent().index();
        // console.log(clickIndex);
        history.splice(clickIndex, 1);
        // console.log(history);

        // 写入 localStorage
        window.localStorage.setItem('search_history', JSON.stringify(history));

        // 重新渲染
        renderList();
    })

    /*
        需求4
            清空数据
    */
    $('.searh-history span').last().click(function () {

        // 清空
        mui.confirm("你真的要这样!!!!!!", "淡定!!!", ["我确定", "算啦!"], function (e) {
            console.log(e);
            if (e.index == 0) {
                // 清除数据
                window.localStorage.removeItem('search_history');
                // 渲染页面
                renderList();
            }
        })


    })
})