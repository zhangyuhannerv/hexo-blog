---
title: 'vue自定义上传功能'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'vue'
  - 'base'
tags: 
  - 'Dev'
  - 'vue'
  - 'base'
  - 'vue自定义上传功能'
---
```js
export function importData(params) {
  return axios.post('/engineeringCar/importData', params, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
```
```vue
<template>
	<div>
        <el-button @click="importData">导入</el-button>
        <input v-show="false" name="file" ref="selectFile" type="file"
               @change="changeFile"/>
    </div>
</template>

<script>
    import {importData} from './request'
    export default {
        name: "index",
        methods:{
            changeFile(e) {
                let file = e.target.files[0];

                // 判断文件类型
                let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
                if (fileType !== 'xlsx') {
                    layer.warning(this, '仅支持上传xlsx文件')
                    this.$refs.selectFile.value = ''// 清空已选择的文件
                    return;

                }

                // 拼接form数据
                let param = new FormData(); //创建form对象
                param.append('file', file);//通过append向form对象添加数据

                importData(param).then(res => {
                    if (res.code === 200) {
                        layer.success(this, '导入成功')
                        this.list()
                    } else {
                        layer.failure(this, res.message);
                    }
                    this.$refs.selectFile.value = ''
                })

            },
      
            importData() {
                this.$refs.selectFile.dispatchEvent(new MouseEvent('click'))
            },
        }
    }
</script>
```
```java
@RequestMapping("/importData")
public DtoResult importData(@RequestParam("file") MultipartFile file) {
    return engineeringCarService.importData(file);
}
```
