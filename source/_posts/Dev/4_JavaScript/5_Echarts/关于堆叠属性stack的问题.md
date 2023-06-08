---
title: 关于堆叠属性stack的问题

categories:
  - Dev
  - JavaScript
  - Echarts
tags:
  - Dev
  - JavaScript
  - Echarts
  - 关于堆叠属性stack的问题
abbrlink: 43700
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=6bb973df8e1d4b8394d077a945219043
---

1.  多系列的柱状图 stack 如果是数字且越小，该系列的每根柱子越靠前；
2.  但是如果 stack 为 0，那么该系列的每根柱子都会被放到最后；
3.  这是一个需要注意的问题！！！！！！！！！