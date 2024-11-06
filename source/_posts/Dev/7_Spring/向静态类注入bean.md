---
title: 向静态类注入bean

categories:
  - Dev
  - Spring
tags:
  - Dev
  - Spring
  - 向静态类注入bean
abbrlink: 50567
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=24be6bc87e5a4ebc9c3a2fa8f43e4ebc
---
## 方式1
```java
@Component
public class DtjcProjectGeneralReportUtil {
    @Autowired
    private IDataAnalysisService dataAnalysisService;

    private static IDataAnalysisService staticDataAnalysisService;

    @PostConstruct
    public void init() {
        staticDataAnalysisService = dataAnalysisService;
    }

   //  这里是静态方法，该方法请调用静态bean
    public static String getDtcjGeneralReportTestTaskId(String projectId) {
        String TestTaskId = "";
        TestTaskId = staticDataAnalysisService.getReportDcjh(projectId);
        if (TestTaskId == null || "".equals(TestTaskId)) {
            List<Map<String, String>> list = staticDataAnalysisService.getFirstDcjh(projectId);
            if (list == null || list.size() == 0) {
                list = staticDataAnalysisService.getFirstDcjhNoData(projectId);
            }
            if (list != null && list.size() > 0) {
                TestTaskId = list.get(list.size() - 1).get("id").toString();
            }
        }
        return TestTaskId;
    }
}
```

## 方式2（未经测试）

```java
@Component
public class Book {
    private static User user;

    @Autowired
    public void setUser(User user){
        Book.user = user
    }
}
```