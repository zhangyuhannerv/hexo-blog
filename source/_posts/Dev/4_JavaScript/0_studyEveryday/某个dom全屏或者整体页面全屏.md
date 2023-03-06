---
title: '某个dom全屏或者整体页面全屏'
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
  - '某个dom全屏或者整体页面全屏'
---
```js
//如果dom没有就让整个页面全屏
const full = document.querySelector('#box')||document.documentElement

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
