---
title: get请求的url经常会过长，导致数据丢失

categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - get请求的url经常会过长，导致数据丢失
abbrlink: 17621
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=cb9684ae09844d678823de7acfaf263c
---

解决方案：采用 post 请求，来解决该问题，写一个采用 post 请求的函数即可

```js
function sendByPost(url, ids) {
  var oForm = document.createElement('form')
  oForm.method = 'post'
  oForm.action = url

  var hasitemsids_input = document.createElement('input')
  hasitemsids_input.type = 'hidden'
  hasitemsids_input.name = 'ids'
  hasitemsids_input.value = ids
  oForm.appendChild(hasitemsids_input)
  document.body.appendChild(oForm)

  oForm.submit()
}
```

也可以使用 formData