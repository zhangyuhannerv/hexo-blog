---
title: '查看后台运行的java -jar项目的端口号，并杀死该进程'
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
  - '查看后台运行的java -jar项目的端口号，并杀死该进程'
---
```shell
lsof -i:8088Kill -9 pid
```
