$(function () {
    // 0.定义变量
    var myPageNum = 1;
    var myPageSize = 5;

    // 1页面打开 获取数据
    function getData() {
        $.ajax({
            url: "/product/queryProductDetailList",
            data: {
                page: myPageNum,
                pageSize: myPageSize,
            },
            success: function (backData) {
                // console.log(bacKData);
                // 渲染数据
                $('tbody').html(template('products', backData));
                // 初始化 分页控件
                $(".pagination").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        // 为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        // 重新获取数据
                        getData();
                    }
                });
            }
        })
    }
    // 默认调用一次 getData()
    getData();

    // 2.文件上传
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            $('<img style="width:100px;height:100px;" src="' + data.result.picAddr + '"/>').appendTo('form .form-group:last');

            // 加到了 3张
            if ($('form .form-group:last img').length == 3) {
                // 人为更新字段
                $('form').data('bootstrapValidator').updateStatus('pic1', 'VALID');
            }
        }
    });

    // 3.超出 禁止选择图片
    $('#fileUpload').click(function (event) {
        // 图片==3
        if ($('form .form-group:last img').length == 3) {
            // 阻止file的 默认行为
            event.preventDefault();
        }
        console.log('你点我啦');
    })

    // 4.双击 form 最下面的图片 删除自己
    $('form .form-group:last').on('dblclick', 'img', function () {
        console.log('你双击我啦');
        // 干掉自己
        $(this).remove();
    })

    // 5.数据验证
    $('form').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            proName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            oldPrice: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            price: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            proDesc: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            size: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            statu: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            num: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            brandId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
            // 数据验证
           
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log('成功了');

        // ajax 上传图片
        $.ajax({
            url:"/product/addProduct",
            data:$('form').serialize(),
            type:"post",
            success:function(backData){
                console.log(backData);
                // 清空表单
                $('form input').val('');
                $('.modal-add').modal('hide');

                // 重新渲染数据
                getData();
            }
        })
    });
})