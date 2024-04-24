---
title: 'm1,docker安装rabbitmq'
categories:
  - Dev
  - RabbitMq
tags:
  - Dev
  - RabbitMq
  - 'm1,docker安装rabbitmq'
cover: 'https://imgapi.xl0408.top?uuid=56360'
abbrlink: 56360
date: 2023-04-24 16:31:23
---

```bash
# 拉镜像
docker pull rabbitmq:3-management

# 运行容器。项目用到mqtt，所以额外开启了一个mqtt插件
docker run -d --name rabbitmq-3 -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=123456  -e RABBITMQ_PLUGINS_ENABLE=rabbitmq_mqtt rabbitmq:3-management
```
