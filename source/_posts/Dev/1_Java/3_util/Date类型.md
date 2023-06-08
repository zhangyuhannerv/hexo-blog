---
title: Date类型

categories:
  - Dev
  - Java
  - util
tags:
  - Dev
  - Java
  - util
  - Date类型
abbrlink: 39843
date: 2023-03-06 15:47:44
cover: https://sex.nyan.xyz/api/v2/img?uuid=b65544afc3a94630954c4a1720516919
---

## 两个日期之间相差的天数，日期为单位（比如相差两秒，可能就相差一天，12:23:59：59 和 13:01:00：00 就相差一天）

```java
/**
     * date2比date1多的天数
     * @param date1
     * @param date2
     * @return
     */
private static int differentDays(Date date1,Date date2) {
  Calendar cal1 = Calendar.getInstance();
  cal1.setTime(date1);

  Calendar cal2 = Calendar.getInstance();
  cal2.setTime(date2);
  int day1= cal1.get(Calendar.DAY_OF_YEAR);
  int day2 = cal2.get(Calendar.DAY_OF_YEAR);

  int year1 = cal1.get(Calendar.YEAR);
  int year2 = cal2.get(Calendar.YEAR);
  if(year1 != year2) {//同一年
    int timeDistance = 0 ;
    for(int i = year1 ; i < year2 ; i ++)
    {
      if(i%4==0 && i%100!=0 || i%400==0)    //闰年
      {
        timeDistance += 366;
      }
      else    //不是闰年
      {
        timeDistance += 365;
      }
    }

    return timeDistance + (day2-day1) ;
  } else {// 不同年
    System.out.println("判断day2 - day1 : " + (day2-day1));
    return day2-day1;
  }
}
```

## 两个日期之间相差的天数，以毫秒数精确计算（比如相差 22 小时可能是同一天）

```java
/**
     * 通过秒毫秒数判断两个时间的间隔的天数
     * @param date1
     * @param date2
     * @return
     */
public static int differentDaysByMillisecond(Date date1,Date date2)
{
  int days = (int) ((date2.getTime() - date1.getTime()) / (1000*3600*24));
  return days;
}
```

## 两个日期是否是同一天

[判断同一天的博客](https://blog.csdn.net/w605283073/article/details/103335373)

```java
public static boolean isSameDay(Date date1, Date date2) {
  LocalDate localDate1 = date1.toInstant()
    .atZone(ZoneId.systemDefault())
    .toLocalDate();
  LocalDate localDate2 = date2.toInstant()
    .atZone(ZoneId.systemDefault())
    .toLocalDate();
  return localDate1.isEqual(localDate2);

}
```

另一种方式

```java
public static boolean isSameDay(Date date1, Date date2) {
    SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
    return fmt.format(date1).equals(fmt.format(date2));
}
```