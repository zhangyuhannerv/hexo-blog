---
title: js获取当前页面的地址
categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - js获取当前页面的地址
cover: 'https://www.loliapi.com/acg/?uuid=15931'
abbrlink: 15931
date: 2023-10-25 14:42:13
---

例1

```js
// 地址：http://www.php230.com/fisker/post/0703/window.location.html?ver=1.0&id=6#imhere
window.location.host // URL 的主机部分:www.php230.com，如果没有域名会返回192.168.0.1:8080
window.location.protocol// URL 的协议部分:http:
window.location.pathname// URL 的路径部分(就是文件地址):/fisker/post/0703/window.location.html
window.location.search// 查询(参数)部分:?ver=1.0&id=6
```

例2

```js
window.location.href     → 'https://www.jianshu.com/search?q=JS#comments'
               .origin   → 'https://www.jianshu.com'
               .protocol → 'https:'
               .host     → 'www.jianshu.com'
               .hostname → 'www.jianshu.com'
               .port     → ''
               .pathname → '/search/'
               .search   → '?q=JS'
               .hash     → '#comments'
```


对于常用的地址如：`http://192.168.10.235:8001/dev`
可以用如下方法得到

```js
function getCurrentUrl() {
  let protocol = window.location.protocol
  let host = window.location.host;
  let url = window.location.pathname;
  let webApp = url.split('/')[1];// 这里后台有context-path的话就组合，没有的可以不要；如果前台定义了，可以从环境变量里面取
  let urlPrefix = protocol +"//" + host + "/" + webApp;
  return urlPrefix;
}
```

[参考链接](https://zhuanlan.zhihu.com/p/149523091)
