---
title: table动态纵向合并单元格
categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table动态纵向合并单元格
cover: 'https://www.loliapi.com/acg/?uuid=14116'
abbrlink: 14116
date: 2023-08-25 14:30:11
---

需求：点击layui动态表格的某一行，给这行添加一个背景颜色，用来标识行已被点击

```css
  .table-tr-selected-bg {
      background-color: #6189a7 !important;
      color: #FFF;
  }
```

```html
  <table id="table1" lay-filter="table1"></table>
```

```js
    // 渲染表格
    table.render({
        elem: '#table1'
        , height: 415
        , page: false
        , url: Hussar.ctxPath + "/getData"
        , cols: [[ 
            {field: 'field0', title: '字段0', align: "center",},
            , {field: 'field1', title: '字段1',  align: "center"}
            , {field: 'field2', title: '字段2', align: "center",}
        ]]
        , done(res) {
            // 表格加载完之后给第一行添加一个背景颜色，即默认第一行被选中
            $("div[lay-id='table1'] div.layui-table-box div.layui-table-body tr:eq(0)").addClass('table-tr-selected-bg')
        }
    });

    // 给表格添加行点击事件
    table.on('row(table1)', function (obj) {
        $('.table-tr-selected-bg').removeClass('table-tr-selected-bg');
        $(obj.tr).addClass('table-tr-selected-bg');
    });
```