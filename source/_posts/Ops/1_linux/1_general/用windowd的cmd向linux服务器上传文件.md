---
title: 用windowd的cmd向linux服务器上传文件

categories:
  - Ops
  - linux
  - general
tags:
  - Ops
  - linux
  - general
  - 用windowd的cmd向linux服务器上传文件
abbrlink: 31381
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=11b7e47df4284123b70e2d6c5ff33302
---

示例代码

```shell
scp -P 221 D:\hussar-web-2.2.0.war root@123.123.122.138:/opt/tomcat8/webapps/
```

城轨项目的使用的上传 war 包用：

```shell
scp -P 221 D:\Work\workProject\dtjc\target\hussar-web-2.2.0.war root@123.123.122.138:/opt/tomcat8/webapps/
```

说明：
其中 221 是端口，123.123.122.138 是 ip，root 是登陆用户，D:\hussar-web-2.2.0.war 是文件路径,/opt/tomcat8/webapps/是服务器存储上传文件的路径

_**网上拷贝**_

---

1、上传本地文件到服务器

```shell
scp -P 221 /path/filename username@servername:/path/
```

例如 scp /var/www/test.php root@192.168.0.101:/var/www/ 把本机/var/www/目录下的 test.php 文件上传到 192.168.0.101 这台服务器上的/var/www/目录中

2、从服务器下载文件

下载文件我们经常使用 wget，但是如果没有 http 服务，如何从服务器上下载文件呢？

```shell
scp -P 221 username@servername:/path/filename /var/www/local_dir（本地目录）
```

例如 scp root@192.168.0.101:/var/www/test.txt 把 192.168.0.101 上的/var/www/test.txt 的文件下载到/var/www/local_dir（本地目录）

3、从服务器下载整个目录

```shell
scp -P 221 -r username@servername:/var/www/remote_dir/（远程目录） /var/www/local_dir（本地目录）
```

例如:scp -r root@192.168.0.101:/var/www/test /var/www/

4、上传目录到服务器

```shell
scp -P 221 -r local_dir username@servername:remote_dir
```

例如：scp -r test root@192.168.0.101:/var/www/ 把当前目录下的 test 目录上传到服务器的/var/www/ 目录