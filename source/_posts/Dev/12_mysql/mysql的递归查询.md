---
title: mysql的递归查询
categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - 递归查询demo
cover: 'https://imgapi.xl0408.top?uuid=669'
abbrlink: 669
date: 2023-08-16 11:35:22
---
本篇博客的目的旨在不用写存储过程，不用建数据库函数，一段sql实现递归查询功能

## 查询某个父节点下的所有层级的子节点

```sql
  SELECT
    ID.temp_level,
    DATA.* 
  FROM
    (
    SELECT
      @ids AS _ids,
      ( SELECT @ids := GROUP_CONCAT( region_id ) FROM region WHERE FIND_IN_SET( parent_id, @ids ) ) AS cids,
      @l := @l + 1 AS temp_level 
    FROM
      region,
      ( SELECT @ids := 3, @l := 0 ) b 
    WHERE
      @ids IS NOT NULL 
    ) ID,
    region DATA 
  WHERE
    FIND_IN_SET( DATA.region_id, ID._ids ) 
  ORDER BY
  temp_level
```

注意：

* 上面sql的两个region要替换为自己表名
* 上面sql的两个region_id要替换为自己的主键id
* 上面sql的一个parent_id要替换为当前表的父级id所代表的字段
* 上面sql的三个temp_level代表每个节点所属的层级，从1开始
* @ids := 3代表从id为3的这个节点向下递归，包括当前节点。如果id为3的节点不存在，那么不会报错，会列出所有的子节点

![修改为自己能用的sql所要做的改动示意图](https://s2.loli.net/2023/08/16/aDiBOZ7K8rUtNdb.png)

测试：

```sql
--创建测试环境

create table t_test(

    id int PRIMARY key,

    parent_id int,

    name varchar(200)

)

insert t_test VALUES(1,null,"中国");

insert t_test VALUES(2,1,"华北"); 

insert t_test VALUES(3,2,"山西省");

insert t_test VALUES(4,2,"北京");

insert t_test VALUES(5,3,"临汾市");

insert t_test VALUES(6,4,"北京市");

insert t_test VALUES(7,5,"尧都区");

insert t_test VALUES(8,6,"朝阳区");

insert t_test VALUES(9,7,"解放西路");

insert t_test VALUES(10,8,"朝阳北路");

SELECT * FROM t_test;
```

测试数据展示：

![测试数据展示](https://s2.loli.net/2023/08/16/hnu5xS9NXEsLCTz.png)

id=1，查询中国下边有哪些地方

![中国下边有哪些地方](https://s2.loli.net/2023/08/16/AJWkKSm4j8vgZ5r.png)

id=3，查询山西下边有哪些地方

![image.png](https://s2.loli.net/2023/08/16/ur6axEiWXwMgty1.png)
