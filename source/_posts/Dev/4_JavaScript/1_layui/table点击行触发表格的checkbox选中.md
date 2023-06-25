---
title: table点击行触发表格的checkbox选中

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table点击行触发表格的checkbox选中
abbrlink: 38275
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=8209d36d9b6b485c8e1f922bde6fe1b4
---

```js
// 正常的渲染一个表格
table.render({
  elem: '#LineStruTable',
  height: $('.tableArea').height() - 85,
  url: Hussar.ctxPath + '/lineStru/list',
  toolbar: '#toolbarDemo',
  defaultToolbar: ['filter', 'exports'],
  cols: [
    [
      { checkbox: true, halign: 'center', align: 'center', width: 50 },
      {
        title: '序号',
        type: 'numbers',
        align: 'center',
        halign: 'center',
        width: 50
      },
      {
        title: '主键',
        hide: true,
        field: 'id',
        align: 'center',
        halign: 'center',
        sort: true
      },
      {
        title: '线路名称',
        field: 'lineName',
        align: 'center',
        halign: 'center',
        sort: true
      },
      {
        title: '线路编号',
        field: 'linkCode',
        align: 'center',
        halign: 'center',
        sort: true
      },
      {
        title: '起始里程',
        field: 'startMileStr',
        align: 'center',
        halign: 'center',
        sort: true
      },
      {
        title: '结束里程',
        field: 'endMileStr',
        align: 'center',
        halign: 'center',
        sort: true
      },
      {
        title: '线路类型',
        field: 'typeStr',
        align: 'center',
        halign: 'center',
        sort: true
      }
    ]
  ],
  page: false,
  id: 'lineStruTable',
  even: true,
  where: {
    cityId: $('#city').val(),
    linkCode: $('#line').val()
  }
})

// 渲染完表格后加上下面这两段代码即可
// 点击layui表格行会选中复选框
$(document).on(
  'click',
  '.layui-table-body table.layui-table tbody tr',
  function () {
    var index = $(this).attr('data-index')
    var tableBox = $(this).parents('.layui-table-box')
    //存在固定列
    if (tableBox.find('.layui-table-fixed.layui-table-fixed-l').length > 0) {
      tableDiv = tableBox.find('.layui-table-fixed.layui-table-fixed-l')
    } else {
      tableDiv = tableBox.find('.layui-table-body.layui-table-main')
    }
    var checkCell = tableDiv
      .find('tr[data-index=' + index + ']')
      .find('td div.laytable-cell-checkbox div.layui-form-checkbox I')
    if (checkCell.length > 0) {
      checkCell.click()
    }
  }
)

//对td的单击事件进行拦截停止，防止事件冒泡再次触发上述的单击事件（Table的单击行事件不会拦截，依然有效）
$(document).on(
  'click',
  'td div.laytable-cell-checkbox div.layui-form-checkbox',
  function (e) {
    e.stopPropagation()
  }
)
```