---
title: layer弹出层里再弹出一个弹出层导致新的弹出层重复弹出的问题

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - layer弹出层里再弹出一个弹出层导致新的弹出层重复弹出的问题
abbrlink: 16214
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=e8ba084f604447559313de6193caaaa1
---

解决办法:在 layui 的 layer 配置 json 里给每个弹出层指定个不同的 id 即可

```js
let index = layer.open({
  type: 1,
  title: false,
  move: $('#uploadHead'),
  closeBtn: 0,
  area: ['5.1979rem', '2.5052rem'],
  content: $('#uploadFileModel'),
  id: 'layer1'
})
layer.confirm(
  '是否取消本次文件上传？',
  {
    skin: 'confirm-class',
    icon: 3,
    title: '提示',
    id: 'layer2'
  },
  function (index1) {
    // index1表示确认框代表的弹出层实例
    layer.closeAll()
  }
)
```