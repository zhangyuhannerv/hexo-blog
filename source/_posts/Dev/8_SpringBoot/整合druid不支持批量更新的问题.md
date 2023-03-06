---
title: '整合druid不支持批量更新的问题'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'SpringBoot'
tags: 
  - 'Dev'
  - 'SpringBoot'
  - '整合druid不支持批量更新的问题'
---
轻骑兵的解决方式

注意url后面多了个allowMultiQueries=true

```yml
spring:
  ###################  mysql配置  ###################
  datasource:
    url: jdbc:mysql://123.123.122.138:3310/dtjc_sbgl_dev?autoReconnect=true&rewriteBatchedStatements=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=GMT%2b8&allowMultiQueries=true
    username: root
    password: 123456a?
    db-name: dtjc_sbgl_dev
    filters: log4j,mergeStat
    driverClassName: com.mysql.cj.jdbc.Driver  
    #支持批量更新重点就是这里
    filter:
      wall:
        config:
          multi-statement-allow: true

```
***
网上搜到的解决方式

spring boot集成MyBatis，集成Druid批量更新报错，

原因：Druid的防火墙配置(WallConfig)中变量multiStatementAllow默认为false 解决方案：

开启Druid的防火墙配置(WallConfig)中变量multiStatementAllow，把WallConfig中的multiStatementAllow设置为true即可

集成Druid时关于DruidDataSource配置如下:
```java
@Configuration 
public class DataSourcesConfig {
	/**
	 * druid初始化
	 *
	 * @return
	 * @throws SQLException
	 */
	@Primary //默认数据源 在同样的DataSource中，首先使用被标注的DataSource
	@Bean(name = "dataSource", destroyMethod = "close")
	@ConfigurationProperties(prefix = "spring.datasource")
	public DruidDataSource Construction() throws SQLException {
	
	DruidDataSource datasource = new DruidDataSource();
	
	// filter
	    List`<Filter>` filters = new ArrayList `<Filter>`();
	    WallFilter wallFilter = new WallFilter();
	    filters.add(wallFilter);
	    datasource.setProxyFilters(filters);
	
	return datasource;
	
	}
	
	@Bean(name = "wallFilter")
	@DependsOn("wallConfig")
	public WallFilter wallFilter(WallConfig wallConfig) {
	    WallFilter wallFilter = new WallFilter();
	    wallFilter.setConfig(wallConfig);
	    return wallFilter;
	}
	
	@Bean(name = "wallConfig")
	public WallConfig wallConfig() {
	    WallConfig wallConfig = new WallConfig();
	    wallConfig.setMultiStatementAllow(true);//允许一次执行多条语句
	    wallConfig.setNoneBaseStatementAllow(true);//允许一次执行多条语句
	    return wallConfig;
	}
}
```

之后数据库连接后面需要加上allowMultiQueries=true,上面解决的是Druid的拦截， 而在数据库上的配置解决的是数据库服务层面的拦截。 url: jdbc:mysql://192.168.1.9:3306/p?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true 到此结束。
***
另外：

spring boot开发环境下启动无异常，批量更新也成功了，但是在tomcat下运行启动会报错
异常提示如下：Unable to register WallConfig with key wallConfig; nested exception is InstanceAlreadyExistsException:com.alibaba.druid.wall:name=wallConfig,type=WallConfig

解决办法：在SpringBoot项目中配置文件加上spring.jmx.enabled=false
