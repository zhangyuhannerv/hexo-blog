---
title: 部署java项目

categories:
  - Ops
  - JAVA
tags:
  - Ops
  - JAVA
  - 部署java项目
abbrlink: 26055
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=7ecc116ca3df4055baba010b871a1869
---

将运行的 jar 错误日志信息输出到 log.file 文件中，然后（>&1）就是继续输出到标准输出(前面加的&，是为了让系统识别是标准输出)，最后一个&,表示在后台运行。

```shell
nohup java -jar 包名.jar  > log.file  2>&1 &
[1] 669 #669表示运行的pid
```