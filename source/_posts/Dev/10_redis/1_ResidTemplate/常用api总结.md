---
title: 常用api总结

categories:
  - Dev
  - redis
  - ResidTemplate
tags:
  - Dev
  - redis
  - ResidTemplate
  - 常用api总结
abbrlink: 50126
date: 2023-03-06 15:47:44
cover: https://imgapi.xl0408.top?uuid=7dedacfc9aea4ca3b2e98c6648c2d3a6
---

XXXTemplate 是 Spring 的一大设计特色，其中，RedisTemplate 功能是提供对 Redis 的支持。

RedisTemplate 是 Spring Boot 访问 Redis 的核心组件，是 SpringBoot 集成 Redis 的客户端方式。它的底层通过 RedisConnectionFactory 对多种 Redis 驱动进行集成，上层通过 XXXOperations 提供丰富的 API，并结合 Spring 基于泛型的 bean 注入，未开发提供了极大的便利。

一、Redis 常用的数据类型
String：字符串类型，可以存储多种类型，如：字符串，JSON 串，二进制，序列化对象等；
Hash：key-value 结构，就像 Java 里的 Map，特别适合存储对象；
List：双端链表的结构，即可以作为栈，又可以作为队列，可以进行集合的头部或者尾部添加删除元素；
Set：Set 集合是 String 类型的无序集合，通过 hashtable 实现，可以对集合取交集，并集，差集；
Sorted set：是 String 类型的有序集合，并且，每个元素都会关联一个 double 类型的分数，Redis 通过分数可以为集合中的成员进行从小到大的排序。有序集合的成员是唯一的，但分数(score)却可以重复。
二、RedisTemplate 常用方法

String 类型

1.1 判断是否有 key 所对应的值，有则返回 true，没有则返回 false；

redisTemplate.hasKey(key);
1.2 有则取出 key 值所对应的值；

redisTemplate.opsForValue().get(key);
1.3 删除单个 key 值；

redisTemplate.delete(key);
1.4 批量删除 key；

redisTemplate.delete(keys); //其中 keys:Collection<K> keys
1.5 将当前传入的 key 值序列化为 byte[]类型；

redisTemplate.dump(key);
1.6 设置过期时间；

Boolean redisTemplate.expire(key, timeout, unit); // 多久以后过期

Boolean redisTemplate.expireAt(key, date); // Date date 具体过期时间
1.7 查找匹配的 key 值，返回一个 Set 集合类型（ \* 代表查询所有）；

Set<String> redisTemplate.keys(pattern); // pattern 为正则表达式
1.8 修改 redis 中 key 的名称；

void redisTemplate.rename(oldKey, newKey);

// 如果旧值存在时，将旧值改为新值
Boolean redisTemplate.renameIfAbsent(oldKey, newKey);
1.9 返回传入 key 所存储的值的类型；

DataType redisTemplate.type(key);
1.10 从 redis 中随机取出一个 key；

redisTemplate.randomKey();
1.11 返回当前 key 所对应的剩余过期时间；

Long redisTemplate.getExpire(key);

// TimeUnit unit 指定返回的时间的单位  
Long redisTemplate.getExpire(key, unit);
1.12 将 key 持久化保存；

Boolean redisTemplate.persist(key);
1.13 将当前数据库的 key 移动到指定 redis 中数据库当中；

Boolean redisTemplate.move(key, dbIndex);
1.14 设置当前的 key 以及 value 值；

redisTemplate.opsForValue().set(key, value);

// 带过期时间 timeout，和时间单位 unit
redisTemplate.opsForValue().set(key, value, timeout, unit);
1.15 返回 key 中字符串 start~end 位置的子字符；

String redisTemplate.opsForValue().get(key, start, end);
1.16 将旧的 key 设置为 value，并且返回旧的 key；

String redisTemplate.opsForValue().getAndSet(key, value);
1.17 批量获取值；

List<String> redisTemplate.opsForValue().multiGet(keys); // Collection<String> keys
1.18 在原有的值基础上新增字符串到末尾;

redisTemplate.opsForValue().append(key, value);
1.19 给 key 对应的 value 值进行自增（正值则自增，负值则自减），如果该 key 没有 value 值，则默认为 0；

Double redisTemplate.opsForValue().increment(key, increment); // double increment

Long redisTemplate.opsForValue().increment(key, increment); // long increment
1.20 如果对应的 map 集合名称不存在，则添加否则不做修改;

Map valueMap = new HashMap();  
valueMap.put("valueMap1","map1");  
valueMap.put("valueMap2","map2");  
valueMap.put("valueMap3","map3");  
redisTemplate.opsForValue().multiSetIfAbsent(valueMap);
1.21 设置 map 集合到 redis;

Map valueMap = new HashMap();  
valueMap.put("valueMap1","map1");  
valueMap.put("valueMap2","map2");  
valueMap.put("valueMap3","map3");  
redisTemplate.opsForValue().multiSet(valueMap);  
1.22 获取字符串的长度；

redisTemplate.opsForValue().size(key);
1.23 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始；

