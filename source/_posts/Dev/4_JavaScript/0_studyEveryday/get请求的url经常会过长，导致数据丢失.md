---
title: 'get请求的url经常会过长，导致数据丢失'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
tags: 
  - 'Dev'
  - 'JavaScript'
  - 'studyEveryday'
  - 'get请求的url经常会过长，导致数据丢失'
---
解决方案：采用post请求，来解决该问题，写一个采用post请求的函数即可
```js
function sendByPost(url, ids){
    var oForm = document.createElement("form");
    oForm.method="post";
    oForm.action=url;
  
    var hasitemsids_input = document.createElement("input");
    hasitemsids_input.type="hidden";
    hasitemsids_input.name="ids";
    hasitemsids_input.value=ids;
    oForm.appendChild(hasitemsids_input);
    document.body.appendChild(oForm);
  
    oForm.submit();
}
```
也可以使用formData
