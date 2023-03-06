---
title: 'any 和 all 关键字'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'any 和 all 关键字'
---
```sql
A = any('a','b') 等价于 A = 'a' or A = 'b'

A = all('a','b') 等价于 A = 'a' and A = 'b'
```
总结 ：any 相当于用or链接后面括号里的子元素，all 相当于用and链接后面括号里面的子元素
