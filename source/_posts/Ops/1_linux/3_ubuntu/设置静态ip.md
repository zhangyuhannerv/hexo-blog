---
title: '设置静态ip'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Ops'
  - 'linux'
  - 'ubuntu'
tags: 
  - 'Ops'
  - 'linux'
  - 'ubuntu'
  - '设置静态ip'
---
## ubuntu_server18
```bash
vim /etc/netplan/50-cloud-init.yaml
```
配置如下,注意格式 冒号后边有个空格
```yml
network:
    ethernets:
        ens33:
            dhcp4: false
            addresses: [192.168.37.188/24]
            gateway4: 192.168.37.2
            nameservers:
                    addresses: [114.114.114.114,8.8.8.8]
    version: 2
```
编辑好 最后保存配置文件，执行命令重启网络服务生效
```bash
sudo netplan applys
```
