---
title: Gitlab在服务器上的安装

categories:
  - Arc
  - git
  - gitlab
tags:
  - Arc
  - git
  - gitlab
  - Gitlab在服务器上的安装
abbrlink: 14935
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=c7a5edaad2be4d6aa30e0d871fa96f44
---

# 阅前注意

**本文档对于 gitlab 仓库管理只适用于 http 协议。如需 ssh 协议。请自行百度生成和配置公钥和私钥**

**本文档适用于 linux 的发行版为 centos7。其他的发行版 ubuntu、debian 等请自行百度**

**整理 by:张雨晗** **2020.7.20**

**[参考博客 1](https://www.cnblogs.com/you-men/p/13126530.html)**

**[参考博客 2](https://blog.csdn.net/qiushisoftware/article/details/112754180)**

**[参考博客 3](https://blog.csdn.net/wangyy130/article/details/85633303)**

---

# 目录：

[TOC]

---

# 1.安装过程

## 1.下载 rpm 文件

[gitlab 的 rpm 包下载地址](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/)

ctrl+鼠标左键点击打开链接，下载最新的 rpm 包

![20210719165359.png](https://s2.loli.net/2023/03/08/VtZw3IuTHEmWsvo.png)

## 2.上传 rpm 文件。注意：linux 的运营规范里明确规定了第三方软件包放在/opt/文件夹下

可以使用第三方工具。注意：xftp 禁用

也可以使用 win 下的 cmd 命令

示例

```shell
scp -P 221 D:\download\gitlab-ce-14.0.4-ce.0.el7.x86_64.rpm root@123.123.122.138:/opt/
```

之后再输入访问的密码即可。

## 3.安装

### 1.安装所需要的环境

```shell
yum -y install policycoreutils-python
```

```shell
yum -y install openssh-server
```

### 2.安装 gitlab

```shell
cd /opt
```

安装时间较长。请耐心等待。中途除非报错。否则不要中断

```she
rpm -ivh gitlab-ce-14.0.4-ce.0.el7.x86_64.rpm
```

### 3.修改配置文件

```she
vi /etc/gitlab/gitlab.rb
```

按 G 跳到文件末尾

在文件末尾添加如下配置项

```properties
external_url 'http://123.123.122.138:8089'		# gitlab服务器的url。同时也是使用git clone时的前缀
nginx['listen_port'] = 8089		# gitlab服务器监听的端口号。默认是80，但一般不用,因为会和nginx的默认端口冲突
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'you_menz@163.com'
gitlab_rails['gitlab_email_display_name'] = 'Admin'    # 待会邮箱收到邮件的发件人就是此处名字
gitlab_rails['gitlab_email_reply_to'] = 'you_menz@163.com'
gitlab_rails['gitlab_email_subject_suffix'] = 'gitlab[]'
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.163.com"
gitlab_rails['smtp_port'] = 25
gitlab_rails['smtp_user_name'] = "you_menz@163.com"
gitlab_rails['smtp_password'] = "zhoujian22"  # 此处密码是邮箱客户端的授权密码
gitlab_rails['smtp_domain'] = "163.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false
```

保存退出

### 4.运行启动

确保关闭

```shell
gitlab-ctl stop            #停止全部服务
```

更新配置

```shell
gitlab-ctl  reconfigure    #更新配置
```

启动

```shell
gitlab-ctl start           #启动全部服务
```

每次更新 git-lab 配置。都要先停止全部服务，然后更改配置文件，然后更新配置，最后启动全部服务

### 5.初始化 root 密码

切换到 gitlab 下的 bin 目录

```shell
cd /opt/gitlab/bin
```

执行如下指令进入到 gitlab 的控制台（时间较长，请耐心等待)

```
gitlab-rails console
```

![20210719172042.png](https://s2.loli.net/2023/03/08/AmOIEMzrns5VSlw.png)

出现上述结果证明进入控制台成功

输入如下指令，查看所有用户

```shell
u=User.all
```

执行如下指令切换到 root 用户

```shell
u=User.where(id:1).first
```

输入如下指令，设置的 root 用户的密码，如“123456cb”

```shell
u.password='123456a?'
```

输入如下指令，确认密码

```shell
u.password_confirmation='123456a?'
```

执行如下指令，保存设置

```shell
u.save!
```

如果返回结果为 true。输入 exit 退出。

至此。gitlab 初始化 root 密码结束

此时。即可输入 gitlab 的 ip:port 进行访问。

# 2.gitlab 的 web 端的一些操作

## 1.建立用户

在安装的过程中已经重置了 root 的密码。

在 web 端使用 root 的账号和密码登陆。

点击左上角的 menu，在展开的下拉菜单中点击 admin。进入到管理者面板

![20210720090423.png](https://s2.loli.net/2023/03/08/bOSLQx3fgVMdBN4.png)

点击 user 区域的 view lastest users 能够进入到用户管理区

![20210720090624.png](https://s2.loli.net/2023/03/08/WALUzO2h4r9QJ1m.png)

点击 newUser 能够添加用户。可能新增的用户。无法直接为其设置密码。此时可以先设置姓名，用户名，邮箱等。保存并退出后再点击 edit 按钮即可手动指定新建用户的默认密码。

![20210720090646.png](https://s2.loli.net/2023/03/08/ujcYwyVi1I4SagO.png)

注意：

- 只有 root 账号才能建立用户。

## 2.建立项目

建议 root 账号不要直接建立空白的项目，而是先建立各个项目的管理者账户（如 dtjc_root)，通过这些项目管理者账户去建立各自的项目。

建立项目无需特别说明。一切按照 web 端的提示正常一步一步执行。即可。

注意：

- 如果是想先在 gitlab 建立空白项目，再把本地以有的项目 push 到空白项目。要保证 push 的用户具有 developer 之上的角色（developer 及之下的角色不行，push 会提示权限不足）

- 关于修改用户在某个项目的角色，请查看项目邀请成员的操作。

## 3.项目邀请成员

鼠标悬浮于右上角的 project information，点击弹出的菜单里的 members 选项即可邀请成员

![20210720092603.png](https://s2.loli.net/2023/03/08/qTQ7JxXdcphstuE.png)

在 max role 列可以修改用户的角色。因为 Maintainer 相当于该项目的 root。所以建议一个项目最多两到三个 Maintainer 角色。

![20210720093040.png](https://s2.loli.net/2023/03/08/DdNIXuqZi9Wvkm8.png)

## 4.特别注意：取消 main branch protect

gitlab 默认对 main 分支提供保护。只有 Maintainer 才能对 main 分支执行 merge,push,pull 等操作。

如果希望 developer 也能对 main 执行开发中常见的 push,pull,fetch 等命令，需要手动取消 main 分支的保护

点击 settings 里的 Repositoy

![20210720094409.png](https://s2.loli.net/2023/03/08/zAYEjVi8cpSfJL2.png)

点击 protected branches 右侧的 expand 可以在展开的下拉框里看到一条默认的 main 分支保护规则。

不建议直接点击 Unprotected。直接取消该规则。

建议在 Allowed to merge 和 Allowed to push 里添加 developer 角色。

![20210720094552.png](https://s2.loli.net/2023/03/08/UPHlhpZBoGV4JOg.png)

---

**以上就是 gitlab 的部署流程，及 web 端的一些使用说明和操作注意事项。**

**文档至此结束**