---
title: 实时监听input或textarea值发生变化（不需要失去焦点）

categories:
  - Dev
  - JavaScript
  - jQuery
tags:
  - Dev
  - JavaScript
  - jQuery
  - 实时监听input或textarea值发生变化（不需要失去焦点）
abbrlink: 23464
date: 2023-03-06 15:47:44
---

暂时只对 input 和 textarea 有效

select 没经过测试，不知道对 select 是否也有效

```js
$('textarea').bind('input propertychange', function () {
  // do sth
})
```
