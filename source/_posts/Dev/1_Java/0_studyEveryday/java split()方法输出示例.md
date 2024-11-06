---
title: java split()方法输出示例
categories:
  - Dev
  - Java
  - studyEveryday
tags:
  - Dev
  - Java
  - studyEveryday
  - java split()方法输出示例
cover: 'https://www.loliapi.com/acg/?uuid=64251'
date: '2024-06-06 10:12:24'
abbrlink: 64251
---

在java里，split()方法如果只传入分割字符，那么会自动去除结尾的空字符串。

以前一直不知道，到底写了多少隐藏的bug，ヽ（゜ロ゜；）ノ

## 情况1

```java
String str = "6000,5000";
String[] s = str.split(",");
System.out.println(Arrays.toString(s));// [6000, 5000]
System.out.println(s.length);// 2
```

## 情况2

```java
String str = "6000,5000";
String[] s = str.split(",", -1);
System.out.println(Arrays.toString(s));// [6000, 5000]
System.out.println(s.length);// 2
```

## 情况3

```java
String str = "6000,";
String[] s = str.split(",");
System.out.println(Arrays.toString(s));// [6000]
System.out.println(s.length);// 1
```

## 情况4

```java
String str = "6000,";
String[] s = str.split(",", -1);
System.out.println(Arrays.toString(s));// [6000, ]
System.out.println(s.length);// 2
```

## 情况5

```java
String str = ",6000";
String[] s = str.split(",");
System.out.println(Arrays.toString(s));// [, 6000]
System.out.println(s.length);// 2
```

## 情况6

```java
String str = ",6000";
String[] s = str.split(",", -1);
System.out.println(Arrays.toString(s));// [, 6000]
System.out.println(s.length);// 2
```

## 情况7

```java
String str = ",";
String[] s = str.split(",");
System.out.println(Arrays.toString(s));// []
System.out.println(s.length);// 0
```

## 情况8

```java
String str = ",";
String[] s = str.split(",", -1);
System.out.println(Arrays.toString(s));// [, ]
System.out.println(s.length);// 2
```

## 情况9

```java
String str = "";
String[] s = str.split(",");
System.out.println(Arrays.toString(s));// []
System.out.println(s.length);// 1
```

## 情况10

```java
String str = "";
String[] s = str.split(",", -1);
System.out.println(Arrays.toString(s));// []
System.out.println(s.length);// 1
```

## 总结

split()不传limit参数时会自动去除结尾的空字符串。

上述所有代码都可以直接运行。
