---
title: Linux下文档类型转PDF乱码解决方式

categories:
  - Ops
  - linux
  - centos
tags:
  - Ops
  - linux
  - centos
  - Linux下文档类型转PDF乱码解决方式
abbrlink: 29596
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=afd8a1b1dec942c5adb54ba83e2d587d
---

在 Linux 系统下进行文本类型转 PDF 时出现乱码。
![20210708223956.png](https://s2.loli.net/2023/03/08/HpV2Lmv5bAFQgPD.png)

解决方案：

1. 安装 fontconfig

   安装命令：

   yum –y install fontconfig

2. 在/usr/share/fonts 目录下新建一个目录 chinese

   操作命令：

   cd /usr/share/fonts

   mkdir chinese

   cd chinese

3. 修改文件夹权限

   操作命令：

   chmod -R 755 /usr/share/fonts/chinese/

4. 将本地字体上传至服务器

   操作步骤：

   1. 将 C:\Windows\Fonts 目录下的字体拷贝到一个新建文件夹（因为文件夹权限无法直接上传，所以需要创建一个新建文件夹）
   2. 将需要的字体上传到服务器的/usr/share/fonts/chinese 目录下

5. 安装 ttmkfdir

   安装命令：

   yum -y install ttmkfdir

   ttmkfdir -e /usr/share/X11/fonts/encodings/encodings.dir

6. 修改 fonts.conf 配置文件

   操作命令：

   vi /etc/fonts/fonts.conf

   ```xml
   <!-- Font directory list -->
   <dir>/usr/share/fonts</dir>
   <dir>/usr/share/X11/fonts/Type1</dir> <dir>/usr/share/X11/fonts/TTF</dir> <dir>/usr/local/share/fonts</dir>
   <dir prefix="xdg">fonts</dir>
   <dir>/usr/share/fonts/chinese</dir> #这里是你要添加的路径
   <!-- the following element will be removed in the future -->
   <dir>~/.fonts</dir>
   ```

7. 刷新 Liunx 字体缓存

   操作命令：

   mkfontdir

   mkfontscale

   fc-cache –fv

   fc-list :lang=ZH

8. 重启服务器(完成配置)（注意：第 7 步完成之后如果生效了。那么就不用之行第 8 步了）

[原文链接](https://blog.csdn.net/weixin_45606229/article/details/111060060)