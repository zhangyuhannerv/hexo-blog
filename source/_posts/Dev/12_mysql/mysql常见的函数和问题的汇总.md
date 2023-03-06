---
title: 'mysql常见的函数和问题的汇总'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'mysql'
tags: 
  - 'Dev'
  - 'mysql'
  - 'mysql常见的函数和问题的汇总'
---
-     
    注意mysql里面关于字符串的截取下标一般都是从1开始
    
-   Substring('str',a,b) 注意：a是起始位置，b是要截取得长度。且下标从1开始 ，如果a是0，那么无论b是多少都返回一个空串
    
-   Round(num,a) num 如果为字符串，那么返回的也是数字。如果num为'a'或者'b'这种非数字类型的字符串，那么会把这种字符串当成数字0 ，并且a是0，那么就是0 ，a是1，就是0.0 。
    
    注意：如果num是整数(round(2234,2))，那么无论a是多少，返回的都是整数(2234)，如果num是整数型的字符串(round('2234',3))，那么返回的就是带0的小数(2234.000)。
    
    注意：abs(25.0)=>25.0 abs('25.0') =>25
    
-   INSTR（str,substr） / instr(源字符串, 目标字符串) 获取子串第一次出现的索引，如果没有找到，则返回0（下标从1开始）
    
-   使用union all链接两个查询结果的时候，如果链接查询结果要有各自的顺序并且总结果要保留这种顺序，那么每个链接的子查询都必须两边加上（）并且在最后加上limit a,b，为了保证都各个子查询查询出全部的结果，ab的取值可以为0,10000000000000
	```sql
	-- 例子：上行升序，下行降序
	select t.*,t.lc_str as lcStr from (
			(SELECT
				id,
				xb,
				lc,
				cxlx,
				remove_end_zero(round(fz,2)) as fz,    
				remark, 
				formatMile(lc,'m',0) as lc_str
			FROM
				cxdata_table
			WHERE
				dcjh_id = #{dcjhId}
				and xb = '上行'
				AND lc + 0 >= #{startMileage} + 0
				AND lc + 0 < #{endMileage} + 0
				AND flag = '0'
			order by lc + 0 asc
			LIMIT 0,10000000000000)
			union all
			(SELECT
				id,
				xb,
				lc,
				cxlx,
				remove_end_zero(round(fz,2)) as fz,
				remark,
				formatMile(lc,'m',0) as lc_str
			FROM
				cxdata_table
			WHERE
				dcjh_id = #{dcjhId}
			  and xb = '下行'
			  AND lc + 0 >= #{startMileage} + 0
			  AND lc + 0 < #{endMileage} + 0
			  AND flag = '0'
			order by lc + 0 desc
			LIMIT 0,10000000000000)
	) t
	```
