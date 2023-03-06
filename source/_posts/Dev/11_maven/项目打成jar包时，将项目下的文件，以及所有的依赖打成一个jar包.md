---
title: '项目打成jar包时，将项目下的文件，以及所有的依赖打成一个jar包'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'maven'
tags: 
  - 'Dev'
  - 'maven'
  - '项目打成jar包时，将项目下的文件，以及所有的依赖打成一个jar包'
---
例子：在做一个单机的用maven管理的swing项目时，引入了poi，但是打成的jar包里没有poi的依赖，导致用exe4j转换出的exe程序报错（Caused by: java.lang.NoClassDefFoundError）

这种错误就是没有将依赖打包进去导致的，所以最好打包成单个jar包。

解决办法：在maven里加入以下插件
```xml
<plugin>
	<artifactId>maven-assembly-plugin</artifactId>
	<configuration>
		<descriptorRefs>
			<descriptorRef>jar-with-dependencies</descriptorRef>
		</descriptorRefs>
	</configuration>
</plugin>
```
在项目的根目录下执行(在执行以下任意操作前别忘了clean。清除以前的target文件夹)
`mvn assembly:assembly`
或
`install -Dmaven.test.skip=true`
或
添加了新的插件后，右侧maven的plugins列表会多出个命令选项:**assembly**。鼠标左键双击该命令选项下的第一个命令**assembly:assembly**。
实际上和上面的是一样的。但是推荐这种方式（简单，方便，图形化操作，还能应用上maven在idea里面设置的setting.xml配置)
![github连接失败。图片无法展示](https://cdn.jsdelivr.net/gh/Zhangyuhannerv/picture-host-1@main/202111051728272.png)
执行成功后会在target文件夹下除了普通的jar外还多出一个以-jar-with-dependencies结尾的JAR包. 这个JAR包就包含了项目所依赖的所有JAR的CLASS.

用这个包含所有CLASS的单独的jar包通过exe4j转出的exe文件就能成功执行
