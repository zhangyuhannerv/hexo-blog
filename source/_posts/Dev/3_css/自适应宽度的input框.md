---
title: 自适应宽度的input框

categories:
  - Dev
  - css
tags:
  - Dev
  - css
  - 自适应宽度的input框
abbrlink: 45263
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=5a3c3b8244bc4076b75918be3df62dd9
---

解决办法 1：div 的 contenteditable="true"属性。能实现一行编辑。
待解决的问题：需要禁止回车换行，同时还有编辑完之后光标不会回到最开始，光标会保留在你最后编辑的地方

```html
<div class="dict_val1" contenteditable="true" id="lineLength"></div>
```

```css
div[contenteditable] {
  height: 0.1458rem;
  line-height: 0.1458rem;

  /*重要*/
  width: auto;
  min-width: 0.1458rem;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  /*重要*/

  color: #001631;
  padding: 0 0.0677rem;
}
```

开启编辑状态的话只需把 outline 的 none 去掉就行，改为默认状态或自定义属性如 outline:#00FF00 dotted thick;
或者不更改 outLine 状态，把 div 的 border 调出来也可以

---

解决方案 2:传统的 input 方法 我比较推荐使用
待解决的问题：只能实现下划线效果的自适应，不能实现四周带边框效果的自适应
给 input 一个固定的宽度,隐藏它周围的边框

```html
<input readonly autocomplete="off" class="line_edit" id="line_name" />
```

当点击编辑的时候给 input 加上一个类 input_text_underline,这样文字就有下划线了。

```CSS
.input_text_underline {
   text-decoration: underline;
   text-decoration-color: #8F9AB4;
}
```