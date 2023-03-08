---
title: 安装nginx

categories:
  - Ops
  - linux
  - ubuntu
tags:
  - Ops
  - linux
  - ubuntu
  - 安装nginx
abbrlink: 31907
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=6c6714492bba4c649f3cb17d5462f7ac
---

```shell
# 切换至root用户
sudo su root
apt-get install nginx
```

查看 nginx 是否安装成功

```shell
nginx -v
```

启动 nginx

```shell
service nginx start #方式1
/usr/sbin/nginx #方式2
```

结束 nginx

```shell
service nginx stop #方式1
/usr/sbin/nginx -s stop #方式2
```

重启 nginx

```shell
service nginx reload #方式1
/usr/sbin/nginx -s reload #方式2
```

**注意：nginx 方式 1 和方式 2 不能互相调用**

nginx 文件安装完成之后的文件位置：

- /usr/sbin/nginx：主程序
- /etc/nginx：存放配置文件
- /usr/share/nginx：存放静态文件
- /var/log/nginx：存放日志