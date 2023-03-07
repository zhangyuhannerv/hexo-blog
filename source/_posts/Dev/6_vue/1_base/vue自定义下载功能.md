---
title: vue自定义下载功能

categories:
  - Dev
  - vue
  - base
tags:
  - Dev
  - vue
  - base
  - vue自定义下载功能
abbrlink: 15793
date: 2023-03-06 15:47:44
---

#### 返回整体文件流，通过浏览器转成二进制触发下载

该方式和传统的方式不同。

传统是读取服务器返回的流，这里是服务器流都已经整体返回了，然后才通过 js 转成文件触发下载

该方式只适合下载小文件（一般是小于 10M），如果文件过大，会导致浏览器占用内存过大，页面崩溃

以下载 excel 为例子

前台代码

```js
/**
 * 下载数据导入模板
 */
export function downloadImportTemplate(url, fileName) {
  return request({
    type: 'get',
    url,
    responseType: 'blob'
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName + '.xlsx')
    document.body.appendChild(link)
    link.click()
  })
}

// 其他地方只需引入该方法，调用传入参数即可
downloadImportTemplate('/downloadTemplate', '工程车辆导入模板')
```

```java
@RequestMapping("/downloadTemplate")
public void downLoadEngineeringVehiclesImportTemplateFile(HttpServletResponse response) {
    downLoadTemplate("工程车导入模板", response);
}


public void downLoadTemplate(String name, HttpServletResponse response) {
    String path = "template/" + name + ".xlsx";
    // 创建缓冲区
    byte[] buffer = new byte[1024];// 缓冲区大小1k
    int len = 0;
    // 重点就是获取输入流和输出流，还有设置请求头
    try (InputStream in = this.getClass().getClassLoader().getResourceAsStream(path);
         OutputStream out = response.getOutputStream()) {
        // 设置头部信息
        response.setHeader(
            "Content-disposition",
            "attachment;filename="
            + new String((name + ".xlsx").getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));

        //循环将输入流中的内容读取到缓冲区当中
        while ((len = in.read(buffer)) > 0) {
            //输出缓冲区的内容到浏览器，实现文件下载
            out.write(buffer, 0, len);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```
