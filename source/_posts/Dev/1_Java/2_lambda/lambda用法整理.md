---
title: lambda用法整理

categories:
  - Dev
  - Java
  - lambda
tags:
  - Dev
  - Java
  - lambda
  - lambda用法整理
abbrlink: 53080
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=46650d2a015d4e6784eb31fe6a033bec
---

## 使用 lambda 表达式建立子线程任务并阻塞主线程

```java
// 阻塞主线程的计数器
        CountDownLatch countDownLanch = new CountDownLatch(cycleNum);
       	// 局部的线程池
        ExecutorService executor = Executors.newFixedThreadPool(cycleNum > 4 ? 4 : cycleNum);
      	// cycleNum是要执行子线程的次数
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
					// 每执行一次子线程（计数器减一）
                   		countDownLanch.countDown();
                    }

                }
            });
        }

        try {
            // 阻塞主线程
            countDownLanch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
      	// 子线程都执行完后，关闭局部线程池
        executor.shutdown();
```