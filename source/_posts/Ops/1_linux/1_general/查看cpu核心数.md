---
title: '查看cpu核心数'
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
  - '查看cpu核心数'
---
查看物理cpu数目

```shell
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
```

查看每个物理cpu里的核数

```shell
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

查看cpu逻辑核心数（cpu数量*每个cpu的核数）

```shell
cat /proc/cpuinfo| grep "processor"| wc -l
```

[原文链接](https://blog.csdn.net/qq_38880380/article/details/79638252)
