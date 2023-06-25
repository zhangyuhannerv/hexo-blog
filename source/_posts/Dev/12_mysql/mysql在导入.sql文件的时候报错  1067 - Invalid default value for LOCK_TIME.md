---
title: mysql在导入.sql文件的时候报错  1067 - Invalid default value for LOCK_TIME

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - TIME_‘
abbrlink: 60814
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=cc8b286347a94c4eb7c993ba447473bf
---

推荐使用以下的方式永久修改

编辑 mysql 的配配置文件 my.cnf

在\[mysqld\]下面添加如下列：

```properties
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```