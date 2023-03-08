---
title: stream用法整理

categories:
  - Dev
  - Java
  - stream
tags:
  - Dev
  - Java
  - stream
  - stream用法整理
abbrlink: 31338
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=e90460d10b374058b3ae023916c44af2
---

## stream 流处理将用`,`拼接的字符串转为 Double 集合

```java
// 将用','拼接的字符串转为Double集合
List<Double> singlePoint = Arrays.asList(pointStr.split(","))
                                .stream()
                                .map(str -> Double.parseDouble(str.trim()))
                                .collect(Collectors.toList());
```