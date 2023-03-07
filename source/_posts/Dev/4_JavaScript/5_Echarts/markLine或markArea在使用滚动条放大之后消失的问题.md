---
title: markLine或markArea在使用滚动条放大之后消失的问题

categories:
  - Dev
  - JavaScript
  - Echarts
tags:
  - Dev
  - JavaScript
  - Echarts
  - markLine或markArea在使用滚动条放大之后消失的问题
abbrlink: 37931
date: 2023-03-06 15:47:44
---

- 问题：水平的 markLine 或者 markArea 当使用 dataZoom 放大的时候。只要 markLine/markArea 不完全在当前缩放的范围内（有部分在）那么它们就会整体消失
- 解决方式：官方没有给出真正的解决方式。临时解决方式如下

  监听滚动条的滚动，获得使用滚动条缩放 echarts 缩放后的范围（x 轴的最小值和最大值）。根据后台请求的 markLineData/markAreaData 重新计算边界。如果某个 markLine/markArea 的左侧边界小于缩放后的 x 轴左侧边界，那么就将它的左侧边界放大到 x 轴的左侧边界。右侧同理。替换掉原先的标记 series。

  **注意：重新 setOption()时，可以合并原先的 option（noMerge:false)。因为只是重绘 markLine/markArea,没必要销毁原先的所有组件，并重新创建新的组件。同时如果有内置滚动条的情况下，必须指定(silent:true)（不抛出事件）,否则使用内置滚动条放大 echarts 后，每次左右平移只能移动一点点，因为只要移动就会进入到滚动条监听事件里，而监听事件里又有 setOption()会打断平移操作**

  示例代码

  ```js
  charts.off('dataZoom')
  charts.on('dataZoom', function (params) {
    let opt = charts.getOption()
    let startValuex = Math.ceil(opt.dataZoom[0].startValue) // x轴左侧向上取整
    let endValuex = Math.floor(opt.dataZoom[0].endValue) // x轴右侧向下取整
    let markLineData = [] // 新的markLine数组
    echartsData.lineStruData.forEach((e) => {
      // echartsData.lineStuData是后台传回来的标线数据[[{name:'',xAxis:100},{xAxis:200}].]
      let startCoordMile = e[0].xAxis
      let endCoordMie = e[1].xAxis
      if (e[0].xAxis < startValuex && e[1].xAxis > startValuex) {
        startCoordMile = startValuex
      }

      if (e[0].xAxis < endValuex && e[1].xAxis > endValuex) {
        endCoordMie = endValuex
      }

      markLineData.push({
        xAxis: startCoordMile
      })

      markLineData.push({
        xAxis: endCoordMie
      })

      markLineData.push([
        {
          xAxis: startCoordMile,
          yAxis: yMax,
          symbol: 'arrow',
          name: e[0].name,
          label: {
            show: true,
            position: 'middle'
          }
        },
        {
          xAxis: endCoordMie,
          yAxis: yMax,
          symbol: 'arrow'
        }
      ])
    })
    opt.series[opt.series.length - 1].markLine.data = markLineData
    charts.setOption(opt, {
      // noMerge默认值为false，不用显示的写出
      silent: true
    })
  })
  ```
