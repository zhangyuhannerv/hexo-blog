---
title: mysql常见的函数和问题的汇总

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - mysql常见的函数和问题的汇总
abbrlink: 36898
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=b9b76376530b414d9c1394c12558c36e
---

- 注意 mysql 里面关于字符串的截取下标一般都是从 1 开始
- Substring('str',a,b) 注意：a 是起始位置，b 是要截取得长度。且下标从 1 开始 ，如果 a 是 0，那么无论 b 是多少都返回一个空串
- Round(num,a) num 如果为字符串，那么返回的也是数字。如果 num 为'a'或者'b'这种非数字类型的字符串，那么会把这种字符串当成数字 0 ，并且 a 是 0，那么就是 0 ，a 是 1，就是 0.0 。

  注意：如果 num 是整数(round(2234,2))，那么无论 a 是多少，返回的都是整数(2234)，如果 num 是整数型的字符串(round('2234',3))，那么返回的就是带 0 的小数(2234.000)。

  注意：abs(25.0)=>25.0 abs('25.0') =>25

- INSTR（str,substr） / instr(源字符串, 目标字符串) 获取子串第一次出现的索引，如果没有找到，则返回 0（下标从 1 开始）
- 使用 union all 链接两个查询结果的时候，如果链接查询结果要有各自的顺序并且总结果要保留这种顺序，那么每个链接的子查询都必须两边加上（）并且在最后加上 limit a,b，为了保证都各个子查询查询出全部的结果，ab 的取值可以为 0,10000000000000
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