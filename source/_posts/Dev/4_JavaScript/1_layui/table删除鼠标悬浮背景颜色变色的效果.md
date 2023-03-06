---
title: 'table删除鼠标悬浮背景颜色变色的效果'
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
  - 'table删除鼠标悬浮背景颜色变色的效果'
---
```css
/*删除鼠标悬浮背景变色效果*/
/*其中#cxDataQdTjSxDiv是数据表格table容器的id,格式如下*/
#CxDataQdTjSxDiv .layui-table tbody tr:hover,
#CxDataQdTjSxDiv .layui-table thead tr,
#CxDataQdTjSxDiv .layui-table[lay-even] tr:nth-child(even) {
    background-color: transparent !important;
}
```
```html
<div id="CxDataQdTjSxDiv" class="tableContainer">
    <label class="tableTitle">区段超限情况统计（上行）</label>
    <table id="CxDataQdTjSxTab" class="layui-table"></table>
</div>
```
