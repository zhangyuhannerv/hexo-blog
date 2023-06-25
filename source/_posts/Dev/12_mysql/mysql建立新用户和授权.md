---
title: mysql建立新用户和授权

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - mysql建立新用户和授权
abbrlink: 42280
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=7b34549429cd4a1fb4ed3d046161b5fe
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