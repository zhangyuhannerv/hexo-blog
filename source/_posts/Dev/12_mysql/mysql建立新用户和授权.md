---
title: 'mysql建立新用户和授权'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'mysql建立新用户和授权'
---
# 需求：只允许某个用户访问某个库
```sql
# 建立用户user能在任何ip登录，并且密码是passwd
create user 'user'@'%' identified by 'passwd';

# 授权：授予user用户能用密码passwd从任何ip登录并且有访问ctoms_test数据库任何资源的所有权限
grant all privileges on ctoms_test.* to user@'%' identified by 'passwd';  

# 刷新权限
flush privileges;

# 查看自己刚刚建立的用户
SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
```
