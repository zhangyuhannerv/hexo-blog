---
title: 'show profile功能'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'show profile功能'
---

- 开启Show Profile功能，默认该功能是关闭的，使用前需开启。
    
	```sql
	show variables like 'profiling';  
    set profiling = on;  
    ## 执行一部分sql后(默认保留15条)  
    show profiles;  
    ## duration是持续时间  
    ## 针对特定的sql进行诊断  
    show profile cpu,block io for query Query_ID;/*Query_ID为#3步骤中show profiles列表中的Query_ID*/
	```
    
-   show profile的常用查询参数。
    
    ①ALL：显示所有的开销信息。
    
    ②BLOCK IO：显示块IO开销。
    
    ③CONTEXT SWITCHES：上下文切换开销。
    
    ④CPU：显示CPU开销信息。
    
    ⑤IPC：显示发送和接收开销信息。
    
    ⑥MEMORY：显示内存开销信息。
    
    ⑦PAGE FAULTS：显示页面错误开销信息。
    
    ⑧SOURCE：显示和Source_function，Source_file，Source_line相关的开销信息。
    
    ⑨SWAPS：显示交换次数开销信息。
    
-   日常开发需注意的结论。（出现下述结论都需要优化)
    
    ①converting HEAP to MyISAM：查询结果太大，内存不够，数据往磁盘上搬了。
    
    ②Creating tmp table：创建临时表。先拷贝数据到临时表，用完后再删除临时表。
    
    ③Copying to tmp table on disk：把内存中临时表复制到磁盘上，危险！！！
    
    ④locked。
    
-   总结
    
    1.show profile默认是关闭的，并且开启后只存活于当前会话，也就说每次使用前都需要开启。
    
    2.通过show profiles查看sql语句的耗时时间，然后通过show profile命令对耗时时间长的sql语句进行诊断。
    
    3.注意show profile诊断结果中出现相关字段的含义，判断是否需要优化sql语句。
    
    4.可更多的关注MySQL官方文档，获取更多的知识。
