---
title: redis主从、哨兵、集群搭建
categories:
  - Ops
  - redis
tags:
  - Ops
  - redis
  - redis主从
  - redis哨兵
  - redis集群
cover: 'https://imgapi.xl0408.top?uuid=30107'
abbrlink: 30107
date: 2024-02-29 11:28:01
---

[博客参考](https://blog.csdn.net/weixin_47062656/article/details/123187627)

引申：如何给redis主从、哨兵模式添加认证密码

注意：如果三台服务器已经启动了主从和哨兵，那么需要先在三台服务器上关闭所有的哨兵，再在三台服务器上关闭所有的主从

服务器关闭顺序要求：先关从节点（从节点之间不分顺序），再关主节点

如果不知道哪个是主节点，可以通过redis-cli进入redis控制台输入`info replication`查看主节点的ip

```bash
#查看redis服务和哨兵的进程命令：
ps -ef|grep redis
```

* redis服务的关闭命令如下：

```bash
./redis-cli shutdown
```

* redis哨兵的关闭命令如下

```bash
kill -9 哨兵进程
```

配置认证密码在上面博客配置的基础上执行如下步骤：

1. 三台服务器的redis.conf添加如下配置

```conf
requirepass "123456"

masterauth "123456"
```

2. 三台服务器sentinel.conf添加如下配置

```conf
# 在上面博客里已经配置了
sentinel monitor mymaster 10.13.181.97 6379 2


# 新增的配置，要求写在上面配置的下面
sentinel auth-pass mymaster 123456
```

3. 启动

先按照特定顺序启动redis主从模式

先启动redis主节点redis服务

再启动redis的两台从节点（不分顺序）redis服务

都启动完成后进入主节点的redis.cli

依次执行下面的命令查看主从情况

```bash
auth 123456

info replication
```

主从没问题后再启动三台服务器的哨兵服务（先主后从）

在任意一台服务器上查看哨兵情况

```bash
redis-cli -p 26379 info Sentinel
```

完成
