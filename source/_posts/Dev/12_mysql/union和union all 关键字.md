---
title: union和union all 关键字

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - union和union all 关键字
abbrlink: 32462
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=cfcd3dbc4ee7436ca0803998ff4faf56
---

- 区别 1：取结果的交集
  - union: 对两个结果集进行并集操作, 不包括重复行,相当于 distinct, 同时进行默认规则的排序;
  - union all: 对两个结果集进行并集操作, 包括重复行, 即所有的结果全部显示, 不管是不是重复;
- 区别 2：获取结果后的操作

  - union: 会对获取的结果进行排序操作
  - union all: 不会对获取的结果进行排序操作

- 区别 3：

  - union 看到结果中 ID=3 的只有一条
    ```sql
    select * from student2 where id < 4
    union
    select * from student2 where id > 2 and id < 6
    ```
  - union all 结果中 ID=3 的结果有两个

    ```sql
    select * from student2 where id < 4
    union all
    select * from student2 where id > 2 and id < 6
    ```

- 总结

  union all 只是合并查询结果，并不会进行去重和排序操作，在没有去重的前提下，使用 union all 的执行效率要比 union 高