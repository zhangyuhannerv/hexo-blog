---
title: SpringBoot开启gzip
categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - SpringBoot开启gzip
cover: 'https://www.loliapi.com/acg/?uuid=7152'
abbrlink: 7152
date: 2023-06-29 09:20:12
---

## 在 SpringBoot 中启用 GZIP 压缩

打开application.yml文件，添加如下配置

```yml
server:
  compression:
    enabled: true
    min-response-size: 1024 # 当返回数据超过这个大小，对返回数据压缩，单位Byte
    mime-types: application/javascript,text/css,application/json,application/xml,text/html,text/xml,text/plain
```

## 在tomcat中开启GZIP压缩

打开 Tomcat 的 server.xml，在 Connector 标签中加入下面属性

```xml
<Connector port="8080"
    protocol="HTTP/1.1"
    connectionTimeout="20000"
    redirectPort="8443"
    compression="on"
    compressionMinSize="2048"
    noCompressionUserAgents="gozilla, traviata"
    compressableMimeType="text/html,text/xml,text/javascript,application/javascript,text/css,text/plain,text/json"/>
```