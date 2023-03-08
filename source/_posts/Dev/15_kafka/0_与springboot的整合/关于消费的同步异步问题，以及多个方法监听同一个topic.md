---
title: 关于消费的同步异步问题，以及多个方法监听同一个topic

categories:
  - Dev
  - kafka
  - 与springboot的整合
tags:
  - Dev
  - kafka
  - 与springboot的整合
  - 关于消费的同步异步问题，以及多个方法监听同一个topic
abbrlink: 38173
date: 2023-03-06 15:47:44
cover: https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/?uuid=948d973e5c9143faa786555a7f1f67d6
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
多个方法消费同一个 topic
那么，只会在一个方法中消费，不会两个方法都消费消息，即不会重复消费

同时当只有`consumerTest1()`方法时，如果手动阻塞线程，那么消息的消费也会变慢
即如果向 test 发送 500 条消息。执行过程是第一条消息，等 10ms，第二条消息，等 10ms...
结论：针对同一个 topic 消息的消费是同步的