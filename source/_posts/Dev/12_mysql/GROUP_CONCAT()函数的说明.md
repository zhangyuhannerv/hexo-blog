---
title: GROUP_CONCAT()函数的说明
categories:
  - Dev
  - mysql
tags:
  - Dev
  - mysql
  - GROUP_CONCAT()
abbrlink: 4112
cover: 'https://www.loliapi.com/acg/?uuid=4112'
date: 2023-09-08 15:33:11
---

首先我们来建立一个测试的表和数据，代码如下

```sql
 CREATE TABLE `per` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `pname` varchar(50) DEFAULT NULL,
   `page` int(11) DEFAULT NULL,
   `psex` varchar(50) DEFAULT NULL,
   `paddr` varchar(50) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
 
 
 INSERT INTO `per` VALUES ('1', '王小华', '30', '男', '北京');
 INSERT INTO `per` VALUES ('2', '张文军', '24', '男', '上海');
 INSERT INTO `per` VALUES ('3', '罗敏', '19', '女', '重庆');
 INSERT INTO `per` VALUES ('4', '张建新', '32', '男', '重庆');
 INSERT INTO `per` VALUES ('5', '刘婷', '26', '女', '成都');
 INSERT INTO `per` VALUES ('6', '刘小亚', '22', '女', '重庆');
 INSERT INTO `per` VALUES ('7', '王建军', '22', '男', '贵州');
 INSERT INTO `per` VALUES ('8', '谢涛', '28', '男', '海南');
 INSERT INTO `per` VALUES ('9', '张良', '26', '男', '上海');
 INSERT INTO `per` VALUES ('10', '黎记', '17', '男', '贵阳');
 INSERT INTO `per` VALUES ('11', '赵小丽', '26', '女', '上海');
 INSERT INTO `per` VALUES ('12', '张三', null, '女', '北京');
```

## concat()函数

首先我们先学一个函数叫concat()函数, 这个函数非常简单

功能：就是将多个字符串连接成一个字符串

语法：concat(字符串1, 字符串2,...)    字符串参数用逗号隔开!

返回值: 结果为连接参数产生的字符串，如果有任何一个参数为null，则返回值为null。

### 案例

这有一张表

```sql
 +----+-----------+------+------+--------+
 | id | pname     | page | psex | paddr  |
 +----+-----------+------+------+--------+
 |  1 | 王小华    |   30 | 男   | 北京   |
 |  2 | 张文军    |   24 | 男   | 上海   |
 |  3 | 罗敏      |   19 | 女   | 重庆   |
 |  4 | 张建新    |   32 | 男   | 重庆   |
 |  5 | 刘婷      |   26 | 女   | 成都   |
 |  6 | 刘小亚    |   22 | 女   | 重庆   |
 |  7 | 王建军    |   22 | 男   | 贵州   |
 |  8 | 谢涛      |   28 | 男   | 海南   |
 |  9 | 张良      |   26 | 男   | 上海   |
 | 10 | 黎记      |   17 | 男   | 贵阳   |
 | 11 | 赵小丽    |   26 | 女   | 上海   |
 | 12 | 张三      | NULL | 女   | 北京   |
 +----+-----------+------+------+--------+
```

执行如下语句

```sql
select concat(pname,page,psex) from per;
```

结果

```sql
+-------------------------+
| concat(pname,page,psex) |
+-------------------------+
| 王小华30男              |
| 张文军24男              |
| 罗敏19女                |
| 张建新32男              |
| 刘婷26女                |
| 刘小亚22女              |
| 王建军22男              |
| 谢涛28男                |
| 张良26男                |
| 黎记17男                |
| 赵小丽26女              |
| NULL                    |
+-------------------------+
 ```

 为什么会有一条是NULL呢?  

 那是因为第12条数据中的page字段为空，根据有一个字段为空结果就为NULL的理论推导出 查询出的最后一条记录为NULL!

 结果虽然连在一起显示了 但是彼此没有分隔符，因此衍生出来的 `concat_ws()`函数

 ## concat_ws()函数


