---
title: 实现if-else

categories:
  - Dev
  - mybatis
tags:
  - Dev
  - mybatis
  - 实现if-else
abbrlink: 51749
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=36620418cb0f4028a289244690404f9b
---

```xml
 <choose>
                <when test="item.tdName == 'hor_acceleration'">
                    '0' as horAcceleration,
                </when>
                <otherwise>
                    hor_acceleration as horAcceleration,
                </otherwise>
 </choose>
```