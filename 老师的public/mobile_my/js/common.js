// 入口函数
$(function () {
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
		indicators: false //是否显示滚动条

	});
	// 测试
	// console.log('zepto的入口函数')
	// zepto->jQuery 基本医用

	// 所有的放大镜 点击都去 搜索页面
	$('span.fa-search').on('tap',function(){
		console.log('tap');
		window.location.href = './search.html';
	})

	$('span.fa-home').on('tap',function(){
		window.location.href = './index.html';
	})

	// 点击返回箭头 回到上一次的历史记录
	$('span.fa-chevron-left').on('tap',function(){
		// 通过history back 上一次
		// 通过history forward 前一次
		window.history.back();
		// window.history.forward()
		// window.history.go(-2);
	})

})