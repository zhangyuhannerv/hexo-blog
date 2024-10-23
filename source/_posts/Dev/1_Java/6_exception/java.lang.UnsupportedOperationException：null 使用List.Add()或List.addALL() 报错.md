---
title: java.lang.UnsupportedOperationException：null 使用List.Add()或List.addALL() 报错

categories:
  - Dev
  - Java
  - exception
tags:
  - Dev
  - Java
  - exception
  - java.lang.UnsupportedOperationException：null 使用List.Add()或List.addALL() 报错
abbrlink: 60898
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=7414c85bd7c046ed91e02ce54ebc7dc0
---

还原现场：

```java
List<Integer> agentTeamIdsList =Arrays.asList(agentIdArray);
agentTeamIdsList.add(123011);
```

将一个 Integer 类型数组转成 List， 上面的 Arrays.asList 是可以转成功的；

然后往转成功的 list 里面继续添加 值；

IDEA 里面并没有检测出错误，实则报错：

java.lang.UnsupportedOperationException: null

原因：

Arrays.asList 转成的 ArrayList 实际上跟往常我们创建的 new ArrayList 是不同的。

这个是 Arrays 的内部类 ArrayList：

![img](https://www.freesion.com/images/372/12fde77461883b51add3859c5bfdc23c.png)

而我们往常使用的

![img](https://www.freesion.com/images/810/64f6f88277254496994cc617bb46e4f2.png)

解决方案：

```java
List<Integer> agentTeamIdsList =new ArrayList<>(Arrays.asList(agentIdArray));
```