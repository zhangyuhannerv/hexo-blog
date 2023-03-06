---
title: 'java.lang.UnsupportedOperationException：null 使用List.Add()或List.addALL() 报错'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'Java'
  - 'exception'
tags: 
  - 'Dev'
  - 'Java'
  - 'exception'
  - 'java.lang.UnsupportedOperationException：null 使用List.Add()或List.addALL() 报错'
---

还原现场：
```java
List<Integer> agentTeamIdsList =Arrays.asList(agentIdArray);
agentTeamIdsList.add(123011);
```
将一个Integer类型数组转成List， 上面的Arrays.asList 是可以转成功的；

然后往转成功的list里面继续添加 值；

IDEA里面并没有检测出错误，实则报错：

java.lang.UnsupportedOperationException: null

原因：

Arrays.asList转成的ArrayList实际上跟往常我们创建的new ArrayList是不同的。

这个是Arrays的内部类ArrayList：

![img](https://www.freesion.com/images/372/12fde77461883b51add3859c5bfdc23c.png)

而我们往常使用的

![img](https://www.freesion.com/images/810/64f6f88277254496994cc617bb46e4f2.png)

解决方案：
```java
List<Integer> agentTeamIdsList =new ArrayList<>(Arrays.asList(agentIdArray));
```
