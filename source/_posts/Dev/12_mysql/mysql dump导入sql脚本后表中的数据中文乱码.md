---
title: 'mysql dump导入sql脚本后表中的数据中文乱码'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'mysql dump导入sql脚本后表中的数据中文乱码'
---
解决办法：
加上--default-character-set=utf8参数即可
