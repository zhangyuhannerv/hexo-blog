---
title: 传入集合循环查询并用union组合

categories:
  - Dev
  - mybatis
tags:
  - Dev
  - mybatis
  - 传入集合循环查询并用union组合
abbrlink: 25838
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=756ae487d24f4425bca3c79de2357fb3
---

实例：接口

```java
/**
     * selectOverrunData:查询一个单次计划某个行别某个速度级下各个超限类型的占比
     *
     * @param testTaskId 测试任务id
     * @param xb         行别
     * @param speedLevel 速度级
     * @param type       超限还是大值
     * @param labelList  通道名称集合
     * @return
     * @author Zhangyuhan
     * @date 2021/7/8 15:03
     */
    List<Map<String, Object>> selectStatisticalInformation(@Param("testTaskId") String testTaskId,
                                                           @Param("xb") String xb,
                                                           @Param("speedLevel") Integer speedLevel,
                                                           @Param("type") String type,
                                                           @Param("labelList") List<String> labelList);
```

接口对应的 sql

```xml
<select id="selectStatisticalInformation" resultType="map">
        <foreach collection="labelList" item="item" index="index" separator="UNION">
        SELECT numtab.num AS VALUE,
        concat( round(( numtab.num / numtab.total ) * 100, 2),'%' ) AS NAME
        FROM
            (
            SELECT
            <if test='type == "超限"'>
                count( CASE WHEN cxlx = #{item} THEN 1 END ) AS num ,
            </if>
            <if test='type == "大值"'>
                count( CASE WHEN dzlx = #{item} THEN 1 END ) AS num,
            </if>
            count(*) AS total
            FROM
            <if test='type == "超限"'>
            cxdata_table
            </if>
            <if test='type == "大值"'>
            dzdata_table
            </if>
            WHERE
            dcjh_id = '797cb0e7de3241029b5feb6b1ffa17ca'
            AND xb = '上行'
            <if test='type == "超限"'>
            AND flag = '0'
            </if>
            ) numtab
        </foreach>
    </select>
```