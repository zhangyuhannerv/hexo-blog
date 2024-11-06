---
title: category-line的两种数据类型所绘制图形不同的问题
categories:
  - Dev
  - JavaScript
  - Echarts
tags:
  - Dev
  - JavaScript
  - Echarts
  - category-line的两种数据类型所绘制图形不同的问题
cover: https://www.loliapi.com/acg/?uuid=2224
abbrlink: 2224
date: 2023-04-18 10:14:34
---

## 第一种配置项：xAxis和series的data分开  

```js
option = {
  xAxis: {
    type: 'category',
    data: ['a','a']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150,150],
      type: 'line'
    }
  ]
};
```
渲染出来的结果：一条横线
![line-simple.png](https://s2.loli.net/2023/04/18/9Gnikd7csS4mg1J.png)

## 第二种配置项：xAxis不设置data，series的data设置为二维数组

```js
option = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [
        ['a', 150],
        ['a', 170],
        ['b', 150],
        ['a', 180]
      ],
      type: 'line'
    }
  ]
};

```

渲染出来的结果：一条竖线
![line-simple.png](https://s2.loli.net/2023/04/18/AmT96RI1UN7uvFg.png)

## 结论

对于category轴而言：
一维数组横坐标无论是否相同会依次排列
二维数组横坐标相同会画在一条竖线上
