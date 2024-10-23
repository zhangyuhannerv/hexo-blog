---
title: isNaN()

categories:
  - Dev
  - JavaScript
  - studyEveryday
tags:
  - Dev
  - JavaScript
  - studyEveryday
  - isNaN()
abbrlink: 15930
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=15930
---

sNaN() 函数其实并不能像它的描述中所写的那样，数字值返回 false，其他返回 true。

实际上，它是判断一个值能否被 Number() 合法地转化成数字。

这中间有什么区别呢，主要提现在一些特别的情况如下：

- **1、数字形式的字符串**。例如 "123"、"-3.14"，虽然是字符串型，但被 isNaN() 判为数，返回 false。（"12,345,678"，"1.2.3" 这些返回 true）
- **2、空值**。null、空字符串""、空数组[]，都可被 Number()合法的转为 0，于是被 isNaN 认为是数，返回 false。（undefined、空对象{}、空函数等无法转数字，返回 true）
- **3、布尔值**。Number(true)=1,Number(false)=0，所以 isNaN 对布尔值也返回 false。
- **4、长度为 1 的数组**。结果取决于其中元素，即：isNaN(\[a\])=isNaN(a)，可递归。例如 isNaN(\[\["1.5"]])=false。
- **5、数字特殊形式**。例如"0xabc"、"2.5e+7"，这样的十六进制和科学计数法，即使是字符串也能转数字，所以也返回 false。

可能还有其他情况，一时想不到了。

总之，很多时候不能用单纯用 isNaN() 取判断。

比如一个空值或者数组，甚至是包含字母和符号的字符串，它都有可能告诉你这是数值。还是要结合具体情况使用。