---
title: '利用本地的html文件通过ajax访问服务器'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
  - '利用本地的html文件通过ajax访问服务器'
---
-   在chrome的快捷方式上右键属性，选中快捷方式tab，在目标栏的最后添加以下参数，然后重启chrome，用来测试的文件就放在下面配置的data-dir里
    
	注意：每个--前面都有一个空格
    
    注意：服务器必须开启跨域访问
	```xml
	   --user-data-dir="C:\Users\13551\Desktop" --test-type --disable-web-security
	```
	
