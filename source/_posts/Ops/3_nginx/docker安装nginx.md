---
title: docker安装nginx
categories:
  - Ops
  - nginx
tags:
  - Ops
  - nginx
  - docker安装nginx
cover: 'https://imgapi.xl0408.top?uuid=57560'
abbrlink: 57560
date: 2023-04-22 14:48:10
---

```bash
# 拉取镜像
# 本文章以1.24为例，读者可以自行替换为其他的版本，流程基本不变。
docker pull nginx:1.24

# 运行容器，该容器只为复制配置文件，后续会删除
docker run -p80:80 --name nginx-1.24 -d nginx:1.24

# 得到容器id：e6c27ac9bc13


# 创建映射目录
# 所有的映射目录根目录为/Users/zhangyuhan/Work/dev-env/nginx，可自行替换
mkdir /Users/zhangyuhan/Work/dev-env/nginx
cd /Users/zhangyuhan/Work/dev-env/nginx
mkdir conf
mkdir html
mkdir logs

# 将容器内的nginx配置文件夹拷贝到conf文件下
docker cp e6c27ac9bc13:/etc/nginx /Users/zhangyuhan/Work/dev-env/nginx/conf
# 此时目录结构为conf/nginx/一堆配置文件，所以需要将所有的配置文件拷贝conf下
mv /Users/zhangyuhan/Work/dev-env/nginx/conf/nginx/* /Users/zhangyuhan/Work/dev-env/nginx/conf
# 删除多余的nginx空文件夹
rm -rf /Users/zhangyuhan/Work/dev-env/nginx/conf/nginx

# 将nginx自带的两个html拷贝到自己配置的html目录下
docker cp e6c27ac9bc13:/usr/share/nginx/html /Users/zhangyuhan/Work/dev-env/nginx/

# 停止并删除之前的容器
docker stop nginx-1.24
docker rm nginx-1.24

# 配置映射目录重新启动
docker run -p 80:80 --name nginx-1.24 \
-v /Users/zhangyuhan/Work/dev-env/nginx/html:/usr/share/nginx/html \
-v /Users/zhangyuhan/Work/dev-env/nginx/logs:/var/log/nginx \
-v /Users/zhangyuhan/Work/dev-env/nginx/conf:/etc/nginx \
-d nginx:1.24
```
