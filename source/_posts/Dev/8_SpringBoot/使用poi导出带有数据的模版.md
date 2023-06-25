---
title: 使用poi导出带有数据的模版

categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - 使用poi导出带有数据的模版
abbrlink: 46835
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=f6e31ee6c15440fdbc33a2e1b041c952
---

```java
@Override
public void downloadLjcjImportTemplate(String xianbie, String xingbie, HttpServletResponse response) {
  // 设置返回头
  response.setHeader(
    "Content-disposition",
    "attachment;filename="
    + new String(("路基u型槽沉降模版.xlsx").getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));

  // 从库里查询数据
  QueryWrapper<TTzCjDmjcd> qw = new QueryWrapper<>();
  qw.eq("xianbie", xianbie);
  qw.eq("xingbie", xingbie);
  qw.eq("jcd_lx", "6");
  qw.orderByAsc("jcd_lc");
  List<TTzCjDmjcd> exportList = dmjcdService.list(qw);
  // 利用模版文件的输入流创建Workbook对象
  // 同时获取响应流
  try (Workbook wb = new XSSFWorkbook(
    Objects.requireNonNull(this.getClass().getClassLoader().getResourceAsStream("template/ljuxccj.xlsx")));
       OutputStream out = response.getOutputStream()) {
    // 对Workbook进行一些数据的写入
    Sheet sheet = wb.getSheetAt(0);
    for (int i = 0; i < exportList.size(); i++) {
      TTzCjDmjcd item = exportList.get(i);
      Row row = sheet.createRow(i + 1);
      Cell cell = row.createCell(0);
      cell.setCellValue(item.getJcdBh());
    }
    // 将workbook写入到响应流
    wb.write(out);
  } catch (Exception e) {
    e.printStackTrace();
  }
}

// controller层直接调用这个方法，不需要写额外的代码
// 前台通过window.location.href = controller层的地址的方式实现文件下载
```