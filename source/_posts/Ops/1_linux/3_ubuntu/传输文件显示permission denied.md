---
title: 传输文件显示permission denied

categories:
  - Ops
  - linux
  - ubuntu
tags:
  - Ops
  - linux
  - ubuntu
  - 传输文件显示permission denied
abbrlink: 28736
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=a2206758ecda4274b389ba841927acc8
---

scp 默认不允许使用 root 账号传输文件.如果想用 root 账号传输文件，在两端服务器

0、使用第二步切换为 root 账号

1、修改 sshd 配置文件

```shell
vi /etc/ssh/sshd_config
```

2、找到 PermitRootLogin，把前面的#去掉，并且改为 yes

```bash
PermitRootLogin yes
```

3、重启 sshd 服务

```bash
service ssh start
```

4、使用 root 账户远程登陆服务器并传输文件即可。注意 root 密码是在第二步自己设置的