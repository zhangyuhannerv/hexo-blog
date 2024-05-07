---
title: docker安装redis
categories:
  - Dev
  - redis
tags:
  - Dev
  - redis
  - docker安装redis
cover: 'https://imgapi.xl0408.top?uuid=44762'
abbrlink: 44762
date: 2024-05-07 15:11:15
---

```bash
docker pull redis:7.2

docker run \
-p 6379:6379 \
--name redis-7.2 \
--restart=always \
--network=els \
-d redis:7.2
```
