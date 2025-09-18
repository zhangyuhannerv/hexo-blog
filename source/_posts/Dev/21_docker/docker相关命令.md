---
title: docker相关命令
categories:
  - Dev
  - docker
tags:
  - Dev
  - docker
cover: 'https://www.loliapi.com/acg/?uuid=13749'
abbrlink: 13749
date: 2025-08-09 11:22:13
---

## Docker Compose 命令大全

### 基础命令

| 命令 | 说明 |
|------|------|
| `docker-compose up` | 创建并启动所有服务（前台运行） |
| `docker-compose up -d` | 后台启动服务 |
| `docker-compose down` | 停止并移除容器、网络、卷 |
| `docker-compose ps` | 查看服务运行状态 |
| `docker-compose logs` | 查看所有服务日志 |
| `docker-compose logs -f <service>` | 实时追踪指定服务日志 |

### 服务管理

| 命令 | 说明 |
|------|------|
| `docker-compose start <service>` | 启动已存在的服务容器 |
| `docker-compose stop <service>` | 停止服务容器 |
| `docker-compose restart <service>` | 重启服务 |
| `docker-compose pause/unpause <service>` | 暂停/恢复服务 |
| `docker-compose stats` | 查看服务资源使用 |

### 开发调试

| 命令 | 说明 |
|------|------|
| `docker-compose build` | 重建所有服务的镜像 |
| `docker-compose build --no-cache <service>` | 不带缓存构建指定服务 |
| `docker-compose exec <service> <command>` | 在运行中的容器执行命令<br>`例：docker-compose exec app bash` |
| `docker-compose run --rm <service> <command>` | 一次性运行服务命令并自动清理 |
| `docker-compose up -d --build --force-recreate` | 强制重建服务（开发常用）|

### 配置检查

| 命令 | 说明 |
|------|------|
| `docker-compose config` | 验证 compose 文件语法 |
| `docker-compose images` | 列出服务使用的镜像 |
| `docker-compose top` | 显示容器内运行的进程 |
| `docker-compose port <service> <private-port>` | 查看端口映射关系 |

### 高级操作

| 命令 | 说明 |
|------|------|
| `docker-compose pull` | 拉取服务依赖的镜像 |
| `docker-compose push` | 推送服务镜像到仓库 |
| `docker-compose scale <service>=<num>` | 扩展服务实例数量 |
| `docker-compose events` | 实时查看容器事件 |

### 资源清理

| 命令 | 说明 |
|------|------|
| `docker-compose down -v` | 同时删除数据卷 |
| `docker-compose down --rmi all` | 同时删除所有镜像 |
| `docker-compose down --remove-orphans` | 删除未在配置中定义的容器 |

### 多环境控制

| 命令 | 说明 |
|------|------|
| `docker-compose -f docker-compose.prod.yml up` | 指定配置文件启动 |
| `docker-compose --env-file .env.prod up` | 指定环境变量文件 |

## 实用组合命令