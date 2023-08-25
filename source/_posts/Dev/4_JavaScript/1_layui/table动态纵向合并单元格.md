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
cover: https://imgapi.xl0408.top?uuid=14114
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
                    {title: '序号', type: 'numbers', align: 'center', halign: 'center', hide: true},
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
        let data = res.data;
        let mergeIndex = 0;//定位需要添加合并属性的行数
        let mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
        // 这里的索引是表格col[]数组的下标，下标从0开始，隐藏的列也要算
        let columsIndex = [2, 3];//需要合并的列索引值

        for (let k = 0; k < columsName.length; k++) { //这里循环所有要合并的列
            let trArr = $("[lay-id='" + id + "']>.layui-table-box>.layui-table-body>.layui-table").find("tr");//所有行
            for (let i = 1; i < res.data.length; i++) { //这里循环表格当前的数据
                let tdCurArr = trArr.eq(i).find("td").eq(columsIndex[k]);//获取当前行的当前列
                let tdPreArr = trArr.eq(mergeIndex).find("td").eq(columsIndex[k]);//获取相同列的第一列
                // 这里的markId就是合并的标识或者说条件，可以有多个，当相邻的某些行数据的这些属性相等时，上面设置的列索引中
                // 所包含的列就会合并
                if (data[i].markId === data[i - 1].markId) { { //后一行的值与前一行的值做比较，相同就需要合并
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
