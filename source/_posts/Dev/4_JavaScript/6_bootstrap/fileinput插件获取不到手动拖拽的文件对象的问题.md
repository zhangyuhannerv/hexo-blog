---
title: fileinput插件获取不到手动拖拽的文件对象的问题

categories:
  - Dev
  - JavaScript
  - bootstrap
tags:
  - Dev
  - JavaScript
  - bootstrap
  - fileinput插件获取不到手动拖拽的文件对象的问题
abbrlink: 39443
date: 2023-03-06 15:47:44
---

```js
var frame;
$("#add_file").fileinput({
  language: 'zh',                 //中文
  uploadUrl: '/' + url + '/uploadFile',
  showUpload: false,               //是否显示上传按钮
  showCaption: false,             //不显示文字表述
  uploadAsync: true,               //采用同步上传
  removeFromPreviewOnError: true,  //当文件不符合规则，就不显示预览
  dropZoneEnabled: true,
  dropZoneTitle: '拖拽文件到这里 …<br>只支持单文件上传',
  maxFileCount: 100,
  maxFileSize: 0,          //单位为kb，如果为0表示不限制文件大小
  uploadExtraData: function (previewId, index) {
    //这是一个回调函数，会在上传时调用，读取配置的额外参数。
    //拷贝代码，参数先不删
    var obj = {
      xb2: $("#xb2").val(),
      yewuId: $("#yewuId").val(),
      algType: $("#algType").find("option:selected").text(),
      fileType: $("#fileType").find("option:selected").text(),
      col1: $("#col1").val(),
      col2: $("#col2").val(),
      col3: $("#col3").val(),
      col4: $("#col4").val(),
      magor: $("#magor").html(),
    };
    return obj;
  }
}).on("filebatchselected", function(event, files) {// 监听文件选择
  // document.getElementById('add_file')
  // $('#add_file').append(files[0])
  frame = files[0] // 此时拖拽文件后，监听事件，frame就等于第一个文件对象
});


frame = document.getElementById('add_file').files[0];// 这能获得手动选择文件后的第一个文件对象

// 前台传递
formData = new FormData();        //每一次需重新创建
formData.append('file', blob);
formData.append('fileName', file.name);
formData.append('part', part);
formData.append('guid', uid);
$.ajax({
  //上传文件数据
  url: Hussar.ctxPath + "/testTasks/doUploadDatas",
  type: 'POST',
  cache: false,
  data: formData,
  processData: false,
  contentType: false，
  success(){},
  error(){}
})
```

```java
// 后台接收
@RequestMapping(value = "/doUploadDatas",method = RequestMethod.POST)
@ResponseBody
public  Map<String,Object> doSaveImportDatas(@RequestParam("file") MultipartFile file, String fileName, Integer part,String guid) throws Exception{
  Map<String, Object> map = new HashMap<String, Object>();
  try {
    String uuid = UUID.randomUUID().toString().replaceAll("-","");

    String path = fpPath+ File.separator+"source"+File.separator+guid+File.separator;

    File mkdir = new File(path);
    if (!mkdir.exists()) {
      mkdir.mkdirs();
    }
    file.transferTo(new File(path+"\\"+fileName+"-"+part));
    String fileId = UUID.randomUUID().toString().replaceAll("-","");
    map.put("code",200);
    map.put("path",path);
    map.put("fileId",fileId);
  } catch (Exception e) {
    map.put("error",e.getMessage());
  }
  return map;
}
```
