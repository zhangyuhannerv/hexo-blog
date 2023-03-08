---
title: 项目的jar包都正常引用了，但是build时就是提示jar包不存在的解决办法

categories:
  - Dev
  - maven
tags:
  - Dev
  - maven
  - 项目的jar包都正常引用了，但是build时就是提示jar包不存在的解决办法
abbrlink: 52198
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=a06744e5719a4e3c8bd30bf22c45ae71
---

如题，编译和打包都是正常的，pom 文件中依赖存在并且没有报错。找到相应包的引用位置，也能正常访问包中的内容。而且提示的一般都是基础的 jar 包找不到，比如单元测试用到的 jar 包等。。。

情形一：

其他同事提交代码时把 idea 中的 .iml 文件也一起提交了，该文件中配置的 jdk lib 路径与自己电脑中的该路径不一致。

解决方法很简单，执行一下 maven update 即可，也可以手动修改 .iml 文件中的该路径。
![](https://raw.githubusercontent.com/zhangyuhannerv/picture-host-1/main/20210713083737.png)

情形二：

排除情形一出现的原因，或使用情形一中的方法解决无效时，可以使用以下命令更新不完整依赖：

`mvn -U idea:idea`

需要注意的是，该命令使用的插件早在 13 年就已经停止维护，所以有可能出现各种问题，比如我遇到过的空指针异常。

情形三：

使用情形二中的方法解决无效时，可以使用以下方法再次尝试

1.  ctrl + alt + shift + s 或 在界面菜单选择 File --> Project Structure
2.  点击 Libraries 找到提示不存在的 jar 包（这里以 junit 为例），选中，然后右键打开菜单，选择 Convert to Repository Library…
3.  执行 maven update

    ![如图](https://raw.githubusercontent.com/zhangyuhannerv/picture-host-1/main/20210713084001.png)

    一般到此都能解决问题，如果还是解决不了，可能真的是人品问题，那就只能呵呵了。。

    [原文连接](https://www.jb51.net/article/189894.htm)