---
title: 后台接口返回的数据出现了$ref，$data.xxx的字样

categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - 后台接口返回的数据出现了$ref，$data.xxx的字样
abbrlink: 54591
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=8e6a7b0a907541aeb0aaaefcf2810990
---

分析原因：个人理解是如果后台返回了个 map,map 里面放了两个 key 值，但是这两个 key 所对应的 value 指向的是同一个目标地址，概括为两个 key 所对应的 value 是同一个，或者说一个 value 对象（值相同，地址相同）用 map 的两个 key 值存储，那么返回前台时，第二个 key 的值不会是 value 而是第一个 key 的 value 的地址。

可以简单理解为：map 里面有重复的 value,那么就会出现如标题所示的字样。