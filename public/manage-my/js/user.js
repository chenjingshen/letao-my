$(function(){
    // 当前页
    var myPageNum=1;
    // 页容量
    var myPageSize=5;
    function getdata(){
        // 页面打开，获取页面数据
        $.get('/user/queryUser',{page:myPageNum,pageSize:myPageSize},function(backdata){
            // console.log(backdata);
            $('tbody').html(template('user-tem',backdata));
            // 分页
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:myPageNum,//当前页
                totalPages:Math.ceil(backdata.total/backdata.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                  myPageNum=page;
                  //重新获取数据
                  getdata();
                }
              });
        })
    }
    getdata();


    // 禁用启用切换
    $('tbody').on('click','.btn',function(){
        // console.log(this);
        var id = $(this).parent('td').attr('data-id');
        var isDelete=null;
        if($(this).html()=="禁用"){
            isDelete=0;
        }else{
            isDelete=1;
        }
        $.ajax({
            url:"/user/updateUser",
            data:{
                id:id,
                isDelete:isDelete
            },
            type:"post",
            success:function(backdata){
                // console.log(backdata);
                getdata();
            }
        })
    })
})