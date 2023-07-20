---
title: Arrays.asList() 的坑
categories:
  - Dev
  - Java
  - studyEveryday
tags:
  - Dev
  - Java
  - studyEveryday
  - Arrays.asList() 的坑
cover: 'https://imgapi.xl0408.top?uuid=58200'
date: '2023-07-20 17:52:12'
abbrlink: 58200
---

在Java中，我们经常需要将数组转换为List来方便地进行操作。Arrays.asList()方法是一种常见的方式，但是它存在一个不太常见但需要注意的坑。

## Arrays.asList()方法介绍

Arrays.asList()方法是将数组转换为List的方法，它返回一个List对象，但这个List对象并不是java.util.ArrayList对象，而是Arrays内部的ArrayList对象。

Arrays.ArrayList类继承自AbstractList，实现了List接口。它重写了add()、remove()等修改List结构的方法，并将它们直接抛出UnsupportedOperationException异常，从而禁止了对List结构的修改。

具体来说，Arrays.asList()方法返回的是Arrays类中的一个私有静态内部类ArrayList，它继承自AbstractList类，实现了List接口。

Arrays.asList()方法的使用非常简单，只需要将一个数组作为参数传递给该方法即可。例如：

```java
String[] arr = new String[]{"a", "b", "c"};
List<String> list = Arrays.asList(arr);
```

## Arrays.asList()方法的坑

尽管Arrays.asList()方法很方便，但也存在一些坑，其中最常见的一个是：在使用Arrays.asList()方法时，如果对返回的List对象进行修改（例如增加、删除元素），将会抛出"UnsupportedOperationException"异常。

为什么会出现这个异常呢？这是因为Arrays.asList()方法返回的List对象，是一个固定大小的List，不能进行结构上的修改，否则会抛出异常。

下面的代码演示了这个问题：

```java
String[] arr = new String[]{"a", "b", "c"};
List<String> list = Arrays.asList(arr);
list.add("d"); // 抛出 UnsupportedOperationException 异常
```

上述代码中，我们尝试向List对象中添加一个新的元素"d"，结果会抛出"UnsupportedOperationException"异常。

## 解决Arrays.asList()方法的坑

要解决Arrays.asList()方法的坑，我们需要将返回的List对象转换为一个可修改的List对象。有几种方法可以实现这个目标：

### 使用java.util.ArrayList类

我们可以使用java.util.ArrayList类，将Arrays.asList()方法返回的List对象转换为一个java.util.ArrayList对象，示例如下：

```java
String[] arr = new String[]{"a", "b", "c"};
List<String> list = new ArrayList<>(Arrays.asList(arr));
list.add("d"); // 正常运行
```

上述代码中，我们首先使用Arrays.asList()方法将一个数组转换为一个List对象，然后使用ArrayList的构造方法，将这个List对象转换为一个java.util.ArrayList对象，最后可以向这个ArrayList对象中添加元素。

### 使用Collections类

我们也可以使用Collections类提供的静态方法，将Arrays.asList()方法返回的List对象转换为一个可修改的List对象，示例如下：

```java
String[] arr = new String[]{"a", "b", "c"};
List<String> list = new ArrayList<>(Arrays.asList(arr));
Collections.addAll(list, "d"); // 正常运行
```

通过Collections.addAll()方法，我们可以将数组中的元素逐个添加到一个新的ArrayList对象中，从而实现了可修改性。

## 总结

在使用Arrays.asList()方法时，需要注意返回的List对象是一个固定大小的List，不支持结构上的修改操作。为了避免这个陷阱，我们可以使用java.util.ArrayList或Collections类提供的方法将返回的List对象转换为可修改的List。通过了解这个陷阱并采取相应的解决方案，我们可以安全地将数组转换为List，并避免潜在的异常情况。

不要让Arrays.asList()的陷阱坑了你的代码！

在Java中，我们经常需要将数组转换为List来方便地进行操作。Arrays.asList()方法是一种常见的方式，但是它存在一个不太常见但需要注意的坑。本文将深入探讨Arrays.asList()的使用，揭示其中的陷阱，并提供解决方案。
