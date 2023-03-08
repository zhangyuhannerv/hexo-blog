---
title: 在maven库上添加手动添加第三方jar包

categories:
  - Dev
  - maven
tags:
  - Dev
  - maven
  - 在maven库上添加手动添加第三方jar包
abbrlink: 61509
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=72d6f84bc25b4599a346b54ce2f3dffb
---

进入到放这个 jar 包的文件夹，运行 cmd

然后根据下面的例子手动自己可以尝试着添加

```bash
mvn install:install-file -Dfile=aspose-words-16.4.0-jdk16.jar -DgroupId=com.aspose.word  -DartifactId=aspose.words -Dversion=16.4.0-jdk16 -Dpackaging=jar -DgeneratePom=true
```

```xml
<dependency>
			<groupId>com.aspose.word</groupId>
			<artifactId>aspose.words</artifactId>
			<version>16.4.0-jdk16</version>
</dependency>
```