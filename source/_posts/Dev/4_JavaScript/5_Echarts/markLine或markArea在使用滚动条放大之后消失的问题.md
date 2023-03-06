---
title: 'markLine或markArea在使用滚动条放大之后消失的问题'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'Echarts'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'Echarts'
  - 'markLine或markArea在使用滚动条放大之后消失的问题'
---
-   问题：水平的markLine或者markArea当使用dataZoom放大的时候。只要markLine/markArea不完全在当前缩放的范围内（有部分在）那么它们就会整体消失
    
-   解决方式：官方没有给出真正的解决方式。临时解决方式如下
    
    监听滚动条的滚动，获得使用滚动条缩放echarts缩放后的范围（x轴的最小值和最大值）。根据后台请求的markLineData/markAreaData重新计算边界。如果某个markLine/markArea的左侧边界小于缩放后的x轴左侧边界，那么就将它的左侧边界放大到x轴的左侧边界。右侧同理。替换掉原先的标记series。
    
    **注意：重新setOption()时，可以合并原先的option（noMerge:false)。因为只是重绘markLine/markArea,没必要销毁原先的所有组件，并重新创建新的组件。同时如果有内置滚动条的情况下，必须指定(silent:true)（不抛出事件）,否则使用内置滚动条放大echarts后，每次左右平移只能移动一点点，因为只要移动就会进入到滚动条监听事件里，而监听事件里又有setOption()会打断平移操作**
    
    示例代码
	```js
	charts.off('dataZoom');
	charts.on('dataZoom', function (params) {
	    let opt = charts.getOption();
	    let startValuex = Math.ceil(opt.dataZoom[0].startValue);// x轴左侧向上取整
	    let endValuex = Math.floor(opt.dataZoom[0].endValue);// x轴右侧向下取整
	    let markLineData = [];// 新的markLine数组
	    echartsData.lineStruData.forEach(e => {// echartsData.lineStuData是后台传回来的标线数据[[{name:'',xAxis:100},{xAxis:200}].]
	        let startCoordMile = e[0].xAxis;
	        let endCoordMie = e[1].xAxis;
	        if (e[0].xAxis < startValuex && e[1].xAxis > startValuex) {
	            startCoordMile = startValuex;
	        }
	
	        if (e[0].xAxis < endValuex && e[1].xAxis > endValuex) {
	            endCoordMie = endValuex;
	        }
	
	        markLineData.push({
	            xAxis: startCoordMile
	        })
	
	        markLineData.push({
	            xAxis: endCoordMie
	        })
	
	        markLineData.push([{
	            xAxis: startCoordMile,
	            yAxis: yMax,
	            symbol: 'arrow',
	            name: e[0].name,
	            label: {
	                show: true,
	                position: 'middle'
	            },
	        }, {
	            xAxis: endCoordMie,
	            yAxis: yMax,
	            symbol: 'arrow',
	        }])
	    })
	    opt.series[opt.series.length - 1].markLine.data = markLineData;
	    charts.setOption(opt, {
	        // noMerge默认值为false，不用显示的写出
	        silent: true,
	    });
	})
	```
