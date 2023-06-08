---
title: 利用jQuery实现让容器的滚动条滚动到某个内部元素的位置。让内部元素本来在中间，一下子跑到最上面

categories:
  - Dev
  - JavaScript
  - jQuery
tags:
  - Dev
  - JavaScript
  - jQuery
  - 利用jQuery实现让容器的滚动条滚动到某个内部元素的位置。让内部元素本来在中间，一下子跑到最上面
abbrlink: 3285
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=9c865152e01c4c118f18026ec66ac1cc
---

```html
<ul class="parent" style="height:50px;overflow:auto">
  <li class="children" style="height:25px"></li>
  <li class="children" style="height:25px"></li>
  <li class="children" style="height:25px"></li>
  <li class="children" style="height:25px"></li>
</ul>
```

```js
$('.parent').scrollTop(
  $('.children:eq(2)').offset().top -
    $('.parent').offset().top +
    $('.parent').scrollTop()
)
// 上面的例子就是让父容器的滚动条滚动，让第三个孩子跑到最上面
// 其中parent是父容器
// children是子元素。
```