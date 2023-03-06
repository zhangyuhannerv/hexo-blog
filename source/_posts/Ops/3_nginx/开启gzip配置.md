---
title: '开启gzip配置'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Ops'
  - 'nginx'
tags: 
  - 'Ops'
  - 'nginx'
  - '开启gzip配置'
---
配置示例
```conf
server{
        listen 9005; ## nginx监听端口号
        
        #开启gzip
        gzip  on;
        #vary header支持，该选项可以让前端的缓存服务器缓存经过gzip压缩的页面
        gzip_vary on;
        #设置允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取，默认值是0，不管页面是多大都进行压缩，建议设置成大于1K，如果小于1K可能会越压越大
        gzip_min_length 612k;
        #压缩缓冲区大小，表示申请4个单位为16K的内存作为压缩结果的流缓存，默认值是申请与原始数据大小相同的内存空间来存储gzip压缩结果
        gzip_buffers 128 128k;
        #压缩比率，用来指定gzip压缩比， 1：压缩比最小，速度最快；9：压缩比最大，传输速度最快，但处理也最慢，也比较的消耗CPU资源
        gzip_comp_level 9;
        #用来指定压缩的类型，text/html 默认是会被压缩的，所以不指定也可以。
        gzip_types text/plain text/javascript application/javascript application/x-javascript text/css  application/json  application/x-httpd-php image/jpeg image/png image/gif image/x-icon application/xml;

        location / {
                alias /usr/local/webserver/nginx/project/crtoms/;
                index index.html index.htm;
        }
}
```
