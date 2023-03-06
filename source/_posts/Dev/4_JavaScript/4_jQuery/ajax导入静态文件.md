---
title: 'ajax导入静态文件'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'jQuery'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'jQuery'
  - 'ajax导入静态文件'
---
```js
$.ajax({
    type: 'get',
    url: Hussar.ctxPath + '/static/js/homePage/map.json', // 文件相对地址（相对于使用这个js脚本的html文件,非常重要，仔细理解这句话）
    dataType: 'json', // 类型,文件里定义的变量的类型
    async: false,
    success: function (data) {
        Lmap = data;
    }
})
```
