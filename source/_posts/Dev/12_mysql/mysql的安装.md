---
title: mysql的安装
categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - mysql的安装
cover: >-
  https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=43688
abbrlink: 43688
date: 2023-03-06 15:47:44
---

## mysql8

1. 查看是否有安装过 mysql

   ```shell
   rpm -qa | grep -i mysql
   ```

   使用rpm -e命令将上个命令中包列表全部删除

   然后删除相关服务

   ```shell
    chkconfig --list | grep -i mysql
    chkconfig --del mysql
   ```

2. 删除 mysql

   ```shell
   yum -y remove MySQL-*
   yum -y remove MySQL
   yum remove mysql mysql-server mysql-libs compat-mysql51
   ```

   一般用 rpm -e 的命令删除 mysql,这样表面上删除了 mysql,可是 mysql 的一些残余程序仍然存在,并且通过第一步的方式也查找不到残余,而 yum 命令比较强大,可以完全删除 mysql.(ps:用 rpm 删除后再次安装的时候会提示已经安装了,这就是 rpm 没删除干净的原因)

3. 把所有出现的目录统统删除

   ```shell
   find / -name mysql
   ```

   查找 mysql 的一些目录，把所有出现的目录删除，可以使用 rm -rf 路径，删除时请注意，一旦删除无法恢复。

4. 删除配置文件

   ```shell
   rm -rf /etc/my.cnf
   rm -rf /var/lib/mysql
   ```

5. 删除 mysql 的默认密码

   ```shell
   rm -rf /root/.mysql_sercret
   ```

   删除 mysql 的默认密码,如果不删除,以后安装 mysql 这个 sercret 中的默认密码不会变,使用其中的默认密码就可能会报类似 Access denied for user ‘root@localhost’ (using password:yes)的错误.

---

五步完成之后，这样 mysql 就全部删除干净了，若没安装过 mysql 可忽略以上步骤

1. 配置 Mysql 8.0 安装源

   ```shell
   sudo rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
   ```

2. 安装 Mysql 8.0

   ```shell
   sudo yum --enablerepo=mysql80-community install mysql-community-server
   ```

   提示下载插件选择：y

   看到 complet(完毕)就是安装完啦

3. 启动 mysql 服务

   ```shell
   sudo service mysqld start
   ```

   显示如下：

   启动完成

4. 查看 mysql 服务运行状态

   ```shell
   service mysqld status
   ```

5. 查看 root 临时密码

   安装完 mysql 之后，使用下列命令生成一个临时的密码让 root 用户登录

   ```shell
   grep "A temporary password" /var/log/mysqld.log
   ```

6. 更改临时密码

   输入：

   ```shell
   mysql -uroot -p
   ```

   在 Enter password：后面输入临时密码
   登录成功
   输入：

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY '123456Aa?';
   ```

   会提示：ERROR 1819 (HY000): Your password does not satisfy the current policy requirements(密码不符合当前策略)

   - 方案 1: 设置符合策略的密码(大小写字母+数据+符号，8 位)
   - 方案 2:密码策略改简单一点

   方案 2 设置方式

   先看看当前的密码验证策略
   输入：

   ```sql
   SHOW VARIABLES LIKE 'validate_password.%';
   ```

   策略说明

   - validate_password.length 是密码的最小长度，默认是 8，我们把它改成 6
     输入：

     ```sql
     set global validate_password.length=6;
     ```

   - validate_password.policy 验证密码的复杂程度，我们把它改成 0
     输入：

     ```sql
     set global validate_password.policy=0;
     ```

   - validate_password.check_user_name 用户名检查，用户名和密码不能相同，我们也把它关掉

     输入：

     ```sql
     set global validate_password.check_user_name=off;
     ```

   - 再执行修改密码的命令

     输入：

     ```sql
     ALTER USER ‘root’@‘localhost’ IDENTIFIED BY ‘12345’;
     ```

     密码设成功
     用 mysql 客户连接报不允许连接的错误，那是因为没开通远程访问的权限

7. 配置远程访问

   输入：

   ```sql
   GRANT ALL ON *.* TO 'root'@'%';
   flush privileges;
   ```

   报错：

   mysql> GRANT ALL ON . TO ‘root’@’%’;
   ERROR 1410 (42000): You are not allowed to create a user with GRANT

   看下默认 MySQL 用户：
   输入：

   ```sql
   use mysql;
   ```

   输入：

   ```sql
   select host, user, authentication_string, plugin from user;
   ```

   发现 root 的 host 是 localhost，不是%，可以加个 host 是%的 root 账号：
   输入：

   ```sql
   CREATE USER ‘root’@’%’ IDENTIFIED BY ‘123456Aa?’;
   ```

   再查下用户

   输入：

   ```sql
   select host, user, authentication_string, plugin from user;
   ```

   可以看到已经新增了 host 为%的 root 用户

   输入：

   ```sql
   GRANT ALL ON *.* TO 'root'@'%';
   flush privileges;
   ```

   配置成功

---

**如果客户端连接 mysql 报错，并且其他配置都正常的情况下**

原因可能是 mysql8 的加密方式规则不一样，是 caching_sha2_password

需要加密方式改成 mysql_native_password 就行了

语法:

ALTER USER ‘[用户名]’@’%’ IDENTIFIED WITH mysql_native_password BY ‘[密码]’;

输入：

```sql
ALTER USER ‘root’@’%’ IDENTIFIED WITH mysql_native_password BY ‘123456Aa?’;
```

加密方式以及改成了 mysql_native_password

---

## mysql5.7

1. 下载并安装mysql的repo源，例如：
    ```shell
    wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm

    yum -y install mysql57-community-release-el7-10.noarch.rpm
    ```
    如果没有安装wget需要安装一下
    ```shell
    yum -y install wget】
    ```
2. 安装
    ```shell
    yum -y install mysql-community-server
    ```
    安装mysql-community-server时提示公钥尚未安装

    方法一，运行这个命令：
    ```shell
    rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
    ```

    方法二，修改文件：`/etc/yum.repos.d/mysql-community.repo`，修改对应安装版本的gpgcheck=0即可
3. 启动服务

    启动mysql服务：`systemctl start mysqld.service`

    查看是否启动mysql服务：`systemctl status mysqld.service`

4. 修改密码
    查看mysql初始密码：
    ```sql
    grep "password" /var/log/mysqld.log
    ```
    进入mysql：
    ```sql
    mysql -u root -p
    ```
    修改密码：
    ```sql
    alter user user() identified by "你的密码" # user()为当前登录人，所以该命令是修改当前登录人的密码，也可以把user()替换为某个具体的用户名
    ```
    如果提示密码强度过低
    ```sql
    set global validate_password_policy=0;  # 密码强度设为最低等级

    set global validate_password_length=4;  # 密码允许最小长度为4，也可以是1

    flush privileges;  # 更新授权表，生效
    ```
5. 配置远程访问权限

    ```shell
    GRANT ALL PRIVILEGES ON *.* TO 'yourusername'@'%' IDENTIFIED BY 'yourpassword' WITH GRANT OPTION;

    FLUSH PRIVILEGES;
    ```
    如果提示密码强度过低，执行上面的修改密码强度策略的命令


