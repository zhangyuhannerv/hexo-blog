---
title: mybatis的一些查询示例
categories:
  - Dev
  - mybatisPlus
tags:
  - Dev
  - mybatisPlus
  - mybatis的一些查询示例
cover: 'https://www.loliapi.com/acg/?uuid=25161'
abbrlink: 25161
date: 2023-06-15 09:23:13
---

## 建表所需的必须字段

## mysql

CREATE_TIME  创建时间    DATETIME,
CREATE_BY   创建人    VARCHAR(100),
UPDATE_TIME  更新时间   DATETIME,
UPDATE_BY   更新人    VARCHAR(100),
DEL_FLAG    删除标志(0未删除，1已删除）   int(11)   default 0

## oracle

CREATE_TIME  创建时间    DATE,
CREATE_BY   创建人    VARCHAR2(100),
UPDATE_TIME  更新时间   DATE,
UPDATE_BY   更新人    VARCHAR2(100),
DEL_FLAG    删除标志(0未删除，1已删除）   NUMBER(1,0)   default 0


## like的写法

### mysql

```xml
<select id="findByName" parameterType="String" resultType="YourEntityType">
    SELECT * FROM your_table
    WHERE 1=1
    <if test="name != null and name != ''">
        AND name LIKE CONCAT('%', #{name}, '%')
    </if>
</select>
```

### oracle

oracle没有mysql的concat()函数

```xml
<select id="findByName" parameterType="String" resultType="YourEntityType">
    SELECT * FROM your_table
    <where>
        <if test="name != null and name != ''">
          AND name LIKE '%' || #{name} || '%'
        </if>
    </where>
</select>
```

如果上面的报错，那么可以使用bind标签

```xml
<select id="findByName" parameterType="String" resultType="YourEntityType">
    SELECT 
      * 
    FROM 
      your_table
    WHERE 
      <if test="name != null and name != ''">
        <bind name="nameBind" value="'%' + name + '%'" />
        name LIKE #{nameBind}
      </if>
</select>
```

## 时间日期查询

### mysql


### oracle

#### 数据库字段是字符串(2024-10-29 11:30:56)，java参数也是字符串(2024-10-29)

要求，传入起始和终止日期。过滤出该区间内数据库里的数据。
比如传入`(2024-10-29,2024-10-29)`，那么过滤出来的就是`[2024-10-29 00:00:00,2024-10-30 00:00:00)`这段时间内的数据

```xml
<select id="getList" resultMap="NcsErBxzbDTOMap">
        SELECT
          *
        FROM
            er_bxzb er_bxzb
        <where>
            <if test="query.startDate != null and query.startDate != ''">
                AND TO_DATE(er_bxzb.DJRQ, 'YYYY-MM-DD HH24:MI:SS') &gt;= TO_DATE(#{query.startDate}, 'YYYY-MM-DD')
            </if>
            <if test="query.endDate != null and query.endDate != ''">
                AND TO_DATE(er_bxzb.DJRQ, 'YYYY-MM-DD HH24:MI:SS') &lt; TO_DATE(#{query.endDate}, 'YYYY-MM-DD') + 1
            </if>
            <if test="query.djbh != null and query.djbh != ''">
                <bind name="djbhBind" value="'%'+query.djbh+'%'"/>
                AND er_bxzb.DJBH like #{djbhBind}
            </if>
        </where>
    </select>
```

## in查询传入list为null或者list的长度为0

```java
List<BuyingRequisitionBills> selectBuyingRequisitionBills(@Param("pkOrg") String pkOrg,
                                                          @Param("sourceCodeSet") Set<String> sourceCode);
```

```xml
SELECT
  material.PK_MATERIAL materialPk,
  pp.FBILLSTATUS billStatus,
  FROM PO_PRAYBILL_B ppb
        LEFT JOIN BD_MATERIAL_V material ON material.PK_MATERIAL = ppb.pk_material
        LEFT JOIN PO_PRAYBILL pp ON pp.PK_PRAYBILL = ppb.PK_PRAYBILL
  WHERE
  pp.dr = 0 AND
  ppb.dr = 0 AND
  material.dr = 0 AND
  pp.fpraysource = 9 AND
  pp.PK_ORG = #{pkOrg}
  <choose>
      <when test="sourceCodeSet !=null and sourceCodeSet.size()>0">
          AND ppb.VSOURCECODE in
          <foreach item="item" index="index" collection="sourceCodeSet" open="(" separator="," close=")">
              #{item}
          </foreach>
      </when>
      <otherwise>
          AND 0 = 1
      </otherwise>
  </choose>
```
