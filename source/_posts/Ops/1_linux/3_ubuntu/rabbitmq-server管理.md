---
title: rabbitmq-server管理

categories:
  - Ops
  - linux
  - ubuntu
tags:
  - Ops
  - linux
  - ubuntu
  - rabbitmq-server管理
abbrlink: 58254
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=0cf5f1a5d71b4433ac49cca43aa7a9a8
---

前提：通信端口默认是 5672 端口，如果远程连接，别忘记先在防火墙上开启该端口

查看运行状态

# service rabbitmq-server status

启动

`service rabbitmq-server stop`

停止

`service rabbitmq-server start`

重启 rabbitmq 服务

`service rabbitmq-server restart`

查看 log 文件

`cd /var/log/rabbitmq/`

`vim ***.log`

查看已有插件列表

`rabbitmq-plugins list`

安装插件
(这里以安装 web 管理客户端为例子，该客户端的端口是 15672.别忘记在防火墙开启端口)
`rabbitmq-plugins enable rabbitmq_management`

编写配置文件（这里以开放外部访问为例子）
`cd /etc/rabbitmq/ `
`vim rabbitmq.config`

向 rabbitmq.config 文件中写入如下内容：
\[{rabbit, \[{loopback_users, []}\]}\].