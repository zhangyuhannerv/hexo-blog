---
title: 比较date或者datetime

categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - 比较date或者datetime
abbrlink: 44371
date: 2023-03-06 15:47:44
---

单个的比较可以直接使用> < 或者= 来比较，但是当两个值的组合与另两个值的组合进行比较的时候，可以使用**UNIX_TIMESTAMP()**函数

```sql
SELECT
	*
FROM
	dtjc_jh_jdjh
WHERE
	xm_id = #{xmId}
ORDER BY
	(UNIX_TIMESTAMP( start_time ) + UNIX_TIMESTAMP( end_time ))/ 2;
```

如上就是根据**起始时间和终止时间的中间值**进行比较。其中 start_time 和 end_time 都是 datetime 类型
