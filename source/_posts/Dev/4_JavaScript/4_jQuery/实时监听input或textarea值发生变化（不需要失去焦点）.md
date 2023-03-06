---
title: '实时监听input或textarea值发生变化（不需要失去焦点）'
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
  - '实时监听input或textarea值发生变化（不需要失去焦点）'
---
暂时只对input和textarea有效

select没经过测试，不知道对select是否也有效

```js
$('textarea').bind('input propertychange', function () {
    // do sth
});
```
