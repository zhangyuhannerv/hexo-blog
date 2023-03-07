---
title: 获取resouces下的文件的输入流InputStream

categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - 获取resouces下的文件的输入流InputStream
abbrlink: 64112
date: 2023-03-06 15:47:44
---

```java
 String filePath = "/excel/1_20210709杭州地铁6号线平稳性_2021_08_28_005001_5S.xlsx";

// 这里io流会自动关闭，无需加finally
// try (InputStream is = new FileInputStream(filePath)) {// 读取绝对路径文件
ClassPathResource classPathResource = new ClassPathResource(filePath);
try (InputStream is = classPathResource.getInputStream()) {// 读取resources下文件方式1（适用于静态)
// try (InputStream is = this.getClass().getResourceAsStream(filePath)) {// 读取相resources下文件方式2(不适用于静态)

    // ....流对象各种处理代码
}
```

![图片加载失败，请确认您能连接到github](https://raw.githubusercontent.com/zhangyuhannerv/picture-host-1/main/202110111450956.png)
