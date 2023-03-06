---
title: '批量删除特定前缀key'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'redis'
  - 'redis-cli'
tags: 
  - 'Dev'
  - 'redis'
  - 'redis-cli'
  - '批量删除特定前缀key'
---
```shell
redis-cli --scan --pattern "ops-coffee-*" | xargs -L 2000 redis-cli del
```
其中xargs -L指令表示xargs一次读取的行数，也就是每次删除的key数量，一次读取太多xargs会报错
