---
title: docker安装nexus
categories:
  - Dev
  - docker
tags:
  - Dev
  - nexus
  - docker
cover: 'https://www.loliapi.com/acg/?uuid=27330'
abbrlink: 27330
date: 2025-09-18 10:18:13
---

## 1.建立.env

```text
NEXUS_DATA=/home/docker/nexus-3.76.1/nexus-data
NEXUS_UI_PORT=18081
NEXUS_DOCKER_PORT=15000
NEXUS_JAVA_XMS=2g
NEXUS_JAVA_XMX=2g
NEXUS_MAX_DIRECT=3g
```

## 2.建立docker-compose.yml

```yml
services:
  nexus3:
    image: nexus3:3.76.1
    container_name: nexus-3.76.1
    restart: unless-stopped
    ports:
      - "${NEXUS_UI_PORT:-8081}:8081"
      - "${NEXUS_DOCKER_PORT:-5000}:5000"
    environment:
      - INSTALL4J_ADD_VM_PARAMS=-Xms${NEXUS_JAVA_XMS:-2g} -Xmx${NEXUS_JAVA_XMX:-2g} -XX:MaxDirectMemorySize=${NEXUS_MAX_DIRECT:-3g}
    volumes:
      - "${NEXUS_DATA}:/nexus-data"
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
```

## 3.启停

```bash
docker-compose up -d # 后台启动所有服务
docker-compose down # 停止所有服务并删除容器和网络
docker-compose start # 启动已存在但处于停止状态的容器（不重建）
docker-compose stop # 停止正在运行的容器（不删除容器）
```
