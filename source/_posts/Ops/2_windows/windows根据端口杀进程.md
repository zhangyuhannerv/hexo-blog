---
title: windows根据端口杀进程
categories:
  - Ops
  - windows
tags:
  - Ops
  - windows
  - windows根据端口杀进程
cover: 'https://imgapi.xl0408.top?uuid=48396'
abbrlink: 48396
date: 2023-03-06 15:47:44
---

以 8088 端口为例：

`netstat  -aon|findstr "8088"`

最后一列是 pid。假设为 5544

`taskkill /pid 5544 -t -f`