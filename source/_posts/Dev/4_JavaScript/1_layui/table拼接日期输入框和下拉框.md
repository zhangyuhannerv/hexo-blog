---
title: table拼接日期输入框和下拉框

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table拼接日期输入框和下拉框
abbrlink: 11106
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=25b5b2cf038148d2a8311b9eab9b9b6b
---

代码如下

```js
var SbUseHistoryInfoTableEditRowObj = null // 预先定义一个下拉框的变量
// 使用履历
table.render({
  elem: '#SbUseHistoryInfoTable',
  data: [],
  method: 'post',
  contentType: 'application/json;charset=UTF-8',
  //url : Hussar.ctxPath+'/sbinfoProject/getSbUseHistory',
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
        title: '项目',
        field: 'xm',
        align: 'center',
        halign: 'center',
        edit: 'text'
      },
      {
        title: '时间',
        field: 'sj',
        align: 'center',
        halign: 'center',
        edit: 'text',
        event: 'inputDate',
        data_filed: 'date'
      },
      {
        title: '状态',
        field: 'zt',
        align: 'center',
        halign: 'center',
        event: 'ztDropDown',
        templet: function (d) {
          var html = ''
          if (d.zt == '1') {
            html =
              "<option value='0'>使用中</option> <option value='1' selected='selected'>以归还</option>"
          } else {
            html =
              "<option value='0' selected='selected'>使用中</option> <option value='1'>以归还</option>"
          }
          return '<select lay-filter="zt" name="zt"  >' + html + '</select>'
        }
      }
    ]
  ],
  limit: 10,
  //id : 'useHistoryReload',
  even: true,
  where: {},
  done: function (res, curr, count) {
    form.render('select')
    $('.layui-table-body, .layui-table-box, .layui-table-cell').css(
      'overflow',
      'visible'
    )
  }
})

form.on('select(zt)', function (data) {
  // 这里的zt就是select的lay-filter的值
  var oldData = table.cache['SbUseHistoryInfoTable'] // 这里cache后面的值也是table标签里面的lay-filter的值或者为id值，可以将它们两个设置为一样
  SbUseHistoryInfoTableEditRowObj.update({
    zt: data.value
  })

  table.reload('SbUseHistoryInfoTable', {
    url: '',
    data: oldData,
    done: function () {
      // 回调，css，防止下拉框被盖住，直接粘贴即可
      $('.layui-table-body, .layui-table-box, .layui-table-cell').css(
        'overflow',
        'visible'
      )
    }
  })
})

table.on('tool(SbUseHistoryInfoTable)', function (obj) {
  var newdata = {}
  if (obj.event === 'inputDate') {
    // 点击事件日期输入框时进入到此事件
    var field = $(this).data('field')
    laydate.render({
      elem: this.firstChild,
      show: true, //直接显示
      range: true,
      closeStop: this,
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      done: function (value, date) {
        newdata[field] = value
        obj.update(newdata)
      }
    })
  }
  if (obj.event === 'ztDropDown') {
    // 点击下拉框时先进入到此事件
    SbUseHistoryInfoTableEditRowObj = obj
  }
})
```