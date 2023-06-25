---
title: ajax导入静态文件

categories:
  - Dev
  - JavaScript
  - jQuery
tags:
  - Dev
  - JavaScript
  - jQuery
  - ajax导入静态文件
abbrlink: 126
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=19bcb5454b254b8ba6cb76afb2a21a28
---

```js
$.ajax({
  type: 'get',
  url: Hussar.ctxPath + '/static/js/homePage/map.json', // 文件相对地址（相对于使用这个js脚本的html文件,非常重要，仔细理解这句话）
  dataType: 'json', // 类型,文件里定义的变量的类型
  async: false,
  success: function (data) {
    Lmap = data
  }
})
```