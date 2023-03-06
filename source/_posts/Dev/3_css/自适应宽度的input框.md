---
title: '自适应宽度的input框'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'css'
tags: 
  - 'Dev'
  - 'css'
  - '自适应宽度的input框'
---
解决办法1：div的contenteditable="true"属性。能实现一行编辑。 
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
开启编辑状态的话只需把outline的none去掉就行，改为默认状态或自定义属性如 outline:#00FF00 dotted thick;
或者不更改outLine状态，把div的border调出来也可以
***
解决方案2:传统的input方法 我比较推荐使用
待解决的问题：只能实现下划线效果的自适应，不能实现四周带边框效果的自适应
给input一个固定的宽度,隐藏它周围的边框
```html
<input readonly autocomplete="off" class="line_edit" id="line_name">
```
当点击编辑的时候给input 加上一个类 input_text_underline,这样文字就有下划线了。
```CSS
.input_text_underline {
   text-decoration: underline;
   text-decoration-color: #8F9AB4;
}
```
