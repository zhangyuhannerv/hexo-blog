---
title: '@JsonFormat和@DateTimeFormat'
categories:
  - Dev
  - Java
  - studyEveryday
tags:
  - Dev
  - Java
  - studyEveryday
  - '@JsonFormat和@DateTimeFormat'
cover: 'https://www.loliapi.com/acg/?uuid=24020'
abbrlink: 24020
date: 2024-10-20 13:40:07
---

## @JsonFormat 注解

@JsonFormat 注解来自于 Jackson 库，通常用于控制日期时间格式在`序列化和反序列化`时的表现，主要应用于将`Java对象转换为JSON`时的日期时间格式处理，或者从`JSON转换回Java`对象时解析日期格式。

### 用法示例

```java
import com.fasterxml.jackson.annotation.JsonFormat;
@Data
public class Event {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date date1;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private LocalDate date2;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")    
    private LocalDateTime date3;
}

@RestController  
public class DateController {  
  
    @PostMapping("/receiveDate")  
    public void receiveDate(@RequestBody Event dateDto) {  
          
        // 这里dateDto.getDate1()已经是一个Date对象，包含了时分秒  
        // 你可以直接使用它，或者转换为其他格式  
    }  
}
```

### 应用场景

* 解析前端传来的 JSON 数据中的日期时间字段：前端传来的json数据的日期字符串(`例：{"date1":"2024-02-12 14:23:55"}`)在SpringBoot中使用@RequestBody标注的对象接收时就能自动转换为Date、LocalDate、LocalDateTime等属性，不需要手动转换
* 处理返回的 JSON 数据中日期时间的格式: 上面定义的Event对象以JSON返回给前端时，前端能得到一个一个格式化后的时间字符串(`例：{"date1":"2024-02-12 14:23:55"}`)


## @DateTimeFormat 注解

@DateTimeFormat注解来自于 Spring 框架，主要用于在 Spring MVC 的数据绑定中，控制日期时间在Java对象和字符串之间的转换格式。常用于将表单提交的数据（通常是字符串形式）转换为日期类型。

### 用法示例

```java
@RestController  
@RequestMapping("/api")  
public class DateController {  
  
    // 处理GET请求  
    @GetMapping("/getDate")  
    public String getDate(  
            @RequestParam("date")  
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime dateTime) {  
        return "Received GET date: " + dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);  
    }  
  
    // DTO类用于POST请求  
    static class DateDto {  
        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  
        private LocalDateTime date;  
  
        // Getters and Setters  
        public LocalDateTime getDate() {  
            return date;  
        }  
  
        public void setDate(LocalDateTime date) {  
            this.date = date;  
        }  
    }  
  
    // 处理POST请求  
    // 此时前台是表单提交，ContentType是application/x-www-form-urlencoded或multipart/form-data
    @PostMapping("/postDate")  
    public String postDate(@ModelAttribute DateDto dateDto) {  
        return "Received POST date: " + dateDto.getDate().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);  
    }  
}
```

### 应用场景

* 处理来自前端表单、URL参数的数据绑定时，解析和格式化日期字段。

## 两者的异同

### 应用场景

* @JsonFormat：主要用于处理 JSON 数据的序列化和反序列化（通常在 REST API 开发中使用）。
* @DateTimeFormat：主要用于处理来自表单或 URL 参数的日期字符串绑定（通常在 Spring MVC 的数据绑定中使用）。

### 使用库

* @JsonFormat：来自 Jackson 库，依赖于 Jackson 的序列化和反序列化机制。
* @DateTimeFormat：来自 Spring 框架，依赖于 Spring 的数据绑定机制。

### 支持字段类型

* 都支持`Date`,`LocalDate`,`LocalDateTime`类型，需要注意各自的日期时间格式化字符串，这个是通用的：`yyyy-MM-dd HH:mm:ss`

## 综合使用

在项目中，一般日期时间字段，两个注解都加上

```java
@Data
public class DateDTO{
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
}
```

## 补充，Mysql和Oracle中日期时间字段与java中字段的对应关系

mysql的date对应java的（jdk8及以上）LocalDate、（jdk7及以下）Date
mysql的datetime对应java的（jdk8及以上）LocalDateTime、（jdk7及以下）Date
oracle的date对应java的（jdk8及以上）LocalDateTime、（jdk7及以下）Date
