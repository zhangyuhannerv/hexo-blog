---
title: layer弹出层table变形的问题

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - layer弹出层table变形的问题
abbrlink: 19453
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=a884f8919b65409e9e627a8cc34b71c2
---

解决方案 1
前提：需要给每个表头设置合适的宽度
效果：弹出层宽度根据渲染出来的表格宽度自适应，高度固定（百分比/具体的数值都可以）

```css
.dataDetailLayer {
  display: none;
  padding: 20px;
}
```

```html
<div class="dataDetailLayer">
  <table id="dataDetailTable" lay-filter="dataDetailTable"></table>
</div>
```

```js
table.on('tool(dataTable)', function (obj) {
  // 注：test 是 table 原始标签的属性 lay-filter="对应的值"
  let data = obj.data //获得当前行数据
  let id = data.id
  let layEvent = obj.event
  if (layEvent === 'view') {
    //查看
    initDataDetailTable(data)
  }
})

function initDataDetailTable(data) {
  let loadLayer = layer.msg('正在获取数据', { icon: 16, time: 0 })
  let id = data.id
  let cols
  if (data.xianbie) {
    // 当宽度超过当前窗口的宽度时，可以加上下面这行代码。让弹窗宽度自适应为80%
    // 但是注意：此时表头右固定会失效
    // $(".dataDetailLayer").width($(document.body).width() * 0.8)
    cols = [
      [
        //表头
        { type: 'numbers', title: '序号', width: 80 },
        { field: 'yskm', title: '预算科目', align: 'center', width: 90 },
        { field: 'wlsx', title: '物料属性', align: 'center', width: 110 },
        { field: 'wlbm', title: '物资编码', align: 'center', width: 140 },
        { field: 'wlmc', title: '物料名称', align: 'center', width: 120 },
        { field: 'ggxh', title: '规格型号', align: 'center', width: 120 },
        { field: 'dw', title: '计量单位', align: 'center', width: 90 },
        { field: 'dj', title: '预算单价', align: 'center', width: 90 },
        { field: 'sl', title: '数量', align: 'center', width: 90 },
        { field: 'hj', title: '合计', align: 'center', width: 80 },
        { field: 'slOne', title: '第一季度', align: 'center', width: 90 },
        { field: 'slTwo', title: '第二季度', align: 'center', width: 90 },
        { field: 'slThree', title: '第三季度', align: 'center', width: 90 },
        { field: 'slFour', title: '第四季度', align: 'center', width: 90 },
        { field: 'lrPer', title: '录入人', align: 'center', width: 80 }
      ]
    ]
  } else {
    cols = [
      [
        //表头
        { type: 'numbers', title: '序号', rowspan: 2, width: 80 },
        {
          field: 'yskm',
          title: '预算科目',
          align: 'center',
          rowspan: 2,
          width: 90
        },
        {
          field: 'wlsx',
          title: '物料属性',
          align: 'center',
          rowspan: 2,
          width: 110
        },
        {
          field: 'wlbm',
          title: '物资编码',
          align: 'center',
          rowspan: 2,
          width: 140
        },
        {
          field: 'wlmc',
          title: '物料名称',
          align: 'center',
          rowspan: 2,
          width: 120
        },
        {
          field: 'ggxh',
          title: '规格型号',
          align: 'center',
          rowspan: 2,
          width: 120
        },
        {
          field: 'dw',
          title: '计量单位',
          align: 'center',
          rowspan: 2,
          width: 90
        },
        {
          field: 'dj',
          title: '预算单价',
          align: 'center',
          rowspan: 2,
          width: 90
        },
        { field: 'sl', title: '数量', align: 'center', rowspan: 2, width: 90 },
        { field: 'hj', title: '合计', align: 'center', rowspan: 2, width: 80 },
        { title: '合计需求量', align: 'center', colspan: 3 },
        {
          field: 'lrPer',
          title: '录入人',
          align: 'center',
          rowspan: 2,
          width: 80
        }
      ],
      [
        //表头
        { field: 'slYf', title: '燕房', align: 'center', width: 80 },
        { field: 'slJc', title: '机场', align: 'center', width: 80 },
        { field: 'sl19h', title: '19号', align: 'center', width: 80 }
      ]
    ]
  }
  table.render({
    elem: '#dataDetailTable',
    url: Hussar.ctxPath + '/tYwglYsXlfinfo/list',
    even: true,
    cols,
    where: {
      id
    },
    done() {
      layer.close(loadLayer)
      layer.open({
        title: data.jcmc,
        type: 1,
        content: $('.dataDetailLayer'),
        area: ['auto', '80%'],
        btn: ['关闭'],
        yes(index) {
          layer.close(index)
        }
      })
    }
  })
}
```

解决方案 2:表格的各个表头的宽度固定，根据表头的总高度以及弹窗的样式自己算出 layer 的宽度。
同时给个合适的高度。（弹窗的宽，高都是固定值）

```js
layer.open({
        title: '区间：' + util.formatMile(requestData.startMile) + ' - ' + util.formatMile(requestData.endMile),
        type: 1,
        content: $(".chartLayer"),
        area: ['628px', '410px'],
        success(layero, index) {
            table.render({
                elem: '#chartLayerTable'
                , height: 313
                , url: Hussar.ctxPath + '/sjfxMhJcsj/' + url //数据接口
                , page: false //开启分页
                , cols: [[ //表头
                    {title: '序号', type: 'numbers', align: 'center'}
                    , {
                        field: 'mile', title: '里程', width: 130, align: 'center', templet(row) {
                            return util.formatMile(row.mile)
                        }
                    }
                    , {field: 'lx', title: '检测项', width: 120, align: 'center'}
                    , {field: 'value', title: '检测值', width: 80, align: 'center'}
                    , {field: 'pp', title: '评判', width: 90, align: 'center'}
                    , {field: 'date', title: '检测日期', width: 120, align: 'center'}
                ]],
                where: requestData,
                done(res) {
	                // 这里可以利用假数据算出设置的弹窗高度最高可以容纳几个表格数据。当表格的数据量多于这个值的时候，重置弹窗的宽度，在原先的基础上加上17px
                    if (res.data.length > 9) {
                        layer.style(index, {
                            width: '645px',
                        });
                    }
                }

            });
        }
    })
}
```