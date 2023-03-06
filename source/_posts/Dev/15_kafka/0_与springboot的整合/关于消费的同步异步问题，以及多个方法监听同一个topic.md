---
title: '关于消费的同步异步问题，以及多个方法监听同一个topic'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'kafka'
  - '与springboot的整合'
tags: 
  - 'Dev'
  - 'kafka'
  - '与springboot的整合'
  - '关于消费的同步异步问题，以及多个方法监听同一个topic'
---
```java
@KafkaListener(topics = "test")  
public void consumerTest1(String msg) throws InterruptedException {  
    log.info("收到消息1：" + msg);  
    TimeUnit.MILLISECONDS.sleep(10);  
}  
  
@KafkaListener(topics = "test")  
public void consumerTest2(String msg) throws InterruptedException {  
    log.info("收到消息2：" + msg);  
    TimeUnit.MILLISECONDS.sleep(10);  
}
```
如上所示
多个方法消费同一个topic
那么，只会在一个方法中消费，不会两个方法都消费消息，即不会重复消费

同时当只有`consumerTest1()`方法时，如果手动阻塞线程，那么消息的消费也会变慢
即如果向test发送500条消息。执行过程是第一条消息，等10ms，第二条消息，等10ms...
结论：针对同一个topic消息的消费是同步的
