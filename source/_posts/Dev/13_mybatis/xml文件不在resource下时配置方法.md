---
title: xml文件不在resource下时配置方法
categories:
  - Dev
  - mybatisPlus
tags:
  - Dev
  - mybatisPlus
  - xml文件不在resource下时配置方法
cover: 'https://imgapi.xl0408.top?uuid=59895'
abbrlink: 59895
date: 2023-06-28 15:49:44
---

1. 在pom中添加build打包的配置

```xml
<build>
    <!--项目打包时会讲java目录中的*.xml文件也进行打包-->
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/mapping/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

2. 在application.properties文件中添加

```yml
#配置mapper xml文件寻找的路径
#此时xml必须在mapping文件夹下
mybatis-plus.mapper-locations=classpath:com/study/**/mapping/*.xml  
```
