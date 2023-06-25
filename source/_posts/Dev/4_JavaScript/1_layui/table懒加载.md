---
title: table懒加载

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table懒加载
abbrlink: 14808
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=6e4719a98a4e48059eb990216acfb091
---

```js
let page = 1, limit = 30, pageNum = 0,count = 0
let dataList = [];
DataAnalysis.initData = function (page, limit) {
    var ajax = new $ax( Hussar.ctxPath+'/swj/swjdetail',
        function (res) {
            count = res.count;
            let recordList = res.data;
            for (let i = 0; i < recordList.length; i++) {
                dataList.push(recordList[i]);
            }
            pageNum = Math.floor(count/limit)+1;
        }, function (data) {
            Hussar.error("加载失败");
        });
    ajax.set("xlmc",xlmc);
    ajax.set("id",id);
    ajax.set("page", page);
    ajax.set("limit", limit);
    ajax.start();
};

DataAnalysis.initTablea = function () {
	table.render({
	    elem: '#swjtable',
	    height:$("body>div:first-child").height(),
	        [
	            {title: '序号', type: 'numbers', align: "center", halign: 'center', width: 50},
	            {title: '检测时间', field: 'jcsj', align: 'center', halign: 'center',width: 120},
	        ]],
	    page: true,
	    id: 'testReload',
	    even: true,
	    limit:count,
	    data:dataList,
	    where: {

	    },
	    done: function (res, curr, count) {
	        // 监听滚动条
	        $(".layui-table-main").scroll(function () {
	            // console.log('监听到了')
	            if (($('.layui-table-main')[0].scrollHeight - $(this).scrollTop() - $('.layui-table-main')[0].clientHeight) == 0 && pageNum > page) {
	                DataAnalysis.scrollHeight=$(this).scrollTop();
	                page = page + 1;
	                DataAnalysis.initData(page, limit);
	                table.reload('testReload', {
	                    data: dataList
	                });
	            }
	        });

	        // 手动设置滚动条的位置
	        if (page != 1) {
	            $(".layui-table-main").scrollTop(DataAnalysis.scrollHeight);
	        }
	    }
	}
}

DataAnalysis.initData(page,limit)
DataAnalysis.initTablea();
```