---
title: node的环境安装

categories:
  - Dev
  - node
tags:
  - Dev
  - node
  - node的环境安装
abbrlink: 24427
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=054c3f100cda4154aadefde737d1d015
---

## nvm

建议先安装 nvm，而不是直接安装 node

### nvm 是什么

nvm 全英文也叫 node.js version management，是一个 nodejs 的版本管理工具，为了解决 node.js 各种版本存在不兼容现象可以通过它可以安装和切换不同版本的 node.js。
可在点此在上下载最新版本

### nvm 命令提示

- `nvm arch`：显示 node 是运行在 32 位还是 64 位。
- `nvm install <version> [arch]` ：安装 node， version 是特定版本也可以是最新稳定版本 latest。可选参数 arch 指定安装 32 位还是 64 位版本，默认是系统位数。可以添加--insecure 绕过远程服务器的 SSL。
- `nvm list [available]` ：显示已安装的列表。可选参数 available，显示可安装的所有版本。list 可简化为 ls。
- `nvm on` ：开启 node.js 版本管理。
- `nvm off` ：关闭 node.js 版本管理。
- `nvm proxy [url]` ：设置下载代理。不加可选参数 url，显示当前代理。将 url 设置为 none 则移除代理。
- `nvm node_mirror [url]` ：设置 node 镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm npm_mirror [url]` ：设置 npm 镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm uninstall <version>` ：卸载指定版本 node。
- `nvm use [version] [arch]` ：使用制定版本 node。可指定 32/64 位。
- `nvm root [path]` ：设置存储不同版本 node 的目录。如果未设置，默认使用当前目录。
- `nvm version` ：显示 nvm 版本。version 可简化为 v。

### nvm 安装后的操作

1. `nvm install 官网最新的稳定版node的版本号`
2. `nvm use 官网最新的稳定版node的版本号`
3. `node -v`查看 node 是否安装完成

## pnpm

使用 nvm 安装好 node 后，建议使用 pnpm 代替 npm
执行`npm install pnpm -g`安装 pnpm
在项目里使用`pnpm install`代理`npm install`

### pnpm 命令

- `pnpm add -g pnpm` 更新 pnpm
- `pnpm install` 安装项目所有依赖

## nrm

安装完 node 和 pnpm，最后安装 nrm
nrm 是一个镜像源管理工具，可以设置 npm/pnpm 的以来下载地址
执行`npm install nrm -g`安装 nrm
安装完后执行`nrm use taobao`，设置 npm/pnpm 的包下载源使用淘宝镜像

### nrm 命令

- `nrm -v`：查看 nrm 是否安装成功
- `nrm ls`：列出可选择的源
- `nrm use 源名称`：切换使用的源，切换后可使用 nrm ls 查看
- `nrm add 源名称 <url>`：添加新源
- `nrm del 源名称`：删除旧源,nrm del 命令不能删除 nrm 自己内置的源。
- `nrm test 源名称`：测试源的速度，如果不加源名称则是测试所有的源速度
- `nrm home 源名称`：访问源的主页（在默认浏览器打开）
-