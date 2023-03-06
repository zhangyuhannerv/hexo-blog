---
title: '监听窗口的尺寸变化，动态刷新echarts图'
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
  - '监听窗口的尺寸变化，动态刷新echarts图'
---
```js
window.onresize = function () {  
    let chart = echarts.init(document.getElementById("id"))
    chart.resize()
}
```
