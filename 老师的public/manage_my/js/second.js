$(function () {
    // 定义变量
    var myPageNum = 1;
    var myPageSize = 5;

    // 1.页面打开获取数据 渲染页面
    function getData() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData)
                $('tbody').html(template('second', backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        console.log(event) // 插件封装的事件参数
                        console.log(originalEvent); // 原始事件参数
                        console.log(type); // 点的按钮类型是什么
                        // 为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        // 重新获取数据
                        getData();
                    }
                });

            }
        })
    }

    // 默认调用一次
    getData();

    // ajax传文件回顾
    /*
        var xhr = new XMLHttpRequest();
        xhr.open('post','xxx.php');
        xhr.setRequestHeader();
        xhr.onload = function(){
            console.log(xhr.responseText);
        }
        // xhr2.0
        // formData 自动获取表单中的数据 有name属性
        var sendData = new FormData(document.querySelector('form'));
        // 额外的追加 数据
        sendData.append('icon',document.querySelector('input[type=file]').files[0]);
        xhr.send();

        $.ajax({
            data:sendData,
            // 忽视请求头
            processType:false,
            // 不对数据格式转换
            contentType:false
        })
    */

    // 2.初始化文件上传
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            console.log(data.result.picAddr);
            // 设置给img
            $('form img').attr('src', data.result.picAddr);
            // 设置给文件路径 input
            $('input[name=brandLogo]').val(data.result.picAddr);
            // 人为的更新字段的验证信息
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });

    // 3.页面打开 获取 分类数据 渲染到页面上
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 266
        },
        success: function (backData) {
            console.log(backData);
            // 代码清空
            $('.dropdown-menu').html('');
            // 循环随意的数组
            $.each(backData.rows, function (i, n) {
                // console.log(i+"|"+n);
                console.log(n);
                // 生成li>a
                var $li = $("<li><a data-id='" + n.id + "' href='javascript:void(0)'>" + n.categoryName + "</a></li>");

                // 添加到ul中
                $('.dropdown-menu').append($li);
            })
        }
    })

    // 4.绑定事件给ul
    $('.dropdown-menu').on('click', 'a', function () {
        // 点击的文本
        var clickName = $(this).html();
        console.log(clickName);
        // 显示选择的文本
        $('.select-value').html(clickName);
        // 设置发送的id
        $('input[name=categoryId]').val($(this).attr('data-id'));
        // 人为的更新状态 为成功
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 5.数据校验
    $('form').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            categoryId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            brandName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            brandLogo: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        console.log('成功了');
        $.ajax({
            url:"/category/addSecondCategory",
            data:$("form").serialize(),
            type:"post",
            success:function(backData){
                console.log(backData);
                // 重新获取数据 页面不会刷新
                getData();

                // 关闭modal
                $('.modal-add').modal('hide');
                // 清空表单数据
                $("form").data('bootstrapValidator').resetForm();
                $('form input').val('');
                $('form img').attr('src','./images/none.png');
                $('.select-value').html('请选择');

                // 刷新页面
                // window.location.reload();
                // window.location.href = window.location.href;

            }
        })

    });
})