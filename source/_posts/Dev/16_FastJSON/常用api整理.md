---
title: 常用api整理

categories:
  - Dev
  - FastJSON
tags:
  - Dev
  - FastJSON
  - 常用api整理
abbrlink: 11039
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=692879fc5c1c488185d602b5b5130d0a
---

```java
public static final Object parse(String text); // 把JSON文本parse为JSONObject或者JSONArray

public static final JSONObject parseObject(String text)； // 把JSON文本parse成JSONObject

public static final <T> T parseObject(String text, Class<T> clazz); // 把JSON文本parse为JavaBean

public static final JSONArray parseArray(String text); // 把JSON文本parse成JSONArray

public static final <T> List<T> parseArray(String text, Class<T> clazz); //把JSON文本parse成JavaBean集合

public static final String toJSONString(Object object); // 将JavaBean序列化为JSON文本

public static final String toJSONString(Object object, boolean prettyFormat); // 将JavaBean序列化为带格式的JSON文本

public static final Object toJSON(Object javaObject); //将JavaBean转换为JSONObject或者JSONArray。

```