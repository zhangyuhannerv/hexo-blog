---
title: Kafka生产者、消费者的消息可靠性方案实现

categories:
  - Dev
  - kafka
  - 与springboot的整合
tags:
  - Dev
  - kafka
  - 与springboot的整合
  - Kafka生产者、消费者的消息可靠性方案实现
abbrlink: 60348
date: 2023-03-06 15:47:44
---

以下代码基于 SpringKafka 2.3.13.RELEASE + Boot 2.2.9.RELEASE 实现

# Producer 消息的可靠性

实现方案：ack 模式调整 + 重试机制 + 规避重试机制下带来的问题

```yml
spring.kafka:
	producer:
      #这个参数可以是任意字符串，它是broker用来识别消息是来自哪个客户端的。在broker进行打印日志、衡量指标或者配额限制时会用到。
      clientId: ${spring.application.name} #方便kafkaserver打印日志定位请求来源
      bootstrap-servers: 127.0.0.1:8080 #kafka服务器地址，多个以逗号隔开
      #acks=0：生产者把消息发送到broker即认为成功，不等待broker的处理结果。这种方式的吞吐最高，但也是最容易丢失消息的。
      #acks=1：生产者会在该分区的leader写入消息并返回成功后，认为消息发送成功。如果群首写入消息失败，生产者会收到错误响应并进行重试。这种方式能够一定程度避免消息丢失，但如果leader宕机时该消息没有复制到其他副本，那么该消息还是会丢失。另外，如果我们使用同步方式来发送，延迟会比前一种方式大大增加（至少增加一个网络往返时间）；如果使用异步方式，应用感知不到延迟，吞吐量则会受异步正在发送中的数量限制。
      #acks=all：生产者会等待所有副本成功写入该消息，这种方式是最安全的，能够保证消息不丢失，但是延迟也是最大的。
      acks: all #默认值：1
      #当生产者发送消息收到一个可恢复异常时，会进行重试，这个参数指定了重试的次数。在实际情况中，这个参数需要结合retry.backoff.ms来使用，建议总的重试时间比集群重新选举leader的时间长，这样可以避免生产者过早结束重试导致失败。
      #另外需注意，当开启重试时，若未设置max.in.flight.requests.per.connection=1，则可能出现发往同一个分区的两批消息的顺序出错，比如，第一批发送失败了，第二批成功了，然后第一批重试成功了，此时两者的顺序就颠倒了。
      retries: 2  #发送失败时重试多少次，0=禁用重试（默认值）
      properties:
      	retry-backoff-ms: 1000 #重试等待间隔
      #默认情况下消息是不压缩的，此参数可指定采用何种算法压缩消息，可取值：none,snappy,gzip,lz4。snappy压缩算法由Google研发，这种算法在性能和压缩比取得比较好的平衡；相比之下，gzip消耗更多的CPU资源，但是压缩效果也是最好的。通过使用压缩，我们可以节省网络带宽和Kafka存储成本。
      compressionType: "none" #如果不开启压缩，可设置为none（默认值），比较大的消息可开启。
      #当多条消息发送到一个分区时，Producer会进行批量发送，这个参数指定了批量消息大小的上限（以字节为单位）。当批量消息达到这个大小时，Producer会一起发送到broker；但即使没有达到这个大小，生产者也会有定时机制来发送消息，避免消息延迟过大。
      batch-size: 16384 #默认16K，值越小延迟越低，但是吞吐量和性能会降低。0=禁用批量发送
      #这个参数设置Producer暂存待发送消息的缓冲区内存的大小，如果应用调用send方法的速度大于Producer发送的速度，那么调用会阻塞一定（max.block.ms）时间后抛出异常。
      buffer-memory: 33554432 #缓冲区默认大小32M
```

生产者：

```java
@Component
//该类需要为多列类型
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ProducerFuture implements FailureCallback, SuccessCallback<SendResult<String, Object>> {
    private static final Logger logger = LoggerFactory.getLogger(ProducerFuture.class);

    @Resource
    private KafkaTemplate<String, Object> kafkaTemplate;
    private String uniqueId;

    /**
     * 异步发送消息
     * @param topicLcs
     * @param value
     */
    public void async(String topicLcs, String value) {
        uniqueId = MDC.get("UNIQUE_ID");
        logger.info("send {} data:{}", topicLcs, value);
        ListenableFuture<SendResult<String, Object>> listenableFuture = kafkaTemplate.send(topicLcs, value);
        listenableFuture.addCallback(this, this);
    }


    @Override
    public void onFailure(Throwable ex) {
        MDC.put(UNIQUE_ID, uniqueId);
        //重试策略失败后，将进入该方法。在该重试方法中，可以做其他响应的业务逻辑，如告警、投放其他队列或落地失败的消息内容等
        logger.error("sendFailure:", ex);
        MDC.remove(UNIQUE_ID);
    }

    @Override
    public void onSuccess(SendResult<String, Object> result) {
        MDC.put(UNIQUE_ID, uniqueId);
        logger.info("sendSuccess {} ", result.getRecordMetadata().topic() + result.getRecordMetadata().offset());
        MDC.remove(UNIQUE_ID);
    }
}
```

