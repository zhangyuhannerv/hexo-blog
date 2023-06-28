---
title: mybatis-plus无法使用BaseMapper的公用方法
categories:
  - Dev
  - mybatisPlus
tags:
  - Dev
  - mybatisPlus
  - mybatis-plus无法使用BaseMapper的公用方法
cover: 'https://imgapi.xl0408.top?uuid=14681'
abbrlink: 14681
date: 2023-06-28 14:49:44
---

报错原因：
原本的mybatis里面再次引入mybatis-plus之后，使用公用的BaseMapper无法使用报错：也就是无法找到sql，但是可以使用自己编写的sql

解决办法：
只需要在你配置数据源的地方，换一个类即可：

```java
SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
```

更改为：


```java
MybatisSqlSessionFactoryBean sessionFactory = new MybatisSqlSessionFactoryBean();
```

