---
title: '@Async和@EnableAsync注解'

categories:
  - Dev
  - SpringBoot
  - 异步
tags:
  - Dev
  - SpringBoot
  - 异步
  - '@Async和@EnableAsync注解'
abbrlink: 28711
date: 2023-03-06 15:47:44
---

## 1） 含义：

1，在方法上使用该@Async 注解，申明该方法是一个异步任务；

2，在类上面使用该@Async 注解，申明该类中的所有方法都是异步任务；

3，使用此注解的方法的类对象，必须是 spring 管理下的 bean 对象；

4，要想使用异步任务，需要在主类上开启异步配置，即，配置上@EnableAsync 注解；

## 2）  使用：

在 Spring 中启用@Async：

1，@Async 注解在使用时，如果不指定线程池的名称，则使用 Spring 默认的线程池，Spring 默认的线程池为**SimpleAsyncTaskExecutor**。

2，方法上一旦标记了这个@Async 注解，当其它线程调用这个方法时，就会开启一个新的子线程去异步处理该业务逻辑。

## 3）  代码示例--默认线程池：

### 3.1，启动类中增加@EnableAsync

以 Spring boot 为例，启动类中增加@EnableAsync：

```java
@EnableAsync@SpringBootApplicationpublic class ManageApplication {    //...}
```

### 3.2，方法上加@Async 注解：

```java
@Componentpublic class MyAsyncTask {     @Async    public void asyncCpsItemImportTask(Long platformId, String jsonList){        //...具体业务逻辑    }}
```

### 3.3，默认线程池的缺陷：

上面的配置会启用默认的线程池/执行器，异步执行指定的方法。

Spring 默认的线程池的默认配置：

```markdown
    默认核心线程数：8，        最大线程数：Integet.MAX_VALUE，    队列使用LinkedBlockingQueue，    容量是：Integet.MAX_VALUE，    空闲线程保留时间：60s，    线程池拒绝策略：AbortPolicy。
```

从最大线程数的配置上，相信你也看到问题了：**并发情况下，会无限创建线程。。。**

### 3.4，默认线程池--自定义配置参数：

默认线程池的上述缺陷如何解决：

答案是，自定义配置参数就可以了。

```delphi
spring:  task:    execution:      pool:        max-size: 6        core-size: 3        keep-alive: 3s        queue-capacity: 1000        thread-name-prefix: name
```

## 4） 代码示例--[自定义线程池](https://so.csdn.net/so/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BA%BF%E7%A8%8B%E6%B1%A0&spm=1001.2101.3001.7020)：

在业务场景中，有时需要使用自己定义的执行器来跑异步的业务逻辑，那该怎么办呢？

答案是，自定义线程池。

### 4.1，还是启动类中先增加@EnableAsync

以 Spring boot 为例，启动类中增加@EnableAsync：

```java
@EnableAsync@SpringBootApplicationpublic class ManageApplication {    //...}
```

### 4.2，编写配置类

```java
@Configuration@Datapublic class ExecutorConfig{    /**     * 核心线程     */    private int corePoolSize;    /**     * 最大线程     */    private int maxPoolSize;    /**     * 队列容量     */    private int queueCapacity;    /**     * 保持时间     */    private int keepAliveSeconds;    /**     * 名称前缀     */    private String preFix;     @Bean("MyExecutor")    public Executor myExecutor() {        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();        executor.setCorePoolSize(corePoolSize);        executor.setMaxPoolSize(maxPoolSize);        executor.setQueueCapacity(queueCapacity);        executor.setKeepAliveSeconds(keepAliveSeconds);        executor.setThreadNamePrefix(preFix);        executor.setRejectedExecutionHandler( new ThreadPoolExecutor.AbortPolicy());        executor.initialize();        return executor;    }}
```

### 4.3，方法上加@Async 注解：

```java
@Componentpublic class MyAsyncTask {     @Async("MyExecutor") //使用自定义的线程池(执行器)    public void asyncCpsItemImportTask(Long platformId, String jsonList){        //...具体业务逻辑    }}
```

## 5）异步任务的事务问题：

@Async 注解由于是异步执行的，在其进行数据库的操作之时，将无法控制事务管理。

解决办法：可以把@[Transactional](https://so.csdn.net/so/search?q=Transactional&spm=1001.2101.3001.7020)注解放到内部的需要进行事务的方法上。

## 6）异步任务的返回结果：

异步的业务逻辑处理场景 有两种：一个是不需要返回结果，另一种是需要接收返回结果。

不需要返回结果的比较简单，就不多说了。

需要接收返回结果的示例如下：

```java
@Async("MyExecutor")public Future<Map<Long, List>> queryMap(List ids) {    List<> result = businessService.queryMap(ids);    ..............    Map<Long, List> resultMap = Maps.newHashMap();    ...    return new AsyncResult<>(resultMap);}
```

调用异步方法的示例：

```java
public Map<Long, List> asyncProcess(List<BindDeviceDO> bindDevices,List<BindStaffDO> bindStaffs, String dccId) {        Map<Long, List> finalMap =null;        // 返回值：        Future<Map<Long, List>> asyncResult = MyService.queryMap(ids);        try {            finalMap = asyncResult.get();        } catch (Exception e) {            ...        }        return finalMap;}
```

## 7）关于 Spring 中的线程池(执行器)

Spring 用 TaskExecutor 和 TaskScheduler 接口提供了异步执行和调度任务的抽象。

Spring 的 TaskExecutor 和 java.util.concurrent.Executor 接口时一样的，这个接口只有一个方法 execute(Runnable task)。

Spring 已经内置了许多 TaskExecutor 的实现，没有必要自己去实现：

- **SimpleAsyncTaskExecutor**：  这种实现不会重用任何线程，**每次调用都会创建一个新的线程**。
- **SyncTaskExecutor**：  这种实现不会异步的执行，相反，每次调用都在发起调用的线程中执行。它的主要用处是在不需要多线程的时候，比如简单的测试用例；
- **ConcurrentTaskExecutor**：这个实现是对 Java 5 java.util.concurrent.Executor 类的包装。有另一个 ThreadPoolTaskExecutor 类更为好用，它暴露了 Executor 的配置参数作为 bean 属性。
- **SimpleThreadPoolTaskExecutor**：  这个实现实际上是 Quartz 的 SimpleThreadPool 类的子类，它会监听 Spring 的生命周期回调。当你有线程池，需要在 Quartz 和非 Quartz 组件中共用时，这是它的典型用处。
- **ThreadPoolTaskExecutor：   这是最常用、最通用的一种实现**。它包含了 java.util.concurrent.ThreadPoolExecutor 的属性，并且用 TaskExecutor 进行包装。

## 8）**无法调用同类中的@Async 的方法**

### @Async 的原理概括：

@Async  的原理是通过 Spring AOP 动态代理   的方式来实现的。

Spring 容器启动初始化 bean 时，判断类中是否使用了@[Async](https://so.csdn.net/so/search?q=Async&spm=1001.2101.3001.7020 'Async')注解，如果使用了则为其创建切入点和切入点处理器，根据切入点创建代理，

在线程调用@Async 注解标注的方法时，会调用代理，执行切入点处理器 invoke 方法，将方法的执行提交给线程池中的另外一个线程来处理，从而实现了异步执行。

所以，需要注意的一个错误用法是，如果 a 方法调用它同类中的标注@Async 的 b 方法，是不会异步执行的，因为从 a 方法进入调用的都是该类对象本身，不会进入代理类。

**因此，相同类中的方法调用带@Async 的方法是无法异步的，这种情况仍然是同步。**
