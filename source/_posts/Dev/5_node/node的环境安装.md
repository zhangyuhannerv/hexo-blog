---
title: 'node的环境安装'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'node'
tags: 
  - 'Dev'
  - 'node'
  - 'node的环境安装'
---
## nvm

建议先安装nvm，而不是直接安装node

### nvm是什么

nvm全英文也叫node.js version management，是一个nodejs的版本管理工具，为了解决node.js各种版本存在不兼容现象可以通过它可以安装和切换不同版本的node.js。
可在点此在上下载最新版本

### nvm命令提示

-   `nvm arch`：显示node是运行在32位还是64位。
-   `nvm install <version> [arch]` ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
-   `nvm list [available]` ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
-   `nvm on` ：开启node.js版本管理。
-   `nvm off` ：关闭node.js版本管理。
-   `nvm proxy [url]` ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
-   `nvm node_mirror [url]` ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
-   `nvm npm_mirror [url]` ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
-   `nvm uninstall <version>` ：卸载指定版本node。
-   `nvm use [version] [arch]` ：使用制定版本node。可指定32/64位。
-   `nvm root [path]` ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
-   `nvm version` ：显示nvm版本。version可简化为v。

### nvm安装后的操作
1. `nvm install 官网最新的稳定版node的版本号`
2. `nvm use 官网最新的稳定版node的版本号`
3. `node -v`查看node是否安装完成

## pnpm

使用nvm安装好node后，建议使用pnpm代替npm
执行`npm install pnpm -g`安装pnpm
在项目里使用`pnpm install`代理`npm install`

### pnpm命令

* `pnpm add -g pnpm` 更新pnpm
* `pnpm install`  安装项目所有依赖

## nrm

安装完node和pnpm，最后安装nrm
nrm是一个镜像源管理工具，可以设置npm/pnpm的以来下载地址
执行`npm install nrm -g`安装nrm
安装完后执行`nrm use taobao`，设置npm/pnpm的包下载源使用淘宝镜像

### nrm命令
* `nrm -v`：查看nrm是否安装成功
* `nrm ls`：列出可选择的源
* `nrm use 源名称`：切换使用的源，切换后可使用nrm ls查看
* `nrm add 源名称 <url>`：添加新源
* `nrm del 源名称`：删除旧源,nrm del 命令不能删除nrm自己内置的源。
* `nrm test 源名称`：测试源的速度，如果不加源名称则是测试所有的源速度
* `nrm home 源名称`：访问源的主页（在默认浏览器打开）
* 



