---
title: 异步demo

categories:
  - Dev
  - SpringBoot
  - 异步
tags:
  - Dev
  - SpringBoot
  - 异步
  - 异步demo
abbrlink: 49484
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=1fb92db5524e4baaabea85422984140b
---

## 序言

在日常开发中，有很多时候都会使用异步的方式去请求方法，以提高代码的执行效率。比如用户购买某件商品，然后需要插入购买记录，物品-1，微信公众号消息推送之类，流程会很多，也会需要很多时间，而 SpringBoot 为异步提供了更加简单的使用方式，通过两个注解即可实现异步调用方法。

## 1、使用方式

SpringBoot 为我们提供了很多使用便利，我们只需要一个@Enablexxx 注解 + 功能注解，便能轻松简单的实现功能，比如异步调用和定时任务。

#### 1.1 简单使用异步调用（无返回调用）

假定使用场景：用户购买完一件商品，需要短信通知 + 微信消息推送（不考虑失败场景），不需要返回值。

> 注意：下面代码是为了展现一个之前一直困惑我的问题，所以代码有些问题，解决办法看下面：

**Service 层，模拟功能实现：**

```java
@Service
public class AsyncMsgService {
    private static final Logger logger = LoggerFactory.getLogger(AsyncMsgService.class);
    @Async
    public void sendSms(){
        ThreadUtil.sleep(3000L);
        System.out.println("发送短信~~~~~~~~~~~~~~~");
    }

    @Async
    public void pushWechatMsg() {
        ThreadUtil.sleep(3000L);
        System.out.println("推送微信消息~~~~~~~~~~~~~~~");
    }

    public void sendMsg() {
        long start = System.currentTimeMillis();
        sendSms();
        pushWechatMsg();
        // 耗时时间
        float totalTime = (float)(System.currentTimeMillis() - start) / 1000;
        logger.info("total time: " + totalTime + " seconds");
    }
}
```

**然后写一个调用的 Controller：**

```java
@RestController
@RequestMapping("/api/v1")
public class ApiController {
    @Autowired
    private AsyncMsgService msgService;

    @PostMapping("/sendMsg")
    public void sendMsg() {
        msgService.sendMsg();
    }
}
```

**执行结果：**

> 发送短信~~~~~~~~~~~~~~~  
> 推送微信消息~~~~~~~~~~~~~~~  
> total time: 6.001 seconds

可以看出我们所期待的异步执行并没有发生，两个任务仍然在同步执行。我相信肯定不只是我碰到这个问题，我也是看了上面推荐的那篇博客才发现自己的问题所在：

