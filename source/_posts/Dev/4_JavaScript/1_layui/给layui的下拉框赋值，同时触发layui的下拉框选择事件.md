---
title: 给layui的下拉框赋值，同时触发layui的下拉框选择事件

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - 给layui的下拉框赋值，同时触发layui的下拉框选择事件
abbrlink: 46931
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=21f9b2c7bdb94858948ef33fc989fe04
---

前提：该选择框需要放在 layui-form 的表单下

```js
$("#citySerch").val(cityId);// 给下拉框赋值
Let filter=$('#citySerch').attr('lay-filter');//获取该元素的lay-filter属性
filter&&layui.event('form','select('+filter+')',{elem:$("#citySerch"),value:cityId});//触发该标签的select事件
form.render('select');// 重新渲染下拉框
```