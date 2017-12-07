$(function () {
    // 测试代码
    // $('button[type="submit"]').on('click',function(event){
    //     event.preventDefault();
    // $.ajax({
    //     url:'/employee/employeeLogin',
    //     type:'post',
    //     data:$("form").serialize(),
    //     success:function(backdata){
    //         console.log(backdata);
    //     },
    //     error:function(){
    //         console.log(获取数据失败);
    //     }
    // })
    // })

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
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback: {
                        message: '用户名错误'
                    },
                },
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码错误'
                    },
                },
            },
        },
    });
}).on('success.form.bv', function (e) {
    e.preventDefault();
    //开启进度条
    NProgress.start();
    //使用ajax提交逻辑
    $.ajax({
        url: '/employee/employeeLogin',
        type: 'post',
        data: $("form").serialize(),
        success: function (backdata) {
            console.log(backdata);
            //正确
            if (backdata.success == true) {
                window.location = './index.html';
            } else {
                var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
                // 用户名错误
                if (backdata.error == 1000) {
                    validator.updateStatus('username', 'INVALID', 'callback')
                } else if (backdata.error == 1001) {
                    validator.updateStatus('password', 'INVALID', 'callback')
                }
            }
            setTimeout(function(){
                //关闭进度条
                NProgress.done();
            }, 1000);
        }
    })
});


// 为重置表单绑定点击事件
$('button[type=reset]').on('click',function(){
    // console.log(111);
    var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
    validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
})