> 在使用 spring 的异步[多线程](https://so.csdn.net/so/search?q=%E5%A4%9A%E7%BA%BF%E7%A8%8B&spm=1001.2101.3001.7020)时经常回碰到多线程失效的问题，解决方式为：  
> 异步方法和调用方法一定要写在不同的类中 ,如果写在一个类中,是没有效果的！

原因：

> Spring 对@Transactional 注解时也有类似问题，Spring 对扫描时具有@Transactional 注解方法的类时，是生成一个代理类，由代理类去开启关闭事务，而在同一个类中，方法调用是在类体内执行的，Spring 对无法截获这个方法调用。

因此上面代码的解决方式就是将两个异步方法和调用的`sendMsg()`方法分开，便能实现异步调用。

#### 1.2 有返回值的异步调用

很多时候我们使用异步调用是需要方法的返回值，而不是进行简单的调用，如果我们还是按照上面的方式来调用，我们大概率会得到一个 null 的返回值，因为主线程并未等待异步任务的完成就 return 了结果。

##### 1.2.1 配置线程池

> 这一步不是必须的，一个@EnableAsync 便能让 SpringBoot 为我们自动配置，我们也可以通过自定义的方式来让它和我们的实际使用更加契合。

```java
@Configuration
@EnableAsync  // 启用异步任务
public class AsyncConfiguration {
    // 声明一个线程池(并指定线程池的名字)
    @Bean("taskExecutor")
    public Executor asyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //核心线程数5：线程池创建时候初始化的线程数
        executor.setCorePoolSize(5);
        //最大线程数5：线程池最大的线程数，只有在缓冲队列满了之后才会申请超过核心线程数的线程
        executor.setMaxPoolSize(5);
        //缓冲队列500：用来缓冲执行任务的队列
        executor.setQueueCapacity(500);
        //允许线程的空闲时间60秒：当超过了核心线程出之外的线程在空闲时间到达之后会被销毁
        executor.setKeepAliveSeconds(60);
        //线程池名的前缀：设置好了之后可以方便我们定位处理任务所在的线程池
        executor.setThreadNamePrefix("DailyAsync-");
        executor.initialize();
        return executor;
	}
}
```

**Service 层，模拟功能实现：**

> 有返回的异步方法，其返回值最好封装为 CompletableFuture 类型，使用 Java8 提供的 Future 的扩展功能

```java
@Service
public class AsyncService {
    @Autowired
    private AsyncMsgService msgService;

    private static final Logger logger = LoggerFactory.getLogger(AsyncService.class);

    /**
     * 异步执行查询用户的方法
     * @return
     */
    @Async("taskExecutor")
    public CompletableFuture<String> findUser(){
        ThreadUtil.sleep(3000L);
        return CompletableFuture.completedFuture("执行异步任务···");
    }
}
```

**写一个测试方法：**

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class AsyncTest {
    private static final Logger logger = LoggerFactory.getLogger(AsyncTest.class);

    @Autowired
    private AsyncService asyncService;

    @Test
    public void asyncUser() throws ExecutionException, InterruptedException, TimeoutException {
        long start = System.currentTimeMillis();

        // 异步任务
        System.out.println("异步任务开启~~~~~~~~~~~~~~~~~~");
        CompletableFuture<String> user1 = asyncService.findUser();
        CompletableFuture<String> user2 = asyncService.findUser();
        CompletableFuture<String> user3 = asyncService.findUser();

        //join() 的作用：让“主线程”等待“子线程”结束之后才能继续运行
        CompletableFuture.allOf(user1,user2,user3).join();

        // 耗时时间
        float totalTime = (float)(System.currentTimeMillis() - start) / 1000;
        logger.info("total time: " + totalTime + " seconds");
        logger.info("--> " + user1.get());
        logger.info("--> " + user2.get());
        logger.info("--> " + user3.get());
    }
}
```

**返回结果：**

> 异步任务开启~~~~~~  
> total time: 3.016 seconds  
> –> 执行异步任务···  
> –> 执行异步任务···  
> –> 执行异步任务···

从消耗时间可以看出异步方法生效，但是需要注意，调用方法和异步方法不能处于同一类中，否则会造成异步任务失效。

## 2、CompletableFuture 实现异步方法

如果你不想或者不愿局限于 SpringBoot 的注解式调用异步，你可以使用 CompletableFuture 快速、简单的实现异步调用方法。

```java
// 无返回值的异步方法CompletableFuture.runAsync()
public CompletableFuture<Void> testMethod() {
	return CompletableFuture.runAsync(() -> {
		ThreadUtil.sleep(3000L);
		System.out.println("异步无返回");
	});
}

// 有返回值的异步方法CompletableFuture.supplyAsync()
public CompletableFuture<String> testMethod2() {
	return CompletableFuture.supplyAsync(() -> {
		ThreadUtil.sleep(3000L);
		System.out.println("异步有返回");
		return "ok";
	});
}
```

**测试方法：**

```java
@Test
public void asyncTest() {
	long start = System.currentTimeMillis();
	try {
		asyncMsgService.testMethod().get(4000L, TimeUnit.MILLISECONDS);
	} catch (InterruptedException | ExecutionException | TimeoutException e) {
		e.printStackTrace();
	}
	// 耗时时间
	float totalTime = (float)(System.currentTimeMillis() - start) / 1000;
	logger.info("total time: " + totalTime + " seconds");
}

@Test
public void asyncTest2() {
	long start = System.currentTimeMillis();
	CompletableFuture<String> future = asyncMsgService.testMethod2();
	// 计算结果完成时的回调方法
	try {
		future.whenComplete((k, v) -> {
			System.out.println("返回k=" + k);
			System.out.println("异常v=" + v);
		}).exceptionally(e -> {
			System.out.println("捕获异常=" + e.getMessage());
			return "okk";
		}).get(4000, TimeUnit.MILLISECONDS);
	} catch (InterruptedException | ExecutionException | TimeoutException e) {
		e.printStackTrace();
	}
	// 耗时时间
	float totalTime = (float)(System.currentTimeMillis() - start) / 1000;
	logger.info("total time: " + totalTime + " seconds");
}
```

使用以上方法，也能实现对方法的异步调用。