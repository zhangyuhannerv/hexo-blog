---
title: 配置ssl证书示例
categories:
  - Ops
  - nginx
tags:
  - Ops
  - nginx
  - 配置ssl证书示例
cover: 'https://www.loliapi.com/acg/?uuid=62002'
abbrlink: 62002
date: 2024-05-10 10:38:13
---

```conf
server {
    listen 443 ssl; #修改端口号增加ssl
    server_name xxxx.cn; # 该域名必须对应当前nginx所在的服务器（通过dns解析的ip和nginx服务器的公网ip相同）
    #server_name _;
    #ssl on; #注释或删除ssl on
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
    ssl_prefer_server_ciphers on;   #指定PEM格式的证书文件   
    ssl_certificate     xxxx.pem;   #指定PEM格式的私钥文件  
    ssl_certificate_key  xxxx.key;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://127.0.0.1:8088;
        # 保留所有请求头字段
        proxy_pass_request_headers on;
    }
}
server {
    listen 80;
    server_name xxxx.cn;
    #server_name _;
 
    # 使用return指令进行重定向
    #return 301 https://$server_name$request_uri;
 
    # 或者使用rewrite指令进行重定向
    rewrite ^(.*)$ https://$host$1 permanent;
}

```
