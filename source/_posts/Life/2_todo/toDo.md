---
title: toDo

categories:
  - Life
  - todo
tags:
  - Life
  - todo
  - toDo
abbrlink: 49496
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=255141c662e4428cb017027d2d363889
---

## 20221114

- [ ] 整理 easyExcel 导入导出数据代码
- [ ] 整理 RabbitTemplate 的 Api
- [ ] 整理 RestTemplate 的 Api
- [x] 整理 FastJSON 的常用 api
- [ ] 申请美版 paypal
- [ ] 申请双标信用卡

## 20230105

- [x] macbook 上记录大兴服务器密码
- [x] 记录/转移广哥的最新 tomcat 项目
- [x] 正式/测试城轨重新打安卓包。上传到服务器。重新生成二维码。替换掉旧有的二维码
- [x] 城轨代码替换 123 地址（注意查看视频播放逻辑）。重新打包。部署
- [x] 查看城轨 nginx 配置。看看是否有要改动的

## 20230106

- [x] 城轨正式二维码不对
- [x] 研究 nginx 前端部署时访问后端的地址(还是我想的对。轻骑兵 md 有毛病)
- [x] xtsz_rwgl_rwxx，track_trackdata,kafka 消息入库

## 20230112

- [x] 测试 windows 通过向日葵访问 mac
- [x] 房补承诺书带着按手印重新上传申请

## 20230301

- [x] http 请求检查文件刷新广播
- [x] 读取文件 mile 为空与不为空的情况
- [x] 消息体 pojo
- [x] 在车辆跑之前打开页面，一直没有检测中，需要手动切换一次行别才能刷新的问题

## 20230406

- [x] 删除前先查询等于fileid的数量，查到数量再删除
- [x] 线程池初始化50，最大200
- [x] 所有的异步在finally里count down
- [x] 删除的条件构造器单独构造
- [x] 手动矫正完成改为计算tqi
- [x] 手动矫正删除无tqi的提示信息
- [x] 手动矫正问题库操作改为异步
- [x] 手动矫正更新文件状态为以解析 

### 20230411

- [x] 数据库最大连接量设为1000，把`max_connections=1000`加入到my.cnf里后重启mysql服务(注意：现在只是临时改`set GLOBAL max_connections=1000`，下次服务器重启记的改为永久的)
- [x] 所有表改为innodb引擎
- [x] 动态几何5张表添加fileid索引，修改代码道岔矫正，手动矫正，检测记录对于数据的增删改使用索引
- [x] dtjc_sj_odometer分区（琢磨）
- [x] 三角坑矫正添加进度条
