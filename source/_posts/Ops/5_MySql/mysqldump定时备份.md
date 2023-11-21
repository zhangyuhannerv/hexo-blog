---
title: mysqldump定时备份
categories:
  - Ops
  - MySql
tags:
  - Ops
  - MySql
  - mysqldump定时备份
cover: 'https://imgapi.xl0408.top?uuid=29320'
abbrlink: 29320
date: 2023-11-21 11:42:01
---

## 创建脚本

创建一个新的Shell脚本文件，比如backup_mysql.sh

```bash
#!/bin/bash

# MySQL数据库连接信息
DB_USER="your_username"
DB_PASSWORD="your_password"
DB_NAME="your_database"

# 备份保存路径
BACKUP_DIR="/path/to/backup/directory"

# 创建备份文件名，格式为：数据库名_年月日时分秒.sql
BACKUP_FILE="$BACKUP_DIR/$DB_NAME_$(date +%Y%m%d%H%M%S).sql"

# 使用mysqldump命令备份数据库
mysqldump -u$DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_FILE

# 检查备份是否成功
if [ $? -eq 0 ]; then
    echo "MySQL backup completed successfully. Backup saved to: $BACKUP_FILE"
else
    echo "Error: MySQL backup failed."
fi
```

请注意以下事项：

* 替换your_username、your_password和your_database为实际的MySQL用户名、密码和数据库名。

* 修改/path/to/backup/directory为实际用于保存备份文件的目录路径。

## 授权

保存脚本文件后，给予执行权限

```bash
chmod +x backup_mysql.sh
```

## 手动执行测试

手动运行该脚本手动执行备份

```bash
sh backup_mysql.sh
```

## 自动备份

为了实现自动备份，你可以将脚本添加到定时任务（cron job）中。

打开定时任务编辑器

```bash
crontab -e
```

然后添加一行，例如每天凌晨3点执行备份

```bash
0 3 * * * /path/to/backup_mysql.sh
```

保存并退出编辑器。现在，脚本将每天在指定的时间执行，自动备份你的MySQL数据库。