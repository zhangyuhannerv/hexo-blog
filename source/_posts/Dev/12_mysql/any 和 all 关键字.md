---
title: any 和 all 关键字

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - any 和 all 关键字
abbrlink: 52297
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=6aff715ddbdd4ef8a184f9fa90e70db5
---

```sql
A = any('a','b') 等价于 A = 'a' or A = 'b'

A = all('a','b') 等价于 A = 'a' and A = 'b'
```

总结 ：any 相当于用 or 链接后面括号里的子元素，all 相当于用 and 链接后面括号里面的子元素