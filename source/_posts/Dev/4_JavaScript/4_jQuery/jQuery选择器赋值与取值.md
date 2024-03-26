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
// 或者
$("input[name=jclx]").attr("checked",'2');// 设置value=2的项目为当前选中项 

// 如果是layui表单里渲染的radio，还需要让radio重新渲染一下
form.render('radio')
```

## 下拉框select

```html
<select class="selector"></select>
```

### 赋值和取值

```js
// 设置value为pxx的项选中
$(".selector").val("pxx");

// 设置text为pxx的项选中
 $(".selector").find("option:contains('pxx')").attr("selected",true);
// 注意：之前$(".selector").find("option[text='pxx']").attr("selected",true);这种写法是错误的，目前证实input支持这种获取属性值的写法："input[text='pxx']"，select中需要"option:contains('pxx')"这样获取。

// 获取当前选中项的value
$(".selector").val();

// 获取当前选中项的text
$(".selector").find("option:selected").text();
// 或者
$("select[name=items] option[selected]").text();
```

### select级联

```js
$(".selector1").change(function(){

     // 先清空第二个

      $(".selector2").empty();

     // 实际的应用中，这里的option一般都是用循环生成多个了

      var option = $("<option>").val(1).text("pxx");

      $(".selector2").append(option);

});
```

## 文本框

```js
$("#txt").attr("value",'')// 清空内容 
$("#txt").attr("value",'11')// 填充内容 
$("#txt").attr("value")// 获取内容
```

## 多选框

```js
$("#checkbox_id").attr("value")// 获取值

$("#chk1").attr("checked",'');// 不勾选id为chk1点多选框

$("#chk2").attr("checked",true);// 勾选id为chk2点多选框 

if($("#chk1").attr('checked')){
  // 判断是否已经勾选
} 


// 获取所有选中的多选框的值
<input type="checkbox" name="myName" value="1" checked>
<input type="checkbox" name="myName" value="2" checked>
<input type="checkbox" name="myName" value="3">
const arr = [];
$('input[type=checkbox][name=myName]:checked').each(function () {
    arr.push($(this).val());
});

```
