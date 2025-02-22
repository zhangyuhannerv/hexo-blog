---
title: 上传组件设置token

categories:
  - Dev
  - vue
  - element-ui
tags:
  - Dev
  - vue
  - element-ui
  - 上传组件设置token
abbrlink: 14250
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=14250
---

```js
<el-upload
  class="uploadBtn"
  accept="xlsx"
  action="http://127.0.0.1:82/lineDic/sstjq/importData"
  :on-success="importData"
  :show-file-list="false"
  :limit="1"
  :headers="headers"
  :file-list="fileList"
>
    <el-button size="small" type="primary">导入</el-button>
</el-upload>

data(){ return{ headers: { Authorization: null }, } } methods: { setToken() {
let tokenName = window.tokenName || window.top.tokenName let token =
localStorage.getItem(tokenName) this.headers.Authorization = token }, }
mounted() { this.setToken(); }
```