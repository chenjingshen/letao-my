$(function () {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main-left'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3600, 1200, 1100, 2100]
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    var myChart2 = echarts.init(document.getElementById('main-right'));

    var data = [];

    for (var i = 0; i <= 360; i++) {
        var t = i / 180 * Math.PI;
        var r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
    }

    option2 = {
        title: {
            text: '极坐标双数值轴'
        },
        legend: {
            data: ['line']
        },
        polar: {
            center: ['50%', '54%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
            min: 0
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
        }],
        animationDuration: 2000
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);

})