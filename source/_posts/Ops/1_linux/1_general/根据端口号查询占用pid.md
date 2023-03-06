---
title: '根据端口号查询占用pid'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Ops'
  - 'linux'
  - 'general'
tags: 
  - 'Ops'
  - 'linux'
  - 'general'
  - '根据端口号查询占用pid'
---
```shell
netstat -nap|grep 8080
tcp6       0      0 :::8081                 :::*                    LISTEN      16996/java
kill -9 16996
```
