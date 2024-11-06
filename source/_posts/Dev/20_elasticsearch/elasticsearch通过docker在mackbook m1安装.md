---
title: elasticsearch通过docker在mackbook m1安装
categories:
  - Dev
  - elasticsearch
tags:
  - Dev
  - elasticsearch
  - elasticsearch通过docker安装（适配macbook m1）
cover: 'https://www.loliapi.com/acg/?uuid=50662'
abbrlink: 50662
date: 2024-04-10 16:53:13
---

主要目的：安装elasticsearch和kibana，解决kibana无法连接elasticsearch导致server is not ready yet的问题

## 建立docker网络els

```bash
# 建立
docker network create els

# 查看：有name：els，成功
docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
12f31e2d6df1   bridge    bridge    local
4e3cc13000ef   els       bridge    local
e0cb50b3dee5   host      host      local
18f13202e657   none      null      local
```

## 安装elasticsearch

```bash
# 建立映射文件夹
mkdir /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/config
mkdir /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/data
mkdir /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/plugins

# 配置所有ip都能访问elasticsearch
echo "http.host: 0.0.0.0" >/Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/config/elasticsearch.yml

# docker安装
docker run --name elasticsearch-7.16.2 --network els -p 9200:9200 -p 9300:9300 \
-e  "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
-v /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/data:/usr/share/elasticsearch/data \
-v /Users/zhangyuhan/Work/dev-env/elasticsearch-7.16.2/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.16.2
```

## 安装kibana

```bash
# docker安装，注意：环境变量写正确的elasticsearch容器别名，因为是自定义网络，可以通过别名通信
docker run --name kibana-7.16.2 --network els -e ELASTICSEARCH_HOSTS=http://elasticsearch-7.16.2:9200 -p 5601:5601 -d kibana:7.16.2
```
