---
title: RedisTemplate工具类整合
categories:
  - Dev
  - redis
  - ResidTemplate
tags:
  - Dev
  - redis
  - ResidTemplate
  - RedisTemplate工具类整合
cover: 'https://www.loliapi.com/acg/?uuid=57079'
abbrlink: 57079
date: 2023-05-31 10:09:14
---

```java
@Component
public class RedisUtils {

    private static  RedisTemplate<String, Object> redisTemplate;

    public RedisUtils(RedisTemplate<String, Object> redisTemplate) {
        RedisUtils.redisTemplate = redisTemplate;
    }

    /**
     * 判断缓存是否存在
     * @param key 缓存key
     * @return 缓存是否存在
     */
    public static Boolean hasKey(String key){
        return redisTemplate.hasKey(key);
    }

    /**
     * 缓存数据
     * @param key 缓存key
     * @param value 缓存值
     */
    public static void put(String key, Object value){
        redisTemplate.opsForValue().set(key, value);
    }
    /**
     * 缓存数据
     * @param key 缓存key
     * @param value 缓存值
     * @param timeout 缓存失效时间，单位：秒
     */
    public static void put(String key, Object value, Long timeout){
        put(key, value, Duration.ofSeconds(timeout));
    }

    /**
     * 缓存数据
     * @param key 缓存key
     * @param value 缓存值
     * @param timeout 缓存失效时间，单位：秒
     */
    public static void put(String key, Object value, Duration timeout){
        redisTemplate.opsForValue().set(key, value, timeout);
    }

    /**
     * 获取缓存
     * @param key 缓存key
     * @return 缓存值
     */
    public static Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 缓存失效时间设置
     * @param key 缓存key
     * @param timeout 失效时间 ,单位s
     */
    public static void expire(String key, Long timeout) {
        redisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 缓存失效时间设置
     * @param key 缓存key
     * @param date 失效时间
     */
    public static void expireAt(String key, Date date) {
        redisTemplate.expireAt(key, date);
    }

    /**
     * 删除缓存
     * @param key 缓存key
     * @return 是否删除成功
     */
    public static Boolean delete(String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 往hash中添加字段和值
     * @param key 缓存key
     * @param field hash表中的key
     * @param value hash表中的value
     */
    public static void hashSet(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }
    /**
     * 获取hash中field字段的值
     * @param key 缓存key
     * @param field hash表中的key
     * @return hash表中的value
     */
    public static Object hashGet(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }

    /**
     * 获取hash表
     * @param key 缓存key
     * @return
     */
    public static Map<Object, Object> entries(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 获取hash中所有的field
     * @param key 缓存key
     * @return
     */
    public static Set<Object> hashKeys(String key) {
        return redisTemplate.opsForHash().keys(key);
    }

    /**
     * 获取hash中所有的value
     * @param key 缓存key
     * @return
     */
    public static List<Object> hashValues(String key) {
        return redisTemplate.opsForHash().values(key);
    }

    /**
     * 该hash中是否存在field
     * @param key
     * @param field
     * @return
     */
    public static boolean hasKey(String key, String field){
        return redisTemplate.opsForHash().hasKey(key, field);
    }

    /**
     * 获取hash key 中指定的field的值
     * @param key
     * @param fieldList
     * @return
     */
    public static List hashMultiGet(String key, Collection fieldList){
        return redisTemplate.opsForHash().multiGet(key, fieldList);
    }

    /**
     * 迭代hash 指定条件的field
     * @param key
     * @param options
     * @return
     */
    public static Cursor<Map.Entry<Object, Object>> hScan(String key, ScanOptions options){
        return redisTemplate.opsForHash().scan(key, options);
    }

    /**
     * 删除多个缓存
     * @param keys
     * @return 成功删除数量
     */
    public static Long delete(List<String> keys) {
        return redisTemplate.delete(keys);
    }

    /**
     * 删除hash中field缓存
     * @param key 缓存key
     * @param fields hash表的key列表
     * @return 成功删除数量
     */
    public static Long hashDelete(String key, List<String> fields) {
        return redisTemplate.opsForHash().delete(key, fields.toArray());
    }

    /**
     * 计数器加1
     * @param key
     * @return
     */
    public static Long increment(String key) {
        return redisTemplate.opsForValue().increment(key);
    }

    /**
     * 计数器以指定步长递增
     * @param key 计数器key
     * @param delta 自增步长
     * @return
     */
    public static Long increment(String key, long delta){
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * 计数器以指定步长递增
     * @param key 计数器key
     * @param delta 自增步长
     * @return
     */
    public static Double increment(String key, double delta){
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * hash中field对应计数器加值
     * @param key
     * @param field
     * @param delta
     * @return
     */
    public static Long hashIncrement(String key, String field, long delta) {
        return redisTemplate.opsForHash().increment(key, field, delta);
    }

    /**
     * 计数器减1
     * @param key
     * @return
     */
    public static Long decrement(String key) {
        return redisTemplate.opsForValue().decrement(key);
    }

    /**
     * 计数器以指定步长递减
     * @param key 计数器key
     * @param delta 递减步长
     * @return
     */
    public static Long decrement(String key, long delta){
        return redisTemplate.opsForValue().decrement(key, delta);
    }


    /**
     * 从队列右边移除一个元素并返回该元素
     * @author zhanglihui
     * @date 2020-11-06 10:42
     * @param key
     * @return java.lang.Object
     */
    public static Object rightPop(String key){
        return redisTemplate.opsForList().rightPop(key);
    }

    /**
     * 往列表尾部插入一个元素
     * @param key
     * @param value
     */
    public static void rightPush(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    /**
     * 从队列尾部插入多个元素
     * @param key  键值
     * @param values  插入元素列表
     * @return 插入个数
     */
    public static Long rightPushAll(String key, Object... values){
        return redisTemplate.opsForList().rightPushAll(key, values);
    }

    /**
     * 移除并获取列表头部第一个元素
     * @param key
     * @return
     */
    public static Object leftPop(String key) {
        return redisTemplate.opsForList().leftPop(key);
    }

    /**
     * 从队列左边插入一个元素
     * @author zhanglihui
     * @date 2020-11-06 10:42
     * @param key 键值
     * @param value 插入元素
     * @return 插入个数
     */
    public static Long leftPush(String key, Object value){
        return redisTemplate.opsForList().leftPush(key, value);
    }

    /**
     * 从队列左边插入多个元素
     * @param key  键值
     * @param values  插入元素列表
     * @return 插入个数
     */
    public static Long leftPushAll(String key, Object... values){
        return redisTemplate.opsForList().leftPushAll(key, values);
    }

    /**
     * 获取列表长度
     * @author zhanglihui
     * @date 2020-11-06 10:46
     * @param key
     * @return java.lang.Long
     */
    public static Long listSize(String key){
        return redisTemplate.opsForList().size(key);
    }

    /**
     * 获取列表中的数据
     * @author zhanglihui
     * @date 2020-11-06 10:47
     * @param key 缓存值
     * @param start list开始下标
     * @param end list结束下标，-1代表末尾
     * @return java.util.List<java.lang.Object>
     */
    public static List<Object> listRange(String key, int start, int end){
        return redisTemplate.opsForList().range(key, start, end);
    }

    /**
     * 保留指定区间内元素，其余元素都将被删除
     * @param key list key
     * @param start 开始下标
     * @param end 结束下标
     */
    public static void listTrim(String key, int start, int end){
        redisTemplate.opsForList().trim(key,start,end);
    }

    /**
     * 批量查询
     * @param keys 查询主键列表
     */
    public static List<Object> multiGet(List<String> keys) {
        return redisTemplate.opsForValue().multiGet(keys);
    }

    /**
     * 将member元素添加到有序集key中，按score排序
     * @param key 有序集
     * @param member 有续集的成员
     * @param score 有序集的排序值
     * @return 是否添加成功
     */
    public static Boolean zAdd(String key, Object member, double score){
        return redisTemplate.opsForZSet().add(key, member, score);
    }

    /**
     * 批量添加元素到有序集key中
     * @param key 有序集
     * @param tuples 元素列表
     * @return 添加数量
     */
    public static Long zAdd(String key, Set<ZSetOperations.TypedTuple<Object>> tuples){
        return redisTemplate.opsForZSet().add(key, tuples);
    }

    /**
     * 返回有序集 key 中，指定区间内的成员。
     * @param key 有序集
     * @param start 下标起始位置，从0开始
     * @param end 下标结束位置，-1表示最后一个
     * @return 有序集列表
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zRange(String key, long start, long end){
        return redisTemplate.opsForZSet().rangeWithScores(key, start, end);
    }

    /**
     * 根据设置的score获取区间值
     * @param key 有序集
     * @param min score起始值
     * @param max score结束值
     * @return 有序区间值
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zRangeByScore(String key, double min, double max){
        return redisTemplate.opsForZSet().rangeByScoreWithScores(key, min, max);
    }

    /**
     * 根据设置的score获取区间值
     * @param key 有序集
     * @param min score起始值
     * @param max score结束值
     * @param offset 偏移值
     * @param count 返回数量
     * @return 有序区间值
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zRangeByScore(String key, double min, double max, int offset, int count){
        return redisTemplate.opsForZSet().rangeByScoreWithScores(key, min, max, offset, count);
    }

    /**
     * 移除有序集 key 中，所有 score 值介于 min 和 max 之间
     * @param key 有序集
     * @param min score最小值
     * @param max score最大值
     * @return 删除条数
     */
    public static Long removeByScore(String key, double min, double max){
        return redisTemplate.opsForZSet().removeRangeByScore(key, min, max);
    }

    /**
     * 删除zset中的某个元素
     * @param key 有序集
     * @param values 元素
     * @return 删除条数
     */
    public static Long zSetRemove(String key, Object... values){
        return redisTemplate.opsForZSet().remove(key, values);
    }

    /**
     * 根据score范围查询元素，倒序排序
     * @param key 有序集
     * @param min score最小值
     * @param max score最大值
     * @param offset 偏移量
     * @param count  返回数量
     * @return Set<ZSetOperations.TypedTuple<Object>>
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zReverseRangeByScoreWithScores(String key, double min, double max, long offset, long count){
        return redisTemplate.opsForZSet().reverseRangeByScoreWithScores(key, min, max, offset, count);
    }

    /**
     * 根据score范围查询元素，倒序排序
     * @param key 有序集
     * @param min score最小值
     * @param max score最大值
     * @return Set<ZSetOperations.TypedTuple<Object>>
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zReverseRangeByScoreWithScores(String key, double min, double max){
        return redisTemplate.opsForZSet().reverseRangeByScoreWithScores(key, min, max);
    }

    /**
     * zset根据下标倒序查询
     * @param key 缓存key
     * @param start 开始下标
     * @param end 结束下标
     * @return
     */
    public static Set<ZSetOperations.TypedTuple<Object>> zReverseRangeByScore(String key, long start, long end){
        return redisTemplate.opsForZSet().reverseRangeWithScores(key, start, end);
    }



    /**
     * 获取元素的分值
     * @param key 有序集
     * @param value 元素
     * @return 分值
     */
    public static Double score(String key, Object value){
        return redisTemplate.opsForZSet().score(key, value);
    }

    /**
     * 指定元素增加score
     * @param key 有序集
     * @param value 元素
     * @param delta 增加值
     * @return score
     */
    public static Double incrementScore(String key, Object value, double delta){
        return redisTemplate.opsForZSet().incrementScore(key, value, delta);
    }

    /**
     * 查询zset大小
     * @param key 有序集
     * @return zset元素数量
     */
    public static Long zSize(String key){
        return redisTemplate.opsForZSet().size(key);
    }

    /**
     * 根据score范围查询数量
     * @param key 有序集
     * @param min score最小值
     * @param max score最大值
     * @return 统计数量
     */
    public static Long zCount(String key, double min, double max){
        return redisTemplate.opsForZSet().count(key, min, max);
    }

    /**
     * 根据参数 count 的值，移除列表中与参数 delta 相等的元素。
     * @param key 队列
     * @param count
     * count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
     * count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
     * count = 0 : 移除表中所有与 VALUE 相等的值。
     * @param value 元素
     * @return
     */
    public static Long listRem (String key, long count, Object value){
        return redisTemplate.opsForList().remove(key, count, value);
    }


    /**
     * 移除有序集中，指定排名(rank)区间内的所有成员。
     * @param key key
     * @param start 排名开始位置
     * @param end 排名结束位置
     * @return 被移除成员的数量
     */
    public static Long zRemByRank(String key, long start, long end){
        return redisTemplate.opsForZSet().removeRange(key, start, end);
    }

    /**
     * 返回哈希表中，所有的字段和值
     * @param key key
     * @return 所有的字段和值
     */
    public static Map<Object,Object> hashAll(String key){
        return redisTemplate.opsForHash().entries(key);
    }
}
```