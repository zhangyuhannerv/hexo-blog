---
title: 某个dom全屏或者整体页面全屏

categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - 某个dom全屏或者整体页面全屏
abbrlink: 54254
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=f9082d7a2d4c4bd4a338031ae82ae709
---

```js
//如果dom没有就让整个页面全屏
const full = document.querySelector('#box') || document.documentElement

if (full.RequestFullScreen) {
  full.RequestFullScreen()

  //兼容Firefox
} else if (full.mozRequestFullScreen) {
  full.mozRequestFullScreen()

  //兼容Chrome, Safari and Opera等
} else if (full.webkitRequestFullScreen) {
  full.webkitRequestFullScreen()

  //兼容IE/Edge
} else if (full.msRequestFullscreen) {
  full.msRequestFullscreen()
}
```