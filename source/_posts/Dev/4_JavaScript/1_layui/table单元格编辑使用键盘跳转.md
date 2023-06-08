---
title: table单元格编辑使用键盘跳转

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table单元格编辑使用键盘跳转
abbrlink: 17520
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=bdacf74e7d5c463c8ef3b22c73dc2a2d
---

可以单独把下面的代码写个 js，然后在需要的页面上引入该 js

```js
$(document).on('keydown', '.layui-table-edit', function (e) {
  // debugger
  var td = $(this).parent('td'),
    tr = td.parent('tr'),
    trs = tr.parent().parent().find('tr'),
    tr_index = tr.index(),
    td_index = td.index(),
    td_last_index = tr.find('[data-edit="text"]:last').index(),
    td_first_index = tr.find('[data-edit="text"]:first').index()
  switch (e.keyCode) {
    case 13:
    case 39:
      td.nextAll('[data-edit="text"]:first').click()
      if (td_index == td_last_index) {
        tr.next().find('td').eq(td_first_index).click()
        if (tr_index == trs.length - 1) {
          trs.eq(0).find('td').eq(td_first_index).click()
        }
      }
      setTimeout(function () {
        $('.layui-table-edit').select()
      }, 0)
      break
    case 37:
      td.prevAll('[data-edit="text"]:first').click()
      setTimeout(function () {
        $('.layui-table-edit').select()
      }, 0)
      break
    case 38:
      tr.prev().find('td').eq(td_index).click()
      setTimeout(function () {
        $('.layui-table-edit').select()
      }, 0)
      break
    case 40:
      tr.next().find('td').eq(td_index).click()
      setTimeout(function () {
        $('.layui-table-edit').select()
      }, 0)
      break
  }
})
```