---
title: 远程请求http的三种方式

categories:
  - Dev
  - essays
tags:
  - Dev
  - essays
  - 远程请求http的三种方式
abbrlink: 17762
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=b3c1244a397b4acab1235553081a7434
---

1.ajax 远程调用，远程服务器必须开放跨域访问权限

2.form 表单远程调用，不受跨域限制，缺点是需要组装表单

3.java 代码远程调用（常用的有 java.net.HttpURLConnection，springboot 的 restTemplate)