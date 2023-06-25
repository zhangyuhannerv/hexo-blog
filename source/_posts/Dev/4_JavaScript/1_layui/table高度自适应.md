---
title: table高度自适应

categories:
  - Dev
  - JavaScript
  - layui
tags:
  - Dev
  - JavaScript
  - layui
  - table高度自适应
abbrlink: 11603
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=379c9b0a20d54333b37ec99f0a6888d6
---

只需要给表格加上一下 css 即可，加上之后，使用 templet 可以自定义格式化 html 来填充每个 td 的高度

```css
/*右下方的表格的内容高度自适应*/
.layui-table-cell {
  display: table-cell;
  vertical-align: middle;
}
```

注意：加上之后，可能标题和内容的宽度对应不起来，只需要手动给每个 col（表头对象）一个固定的宽度即可解决该问题