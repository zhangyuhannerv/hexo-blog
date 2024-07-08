---
title: docker安装minio
categories:
  - Dev
  - minio
tags:
  - Dev
  - minio
  - docker安装minio
cover: 'https://imgapi.xl0408.top?uuid=50662'
date: 2024-07-08 11:12:13
---

项目调试需要本地搭建一个minio，记录一下docker命令

```bash
docker run -d -p 9000:9000 -p 9001:9001 \
--net=els \
--name minio \
-e "MINIO_ROOT_USER=minio" \
-e "MINIO_ROOT_PASSWORD=minio123" \
-v /Users/zhangyuhan/Work/dev-env/minio/data:/data \
-v /Users/zhangyuhan/Work/dev-env/minio/config:/root/.minio \
minio/minio server /data --console-address ":9001" -address ":9000"
```