## 启用重试机制后带来的问题

1.  重试过程中，**一条消息只会向同一个分区进行重试发送**，所以在重试的机制下，也能保证消息的全局幂等性
2.  由于重试，可能导致消息在 Node 中的顺序和 Producer 发送时的顺序不一致。可以对 max.in.flight.requests.per.connectio（限制每个连接（指客户端与 Node 之间的 per.connection 连接）最多缓存  **已发送但未收到响应的请求数**，默认为 5）设置为 1，即可保证在重试机制下的消息顺序。

# Consumer 消息的可靠性

实现方案：手动提交 offset + 重试机制 + 死信队列（告警） + 死信队列消息采用其他策略去处理消息

[kafka](https://so.csdn.net/so/search?q=kafka&spm=1001.2101.3001.7020)配置：

```yml
#kafka配置，更多配置请参考：KafkaProperties
spring.kafka:
  #消费者的配置，可参考：org.apache.kafka.clients.consumer.ConsumerConfig
  consumer:
    #暂不用提供clientId，2.x版本可放出来，1.x有多个topic且concurrency>1会出现JMX注册时异常
    #clientId: ${spring.application.name} #方便kafkaserver打印日志定位请求来源
    # kafka集群
    bootstrap-servers: 127.0.0.1:8080 #kafka服务器地址，多个以逗号隔开
    #指定了当消费者第一次读取分区或者无offset时拉取那个位置的消息，可以取值为latest（从最新的消息开始消费）,earliest（从最早的消息开始消费）,none（如果无offset就抛出异常）
    autoOffsetReset: latest #默认值：latest
    #指定了消费者是否自动提交消费位移，默认为true。如果为true，你可能需要关注自动提交的时间间隔，该间隔由auto.commit.interval.ms设置。
    enable-auto-commit: false
    #周期性自动提交的间隔，单位毫秒
    auto-commit-interval: 2000 #默认值：5000
    #参数允许消费者指定从broker读取消息时最小的Payload的字节数。当消费者从broker读取消息时，如果数据字节数小于这个阈值，broker会等待直到有足够的数据，然后才返回给消费者。对于写入量不高的主题来说，这个参数可以减少broker和消费者的压力，因为减少了往返的时间。而对于有大量消费者的主题来说，则可以明显减轻broker压力。
    fetchMinSize: 1 #默认值： 1
    #上面的fetch.min.bytes参数指定了消费者读取的最小数据量，而这个参数则指定了消费者读取时最长等待时间，从而避免长时间阻塞。这个参数默认为500ms。
    fetchMaxWait: 500 #默认值：500毫秒
    #这个参数控制一个poll()调用返回的记录数，即consumer每次批量拉多少条数据。
    maxPollRecords: 500 #默认值：500
```

配置类：

```java

@Configuration
public class Config {
    Logger logger = LoggerFactory.getLogger(Config.class);
    private final String error_topic="error_topic";

    @Bean
    public ConcurrentKafkaListenerContainerFactory listenerContainerFactory(ConsumerFactory consumerFactory, KafkaTemplate<String,Object> template) {
        ConcurrentKafkaListenerContainerFactory factory = new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory);
        // 最大重试次数5次，每次间隔5s(该配置需要参考 Broker.leader 切换的平均时间去设置)
        SeekToCurrentErrorHandler seekToCurrentErrorHandler = new SeekToCurrentErrorHandler((consumerRecord, e) -> {
            logger.error("重试机制后异常，consumerRecord：{}", consumerRecord.toString(), e);
            //做其他业务操作，如记录异常信息到表，发送信息到其他的队列人工核对处理等
            template.send(error_topic,consumerRecord.toString());
        }, new FixedBackOff(5000, 5));

//       批量获取消息的时候，使用该方式
//        SeekToCurrentBatchErrorHandler batchErrorHandler = new SeekToCurrentBatchErrorHandler();

        factory.setErrorHandler(seekToCurrentErrorHandler);
        //设置提交偏移量的方式 ,否则出现异常的时候, 会报错No Acknowledgment available as an argument, the listener container must have a MANUAL AckMode to populate the Acknowledgment.
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);
        return factory;
    }

}
```

消费者：

```java
@Component
public class ConsumerKafka {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private static final String CONSUMER_GROUP_PREFIX = "MOCK-A-GROUP";

    @KafkaListener(topics = {"${kafka.topic.topic4Test}"}, groupId = CONSUMER_GROUP_PREFIX, containerFactory = "listenerContainerFactory")
    public void onMessage(ConsumerRecord<String,Object> consumerRecord, Acknowledgment acknowledgeMode) {
		//处理业务逻辑......
        acknowledgeMode.acknowledge();
    }
}
```
