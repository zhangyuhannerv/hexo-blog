---
title: 公网nfs配置踩坑

categories:
  - Ops
  - linux
  - centos
tags:
  - Ops
  - linux
  - centos
  - nfs
date: 2024-02-21 14:47:44
cover: https://imgapi.xl0408.top?uuid=afd8a1b1dec942c5adb54ba83e2d587d
---

## 背景

最近需要迁移一个老的单体项目到私有云环境做集群，之前的上传文件都是直接存储在磁盘上，而且体积超大，而且项目架构又从单体过渡到多个实例集群。为了能够读取到之前的上传文件，采用nfs将原先服务器上存储文件的路径挂载到新的私有云环境的多个集群服务器上。网上有很多关于nfs的配置讲解，但是大多是局域网。我这里因为两个环境都是独立封闭，只通过堡垒机提供外部访问，因此需要配置公网的nfs，踩了不少坑。在这里总结一下相关经验。

## 安装nfs

安装的过程实际上很简单。我参考的这篇博客
[Centos7 NFS服务的安装以及使用](http://t.csdnimg.cn/VERoB)

唯一值得注意的是，私有云环境不能用yum，因此我是上传的多个rpm包来手动执行的安装，这里是参考的这篇博客[nfs无网络条件rpm安装](http://t.csdnimg.cn/QjRAO)

如果需要nfs的整合rpm包的话，可以发邮件给我

## 配置

配置这里是踩坑最多的地方，内网的环境下大可以关闭防火墙，而外网环境下不可能对外暴漏所有的端口，因此要搞明白nfs到底配置那些端口开放才能让客户端成功挂载。我这里也是和同事不断的查资料，并且试错最后才成功的。👏🏻👏🏻👏🏻👏🏻👏🏻👏🏻

### 服务端还要额外配置5个端口

```bash
# 修改
vim /etc/sysconfig/nfs
# 追加以下内容
MOUNTD_PORT=4001 #必须 （挂载端口）
STATD_PORT=4002 # 可选 （不知道干啥的）
LOCKD_TCPPORT=4003 # 可选（管理锁状态）
LOCKD_UDPPORT=4003 # 可选（管理锁状态）
RQUOTAD_PORT=4004 # 可选 （不知道干啥的）
```

### 服务端配置了导出路径（上面的博客里有）

[Centos7 NFS服务的安装以及使用](http://t.csdnimg.cn/VERoB)

### 服务端，客户端开启nfs

```bash
systemctl enable rpcbind.service
systemctl enable nfs-server.service
systemctl start rpcbind.service
systemctl start nfs-server.service
```

### 服务端的堡垒机配置开放端口

* PortMap 111(tcp,udp)
* 业务监听端口2049(tcp,udp)
* 挂载的监听端口2050(tcp,udp)
* 挂载端口4001（tcp,udp）
* 上面额外配置剩下的4个建议也都开了

### 客户端检查rpc状态

```bash
rpcinfo -p10.10.52.140
```

出现以下结果证明没问题

```txt
program vers proto   port
100000    4   tcp    111  rpcbind
100000    3   tcp    111  rpcbind
100000    2   tcp    111  rpcbind
100000    4   udp    111  rpcbind
100000    3   udp    111  rpcbind
100000    2   udp    111  rpcbind
100024    1   udp  33697  status
100024    1   tcp  43215  status
100003    4   tcp   2049  nfs
100003    4   udp   2049  nfs
100005    1   udp   4001  mountd
100005    1   tcp   4001  mountd
100005    2   udp   4001  mountd
100005    2   tcp   4001  mountd
100005    3   udp   4001  mountd
100005    3   tcp   4001  mountd
100003    3   tcp   2049  nfs
100227    3   tcp   2049  nfs_acl
100003    3   udp   2049  nfs
100227    3   udp   2049  nfs_acl
100021    1   udp  32769  nlockmgr
100021    3   udp  32769  nlockmgr
100021    4   udp  32769  nlockmgr
100021    1   tcp  32803  nlockmgr
100021    3   tcp  32803  nlockmgr
100021    4   tcp  32803  nlockmgr
```

### 客户端检查目录共享状态

```bash
showmount -e  10.10.52.140
```

出现以下结果证明没问题

```txt
Exports list on 10.10.52.140:
/home/dxjc                          *
/home/cgjc                          *
/data/zdmt                          *
/data/hdt3                          *
/data/hdt2                          *
/data/hdt                           *
/data/gxjcx                         *
/data/gxjcw                         *
/data/gxgc1                         *
/data/gxgc                          *
/data/gwxj4                         *
/data/gwxj2                         *
/data/gwxj                          *
/data/gwimage                       *
/data/gsgc1                         *
/data/gsgc                          *
```

如果报错，那么就检查还有哪些端口为正确开放

### 挂载

```bash
mkdir -p /nfs/gwxj

mount -t nfs -o nolock,vers=3 10.10.52.140:/data/hdt2 /nfs/gwxj
```

成功だぜ、(o゜▽゜)o☆[BINGO!]