redisTemplate.opsForValue().set(key, value, offset);
1.24 重新设置 key 对应的值，如果存在返回 false，否则返回 true;

redisTemplate.opsForValue().setIfAbsent(key, value);
1.25 将值 value 关联到 key，并将 key 的过期时间设为 timeout；

redisTemplate.opsForValue().set(key, value, timeout, unit);
1.26 对 key 所储存的字符串值，获取指定偏移量上的位(bit)；

redisTemplate.opsForValue().getBit(key, offset);
1.27 将二进制第 offset 位值变为 value；

redisTemplate.opsForValue().setBit(key, offset, value);

Hash 类型
2.1 以 map 集合的形式添加键值对；

redisTemplate.opsForHash().putAll(key, maps); // Map<String, String> maps
2.2 获取变量中的键值对;

Map<Object, Object> redisTemplate.opsForHash().entries(key);
2.3 查看 hash 表中指定字段是否存在;

Boolean redisTemplate.opsForHash().hasKey(key, field);
2.4 获取变量中的指定 map 键是否有值,如果存在该 map 键则获取值，没有则返回 null；

redisTemplate.opsForHash().get(key, field);
2.5 新增 hashMap 值;

redisTemplate.opsForHash().put(key, hashKey, value);
2.6 仅当 hashKey 不存在时才设置;

Boolean redisTemplate.opsForHash().putIfAbsent(key, hashKey, value);
2.7 删除一个或者多个 hash 表字段;

Long redisTemplate.opsForHash().delete(key, fields); // Object... fields
2.8 给哈希表 key 中的指定字段的整数值加上增量 increment；

public Double hIncrByDouble(String key, Object field, double delta) {
return redisTemplate.opsForHash().increment(key, field, delta);
}
public Long hashIncrBy(String key, Object field, long increment) {
return redisTemplate.opsForHash().increment(key, field, increment);
}
2.9 获取所有 hash 表中字段;

redisTemplate.opsForHash().keys(key);
2.10 获取 hash 表中字段的数量;

redisTemplate.opsForHash().size(key);
2.11 获取 hash 表中存在的多个值；

List<Object> redisTemplate.opsForHash().values(key);
2.12 匹配获取键值对，ScanOptions.NONE 为获取全部键对；

public Cursor<Entry<Object, Object>> hashScan(String key, ScanOptions options) {
return redisTemplate.opsForHash().scan(key, options);
}

List 类型
3.1 通过索引获取列表中的元素；

redisTemplate.opsForList().index(key, index);
3.2 获取列表指定范围内的元素(start 开始位置, 0 是开始位置，end 结束位置, -1 返回所有);

redisTemplate.opsForList().range(key, start, end);
3.3 存储在 list 的头部，即添加一个就把它放在最前面的索引处;

redisTemplate.opsForList().leftPush(key, value);
3.4 把多个值存入 List 中(value 可以是多个值，也可以是一个 Collection value);

redisTemplate.opsForList().leftPushAll(key, value);
3.5 List 存在的时候再加入;

redisTemplate.opsForList().leftPushIfPresent(key, value);
3.6 如果 pivot 处值存在则在 pivot 前面添加;

redisTemplate.opsForList().leftPush(key, pivot, value);
3.7 按照先进先出的顺序来添加(value 可以是多个值，或者是 Collection var2)；

redisTemplate.opsForList().rightPush(key, value);

redisTemplate.opsForList().rightPushAll(key, value);
3.8 在 pivot 元素的右边添加值;

redisTemplate.opsForList().rightPush(key, pivot, value);
3.9 设置指定索引处元素的值;

redisTemplate.opsForList().set(key, index, value);
3.10 移除并获取列表中第一个元素(如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止)；

redisTemplate.opsForList().leftPop(key);

redisTemplate.opsForList().leftPop(key, timeout, unit);
3.11 移除并获取列表最后一个元素；

redisTemplate.opsForList().rightPop(key);

redisTemplate.opsForList().rightPop(key, timeout, unit);
3.12 从一个队列的右边弹出一个元素并将这个元素放入另一个指定队列的最左边；

redisTemplate.opsForList().rightPopAndLeftPush(sourceKey, destinationKey);

redisTemplate.opsForList().rightPopAndLeftPush(sourceKey, destinationKey, timeout, unit);
3.13 删除集合中值等于 value 的元素(index=0, 删除所有值等于 value 的元素; index>0, 从头部开始删除第一个值等于 value 的元素; index<0, 从尾部开始删除第一个值等于 value 的元素)；

redisTemplate.opsForList().remove(key, index, value);
3.14 将 List 列表进行剪裁；

redisTemplate.opsForList().trim(key, start, end);
3.15 获取当前 key 的 List 列表长度；

redisTemplate.opsForList().size(key);

Set 类型
4.1 添加元素；

redisTemplate.opsForSet().add(key, values);
4.2 移除元素(单个值、多个值)；

redisTemplate.opsForSet().remove(key, values);
4.3 删除并且返回一个随机的元素；

