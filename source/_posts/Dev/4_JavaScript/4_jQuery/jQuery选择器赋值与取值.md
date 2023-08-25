---
title: jQuery选择器赋值与取值
categories:
  - Dev
  - JavaScript
  - jQuery
tags:
  - Dev
  - JavaScript
  - jQuery
  - jQuery选择器赋值与取值
cover: 'https://imgapi.xl0408.top?uuid=13486'
abbrlink: 13486
date: 2023-08-25 15:02:19
---

## 单选框radio

```html
<input type="radio" name="jclx" value="1" title="当前期次" checked>
<input type="radio" name="jclx" value="2" title="当前月份">
```

```js
// 获取radio选中的值
$("input[name='jclx']:checked").val()

// 设置radio选中的值
$("input[name='jclx'][value='1']").prop("checked", true)
// 如果是layui表单里渲染的radio，还需要让radio重新渲染一下
form.render('radio')
```
