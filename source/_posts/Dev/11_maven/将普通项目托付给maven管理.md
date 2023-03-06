---
title: '将普通项目托付给maven管理'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'maven'
tags: 
  - 'Dev'
  - 'maven'
  - '将普通项目托付给maven管理'
---
如需将一个java项目托付给maven管理。在项目的根目录下，建个pom.xml把以下内容复制进去。同时**右键把该项目标记为maven项目**(不同的idea版本该操作的名称可能不一样)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!--组id-->
    <groupId>com.zh</groupId>
    <!--唯一标识id-->
    <artifactId>parseStsSwing</artifactId>
    <!--版本号-->
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!--这里面添加各种依赖,比如例子就是poi-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>3.17</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>3.17</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!--这里面添加各种插件,例子是打所有的依赖与文件到一个jar包的插件-->
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
