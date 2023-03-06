---
title: '后台运行jar包与停止运行'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'Java'
  - 'command'
tags: 
  - 'Dev'
  - 'Java'
  - 'command'
  - '后台运行jar包与停止运行'
---
将运行的jar 错误日志信息输出到log.file文件中，然后（>&1）就是继续输出到标准输出(前面加的&，是为了让系统识别是标准输出)，最后一个&,表示在后台运行。

```shell
nohup java -jar 包名.jar  > log.file  2>&1 &
[1] 669 #669表示运行的pid
```
