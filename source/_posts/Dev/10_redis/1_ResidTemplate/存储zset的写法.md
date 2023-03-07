---
title: 存储zset的写法

categories:
  - Dev
  - redis
  - ResidTemplate
tags:
  - Dev
  - redis
  - ResidTemplate
  - 存储zset的写法
abbrlink: 59400
date: 2023-03-06 15:47:44
---

```java
ZSetOperations zSetOperations = redisTemplate.opsForZSet();
Set<ZSetOperations.TypedTuple<Map<String, Double>>> tuples = new HashSet<>();

int cycleNum = dataShowMapper.getTrackDynamicGeometryDataNum(csrwId, xb) / 10000 + 1;// 循环次数

CountDownLatch countDownLanch = new CountDownLatch(cycleNum);

ExecutorService executor = Executors.newFixedThreadPool(cycleNum > 4 ? 4 : cycleNum);

for (int i = 0; i < cycleNum; i++) {
  int start = i * 10000;
  int num = 10000;
  executor.execute(new Runnable() {
    @Override
    public void run() {
      try {
        List<Map<String, Double>> dataListTemp = dataShowMapper.getWaveEchartsCorrectDataNoSparse(csrwId, xb, "0", "0", start, num);
        for (Map<String, Double> dataMap : dataListTemp) {
          ZSetOperations.TypedTuple<Map<String, Double>> typedTuple = new DefaultTypedTuple<>(dataMap, dataMap.get("kms"));
          tuples.add(typedTuple);
        }
      } catch (Exception e) {
        e.printStackTrace();
      } finally {
        countDownLanch.countDown();
      }

    }
  });
}

try {
  countDownLanch.await();
} catch (InterruptedException e) {
  e.printStackTrace();
}

executor.shutdown();

if (tuples.size() > 0) {
  zSetOperations.add(key, tuples);
  redisTemplate.expire(key, 3, TimeUnit.HOURS);
}
```
