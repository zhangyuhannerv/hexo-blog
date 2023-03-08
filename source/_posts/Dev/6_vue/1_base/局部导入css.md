---
title: 局部导入css

categories:
  - Dev
  - vue
  - base
tags:
  - Dev
  - vue
  - base
  - 局部导入css
abbrlink: 48248
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=cd5b8679e2d54c46a57c480e48b893c6
---

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
@import '~@/assets/css/single_block.css';
</style>
```