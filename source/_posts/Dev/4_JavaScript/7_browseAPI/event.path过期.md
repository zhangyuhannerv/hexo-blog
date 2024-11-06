---
title: event.path过期
categories:
  - Dev
  - JavaScript
  - browseAPI
tags:
  - Dev
  - JavaScript
  - browseAPI
  - event.path过期
cover: 'https://www.loliapi.com/acg/?uuid=65131'
abbrlink: 65131
date: 2023-09-13 10:41:01
---
起因是 chromium 开发团队认为 Event.path 属于非标准 API，会导致 Firefox 等其他浏览器的兼容性问题，于是他们决定将其删除。
目前这个变更在 chrome 108 属于灰度阶段，在chrome 109 上会全面应用，webview 则是从 109 版本开始逐步禁用

在chrome浏览器中，event.path表示触发Dom事件的元素一路冒泡到window的所有元素
但是在在Firefox、Safari、以及Chrome dev浏览器中，event中并没有path这个属性。在Firefox、Safari、以及Chrome dev浏览器中可以通过`event.composedpath()`获取

```js
// 旧的写法
let evt = event || window.event;
let path = evt.path // 此时path为undefined

// 新的写法(兼容所有主流浏览器)
var evt = event || window.event;
let path = evt.path || (evt.composedPath && evt.composedPath())
```
