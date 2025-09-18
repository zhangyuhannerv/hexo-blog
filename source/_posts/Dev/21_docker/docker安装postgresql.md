---
title: docker安装postgresql
categories:
  - Dev
  - docker
tags:
  - Dev
  - postgresql
  - docker
cover: 'https://www.loliapi.com/acg/?uuid=53211'
abbrlink: 53211
date: 2025-08-09 11:12:13
---

## 1.建立docker-compose.yml

```yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: intco
      POSTGRES_PASSWORD: Yingke@2025
      POSTGRES_DB: intco_dev
    ports:
      - "5432:5432"
    volumes:
      - /home/docker/postgresql/postgresql-data:/var/lib/postgresql/data
```

## 3.启停

```bash
docker-compose up -d # 后台启动所有服务
docker-compose down # 停止所有服务并删除容器和网络
docker-compose start # 启动已存在但处于停止状态的容器（不重建）
docker-compose stop # 停止正在运行的容器（不删除容器）
```
