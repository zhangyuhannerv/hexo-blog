---
title: 在oracle里杀死进程
categories:
  - Dev
  - oracle
tags:
  - Dev
  - oracle
  - 在oracle里杀死进程
cover: 'https://www.loliapi.com/acg/?uuid=3157'
abbrlink: 3157
date: 2024-12-23 08:45:13
---

`ORA-00054: resource busy and acquire with NOWAIT specified or timeout expired`错误

表示在尝试执行 SQL 语句时，目标资源正被其他会话占用，而由于 NOWAIT 或超时设置，当前操作未能成功获取锁。

目标表正被锁定

可能其他事务正在访问或修改 MYBOOT.PUS_MACHINE_MATERIAL_MESSAGE 表，导致无法获取锁。

解决方式

```sql
SELECT
    s.sid,
    s.serial#,
    s.username,
    s.program,
    o.object_name,
    l.locked_mode
FROM
    v$locked_object l
JOIN
    dba_objects o ON l.object_id = o.object_id
JOIN
    v$session s ON l.session_id = s.sid
WHERE
    o.object_name = 'PUS_MACHINE_MATERIAL_MESSAGE';
```

找到阻塞的会话 ID（SID 和 SERIAL#），然后终止会话：

```sql
-- 杀死进程
ALTER SYSTEM KILL SESSION 'sid,serial#';
-- 例子
ALTER SYSTEM KILL SESSION '1155,22161';
```

强制终止会话可能会导致阻塞会话的事务回滚，请谨慎操作。
