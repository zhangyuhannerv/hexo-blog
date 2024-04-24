---
title: 'm1,docker安装mysql5.7'
categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - 'm1,docker安装mysql5.7'
cover: 'https://imgapi.xl0408.top?uuid=2459'
abbrlink: 2459
date: 2024-04-24 15:19:11
---

mysql5.7版本没有适合arm架构的docker镜像
但是网上大佬说x86镜像的mysql5.7一样能在macbook m1上运行
自己试验了，果然可以。整理一下

```bash
# 拉取镜像（--platform linux/x86_64一定要加，要不然会报错，提示搜不到适合arm架构的mysql:5.7镜像）
docker pull --platform linux/x86_64 mysql:5.7

# 建立目录
mkdir /Users/zhangyuhan/Work/dev-env/mysql-5.7/log
mkdir /Users/zhangyuhan/Work/dev-env/mysql-5.7/data
mkdir /Users/zhangyuhan/Work/dev-env/mysql-5.7/conf

# 建立配置文件
vim /Users/zhangyuhan/Work/dev-env/mysql-5.7/conf/my.cnf

# 归纳整理mysql:5.7的一些通用配置
[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4

[mysqld]
init_connect="SET collation_connection = utf8mb4_unicode_ci"
init_connect="SET NAMES utf8mb4"
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
bind-address = 0.0.0.0
port=3306
sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
lower_case_table_names=1


# 运行容器(在配置文件保存之后)
docker run -p 3306:3306 --name mysql-5.7 --network els \
-v /Users/zhangyuhan/Work/dev-env/mysql-5.7/log:/var/log/mysql \
-v /Users/zhangyuhan/Work/dev-env/mysql-5.7/data:/var/lib/mysql \
-v /Users/zhangyuhan/Work/dev-env/mysql-5.7/conf:/etc/mysql \
--restart=always \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```
