---
title: ajax前后台参数传递

categories:
  - Dev
  - JavaScript
  - jQuery
tags:
  - Dev
  - JavaScript
  - jQuery
  - ajax前后台参数传递
abbrlink: 64611
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=266498f3515f4ea2abbfd761702ef2eb
---

## contentType 的类型

- ajax 的默认 contentType 是：

  “application/x-www-form-urlencoded;charset=utf-8”

  它是最普通的{key-value,key-value}的格式

  无论 get 还是 post，springboot 可以默认封装成一个简单的 bean,此时不用添加任何注解。但是如果 bean 的属性有数组等复杂属性。那么会封装失败

  后台也可以用@RequestParam 注解来提取某个简单的参数，如果同名该注解可以省略。但是对于 get 请求。不能提取数组。

  想要提取数组。请求方式必须为 post 并且语法如下@RequestParam("ids[]")

- 如果为

  contentType:"application/json;charset=utf-8",

  data:JSON.stringfy(data),

  此时，请求方式必须为 post，后台用@RequestBody(JavaBean javaBean)

  来接收，该方式几乎是除了文件外的万能方式。

- 如果为 false

  那么一般就是上传文件，详见 ssmpj 的图片上传与回显的例子

- 如果为

  text/xml

  就看这篇博客的解析：

  [原文链接](https://blog.csdn.net/nicexibeidage/article/details/84070290)

  因为实际情况很少遇到

## 前后台传值的例子

1. get 方式传递普通数组和其他单独的参数
   前台 js 代码

   ```js
   //创建一个测试数组

   var boxIds = new Array()

   boxIds.push(12182)

   boxIds.push(12183)

   boxIds.push(12184)

   //向后台交互
   $.ajax({
     url: '/xxx',

     type: 'GET',

     data: {
       boxIds: boxIds,

       boxType: 0,

       time: new Date().getTime()
     },

     traditional: true, //当有数组的时候这里设置为true，没有数组的时候这里可以不设置

     success: function (data) {
       //do sth...
     }
   })
   ```

   后台 controller 代码（SpringMVC）

   ```java
   @ResponseBody
   @RequestMapping(value = "/box/changeLock")

   public String changeLock(Long[] boxIds, int boxType) {

     return locker_ChangeLockService.changeLock(boxIds, boxType);

   }
   ```

2. post 方式向后台传递数组和普通参数

   ```js
   //创建一个测试数组

   var boxIds = new Array();

   boxIds.push(12182);

   boxIds.push(12183);

   boxIds.push(12184);

   //向后台交互
   $.ajax({

     url: "/xxx",

     type: "post",

     contentType:'application/www-form-urlencoded;charset=utf-8'

     data: {

       "boxIds": boxIds,

       "boxType": 0,

       "time": new Date().getTime()

     },

     success: function(data) {

       //do sth...

     }
     });

   ```

   后台 controller 代码（SpringMVC）

   ```java
   @ResponseBody
   @RequestMapping(value = "/box/changeLock")

   public String changeLock(Long[] boxIds, int boxType) {

     return locker_ChangeLockService.changeLock(boxIds, boxType);

   }
   ```

3. post 方式向后台传递复杂参数后台使用@RequestBody 封装

   ```js
   //创建一个测试数组

   var boxIds = new Array();

   boxIds.push(12182);

   boxIds.push(12183);

   boxIds.push(12184);

   var obj = {

       "boxIds": boxIds,

       "boxType": 0,

       "time": new Date().getTime()

   };

   //向后台交互
   $.ajax({

     url: "/xxx",

     type: "post",

     contentType:'application/json;charset=utf-8'

     data: JSON.stringfy(obj)

     success: function(data) {

       //do sth...

     }
     });

   ```

   后台 controller 代码（SpringMVC 和 bean）

   ```java
   @ResponseBody
   @RequestMapping(value = "/box/changeLock")
   public String changeLock(@RequestBody MyObj obj)) {
     return locker_ChangeLockService.changeLock(boxIds, boxType);
   }

   @Data
   public class MyObj{
   	private Integer[] boxIds;// 这里用数组还是List都可以
   	private Integer boxType;
   	private LocalDateTime time;
   }
   ```

4. post 方式向后台对象数组，后台直接封装为 list
   前台代码

   ```js
   var sbUseHistory = table.cache['SbUseHistoryInfoTable']
   var sbUseHistoryList = [] // 这就是json对象数组
   for (var i = 0; i < sbUseHistory.length; i++) {
     var sbinfoProject = {}
     // 下面是把对象的属性和后台实体的属性对应起来，然后在吧json对象push进list数组中
     sbinfoProject.xmName = sbUseHistory[i].xm
     sbinfoProject.sbId = sbId
     sbinfoProject.syTime = sbUseHistory[i].sj
     sbinfoProject.syStatus = sbUseHistory[i].zt
     // sbinfoProject.createTime =
     sbUseHistoryList.push(sbinfoProject)
   }
   $.ajax({
     url: Hussar.ctxPath + '/sbinfoProject/add',
     type: 'post',
     dataType: 'json',
     async: false,
     data: JSON.stringify(sbUseHistoryList), // 这里把json数组用stringfy()方法转成字符串，后台就能封装成对应的实体的集合
     contentType: 'application/json;charset=utf-8',
     success: function (result) {}
   })
   ```

   后台代码

   ```java
   @RequestMapping(value = "/add")
   @BussinessLog(key = "/sbinfoProject/add", type = BussinessLogType.INSERT, value = "新增设备项目履历")
   @RequiresPermissions("sbinfoProject:add")
   @ResponseBody
   public Map<String, Object> add(@RequestBody List<SbinfoProject> list) {

       Map<String, Object> map = new HashMap<>();
       Boolean flag;
       try {
           flag = sbinfoProjectService.saveBatch(list);
       } catch (Exception e) {
           map.put("code", 500);
           map.put("message", "添加失败");
           return map;
       }

       if (flag) {
           map.put("code", 200);
           map.put("message", "添加成功");
           return map;
       } else {
           map.put("code", 500);
           map.put("message", "添加失败");
           return map;
       }
   }
   ```

5. 上传文件并监听上传进度
   ```js
   let formData = new FormData()
   // 这里的file对象可以用其他的框架上传插件来获取，比如layui的或者bootstrap的,或者只是input type='file'的等等等等。
   // 这里只是获取到文件对象，并不用框架来上传，真正上传文件还在下面的代码中
   formData.append('file', file) // 这里的这个file就是前台的文件对象，后台用MultipartFile类接收的
   formData.append('fileInfo', fileInfo)
   formData.append('id', newId)
   let aj = {
     //上传文件数据
     url: Hussar.ctxPath + '/dtjcResources/uploadFile',
     type: 'POST',
     cache: false,
     data: formData,
     processData: false,
     contentType: false,
     async: true,
     xhr() {
       let xhr = new XMLHttpRequest()
       xhr.upload.addEventListener('progress', (e) => {
         let progressRate = Math.round((e.loaded / e.total) * 100) + '%' // 获取到百分比
         $("[fileId='" + domId + "'] .progress_num").text(progressRate) // 让前台的dom元素显示这个百分比
       })
       return xhr
     },
     success(res) {
       if (res.code == '200') {
         $("[fileId='" + domId + "'] .file_progress").text('上传成功')
       } else {
         $("[fileId='" + domId + "'] .file_progress").text('上传失败')
       }
     },
     error() {
       $("[fileId='" + domId + "'] .file_progress").text('上传失败')
     }
   }
   $.ajax(aj)
   ```
   后台使用@RequestParam 一个个提取参数
6. 上传一个或多个文件完整示例（按照 3 的方式微调可以监听上传进度）

   ```html
   <form class="layui-form addArea" lay-filter="addForm">
     <div class="layui-form-item">
       <div class="layui-inline">
         <label class="layui-form-label">线别</label>
         <div class="layui-input-inline">
           <select id="add-xianbie" lay-filter="addXianbie"></select>
         </div>
       </div>
     </div>
     <div class="layui-form-item">
       <div class="layui-inline">
         <label class="layui-form-label">行别</label>
         <div class="layui-input-inline">
           <select id="add-xingbie" lay-filter="addXingbie"></select>
         </div>
       </div>
     </div>
     <div class="layui-form-item">
       <div class="layui-inline">
         <label class="layui-form-label">期次</label>
         <div class="layui-input-inline">
           <select id="add-period"></select>
         </div>
       </div>
     </div>
     <div class="layui-form-item">
       <div class="layui-inline">
         <label class="layui-form-label">文件上传</label>
         <div class="layui-input-inline">
           <input
             id="add-file-name"
             class="layui-input"
             type="text"
             readonly
             placeholder="点击选择文件"
           />
         </div>
         <div class="layui-form-mid" style="padding: 0!important;">
           <button
             type="button"
             class="layui-btn button-delete"
             id="removeFile"
           >
             删除文件
           </button>
         </div>
       </div>
     </div>
     <!-- 这里的accept特指接收.xlsx文件,如果加上multipart属性还能多选文件 -->
     <input
       type="file"
       id="add-file"
       class="layui-hide"
       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     />
     <div class="layui-form-item">
       <div class="layui-input-block">
         <button type="button" class="layui-btn" id="confirmAdd">提交</button>
         <button
           type="button"
           class="layui-btn layui-btn-primary"
           id="cancelAdd"
         >
           取消
         </button>
       </div>
     </div>
   </form>
   ```

   ```js
   // 显示的input和隐藏的input type=file的交互
   $('#add-file-name').click(function () {
     $('#add-file').click()
   })

   $('#add-file').on('change', function (e) {
     let event = e || window.event
     //获取 文件 个数 取消的时候使用
     let files = event.target.files
     if (files && files.length > 0) {
       $('#add-file-name').val(files[0].name)
     } else {
       $('#add-file-name').val('')
     }
   })

   $('#removeFile').click(function () {
     $('#add-file').val('')
     $('#add-file-name').val('')
   })

   // ajax文件和参数一起请求的方法
   $('#confirmAdd').click(function () {
     if (!$('#add-xianbie').val()) {
       Hussar.info('请选择线别')
       return
     }
     if (!$('#add-xingbie').val()) {
       Hussar.info('请选择行别')
       return
     }
     if (!$('#add-period').val()) {
       Hussar.info('请选择期次')
       return
     }
     if (!$('#add-file').val()) {
       Hussar.info('请选择文件')
       return
     }

     // 拼接form数据
     let param = new FormData() //创建form对象
     param.append('xianbie', $('#add-xianbie').val()) //通过append向form对象添加数据
     param.append('xingbie', $('#add-xingbie').val()) //通过append向form对象添加数据
     param.append('period', $('#add-period').val()) //通过append向form对象添加数据
     // 这里如果写.files而不是.files[0]那么就能就能向后台一次发送多个文件
     param.append('file', $('#add-file')[0].files[0]) //通过append向form对象添加数据

     let load = layer.msg('正在读取文件并保存数据，请耐心等待', {
       icon: 16,
       shade: 0.7,
       time: 0
     })
     $.ajax({
       url: Hussar.ctxPath + '/tJcsjCjLj/addNewLjcjRecord',
       type: 'post',
       async: true,
       contentType: false,
       processData: false,
       data: param,
       success(res) {
         if (!res) {
           layer.close(load)
           Hussar.error('新增失败')
           return
         }

         layer.closeAll()
         Hussar.success('新增成功')
         initTable()
       },
       error() {
         layer.close(load)
         Hussar.error('新增失败')
       }
     })
   })
   ```

   ```java
   /**
    * 上传文件
    */
   @PostMapping("/addNewLjcjRecord")
   @ResponseBody
   // 这里文件的接收能通过这种写法@RequestParam("file[]") MultipartFile[] file来接收多个文件
   public boolean addNewLjcjRecord(@RequestParam("file") MultipartFile file,
                                   @RequestParam("xianbie") String xianbie,
                                   @RequestParam("xingbie") String xingbie,
                                   @RequestParam("period") String period) {
     return cjLjService.addNewLjcjRecord(xianbie, xingbie, period, file);
   }
   ```

7. 多文件上传（一起上传,监听上传进度）

   ```html
   <!--上传按钮-->
   <button type="button" id="uploadBtn">点击我进行多文件上传</button>

   <!--#uploadFileInputDiv是html里一个隐藏的div-->
   <!--多文件上传需要用到该容器-->
   <div id="uploadFileInputDiv" class="layui-hide"></div>
   ```

   ```js
   $('#uploadBtn').click(function () {
     // 在隐藏的div里拼接dom元素
     let html =
       '<input type="file" id="multiInput" name="filename" multiple="multiple" hidden>'
     $('#uploadFileInputDiv').html(html)

     // 给拼接的dom元素监听事件
     $('#uploadFileInputDiv input').on('change', function () {
       let formData = new FormData() //每一次需重新创建
       let files = $('#uploadFileInputDiv input')[0].files
       for (let i = 0; i < files.length; i++) {
         let file = files[i]
         formData.append('file', file)
       }
       formData.append('testTaskId', $('#csrw_id').val())
       formData.append('fileId', fileId)
       uploadMultiFile(formData)
     })

     // 触发dom元素的点击事件
     $('#uploadFileInputDiv input').click()
   })

   // 文件上传的前台代码
   function uploadMultiFile(formData) {
     let aj = {
       //上传文件数据
       url: '/MultiFileUpload',
       type: 'POST',
       cache: false,
       data: formData,
       processData: false,
       contentType: false,
       async: true,
       xhr() {
         let xhr = new XMLHttpRequest()
         xhr.upload.addEventListener('progress', (e) => {
           let progressRate = Math.round((e.loaded / e.total) * 100) + '%' // 上传进度
         })
         return xhr
       },
       success(res) {
         layer.close(progressLayer)
         if (res.code === 500) {
           Hussar.info('上传文件失败')
           fileUpload.reload()
           return
         }

         Hussar.success('上传成功！')
       },
       error() {
         layer.close(progressLayer)
         Hussar.info('上传文件失败')
       }
     }
     $.ajax(aj)
   }
   ```

   ```java
   @RequestMapping("/MultiFileUpload")
   @ResponseBody
   public Map<String, Object> noiseFileUpload(@RequestParam("file[]") MultipartFile[] file,
                                              @RequestParam("testTaskId") String testTaskId,
                                              @RequestParam("fileId") String fileId) {

       // 接收的参数有二进制的文件数组，还有其他的参数
      	// 自己做处理
       // ....

       // 返回
       Map<String, Object> map = new HashMap<>();
       return map;
   }
   ```

   注意：如果不限于jQuery,比如vue，通用情况下，RequestHeader里面的Content-Type为`multipart/form-data`
   后台不能用`@RequestParam("file[]") MultipartFile[] file`这种方式接收文件，要用一个对象来接收，下面是例子

   ```js
      // vue代码 上传文件组件，采用element-plus
      <el-upload
          ref="upload"
          class="upload-files"
          action=""
          name="files"
          multiple
          :auto-upload="false"
          :file-list="fileList"
          :on-change="handleChange"
          style="margin-top: 20px"
      >
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload">保存</el-button>
      </div>

      // 这里采用的是手动上传，选取文件后，点击保存才会触发上传操作
      <script setup>
        // 上传文件数组
        const fileList = ref([]) 
        
        // 文件改变时回调钩子
        const handleChange = (file, files) => {
          // file是当前上传的文件，files是当前所有的文件，
          // 不懂得话可以打印一下这两个数据 就能明白
          
          fileList.value = files
        }
        
        // 测试多文件上传
        const submitUpload = async () => {
          let formData = new FormData()
          formData.append('name', 'myk')
          fileList.value.forEach(item => {
            // 这里有个坑，在将文件append到formData的时候， item其实并不是真是数据 item.raw才是
            formData.append('files', item.raw)
          })
            // 这里是发送请求，注意 headers: {'Content-Type': 'multipart/form-data'}
          let result = await requestUtil.fileUpload('/testUpload', formData)
          console.log(result)
        }
      </script>
   ```

   ```java
    @RestController
    @CrossOrigin
    public class TestUpload {
        @PostMapping("/testUpload")
        // 不需要添加@requestBody 因为这是前端Content-Type不是application/json
        public String testUpload(TestUploadVo testUploadVo) {
            for (MultipartFile file : testUploadVo.getFiles()) {
                System.out.println(file.getOriginalFilename());
    
            }
            System.out.println(testUploadVo.getName());
            return "ok";
        }
    }


    @Data
    public class TestUploadVo {
        private String name;
    
        private MultipartFile[] files;
    }
   ```

   注意：有的时候`@RequestParam("file[]") MultipartFile[] file`获取到的文件数组的长度为 0
   此时，可以用如下的方式获取文件数组 or 集合

   ```java
   @PostMapping("/import_v1")
   @ResponseBody
   public Tip import_v1(@RequestParam("xianbie") Integer xianbie,
                        @RequestParam("xingbie") Integer xingbie,
                        @RequestParam("lx") Integer lx,
                        @RequestParam("jcfs") Integer jcfs,
                        @RequestParam("jcrq") String jcrq,
                        @RequestParam("jcry") String jcry,
                        HttpServletRequest request) {
       SjfxMhJcjl jcjl = new SjfxMhJcjl();
       jcjl.setXianbie(xianbie);
       jcjl.setXingbie(xingbie);
       jcjl.setLx(lx);
       jcjl.setJcfs(jcfs);
       jcjl.setJcrq(Timestamp.valueOf(jcrq));
       jcjl.setJcry(jcry);
       MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
       List<MultipartFile> files = multipartRequest.getFiles("file");
       return sjfxMhJcjlService.Import_v1(files, jcjl);
   }
   ```