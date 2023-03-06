---
title: 'SpringBoot中使用Quartz执行任务对象（job）中无法注入bean的问题'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'quartz'
  - '常见问题'
tags: 
  - 'Dev'
  - 'quartz'
  - '常见问题'
  - 'SpringBoot中使用Quartz执行任务对象（job）中无法注入bean的问题'
---
**一、问题描述**  
SpringBoot 整合 [Quartz](https://so.csdn.net/so/search?q=Quartz&spm=1001.2101.3001.7020) 进行定时任务开发时，job 中注入业务 Service，使用 @Autowired 注解获取对象为 null ，执行时报空指针异常

**二、分析**  
Spring容器可以管理 Bean，但是 Quartz 的 job 是自己管理的，job无法被容器识别，即使在自定义的job上面加上@Component注解，依然无效，原因是 **job 对象在spring容器加载的时候，能够注入 bean，但是在调度时，job对象会重新创建，此时就导致了已经注入的对象丢失，因此报空指针异常**。

**三、解决办法**  

3.1 采用自定义静态工具类的方式，创建AppContextUtil类，实现 ApplicationContextAware接口，此工具类会在spring容器启动后，自动加载，使用其提供的Bean方法获取想要的bean即可，代码如下：

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
 
/**
 *
 * 自定义静态工具类
 */
@Component
@Slf4j
public class AppContextUtil implements ApplicationContextAware {
 
    //定义静态ApplicationContext
    private static ApplicationContext applicationContext = null;
 
    /**
     * 重写接口方法，该方法的参数为框架自动加载的IOC容器对象
     * 该方法在启动项目的时候会自动执行，前提是该类上有IOC相关注解，例如@Component
     * @param applicationContext IOC容器
     * @throws BeansException e
     */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        //将框架加载的IOC赋值给全局静态IOC
        AppContextUtil.applicationContext = applicationContext;
        log.info("==================ApplicationContext加载-----------------");
    }
 
    //获取 applicationContext
    public static ApplicationContext getApplicationContext(){
        return  applicationContext;
    }
 
    //通过name获取Bean
    public static Object getBean(String name){
        return  applicationContext.getBean(name);
    }
 
    //通过class获取Bean
    public static <T> T getBean(Class<T> clazz){
        return  applicationContext.getBean(clazz);
    }
 
    //通过name、Clazz返回指定Bean
    public static <T> T getBean(String name,Class<T> clazz){
        return  applicationContext.getBean(name,clazz);
    }
}
```

调用方式如下：

```java
ReminderConfigService reminderConfigService = AppContextUtil.getBean(ReminderConfigService.class);
```

3.2 使用**ContextLoader**
```java
public class ExampleJob extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        WebApplicationContext a = ContextLoader.getCurrentWebApplicationContext();
        System.out.println(a.getBean(APIController.class));
        System.out.println(a.containsBean("APIController"));
        
    }

}
```

3.3 使用SpringContextHolder（我在项目中使用的）
```java
@Log4j2  
public class TestJob implements BaseJob {  
    DtjhEndPoint dtjhEndPoint = SpringContextHolder.getBean(DtjhEndPoint.class);  
  
  
    @Override  
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {  
        log.info("spring组件注入是否成功,{}", dtjhEndPoint.getFilePath());  
    }  
}
```
