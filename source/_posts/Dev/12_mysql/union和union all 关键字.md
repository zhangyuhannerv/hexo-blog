---
title: 'union和union all 关键字'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'union和union all 关键字'
---
-     
    区别1：取结果的交集
    
    -   union: 对两个结果集进行并集操作, 不包括重复行,相当于distinct, 同时进行默认规则的排序;
        
    -   union all: 对两个结果集进行并集操作, 包括重复行, 即所有的结果全部显示, 不管是不是重复;
        
-   区别2：获取结果后的操作
    
    -   union: 会对获取的结果进行排序操作
        
    -   union all: 不会对获取的结果进行排序操作
        
-   区别3：
    
    -   union看到结果中ID=3的只有一条
		```sql
		select * from student2 where id < 4  
        union  
        select * from student2 where id > 2 and id < 6
		```
        
    -   union all 结果中ID=3的结果有两个
        
		```sql
		select * from student2 where id < 4  
        union all  
        select * from student2 where id > 2 and id < 6
		```
        
-   总结
    
    union all只是合并查询结果，并不会进行去重和排序操作，在没有去重的前提下，使用union all的执行效率要比union高
