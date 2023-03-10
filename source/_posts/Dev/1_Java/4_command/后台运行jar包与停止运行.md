---
title: 后台运行jar包与停止运行

categories:
  - Dev
  - Java
  - command
tags:
  - Dev
  - Java
  - Java command
  - 后台运行jar包与停止运行
abbrlink: 5084
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=19ac02aec09c47e3b86b29a405e6bab9
---

将运行的 jar 错误日志信息输出到 log.file 文件中，然后（>&1）就是继续输出到标准输出(前面加的&，是为了让系统识别是标准输出)，最后一个&,表示在后台运行。

```shell
nohup java -jar 包名.jar  > log.file  2>&1 &
[1] 669 #669表示运行的pid
```