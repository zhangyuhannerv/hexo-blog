---
title: 配置openOffice

categories:
  - Ops
  - linux
  - centos
tags:
  - Ops
  - linux
  - centos
  - 配置openOffice
abbrlink: 62612
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=336dea2731e045cd85c04c3934a3627d
---

1.  下载 tar.gz 包。下载地址：[http://www.openoffice.org/zh-cn/](http://www.openoffice.org/zh-cn/) (需要下载 rpm 格式的)

2.  通过 xftp 上传到 linux 中。我的目录在/opt/openoffice 中
3.  解压文件：tar -zxvf Apache_OpenOffice_4.1.6_Linux_x86-64_install-rpm_zh-CN.tar.gz，解压后进入 zh-CN 目录中。
4.  cd RPMS/ 里面都是 rpm 文件，我们需要安装这些文件
5.  安装 rpm 文件： rpm -ivh \*.rpm
6.  进入 desktop-integration/目录：cd desktop-integration/
7.  安装 openoffice:rpm -ivh openoffice4.1.6-redhat-menus-4.1.6-9790.noarch.rpm
8.  安装成功后会在/opt 下出现一个 openoffice4 文件。
9.  启动服务

    ```shell
     /opt/openoffice4/program/soffice -headless -accept="socket,host=127.0.0.1,port=8100;urp;" -nofirststartwizard
    ```

10. 查看启动状态
    ```shell
    ps -ef|grep openofficenetstat -lnp |grep 8100
    ```