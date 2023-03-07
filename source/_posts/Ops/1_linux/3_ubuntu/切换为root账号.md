---
title: 切换为root账号

categories:
  - Ops
  - linux
  - ubuntu
tags:
  - Ops
  - linux
  - ubuntu
  - 切换为root账号
abbrlink: 3339
date: 2023-03-06 15:47:44
---

- Ubuntu 的默认 root 密码是随机的，即每次开机都有一个新的 root 密码。可以在终端输入命令 sudo passwd，然后输入当前用户的密码，回车.
- 终端会提示输入新的密码并确认，此时的密码就是 root 新密码。修改成功后，输入命令 su root，再输入新的密码就成功切换到 root 帐号了
