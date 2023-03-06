---
title: 'npm常用命令'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'node'
  - 'npm'
tags: 
  - 'Dev'
  - 'node'
  - 'npm'
  - 'npm常用命令'
---
1. 检查前NPM源：
	npm get registry 

2. 设置镜像命令
	npm config set registry http://registry.npm.taobao.org/ \#设置淘宝镜像  
	npm config set registryhttps://registry.npmjs.org \#设置默认镜像

3. 初始化项目
	建立一个空文件夹，在命令提示符进入该文件夹 执行命令初始化
	npm init
	按照提示输入相关信息，如果是用默认值则直接回车即可。
	name: 项目名称
	name: 项目名称
	description: 项目描述
	keywords: {Array}关键词，便于用户搜索到我们的项目
	最后会生成package.json文件，这个是包的配置文件，相当于maven的pom.xml
	我们之后也可以根据需要进行修改。
	如果想直接生成 package.json 文件，那么可以使用命令
	npm init -y

4. 当从git/svn下载源码的时候，此时没有node_modules目录，使用此命令能根据package.json里的配置的依赖版本下载所有的依赖包
	npm install

5. (老版本)将模块安装到项目的node_modules目录中，但不写入package.json
	(新版本)默认带--save 参数。效果和npm install --save x一样
	npm install x

6. 如果想替换版本，那么直接加@并以相同的命令执行即可。不用先执行卸载命令
	没有@安装最新版本，有了@安装指定版本的依赖
	npm install x@1.2.3

7. 如果想安装0.18版本的最后一个小版本，那么写
	npm install x@0.18.x

8. 全局安装模块
	不会将模块安装到项目的node_modules，而是会安装到node.js的node_modules目录中
	npm install --global x

9. 安装项目运行依赖
	将模块安装进项目的node_modules目录中，并写入package.json的dependencies中
	npm install --save x

10. 安装项目开发依赖
	将模块安装进项目的node_modules目录中，并写入package.json的devDependencies中
	npm install --save-dev x

11. dependencies和devDependencies的区别
	devDependencies保存的是开发环境的依赖。比如webpack，gulp这些模块，都只是在开发阶段使用
	dependencies保存的是生产环境的依赖，比如vue，vue-router等

12. 更新包（更新到最新版本）
	针对项目的node_modules目录来说的，而且无论是开发依赖还是运行依赖都能生效
	npm update 包名

13. 卸载包
	针对项目的node_modules目录来说的，而且无论是开发依赖还是运行依赖都能生效
	npm uninstall 包名