功能：concat_ws()函数 和 concat()函数一样，也是将多个字符串连接成一个字符串，但是可以指定分隔符!

语法：concat_ws(separator, str1, str2, ...) 第一个参数指定分隔符, 后面依旧是字符串

separator就是分隔符字符!

需要注意的是分隔符不能为null，如果为null，则返回结果为null。

### 案例

```sql
select concat_ws(',',pname,page,psex) from per;  
````

以逗号分割 结果如下

```sql
+--------------------------------+
| concat_ws(',',pname,page,psex) |
+--------------------------------+
| 王小华,30,男                   |
| 张文军,24,男                   |
| 罗敏,19,女                     |
| 张建新,32,男                   |
| 刘婷,26,女                     |
| 刘小亚,22,女                   |
| 王建军,22,男                   |
| 谢涛,28,男                     |
| 张良,26,男                     |
| 黎记,17,男                     |
| 赵小丽,26,女                   |
| 张三,女                        |
+--------------------------------+
```

把分隔符指定为null，结果全部变成了null

```sql
select concat_ws(null,pname,page,psex) from per;   #--错误的
```

```sql
+---------------------------------+
| concat_ws(null,pname,page,psex) |
+---------------------------------+
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
| NULL                            |
+---------------------------------+
 ```

## group_concat()函数

功能：将group by产生的同一个分组中的值连接起来，返回一个字符串结果。

语法：group_concat( [distinct] 要连接的字段 [order by 排序字段 asc/desc  ] [separator '分隔符'] )

注意: 中括号[]中的内容是可选的

分析:  通过使用distinct可以排除重复值；如果希望对结果中的值进行排序，可以使用order by子句；separator是一个字符串值，缺省为一个逗号。

**重点注意**

1. group_concat只有与group by语句同时使用才能产生效果 所以使用 GROUP_CONCAT（）函数必须对源数据进行分组，否则所有数据会被合并成一行

2. 需要将拼接的结果去重的话，可与DISTINCT结合使用即可

### 案例1

需求: 要查在重庆的有哪些人? 并且把这些人的名字用 '-' 字符分隔开 然后显示出来, SQL语句如下

```sql
 #--这里就用到了 : 取出重复、显示排序、 定义分隔字符
 select
  paddr,
  group_concat(distinct pname order by pname desc separator '-') as '人'
 from per
 group by paddr;
```

```sql
#--结果为:
 +--------+----------------------------+
 | paddr  | 人                         |
 +--------+----------------------------+
 | 上海   | 赵小丽-张良-张文军         |
 | 北京   | 王小华-张三                |
 | 成都   | 刘婷                       |
 | 海南   | 谢涛                       |
 | 贵州   | 王建军                     |
 | 贵阳   | 黎记                       |
 | 重庆   | 罗敏-张建新-刘小亚         |
 +--------+----------------------------+
#--有多个的自然会被用字符分隔连接起来，只有一个人的就没有什么变化!直接显示
```

### 案例2

需求：要查在重庆的有哪些人? 并且把这些人的名字用逗号隔开

以上需求跟上面的案例1 差不多 所以加一个效果, 也就是显示出来的名字前面把id号也加上

```sql
 #--显示出来每一个名字所对应的id号  这里我们结合了group_concat()函数 和 concat_ws()函数,
select
  paddr,
  group_concat(concat_ws('-',id,pname) order by id asc) as '人'
from 
  per
group by paddr;
```

```sql
 #--显示结果
 +--------+-----------------------------------+
 | paddr  | 人                                |
 +--------+-----------------------------------+
 | 上海   | 2-张文军,9-张良,11-赵小丽         |
 | 北京   | 1-王小华,12-张三                  |
 | 成都   | 5-刘婷                            |
 | 海南   | 8-谢涛                            |
 | 贵州   | 7-王建军                          |
 | 贵阳   | 10-黎记                           |
 | 重庆   | 3-罗敏,4-张建新,6-刘小亚          |
 +--------+-----------------------------------+
