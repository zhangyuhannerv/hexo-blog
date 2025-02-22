---
title: 表格自定义单元格
categories:
  - Dev
  - vue
  - ant-design-vue
tags:
  - Dev
  - vue
  - ant-design-vue
  - Table
cover: 'https://www.loliapi.com/acg/?uuid=48333'
abbrlink: 48333
date: 2025-02-22 16:39:34
---

ant-design-vue的a-table组件如何定义单元格内容，整理一下

版本: ant-design-vue4

## 方式1：bodyCell插槽

```js
<template>
  <a-table :columns="columns" :data-source="data">
    <!-- 使用 bodyCell 插槽自定义单元格内容 -->
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="column.dataIndex === 'value'">
        <span :style="text > 0 ? { color: 'red' } : {}">
          {{ text }}
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
let columns=[
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];
</script>

```

## 方式2：为每列自定义插槽名称

```js
<template>
  <a-table :columns="columns" :data-source="data">
    <!-- 自定义 name 列的内容 -->
    <template #name="{ text, record }">
      <span>{{ text }} (自定义内容)</span>
    </template>
  </a-table>
</template>

<script setup>
let  columns: [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    slots: { customRender: 'name' }, // 指定插槽名称
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
]
</script>

```

## 方式3：使用 customRender 函数

```js
<script setup>
import { h } from 'vue'; // 引入 h 函数

let columns = [
  {
    title: '编码',
    dataIndex: 'code',
    key: 'code',
    customRender: ({ text, record }) => {
      let value = record.code // value与text是一致的
      const formattedValue = formatDecimal(text); // 格式化值

      if (record.type.indexOf('剩余') === -1) {
        return formattedValue; // 直接返回值
      } else {
        if (text > 0) {
          // 使用 h 函数创建带样式的 span
          return h('span', { style: { color: 'red' } }, formattedValue);
        } else {
          return formattedValue;
        }
      }
    },
  },
],

function formatDecimal(value) {
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return value.toFixed(2); // 保留 2 位小数
  }
  return value;
},
</script>
```
