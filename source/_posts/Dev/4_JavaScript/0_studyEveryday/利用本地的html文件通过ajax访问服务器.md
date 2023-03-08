---
title: 利用本地的html文件通过ajax访问服务器

categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - 利用本地的html文件通过ajax访问服务器
abbrlink: 3195
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=ea534a33e88544139548bd71164f2f10
---

- 在 chrome 的快捷方式上右键属性，选中快捷方式 tab，在目标栏的最后添加以下参数，然后重启 chrome，用来测试的文件就放在下面配置的 data-dir 里

  注意：每个--前面都有一个空格

  注意：服务器必须开启跨域访问

  ```xml
     --user-data-dir="C:\Users\13551\Desktop" --test-type --disable-web-security
  ```