---
title: linux修改jar包文件

categories:
  - Ops
  - JAVA
tags:
  - Ops
  - JAVA
  - linux修改jar包文件
abbrlink: 28105
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=62b105bde80046429367c3604262e906
---

1.  使用 jar tvf jar 名称 | grep 目标文件名 查询出目标文件在 war 包中的目录
2.  使用 jar xvf jar 名称 目标文件名(copy 上面查出的全路径) 将目标文件及所在 war 包中的目录解压到当前路径
3.  修改目标文件的内容，或者将要新的目标文件替换掉提取出来的目标文件
4.  使用 jar uvf jar 名称 目标文件名（和步骤（2）中的目标文件名相同） 将新目标文件替换到 jar 包中

### 1、具体

这里以 blog.jar 为例进行操作

1、首先，查找你需要修改的文件

```none
jar tvf blog-0.0.1-SNAPSHOT.jar | grep _fragments.html
```

2、解压文件到当前目录（会是个文件夹，但是不用管文件夹的其他文件，只找我们要改的文件）

```none
jar -xvf blog-0.0.1-SNAPSHOT.jar BOOT-INF/classes/templates/_fragments.html
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/14d118a7e11c40d9a0b88aff09ffee04.png)

3、如果你有替换的文件就直接替换，没有则修改你需要修改的部分

```none
vim _fragments.html
cp 文件 目标文件
```

4、将修改的新文件替换到 jar 包中

```none
jar -uvf blog-0.0.1-SNAPSHOT.jar BOOT-INF/classes/templates/_fragments.html
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/66bc44fe8ddd4799bf0e089af5676142.png)