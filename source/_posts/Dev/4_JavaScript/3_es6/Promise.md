---
title: Promise

categories:
  - Dev
  - JavaScript
  - es6
tags:
  - Dev
  - JavaScript
  - es6
  - Promise
abbrlink: 30119
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=3ef276945cd24ec68bf6050ef0e68a6a
---

# promise 封装 ajax，并且 promise 的链式调用的示例

```js
let request = function (url, type = 'get', data = '', msg = '请求失败') {
  return new Promise((resolve, reject) => {
    // 封装jq ajax
    $.ajax({
      type,
      url,
      async: true,
      data,
      success(res) {
        //成功的回调函数
        if (res.code === 500) {
          Hussar.info(msg)
          reject()
        }

        resolve(res.data)
      },
      error() {
        reject()
      }
    })
  })
}

request('/mainLine/getAllLineList')
  .then((res) => {
    homePage.lineList = res
    homePage.lineTableList = res
    return request('/car/getAllCarList')
  })
  .then((res) => {
    homePage.carList = res
    return request('/carOverrun/getAllCarOverRunData')
  })
  .then((res) => {
    homePage.tableData = res
    homePage.initSelect()
    homePage.createStationMap($('#line').val(), $('#car').val())
    homePage.initTable()
    homePage.initButton()
  })
```