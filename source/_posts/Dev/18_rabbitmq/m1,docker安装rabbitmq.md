---
title: 'm1,docker安装rabbitmq'
categories:
  - Dev
  - RabbitMq
tags:
  - Dev
  - RabbitMq
  - 'm1,docker安装rabbitmq'
cover: 'https://www.loliapi.com/acg/?uuid=56360'
abbrlink: 56360
date: 2024-04-24 16:31:23
---

## 基本安装

```bash
# 拉镜像
docker pull rabbitmq:3-management

# 运行容器。
# 项目用到mqtt，所以额外开启了一个mqtt插件
# 可以把--network去掉，或者自己建个自定义网络els
docker run -d --name rabbitmq-3 --network els -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=123456  -e RABBITMQ_PLUGINS_ENABLE=rabbitmq_mqtt rabbitmq:3-management
```

## 开启延时插件

首先下载并启动镜像

```bash
docker pull rabbitmq:3.10.6-management

docker run -d \
--name rabbitmq \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin \
-p 15672:15672 -p 5672:5672 -p 25672:25672 -p 61613:61613 -p 1883:1883 \
rabbitmq:3.10.6-management
```

下载插件到本地磁盘

[点击下载](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.2/rabbitmq_delayed_message_exchange-3.10.2.ez)

将下载的插件移动到容器的plugins目录

```bash
## 进入到下载目录
docker cp rabbitmq_delayed_message_exchange-3.10.2.ez rabbitmq:/plugins
```

启动插件

```bash
docker exec -it rabbitmq /bin/bash
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
# 执行完毕后退出
exit
```

最后检查是否有x-delayed-message类型的交换机
