---
title: 根据端口号查询占用pid

categories:
  - Ops
  - linux
  - general
tags:
  - Ops
  - linux
  - general
  - 根据端口号查询占用pid
abbrlink: 50070
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=24b98dc46e43420889dd5eda2bdfa0f7
---

```shell
netstat -nap|grep 8080
tcp6       0      0 :::8081                 :::*                    LISTEN      16996/java
kill -9 16996
```