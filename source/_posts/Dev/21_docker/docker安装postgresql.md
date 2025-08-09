---
title: docker安装postgresql
categories:
  - Dev
  - docker
tags:
  - Dev
  - postgresql
  - docker
cover: 'https://www.loliapi.com/acg/?uuid=63341'
date: 2025-08-09 11:12:13
---

## 1.建立docker-compose.yml

```yml
version: '3.8'
services:
  postgres:
    image: 192.168.80.226:8080/template/postgres:15
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

## 启动

```bash

```

