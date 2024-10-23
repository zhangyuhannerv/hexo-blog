---
title: 快速搭建v2ray

categories:
  - Life
  - v2ray
tags:
  - Life
  - v2ray
  - 快速搭建v2ray
abbrlink: 47358
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=47358
password: Zh13Yu55Ha16
---

## v2ray 一键脚本安装

从下面脚本选择一个能用的

脚本 1

```bash
bash <(curl -sL https://raw.githubusercontent.com/hijkpw/scripts/master/goV2.sh)
```

脚本 2

```bash
bash <(curl -s -L https://git.io/v2ray.sh)
```

记住端口号和 UUID ，客户端配置的时候需要用到，当然，你也可以使用如下命令查看配置：

> cat /etc/v2ray/config.json

## 使用 v2ray

### 开启 v2ray

输入以下命令开启：

```
systemctl enable v2ray
systemctl start v2ray
```

复制好你定义的 port 和 id，等会在客户端中使用。

## 解决 v2ray invalid user: VMessAEAD 可

修改文件：

```
vi /etc/systemd/system/v2ray.service
```

将 Execstart 这一行改为：

```
ExecStart=/usr/bin/env v2ray.vmess.aead.forced=false /usr/bin/v2ray/v2ray -config /etc/v2ray/config.json
```

按下 `Esc` 然后输入 `:wq` 保存退出

## 重启 v2ray：

```
systemctl daemon-reload
systemctl restart v2ray
```

# 客户端使用 v2ray

## Windows 使用 v2ray

搭建好了之后可以在你的系统使用了，到 [v2ray 客户端下载](https://github.com/v2ray/v2ray-core/releases) ，安装后填入你刚刚在服务器中得到的 ip、uuid、port 后开启运行即可。

## macos 使用 v2ray

下载[v2rayx](https://github.com/Cenmrev/V2RayX/releases), 接着打开菜单下的 Config， 将填入你刚刚在服务器中得到的 ip、uuid、port 填入后开启运行即可。

## Linux 用户

在客户端按照上述方法安装 v2ray ，安装完之后将 config.json 文件更改为上述的内容，将服务器的配置信息更改后运行即可。

配置如下：

```
{
  "log": {
    "loglevel": "info"
  },
  "inbounds": [
    {
      "port": 1080,
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      },
      "settings": {
        "udp": true
      }
    },
    {
      "port": 8080,
      "protocol": "http",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      }
    }
  ],
  "outbounds": [
    {
      "tag": "proxy-vmess",
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "你的服务器ip地址",
            "port": 你的v2ray端口,
            "users": [
              {
                "id": "你的uuid",
                "alterId": 4
              }
            ]
          }
        ]
      }
    },
    {
      "tag": "direct",
      "settings": {},
      "protocol": "freedom"
    }
  ],
  "dns": {
    "server": [
      "8.8.8.8",
      "1.1.1.1"
    ]
  },

  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "outboundTag": "proxy-vmess"
      },
      {
        "type": "field",
        "domain": [
          "geosite:cn"
        ],
        "outboundTag": "direct"
      },
      {
        "type": "field",
        "outboundTag": "direct",
        "ip": [
          "geoip:cn",
          "geoip:private"
        ]
      }
    ]
  }
}
```

# V2ray 相关

v2ray 官网

- [V2Ray 的使用手册](https://www.v2ray.com/)

v2ray GitHub

- [v2ray 源码](https://github.com/v2ray/v2ray-core)

V2Ray 客户端使用教程:

- https://233v2.com/post/4/

客户端突然无法访问了

- 解决：https://github.com/v2ray/v2ray-core/issues/1871
  （更换端口）

v2ray 常用命令

`v2ray info` 查看 V2Ray 配置信息
`v2ray config` 修改 V2Ray 配置
`v2ray link` 生成 V2Ray 配置文件链接
`v2ray infolink` 生成 V2Ray 配置信息链接
`v2ray qr` 生成 V2Ray 配置二维码链接
`v2ray ss` 修改 Shadowsocks 配置
`v2ray ssinfo` 查看 Shadowsocks 配置信息
`v2ray ssqr` 生成 Shadowsocks 配置二维码链接
`v2ray status` 查看 V2Ray 运行状态
`v2ray start` 启动 V2Ray
`v2ray stop` 停止 V2Ray
`v2ray restart` 重启 V2Ray
`v2ray log` 查看 V2Ray 运行日志
`v2ray update` 更新 V2Ray
`v2ray update.sh` 更新 V2Ray 管理脚本
`v2ray uninstall` 卸载 V2Ray

# 我的 v2ray

hostwinds

地址 (Address) = 104.168.141.120

端口 (Port) = 35711

用户 ID (User ID / UUID) = cc20d153-fd09-4a4f-9d57-c3fe312469d6

额外 ID (Alter Id) = 0

传输协议 (Network) = tcp

伪装类型 (header type) = none