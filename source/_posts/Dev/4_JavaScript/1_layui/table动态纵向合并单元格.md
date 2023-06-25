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
abbrlink: 14114
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=8484e35cd7ef48938a8a41981f959181
---

```js
// 正常渲染表格
table.render({
            elem: '#CxDataQdTjXXTab',
            height: 300,
            url: Hussar.ctxPath + '/CxData/getQdCxData',
            cols: [
                //一级表头
                [
                    {title: '官方序号', type: 'numbers', align: 'center', halign: 'center', hide: true},
                    {title: '模板索引', field: 'index1', align: 'center', halign: 'center', hide: true},
                    {title: '序号', field: 'index2', align: 'center', halign: 'center',},
                    {title: '区段', field: 'qj', align: 'center', halign: 'center',},
                    {title: '通道', field: 'lx', align: 'center', halign: 'center',},
                    {title: '超限数量', field: 'sl', align: 'center', halign: 'center'},
                ],
            ],
            page: false,
            id: 'CxDataQdTjXXTab',
            even: true, limit: 20,
            where: {
                csrwId: $("#csrwId").val(),
                xb: '下行',
                isSpecial: isSpecial,
            },
            done(res) {
                // 表格渲染结束后调用合并单元格的方法
                merge(res, "CxDataQdTjXXTab");
            }
        })


// 动态和并单元格的方法
function merge(res, id) {
        var data = res.data;
        var mergeIndex = 0;//定位需要添加合并属性的行数
        var mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
        var columsName = ['index2', 'qj'];//需要合并的列名称
        /*这里的索引是表格col[]数组的下标，下标从0开始，隐藏的列也要算。注意，index列请在后台把要合并的行转为1111，22，3333，444444……..的格式*/
        var columsIndex = [2, 3];//需要合并的列索引值

        for (var k = 0; k < columsName.length; k++) { //这里循环所有要合并的列
            var trArr = $("[lay-id='" + id + "']>.layui-table-box>.layui-table-body>.layui-table").find("tr");//所有行
            for (var i = 1; i < res.data.length; i++) { //这里循环表格当前的数据
                var tdCurArr = trArr.eq(i).find("td").eq(columsIndex[k]);//获取当前行的当前列
                var tdPreArr = trArr.eq(mergeIndex).find("td").eq(columsIndex[k]);//获取相同列的第一列

                if (data[i][columsName[k]] === data[i - 1][columsName[k]]) { //后一行的值与前一行的值做比较，相同就需要合并
                    mark += 1;
                    tdPreArr.each(function () {//相同列的第一列增加rowspan属性
                        $(this).attr("rowspan", mark);
                    });
                    tdCurArr.each(function () {//当前行隐藏
                        $(this).css("display", "none");
                    });
                } else {
                    mergeIndex = i;
                    mark = 1;//一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
                }
            }
            mergeIndex = 0;
            mark = 1;
        }
```