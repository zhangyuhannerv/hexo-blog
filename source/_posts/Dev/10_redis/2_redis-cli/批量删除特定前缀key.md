---
title: 批量删除特定前缀key

categories:
  - Dev
  - redis
  - redis-cli
tags:
  - Dev
  - redis
  - redis-cli
  - 批量删除特定前缀key
abbrlink: 11739
date: 2023-03-06 15:47:44
---

```shell
redis-cli --scan --pattern "ops-coffee-*" | xargs -L 2000 redis-cli del
```

其中 xargs -L 指令表示 xargs 一次读取的行数，也就是每次删除的 key 数量，一次读取太多 xargs 会报错
