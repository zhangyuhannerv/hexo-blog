---
title: 监听窗口的尺寸变化，动态刷新echarts图

categories:
  - Dev
  - JavaScript
  - Echarts
tags:
  - Dev
  - JavaScript
  - Echarts
  - 监听窗口的尺寸变化，动态刷新echarts图
abbrlink: 9557
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=371cec663c74443faff9e2524c0241ed
---

```js
window.onresize = function () {
  let chart = echarts.init(document.getElementById('id'))
  chart.resize()
}
```