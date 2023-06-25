---
title: 利用jar命令修改jar包中文件的内容
cover: 'https://imgapi.xl0408.top?uuid=33806'
categories:
  - Dev
  - Java
  - Java command
tags:
  - Dev
  - Java
  - Java command
  - 利用jar命令修改jar包中文件的内容
abbrlink: 33806
date: 2023-03-10 18:08:00
---

## 查找需要修改jar包中的application.yml文件路径

```shell
[root@test ~]# jar tf test.jar | grep application.yml
BOOT-INF/classes/application.yml
```
## 导出jar包中的application.yml文件
```shell
[root@test ~]# jar xf test.jar BOOT-INF/classes/application.yml
[root@test ~]# ll
drwxr-xr-x   3 root root        21 6月  28 14:54 BOOT-INF

[root@test ~]# tree BOOT-INF
BOOT-INF
└── classes
    └── application.yml

1 directory, 1 file
```
## 修改编辑导出的配置文件
```shell
[root@test ~]# vim BOOT-INF/classes/application.yml
```
## 将修改后的文件重新打入jar包
```shell
[root@test ~]# jar uf test.jar BOOT-INF/classes/application.yml
```

