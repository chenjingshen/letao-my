$(function () {
    var pagenum = 1;
    var pageSize = 5;

    function getdata() {
        // 页面打开，获取页面数据
        $.get('/category/querySecondCategoryPaging', {
            page: pagenum,
            pageSize: pageSize
        }, function (backdata) {
            // console.log(backdata);
            $('tbody').html(template('second-tem', backdata));
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


    // 初始化文件上传
    $("#fileUpload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
        //   console.log(data.result.picAddr);
          // 设置给img
          $('form img').attr('src',data.result.picAddr);
        //   设置给文件路径
        $('input[name=brandLogo]').val(data.result.picAddr);
        // 认为的更新字段的验证信息
        $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
      });

    //   页面打开，获取分类数据
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:266
        },
        success:function(backdata){
            // console.log(backdata);
            $('.dropdown-menu').html('');
            // 生成下拉框的内容
            $.each(backdata.rows,function(i,n){
                // console.log(i);
                // console.log(n);
                // 生成li然后添加到dropdown-menu中去
                var $li = $("<li><a data-id='" + n.id + "' href='javascript:void(0)'>" + n.categoryName + "</a></li>");
                console.log($li);
                // 添加到ul中
                $('.dropdown-menu').append($li);
            })
        }
    })


    // 给ul绑定点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        // 点击的文本
        var clickName = $(this).html();
        console.log(clickName);
        // 显示选择的文本
        $('#dropdownMenu1').html(clickName);
        // 设置发送的id
        $('input[name=categoryId]').val($(this).attr('data-id'));
        // 人为的更新状态 为成功
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })


     // 初始化带单验证插件
    //使用表单校验插件
    $('form').bootstrapValidator({
        // 指定校验时的图标显示，默认是bootstrap风格
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart', 
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类不能为空'
                    },
                },
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    },
                },
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                },
            },
        },
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            type:'post',
            success:function(backdata){
                console.log(backdata);
                // 重新获取数据
                getdata();
                // 关闭modal
                $('.motaikuang').modal('hide');
                // 清空表单数据
                $('form').data('bootstrapValidator').resetForm();
                $('form input').val('');
                $('form img').attr('src','./image/none.png');
                $('#dropdownMenu1').html('请选择');
            }
        })
    });
})

// 刷新页面的2种方式
// window.location.reload();
// window.location.href=window.location.href;
