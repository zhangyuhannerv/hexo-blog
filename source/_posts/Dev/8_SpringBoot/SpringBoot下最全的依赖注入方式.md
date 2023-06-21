---
title: SpringBoot下最全的依赖注入方式
categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - SpringBoot下最全的依赖注入方式
cover: 'https://sex.nyan.xyz/api/v2/img?uuid=1170'
abbrlink: 1170
date: 2023-06-21 14:06:44
---

## 属性注入

通过属性注入的方式非常常用，或者说是最常用的

```java
@Service
public class UserService {
    @Autowired
    private Wolf1Bean wolf1Bean;//通过属性注入
}
```

## setter 方法注入

除了通过属性注入，通过 setter 方法也可以实现注入：

```java
@Service
public class UserService {
    private Wolf3Bean wolf3Bean;
    
    @Autowired  //通过setter方法实现注入
    public void setWolf3Bean(Wolf3Bean wolf3Bean) {
        this.wolf3Bean = wolf3Bean;
    }
}
```

## 构造器注入

当两个类属于强关联时，我们也可以通过构造器的方式来实现注入：

```java
@Service
public class UserService {
  private Wolf2Bean wolf2Bean;
    
     @Autowired //通过构造器注入
    public UserService(Wolf2Bean wolf2Bean) {
        this.wolf2Bean = wolf2Bean;
    }
}
```

## 接口注入

在上面的三种常规注入方式中，假如我们想要注入一个接口，而当前接口又有多个实现类，那么这时候就会报错，因为 Spring 无法知道到底应该注入哪一个实现类。

比如我们上面的三个类全部实现同一个接口 IWolf，那么这时候直接使用常规的，不带任何注解元数据的注入方式来注入接口 IWolf。

```java
@Autowired
private IWolf iWolf;
```

此时启动服务就会报错。

本来应该注入一个类，但是 Spring 找到了三个，所以没法确认到底应该用哪一个。这个问题如何解决呢？

解决思路主要有以下 5 种。

### 通过配置文件和 @ConditionalOnProperty 注解实现

通过 `@ConditionalOnProperty` 注解可以结合配置文件来实现唯一注入。下面示例就是说如果配置文件中配置了 `lonely.wolf=test1`，那么就会将 `Wolf1Bean` 初始化到容器，此时因为其他实现类不满足条件，所以不会被初始化到 IOC 容器，所以就可以正常注入接口：

```java
@Component
@ConditionalOnProperty(name = "lonely.wolf",havingValue = "test1")
public class Wolf1Bean implements IWolf{
}
```

当然，这种配置方式，编译器可能还是会提示有多个 Bean，但是只要我们确保每个实现类的条件不一致，就可以正常使用。

### 通过其他 @Condition 条件注解

除了上面的配置文件条件，还可以通过其他类似的条件注解，如：

* @ConditionalOnBean：当存在某一个 Bean 时，初始化此类到容器。
* @ConditionalOnClass：当存在某一个类时，初始化此类的容器。
* @ConditionalOnMissingBean：当不存在某一个 Bean 时，初始化此类到容器。
* @ConditionalOnMissingClass：当不存在某一个类时，初始化此类到容器。
...

类似这种实现方式也可以非常灵活的实现动态化配置。

不过上面介绍的这些方法似乎每次都只能固定注入一个实现类，那么如果我们就是想多个类同时注入，不同的场景可以动态切换而又不需要重启或者修改配置文件，又该如何实现呢？

### 通过 @Resource 注解动态获取

如果不想手动获取，我们也可以通过 @Resource 注解的形式动态指定 BeanName 来获取：

```java
@Component
public class InterfaceInject {
    @Resource(name = "wolf1Bean")
    private IWolf iWolf;
}
```

如上所示则只会注入 BeanName 为 wolf1Bean 的实现类。

### 通过集合注入

除了指定 Bean 的方式注入，我们也可以通过集合的方式一次性注入接口的所有实现类：

```java
@Component
public class InterfaceInject {
    @Autowired
    List<IWolf> list;

    @Autowired
    private Map<String,IWolf> map;
}
```

上面的两种形式都会将 IWolf 中所有的实现类注入集合中。如果使用的是 List 集合，那么我们可以取出来再通过 instanceof 关键字来判定类型；而通过 Map 集合注入的话，Spring 会将 Bean 的名称（默认类名首字母小写）作为 key 来存储，这样我们就可以在需要的时候动态获取自己想要的实现类。

### @Primary 注解实现默认注入

除了上面的几种方式，我们还可以在其中某一个实现类上加上`@Primary`注解来表示当有多个 Bean 满足条件时，优先注入当前带有`@Primary`注解的 Bean：

```java
@Component
@Primary
public class Wolf1Bean implements IWolf{
}
```

通过这种方式，Spring 就会默认注入 wolf1Bean，而同时我们仍然可以通过上下文手动获取其他实现类，因为其他实现类也存在容器中。