redisTemplate.opsForSet().pop(key);
4.4 获取集合的大小；

redisTemplate.opsForSet().size(key);
4.5 判断集合是否包含 value；

redisTemplate.opsForSet().isMember(key, value);
4.6 获取两个集合的交集(key 对应的无序集合与 otherKey 对应的无序集合求交集)；

redisTemplate.opsForSet().intersect(key, otherKey);
4.7 获取多个集合的交集(Collection var2)；

redisTemplate.opsForSet().intersect(key, otherKeys);
4.8 key 集合与 otherKey 集合的交集存储到 destKey 集合中(其中 otherKey 可以为单个值或者集合);

redisTemplate.opsForSet().intersectAndStore(key, otherKey, destKey);
4.9 key 集合与多个集合的交集存储到 destKey 无序集合中;

redisTemplate.opsForSet().intersectAndStore(key, otherKeys, destKey);
4.10 获取两个或者多个集合的并集(otherKeys 可以为单个值或者是集合);

redisTemplate.opsForSet().union(key, otherKeys);
4.11 key 集合与 otherKey 集合的并集存储到 destKey 中(otherKeys 可以为单个值或者是集合);

redisTemplate.opsForSet().unionAndStore(key, otherKey, destKey);
4.12 获取两个或者多个集合的差集(otherKeys 可以为单个值或者是集合);

redisTemplate.opsForSet().difference(key, otherKeys);
4.13 差集存储到 destKey 中(otherKeys 可以为单个值或者集合);

redisTemplate.opsForSet().differenceAndStore(key, otherKey, destKey);
4.14 随机获取集合中的一个/count 个元素;

redisTemplate.opsForSet().randomMember(key);

// 随机获取集合中 count 个元素
redisTemplate.opsForSet().randomMembers(key, count);
4.15 获取集合中的所有元素;

redisTemplate.opsForSet().members(key);
4.16 获取多个 key 无序集合中的元素（去重），count 表示个数;

redisTemplate.opsForSet().distinctRandomMembers(key, count);
4.17 遍历 set 类似于 Interator(ScanOptions.NONE 为显示所有的)；

redisTemplate.opsForSet().scan(key, options);

ZSet 类型
5.1 添加元素(有序集合是按照元素的 score 值由小到大进行排列)；

redisTemplate.opsForZSet().add(key, value, score);
5.2 删除对应的 value,value 可以为多个值；

redisTemplate.opsForZSet().remove(key, values);
5.3 增加元素的 score 值，并返回增加后的值；

redisTemplate.opsForZSet().incrementScore(key, value, delta);
5.4 返回元素在集合的排名,有序集合是按照元素的 score 值由小到大排列；

redisTemplate.opsForZSet().rank(key, value);
5.5 返回元素在集合的排名,按元素的 score 值由大到小排列；

redisTemplate.opsForZSet().reverseRank(key, value);
5.6 获取集合中给定区间的元素(start 开始位置，end 结束位置, -1 查询所有)；

redisTemplate.opsForZSet().reverseRangeWithScores(key, start,end);
5.7 按照分数范围升序输出名称；

rangebyscore key min max [withscores]
5.8 根据分数范围删除元素；

zremrangebyscore key min max [withscores]
5.9 按照分数范围降序输出名称；

redisTemplate.opsForZSet().reverseRangeByScore(key, min, max);

//返回值为:Set<ZSetOperations.TypedTuple<V>>
redisTemplate.opsForZSet().reverseRangeByScoreWithScores(key, min, max);
5.10 从高到低的排序集中获取分数在最小和最大值之间的元素;

redisTemplate.opsForZSet().reverseRangeByScore(key, min, max, start, end);
5.11 根据 score 值获取集合元素数量;

redisTemplate.opsForZSet().count(key, min, max);
5.12 获取集合的大小;

redisTemplate.opsForZSet().size(key);

redisTemplate.opsForZSet().zCard(key);
5.13 获取集合中 key、value 元素对应的 score 值;

redisTemplate.opsForZSet().score(key, value);
5.14 移除指定索引位置处的成员;

redisTemplate.opsForZSet().removeRange(key, start, end);
5.15 移除指定 score 范围的集合成员;

redisTemplate.opsForZSet().removeRangeByScore(key, min, max);
5.16 获取 key 和 otherKey 的并集并存储在 destKey 中（其中 otherKeys 可以为单个字符串或者字符串集合）;

redisTemplate.opsForZSet().unionAndStore(key, otherKey, destKey);
5.17 获取 key 和 otherKey 的交集并存储在 destKey 中（其中 otherKeys 可以为单个字符串或者字符串集合）;

redisTemplate.opsForZSet().intersectAndStore(key, otherKey, destKey); 5.遍历集合（和 iterator 一模一样）

Cursor<TypedTuple<Object>> scan = opsForZSet.scan("test3", ScanOptions.NONE);
while (scan.hasNext()){
ZSetOperations.TypedTuple<Object> item = scan.next();
System.out.println(item.getValue() + ":" + item.getScore());
}