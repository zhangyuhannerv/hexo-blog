---
title: table删除鼠标悬浮背景颜色变色的效果

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table删除鼠标悬浮背景颜色变色的效果
abbrlink: 28372
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=d97a01caa8e24b5ba19ae1cfc2690e42
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