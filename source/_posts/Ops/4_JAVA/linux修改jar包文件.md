---
title: 'linux修改jar包文件'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Ops'
  - 'JAVA'
tags: 
  - 'Ops'
  - 'JAVA'
  - 'linux修改jar包文件'
---

1.  使用jar tvf jar名称 | grep 目标文件名 查询出目标文件在war包中的目录
    
2.  使用jar xvf jar名称 目标文件名(copy上面查出的全路径) 将目标文件及所在war包中的目录解压到当前路径
    
3.  修改目标文件的内容，或者将要新的目标文件替换掉提取出来的目标文件
    
4.  使用jar uvf jar名称 目标文件名（和步骤（2）中的目标文件名相同） 将新目标文件替换到 jar包中
    

### 1、具体

这里以blog.jar为例进行操作

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

4、将修改的新文件替换到jar包中

```none
jar -uvf blog-0.0.1-SNAPSHOT.jar BOOT-INF/classes/templates/_fragments.html
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/66bc44fe8ddd4799bf0e089af5676142.png)
