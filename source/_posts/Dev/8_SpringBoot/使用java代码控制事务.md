---
title: 使用java代码控制事务

categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - 使用java代码控制事务
abbrlink: 46891
date: 2023-03-06 15:47:44
cover: https://www.loliapi.com/acg/?uuid=26efb986ff28499facef387b4cced2ce
---

1.  代码中控制事务的三种方式

    - 编程式事务：就是直接在代码里手动开启事务，手动提交，手动回滚。优点就是可以灵活控制，缺点就是太麻烦了，太多重复的代码了。
    - 声明式事务：就是使用 SpringAop 配置事务，这种方式大大的简化了编码。需要注意的是切入点表达式一定要写正确。
    - 注解事务：直接在 Service 层的方法上面加上@Transactional 注解，个人比较喜欢用这种方式。

2.  事务回滚的原因

    在工作中，看过别人写的代码出现了事务不回滚的现象。当然，事务不回滚的都是采用的声明式事务或者是注解事务；编程式事务都是自己写代码手动回滚的，因此是不会出现不回滚的现象。

    再说下声明式事务和注解事务回滚的原理：当被切面切中或者是加了注解的方法中抛出了 RuntimeException 异常时，Spring 会进行事务回滚。默认情况下是捕获到方法的 RuntimeException 异常，也就是说抛出只要属于运行时的异常（即 RuntimeException 及其子类）都能回滚；但当抛出一个不属于运行时异常时，事务是不会回滚的。

    下面说说我经常见到的 3 种事务不回滚的产生原因：

    - （1）声明式事务配置切入点表达式写错了，没切中 Service 中的方法
    - （2）Service 方法中，把异常给 try catch 了，但 catch 里面只是打印了异常信息，没有手动抛出 RuntimeException 异常
    - （3）Service 方法中，抛出的异常不属于运行时异常（如 IO 异常），因为 Spring 默认情况下是捕获到运行时异常就回滚

3.  如何保证事务回滚

    正常情况下，按照正确的编码是不会出现事务回滚失败的。下面说几点保证事务能回滚的方法

    - （1）如果采用声明式事务，一定要确保切入点表达式书写正确
    - （2）如果 Service 层会抛出不属于运行时异常也要能回滚，那么可以将 Spring 默认的回滚时的异常修改为 Exception，这样就可以保证碰到什么异常都可以回滚。具体的设置方式也说下。

      - 声明式事务，在配置里面添加一个 rollback-for，代码如下

        ```xml
        <tx:method name="update*" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
        ```

      - 注解事务，直接在注解上面指定，代码如下

        ```java
        @Transactional(rollbackFor=Exception.class)
        ```

    - （3）只有非只读事务才能回滚的，只读事务是不会回滚的
    - （4）如果在 Service 层用了 try catch，在 catch 里面再抛出一个 RuntimeException 异常，这样出了异常才会回滚
    - （5）如果你不喜欢（4）的方式，你还可以直接在 catch 后面写一句回滚代码**TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();**来实现回滚，这样的话，就可以在抛异常后也能 return 返回值；比较适合需要拿到 Service 层的返回值的场景。具体的用法可以参见考下面的伪代码

```
/** TransactionAspectSupport手动回滚事务：*/
@Transactional(rollbackFor = { Exception.class })
public boolean test() {
    try {
        doDbSomeThing();
    } catch (Exception e) {
        e.printStackTrace();
        //就是这一句了, 加上之后抛了异常就能回滚（有这句代码就不需要再手动抛出运行时异常了）
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        return false;
    }
    return true;
}
```

_**几点注意事项:**_

_**1.接口中 A、B 两个方法，A 无@Transactional 标签，B 有，上层通过 A 间接调用 B，此时事务不生效**_

_**2.接口中异常（运行时异常）被捕获而没有被抛出。默认配置下，spring 只有在抛出的异常为运行时 unchecked 异常时才回滚该事务，也就是抛出的异常为 RuntimeException 的子类(Errors 也会导致事务回滚)，而抛出 checked 异常则不会导致事务回滚 。可通过 @Transactional rollbackFor 进行配置。**_

_**3.多线程下事务管理因为线程不属于 spring 托管，故线程不能够默认使用 spring 的事务,也不能获取 spring 注入的 bean 。在被 spring 声明式事务管理的方法内开启多线程，多线程内的方法不被事务控制。 一个使用了@Transactional 的方法，如果方法内包含多线程的使用，方法内部出现异常，不会回滚线程中调用方法的事务。**_

_**4.在@Transactional 注解中如果不配置 rollbackFor 属性,那么事物只会在遇到 RuntimeException 的时候才会回滚,加上 rollbackFor=Exception.class,可以让事物在遇到非运行时异常时也回滚**_

[原文链接](https://www.cnblogs.com/zeng1994/p/8257763.html)