---
title: 'and() 和 or()的嵌套使用'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mybatisPlus'
tags: 
  - 'Dev'
  - 'mybatisPlus'
  - 'and() 和 or()的嵌套使用'
---
and 里面嵌套 or 如下使用
```java
QueryWrapper<ErrorData> ew = new QueryWrapper<>();
ew.eq("dcjh_id", csrwInfo.getCsrwID()).and(wrapper -> wrapper.eq("wtlx", "0").or().eq("wtlx", "1"));// where dcjh_id = '' and (wtlx = '0' or wtlx = '1'),注意：这里是一个lambda表达式
List<ErrorData> dataList = errorDataService.list(ew);
```
