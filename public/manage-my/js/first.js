$(function () {
    var pagenum = 1;
    var pageSize = 5;

    function getdata() {
        // 页面打开，获取页面数据
        $.get('/category/queryTopCategoryPaging', {page: pagenum,pageSize: pageSize}, function (backdata) {
            // console.log(backdata);
            $('tbody').html(template('first-tem', backdata));
            // 分页
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: pagenum, //当前页
                totalPages: Math.ceil(backdata.total / backdata.size), //总页数
                size: "small", //设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    pagenum = page;
                    //重新获取数据
                    getdata();
                }
            });
        })
    }
    // 默认就调用一次
    getdata();

    // 初始化带单验证插件
    //使用表单校验插件
    $('form').bootstrapValidator({
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    },
                },
            },
        },
    }).on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/category/addTopCategory',
        data: $('form').serialize(),
        type: 'post',
        success: function (backdata) {
            console.log(backdata);
            $('.motaikuang').modal('hide');
            $('form input').val('');
            // 重新获取当前页数据
            getdata();
        }
    })
});
})