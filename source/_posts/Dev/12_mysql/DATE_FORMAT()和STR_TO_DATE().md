---
title: DATE_FORMAT()和STR_TO_DATE()

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - DATE_FORMAT()和STR_TO_DATE()
abbrlink: 24292
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=100425c3afd841b4844c0d27e254c860
---

常用的 DATE_FORMAA()格式

```sql
DATE_FORMAT(updatetime,'%Y-%m-%d') -- 把mysql的datetime格式化成2021-09-23的字符串格式
DATE_FORMAT(updatetime,'%Y-%m-%d %H:%i:%S') -- 把mysql的datetime格式化成2021-09-07 09:30:37的字符串格式
```

常用的 STR_TO_DATE()格式

```sql
STR_TO_DATE('2015-09-01 00:00:00','%Y-%m-%d %H:%i:%s') -- 把字符串转为datetimeg
```