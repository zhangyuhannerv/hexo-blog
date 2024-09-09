---
title: SpringBoot下的反射
categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - SpringBoot下的反射
cover: 'https://imgapi.xl0408.top?uuid=18526'
abbrlink: 18526
date: 2024-09-09 10:20:00
---

普通的java反射调用一个方法的例子如下

```java
import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 获取类的 Class 对象
            Class<?> clazz = Class.forName("TestClass");

            // 创建类的实例
            Object instance = clazz.getDeclaredConstructor().newInstance();

            // 获取方法
            Method method = clazz.getMethod("sayHello", String.class);

            // 调用方法
            method.invoke(instance, "World");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class TestClass {
    public void sayHello(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
```

这样的方式实例化的对象与被spring管理的bean对象有着本质的不同

spring的bean都是动态代理对象

而自己手动实例化的对象里面的依赖注入，注解等都会失效

正确的方式是从spring容器中获取bean对象,如下是工具类，可以根据类或者名称或者类和名称获取bean

```java
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringBootBeanUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (SpringBootBeanUtil.applicationContext == null) {
            SpringBootBeanUtil.applicationContext = applicationContext;
        }
    }

    /**
     * 获取applicationContext
     * @return
     */
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    /**
     * 通过name获取 Bean.
     * @param name
     * @return
     */
    public static Object getBean(String name) {
        return getApplicationContext().getBean(name);
    }

    /**
     * 通过class获取Bean.
     * @param clazz
     * @return
     */
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }

    /**
     * 通过name,以及Clazz返回指定的Bean
     * @param name
     * @param clazz
     * @return
     */
    public static <T> T getBean(String name, Class<T> clazz) {
        return getApplicationContext().getBean(name, clazz);
    }

}
```

类与方法示例：

```java
package org.jeecg.modules.fsevent.server.job;

import java.util.Arrays;

import javax.annotation.Resource;

import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.api.ISysBaseAPI;
import org.jeecg.common.system.vo.SysPositionModel;
import org.jeecg.modules.fsevent.constant.FsEventConstant;
import org.jeecg.modules.fsevent.util.JobUtil;
import org.jeecg.modules.tps.api.TpsFsJobApi;
import org.springframework.stereotype.Component;

import com.lark.oapi.service.corehr.v2.model.I18n;
import com.lark.oapi.service.corehr.v2.model.Job;

import cn.hutool.core.util.StrUtil;

/**
 * 主服务job（职务）变更处理
 */
@Component
public class MasterJob {
    @Resource
    private TpsFsJobApi tpsFsJobApi;
    @Resource
    private ISysBaseAPI sysBaseAPI;

    /**
     * 职务更新
     */
    @Transactional(rollbackFor = Exception.class)
    @DS("feishupersondev")
    public void jobUpdated(String eventEntityJson) {
        String jobId = JobUtil.checkJobEventEntity(eventEntityJson);
        Result<Job> feignRes = tpsFsJobApi.searchOneJobInfo(jobId);
        if (!feignRes.isSuccess()) {
            throw new RuntimeException(feignRes.getMessage());
        }

        Job job = feignRes.getResult();
        String code = job.getCode();
        if (StrUtil.isBlank(code)) {
            throw new RuntimeException("飞书远程查询职位信息，职位编码为空");
        }

        // 根据jobCode判断job是否存在
        SysPositionModel oldSysPositionModel = sysBaseAPI.getSysPositionByCode(code);
        if (oldSysPositionModel == null) {
            throw new RuntimeException("主库不存在该职务编码:" + code + "，无法更新");
        }

        // 插入表中
        SysPositionModel sysPositionModel = new SysPositionModel();
        I18n nameI18n = Arrays.stream(job.getName())
            .filter(name -> FsEventConstant.LanguageCode.CHINESE.equals(name.getLang())).findFirst().orElse(null);
        if (nameI18n == null) {
            throw new RuntimeException("更新职位没有中文名称");
        }
        sysPositionModel.setId(oldSysPositionModel.getId()).setCode(job.getCode()).setName(nameI18n.getValue())
            .setStatus(job.getActive() ? 1 : 0).setUpdateBy("system");
        boolean res = sysBaseAPI.updateSysPosition(sysPositionModel);
        if (!res) {
            throw new RuntimeException("职位更新失败");
        }
    }
}
```

方法调用示例:

```java
try {
  String beanName = "masterJob";
  String methodName = "jobUpdated";
  String className = "org.jeecg.modules.fsevent.server.job.MasterJob";
  Class<?> aClass = Class.forName(className);
  Method method1 = aClass.getMethod(methodName, String.class);
  Object bean1 = SpringBootBeanUtil.getBean(beanName, aClass);
  method1.invoke(bean1, "111");
} catch (Exception e) {
    log.error("反射执行事件失败，执行id:{}", result.getId(), e);
    String logInfo;
    if (e instanceof ClassNotFoundException) {
        logInfo = "类未找到: " + e.getMessage();
    } else if (e instanceof NoSuchMethodException) {
        logInfo = "方法: " + e.getMessage();
    } else if (e instanceof IllegalAccessException) {
        logInfo = "无法访问目标方法: " + e.getMessage();
    } else if (e instanceof InvocationTargetException) {
        Throwable cause = e.getCause();
        if (cause != null) {
            logInfo = cause.getMessage();
        } else {
            logInfo = e.getMessage();
        }
    } else {
        logInfo = e.getMessage();
    }
    // logInfo就是反射方法调用失败的信息。如果是子方法报错，这里就会是子方法的报错信息
}
```