```

** 注意：

1. MySQL中函数是可以嵌套使用的

2. 一般使用group_concat()函数,必须是存在group by 分组的情况下 才能使用这个函数

### 案例3

准备以下测试数据

准备一个student学生表、MySQL代码如下

```sql
#-- student
 CREATE TABLE `student` (
   `id` int(11) NOT NULL AUTO_INCREMENT,   #--id
   `stuName` varchar(22) DEFAULT NULL,   #--学生姓名
   `course` varchar(22) DEFAULT NULL,   #--学习科目
   `score` int(11) DEFAULT NULL,        #--学分
   PRIMARY KEY (`id`)       #--设置主键
 ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;  #--设置表引擎  自动递增起始值 默认编码格式
```

插入以下数据

```sql
 INSERT INTO `student`(stuName,course,score) VALUES ('张三', '语文', '91');
 INSERT INTO `student`(stuName,course,score) VALUES ('张三', '数学', '90');
 INSERT INTO `student`(stuName,course,score) VALUES ('张三', '英语', '87');
 INSERT INTO `student`(stuName,course,score) VALUES ('李四', '语文', '79');
 INSERT INTO `student`(stuName,course,score) VALUES ('李四', '数学', '95');
 INSERT INTO `student`(stuName,course,score) VALUES ('李四', '英语', '80');
 INSERT INTO `student`(stuName,course,score) VALUES ('王五', '语文', '77');
 INSERT INTO `student`(stuName,course,score) VALUES ('王五', '数学', '81');
 INSERT INTO `student`(stuName,course,score) VALUES ('王五', '英语', '89');
```

建立好之后 数据如下显示:

```sql
 mysql> select * from student;
 +----+---------+--------+-------+
 | id | stuName | course | score |
 +----+---------+--------+-------+
 | 10 | 张三    | 语文   |    91 |
 | 11 | 张三    | 数学   |    90 |
 | 12 | 张三    | 英语   |    87 |
 | 13 | 李四    | 语文   |    79 |
 | 14 | 李四    | 数学   |    95 |
 | 15 | 李四    | 英语   |    80 |
 | 16 | 王五    | 语文   |    77 |
 | 17 | 王五    | 数学   |    81 |
 | 18 | 王五    | 英语   |    89 |
 +----+---------+--------+-------+
```

继续使用group_concat()函数  加深印象

#### 需求1

以stuName学生名称分组，把得分数score字段的值打印在一行，逗号分隔(默认)

```sql
select stuName, GROUP_CONCAT(score) as '当前这个学生的得分数' from student GROUP BY stuName;
```

运行结果

```sql
+---------+--------------------------------+
 | stuName | 当前这个学生的得分数           |
 +---------+--------------------------------+
 | 张三    | 91,90,87                       |
 | 李四    | 79,95,80                       |
 | 王五    | 77,81,89                       |
 +---------+--------------------------------+
```

#### 需求2

根据需求1，分数是出来了 但是不知道是什么科目分数  所以还要把科目也连起来显示,并且分数还是从小到大,SQL如下

```sql
 select stuName, GROUP_CONCAT(concat_ws('=',course,score) order by score asc) as '当前这个学生的得分数' from student GROUP BY stuName;
```

执行结果

```sql
 +---------+--------------------------------+
 | stuName | 当前这个学生的得分数           |
 +---------+--------------------------------+
 | 张三    | 英语=87,数学=90,语文=91        |
 | 李四    | 语文=79,英语=80,数学=95        |
 | 王五    | 语文=77,数学=81,英语=89        |
 +---------+--------------------------------+
```

#### 需求3

查询出 语文、数学、外语 三门课的最低分，还有哪个学生考的？

简单的说 先连接好分数字段中的得分默认用逗号 再从分数连接字符中提取第一个出来

```sql
 #--首先我们要得到每一个科目中最小的分数 我们可以分析出如下SQL,  
 #--这里的分组条件还是以科目进行分组, 分组之后还是GROUP_CONCAT()函数用逗号连接起相对应的所有分数,然后用SUBSTRING_INDEX()函数提取连接字符中的第一个字符作为结果
 SELECT course,SUBSTRING_INDEX(GROUP_CONCAT(score ORDER BY score ASC),',',1) AS score FROM student GROUP BY course;
```

```sql
 #--结果如下
 +--------+-------+
 | course | score |
 +--------+-------+
 | 数学   | 81    |
 | 英语   | 80    |
 | 语文   | 77    |
 +--------+-------+
```

```sql
 #--我们可以把这个结果 想象成一张虚拟表取一个别名 t, 现在t这个是一个临时的表，我们要查询id,科目,分数,姓名, 就在前面加上需要的字段,注意别名
 #--然后再使用左连接筛选出 对应的结果
 SELECT  g.`id`,g.`course`,g.`score`,g.`stuName`FROM
 (SELECT course,SUBSTRING_INDEX(GROUP_CONCAT(score ORDER BY score ASC),',',1) AS score FROM student GROUP BY course) as t
 LEFT JOIN student AS g ON (t.course = g.`course` AND t.score = g.`score`) 
 #--left join 来显示出符合条件的结果 也就是用上面查询出来的结果来对应条件
```

```sql
 #--结果如下
 +------+--------+-------+---------+
 | id   | course | score | stuName |
 +------+--------+-------+---------+
 |   15 | 英语   |    80 | 李四    |
 |   16 | 语文   |    77 | 王五    |
 |   17 | 数学   |    81 | 王五    |
 +------+--------+-------+---------+
```

### 案例4

准备一个商品表, 代码如下

```sql
 #-- goods
 CREATE TABLE `goods` (
   `id` int(11) NOT NULL AUTO_INCREMENT,   #--id
   `price` varchar(22) DEFAULT NULL,       #--商品价格
   `goods_name` varchar(22) DEFAULT NULL,  #--商品名称
   PRIMARY KEY (`id`)       
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  #--设置表引擎  自动递增起始值 默认编码格式
 
 -- ----------------------------
 -- 插入以下数据
 -- ----------------------------
 INSERT INTO `goods`(price,goods_name) VALUES (10.00, '皮包');
 INSERT INTO `goods`(price,goods_name) VALUES (20.00, '围巾');
 INSERT INTO `goods`(price,goods_name) VALUES (30.00, '围巾');
 INSERT INTO `goods`(price,goods_name) VALUES (40.00, '游戏机');
 INSERT INTO `goods`(price,goods_name) VALUES (60.00, '皮包');
 INSERT INTO `goods`(price,goods_name) VALUES (80.00, '游戏机');
 INSERT INTO `goods`(price,goods_name) VALUES (220.00, '游戏机');
 INSERT INTO `goods`(price,goods_name) VALUES (780.00, '围巾');
 INSERT INTO `goods`(price,goods_name) VALUES (560.00, '游戏机');
 INSERT INTO `goods`(price,goods_name) VALUES (30.00, '皮包');
```

#### 需求1

以商品名称分组，把price字段的值在一行打印出来，分号分隔

```sql
 select goods_name,group_concat(price) from goods group by goods_name;
```

#### 需求2

以商品名称分组，把price字段的值在一行打印出来，分号分隔  并且去除重复冗余的价格字段的值

```sql
 select goods_name,group_concat(distinct price) from goods group by goods_name;

```

#### 需求3

以商品名称分组，把price字段的值在一行打印出来，分号分隔  去除重复冗余的价格字段的值  并且排序 从小到大

```sql
 select goods_name,group_concat(distinct price order by price desc) from goods group by goods_name;  #--错误的
 select goods_name,group_concat(distinct price order by price+1 desc) from goods group by goods_name; #--正确的
 #--注意以上存在隐式数据类型转换 如果不这样转换排序出来的结果是错误的   , 因为我保存price价格的字段是varchar类型的
```

### 案例5

使用group_concat()函数来做一个多表查询

准备三张 测试数据表: 用户表[user]、水果表[fruit]、用户喜欢哪些水果的表[user_like]

```sql
 #-- user
 CREATE TABLE `user` (
   `id` int(11) NOT NULL AUTO_INCREMENT,   #--id
   `username` varchar(22) DEFAULT NULL,   #--用户名
   PRIMARY KEY (`id`)       
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  #--设置表引擎  自动递增起始值 默认编码格式
 
 #--插入测试数据
 INSERT INTO `user`(username) VALUES ('张三');
 INSERT INTO `user`(username) VALUES ('李四');
 INSERT INTO `user`(username) VALUES ('王文玉');
```

```sql
#-- fruit
 CREATE TABLE `fruit` (
   `id` int(11) NOT NULL AUTO_INCREMENT,   #--id
   `fruitname` varchar(22) DEFAULT NULL,   #--水果名称
   PRIMARY KEY (`id`)       
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  #--设置表引擎  自动递增起始值 默认编码格式
 
 
 #--插入测试数据
 INSERT INTO `fruit`(fruitname) VALUES ('西瓜');
 INSERT INTO `fruit`(fruitname) VALUES ('苹果');
 INSERT INTO `fruit`(fruitname) VALUES ('芒果');
 INSERT INTO `fruit`(fruitname) VALUES ('梨');
 INSERT INTO `fruit`(fruitname) VALUES ('葡萄');
```

```sql
#-- user_like
 CREATE TABLE `user_like` (
   `id` int(11) NOT NULL AUTO_INCREMENT,   #--id
   `user_id` int,             #--用户的id号
   `fruit_id` int,             #--水果的id号
   CONSTRAINT user_like PRIMARY KEY (id,user_id,fruit_id)  #--定义联合主键  让每一条记录唯一
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;  #--设置表引擎  自动递增起始值 默认编码格式
 
 
 #--测试数据
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (1,1);  #--这就代表用户表中id号为1的用户  喜欢fruit表中id号为1的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (1,2);  #--这就代表用户表中id号为1的用户  喜欢fruit表中id号为2的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (1,3);  #--这就代表用户表中id号为1的用户  喜欢fruit表中id号为3的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (2,3);  #--这就代表用户表中id号为2的用户  喜欢fruit表中id号为3的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (2,4);  #--这就代表用户表中id号为2的用户  喜欢fruit表中id号为4的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (2,5);  #--这就代表用户表中id号为2的用户  喜欢fruit表中id号为5的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (3,5);  #--这就代表用户表中id号为3的用户  喜欢fruit表中id号为5的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (3,1);  #--这就代表用户表中id号为3的用户  喜欢fruit表中id号为1的水果
 INSERT INTO `user_like`(user_id,fruit_id) VALUES (3,2);  #--这就代表用户表中id号为3的用户  喜欢fruit表中id号为2的水果
```

#### 需求

查出每个用户喜欢的水果都有哪些

```sql
 #--查询SQL如下
 select u.username,group_concat(f.fruitname) from user_like as c inner join user as u on c.user_id=u.id inner join  fruit as f on c.fruit_id=f.id group by c.user_id;
```

```sql
 #--结果如下
 +-----------+---------------------------+
 | username  | group_concat(f.fruitname) |
 +-----------+---------------------------+
 | 张三      | 芒果,苹果                 |
 | 李四      | 梨,芒果,葡萄              |
 | 王文玉    | 西瓜,葡萄,苹果            |
 +-----------+---------------------------+
```
