---
title: '给layui的下拉框赋值，同时触发layui的下拉框选择事件'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'layui'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'layui'
  - '给layui的下拉框赋值，同时触发layui的下拉框选择事件'
---
前提：该选择框需要放在layui-form的表单下
```js
$("#citySerch").val(cityId);// 给下拉框赋值
Let filter=$('#citySerch').attr('lay-filter');//获取该元素的lay-filter属性
filter&&layui.event('form','select('+filter+')',{elem:$("#citySerch"),value:cityId});//触发该标签的select事件
form.render('select');// 重新渲染下拉框
```
