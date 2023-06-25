---
title: 查看后台运行的java -jar项目的端口号，并杀死该进程

categories:
  - Ops
  - linux
  - general
tags:
  - Ops
  - linux
  - general
  - 查看后台运行的java -jar项目的端口号，并杀死该进程
abbrlink: 58898
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=0dc71164065c470b8c74e05f3bdb1619
---

```shell
lsof -i:8088Kill -9 pid
```