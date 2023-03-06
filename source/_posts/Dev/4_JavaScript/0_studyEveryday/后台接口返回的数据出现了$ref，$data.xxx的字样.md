---
title: '后台接口返回的数据出现了$ref，$data.xxx的字样'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
  - '后台接口返回的数据出现了$ref，$data.xxx的字样'
---
分析原因：个人理解是如果后台返回了个map,map里面放了两个key值，但是这两个key所对应的value指向的是同一个目标地址，概括为两个key所对应的value是同一个，或者说一个value对象（值相同，地址相同）用map的两个key值存储，那么返回前台时，第二个key的值不会是value而是第一个key的value的地址。

可以简单理解为：map里面有重复的value,那么就会出现如标题所示的字样。
