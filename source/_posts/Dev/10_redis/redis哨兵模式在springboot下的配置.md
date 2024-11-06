---
title: redis哨兵模式在springboot下的配置
categories:
  - Dev
  - redis
tags:
  - Dev
  - redis
  - 哨兵
  - sentinel
cover: 'https://www.loliapi.com/acg/?uuid=2684'
abbrlink: 2684
date: 2024-02-23 16:20:15
---

springboot连接单体的redis配置如下

```yml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password:
```

但是如果是redis哨兵模式，那么上述配置会报错，无法连接redis。

正确连接redis哨兵模式在springboot中的配置如下

```yml
# Redis连接信息
spring:
  redis:
    database: 0     # Redis数据库索引（默认为0）
    password:   
    # timeout: 5000   # Redis超时时间（单位：毫秒）
    sentinel:
      master: mymaster   # Sentinel主节点名称
      nodes: 192.168.10.11:26379,192.168.10.12:26379,192.168.10.13:26379   # Sentinel节点地址列表
      # 注意端口是26379，即哨兵模式的端口，不是6379，redis服务的端口
```
