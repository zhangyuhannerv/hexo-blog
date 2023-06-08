---
title: 查看cpu核心数

categories:
  - Ops
  - linux
  - general
tags:
  - Ops
  - linux
  - general
  - 查看cpu核心数
abbrlink: 1698
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=8ee4b864344942f28fdf1a2281c87cb8
---

查看物理 cpu 数目

```shell
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
```

查看每个物理 cpu 里的核数

```shell
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

查看 cpu 逻辑核心数（cpu 数量\*每个 cpu 的核数）

```shell
cat /proc/cpuinfo| grep "processor"| wc -l
```

[原文链接](https://blog.csdn.net/qq_38880380/article/details/79638252)