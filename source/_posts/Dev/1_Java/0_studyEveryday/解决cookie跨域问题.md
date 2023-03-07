---
title: 解决cookie跨域问题

categories:
  - Dev
  - Java
  - studyEveryday
tags:
  - Dev
  - Java
  - studyEveryday
  - 解决cookie跨域问题
abbrlink: 40883
date: 2023-03-06 15:47:44
---

业务需求：当前网站想要访问第三方网站的页面，第三方网站的页面接口都需要使用 cookie 认证授权
遇到的问题：当前网站和第三方网站不同域。在当前网站使用 iframe。跳转到第三方时。后台通过接口得到的 cookie 无法传递

解决方式 1:
nginx 反向代理，用当前网站的域代理第三方网站,然后用当前网站的域+第三方网站的接口 url 就能获取第三方网站的页面或数据
示例：
nginx.conf

```conf
server {
        listen  19100;
        #server_name  localhost;

        location / {
            proxy_pass http://47.95.34.252:8084;
        }
    }
```

js

```js
const url = 'http://127.0.0.1:19100/JcjcGl/Dcztjctky/Dcztbx'

function initPage() {
  $.ajax({
    url: Hussar.ctxPath + '/tTzJzdcDmjcd/jiuzhouAuth',
    async: true,
    success(res) {
      if (res.code == 200) {
        $('#page').attr('src', url)
      } else {
        Hussar.error('九州系统认证失败,请刷新重试')
      }
    },
    error() {
      Hussar.error('九州系统认证失败，请刷新重试')
    }
  })
}
```

java

```java
@RequestMapping("/jiuzhouAuth")
@ResponseBody
public Map<String, Object> jiuzhouAuth(HttpServletResponse response) {
    Map<String, Object> res = new HashMap<>();
    try {
        String cookieStr = dmjcdService.callRemoteInterfaceGetCookie();
        response.setHeader("Set-Cookie", cookieStr);
        res.put("code", HttpCode.OK);
    } catch (Exception e) {
        e.printStackTrace();
        res.put("code", HttpCode.INTERNAL_SERVER_ERROR);
    }
    return res;
}
```
