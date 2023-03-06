---
title: 'stream用法整理'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'Java'
  - 'stream'
tags: 
  - 'Dev'
  - 'Java'
  - 'stream'
  - 'stream用法整理'
---
## stream流处理将用`,`拼接的字符串转为Double集合
```java
// 将用','拼接的字符串转为Double集合
List<Double> singlePoint = Arrays.asList(pointStr.split(","))
                                .stream()
                                .map(str -> Double.parseDouble(str.trim()))
                                .collect(Collectors.toList());
```

