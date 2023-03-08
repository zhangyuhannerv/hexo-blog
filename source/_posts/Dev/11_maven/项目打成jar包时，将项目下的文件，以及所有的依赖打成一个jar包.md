---
title: 项目打成jar包时，将项目下的文件，以及所有的依赖打成一个jar包

categories:
  - Dev
  - maven
tags:
  - Dev
  - maven
  - 项目打成jar包时，将项目下的文件，以及所有的依赖打成一个jar包
abbrlink: 22750
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=0c585427c8a74b6db88242f818a7b749
---

例子：在做一个单机的用 maven 管理的 swing 项目时，引入了 poi，但是打成的 jar 包里没有 poi 的依赖，导致用 exe4j 转换出的 exe 程序报错（Caused by: java.lang.NoClassDefFoundError）

这种错误就是没有将依赖打包进去导致的，所以最好打包成单个 jar 包。

解决办法：在 maven 里加入以下插件

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

在项目的根目录下执行(在执行以下任意操作前别忘了 clean。清除以前的 target 文件夹)
`mvn assembly:assembly`
或
`install -Dmaven.test.skip=true`
或
添加了新的插件后，右侧 maven 的 plugins 列表会多出个命令选项:**assembly**。鼠标左键双击该命令选项下的第一个命令**assembly:assembly**。
实际上和上面的是一样的。但是推荐这种方式（简单，方便，图形化操作，还能应用上 maven 在 idea 里面设置的 setting.xml 配置)
![github连接失败。图片无法展示](https://raw.githubusercontent.com/zhangyuhannerv/picture-host-1/main/202111051728272.png)
执行成功后会在 target 文件夹下除了普通的 jar 外还多出一个以-jar-with-dependencies 结尾的 JAR 包. 这个 JAR 包就包含了项目所依赖的所有 JAR 的 CLASS.

用这个包含所有 CLASS 的单独的 jar 包通过 exe4j 转出的 exe 文件就能成功执行