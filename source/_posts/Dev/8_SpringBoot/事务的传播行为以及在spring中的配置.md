---
title: '事务的传播行为以及在spring中的配置'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Dev'
  - 'SpringBoot'
tags: 
  - 'Dev'
  - 'SpringBoot'
  - '事务的传播行为以及在spring中的配置'
---
一、什么是事务传播行为？
事务传播行为（propagation behavior）指的就是当一个事务方法被另一个事务方法调用时，这个事务方法应该如何运行。

例如：methodA方法调用methodB方法时，methodB是继续在调用者methodA的事务中运行呢，还是为自己开启一个新事务运行，这就是由methodB的事务传播行为决定的。

二、事务的7种传播行为
Spring在TransactionDefinition接口中规定了7种类型的事务传播行为。
事务传播行为是Spring框架独有的事务增强特性。
7种：(required / supports / mandatory / requires_new / not supported / never / nested)

* PROPAGATION_REQUIRED：如果当前没有事务，就创建一个新事务，如果当前存在事务，就加入该事务，这是最常见的选择，也是Spring默认的事务传播行为。(required需要，没有新建，有加入)

* PROPAGATION_SUPPORTS：支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行。（supports支持，有则加入，没有就不管了，非事务运行）

* PROPAGATION_MANDATORY：支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常。（mandatory强制性，有则加入，没有异常）

* PROPAGATION_REQUIRES_NEW：创建新事务，无论当前存不存在事务，都创建新事务。（requires_new需要新的，不管有没有，直接创建新事务）

* PROPAGATION_NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。（not supported不支持事务，存在就挂起）

* PROPAGATION_NEVER：以非事务方式执行，如果当前存在事务，则抛出异常。（never不支持事务，存在就异常）

* PROPAGATION_NESTED：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则按REQUIRED属性执行。（nested存在就在嵌套的执行，没有就找是否存在外面的事务，有则加入，没有则新建）

对事务的要求程度可以从大到小排序：mandatory / supports / required / requires_new / nested / not supported / never

三、实战
1、描述

外围无事务，内部有事务，外围管不着内部

```java
@Test
void test_PROPAGATION_REQUIRED() {
    // add方法 @Transactional(propagation = Propagation.REQUIRED)
    userService.add(user);
    // add方法 @Transactional(propagation = Propagation.REQUIRED)
    userRoleService.add(userRole);
    //抛异常，不影响上面的add方法执行，外部异常不影响内部
    throw new RuntimeException();
}
```

2、描述

外围方法Propagation.REQUIRED
内部方法Propagation.REQUIRED
修饰的内部方法会加入到外围方法的事务中
内部方法和外围方法均属于同一事务，只要一个方法回滚，整个事务均回滚

```java
@Transactional  // 默认Required
@Test
void test_PROPAGATION_REQUIRED() {
    // 增加用户表 Required 加入了外部事务
    userService.add(user);
 
    // 增加用户角色表 Required 加入了外部事务
    userRoleService.add(userRole);
 
    //抛异常 所有都回滚
    throw new RuntimeException();
}
```

3、描述

支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行
外围方法没有开启事务，add方法直接无事务执行

```java
@Test
void test_PROPAGATION_SUPPORTS() {
    // 增加用户表 @Transactional(propagation = Propagation.SUPPORTS)
    userService.add(user);
    // 增加用户角色表 @Transactional(propagation = Propagation.SUPPORTS)
    userRoleService.add(userRole);
    //抛异常，当前无事务，直接无事务执行
    throw new RuntimeException();
}
```

4、描述

外围加入事务，默认Propagation.REQUIRED
内部使用Propagation.SUPPORTS
内部发现有事务，加入，外部异常，内部回滚


5、描述

支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常
外围不存在事务
内部add方法使用@Transactional(propagation = Propagation.MANDATORY)
内部发现当前没事务，直接抛出异常
其他的都同理，就不一一讲了......
————————————————
原文链接：https://blog.csdn.net/qq_38262266/article/details/108709840

***

B为主方法, C子方法, 操作B的是否有事务, 操作C的传播属性 ,这个地方的情况太多,直接在下面表格中的`本文中的解释`部分说明

```java
@Service
@Slf4j
public class Transaction3ServiceImpl implements Transaction3Service {

    @Autowired
    private Transaction4Service transaction4Service;
    
    @Autowired(required = false)
    private StudentMapper mapper;

    @Override
    @Transactional(rollbackFor = Exception.class) //如果不存在事务,注释掉此行来表示
    public void B(){
        mapper.saveStudent(new Student("ZZZDC"));
        transaction4Service.C();
        // int zdc = 1/0; //如发生异常用此替代
    }
}
@Service
@Slf4j
public class Transaction4ServiceImpl implements Transaction4Service {

    @Autowired(required = false)
    private StudentMapper mapper;

    @Override 
    @Transactional(rollbackFor = Exception.class) //传播行为会在这里操作
    public void C() {
        mapper.saveStudent(new Student("ZDDDC"));
        //int zdc = 1/0;  如发生异常用此替代
    }
}
链接：https://juejin.cn/post/7032652904498462751
来源：稀土掘金
```

| 传播行为      | 本文中的解释                                                 |
| ------------- | ------------------------------------------------------------ |
| REQUIRED      | 如果B存在事务,则C加入该事务`(如果发生异常,则BC一起回滚)`;如果B不存在事务,则C创建一个新的事务`(B不回滚,如果C发生异常则只有C部分回滚)` |
| SUPPORTS      | 如果B存在事务,则C加入该事务`(如果发生异常,则BC一起回滚)`;如果B不存在事务,则C以非事务的方式继续运行`(BC任何情况都不回滚)` |
| MANDATORY     | 如果B存在事务,则C加入该事务`(如果发生异常,则一起回滚)`;如果B不存在事务,则C抛出异常.`(C直接报错,无事务B不回滚)` |
| REQUIRES_NEW  | 如果B不存在事务,C重新创建一个新的事务`(无事务B发生异常不回滚,有事C发生异常则C回滚)`;如果B存在事务,C挂起B得事务并重新创建一个新的事务`(这是两个事务,自己部分有异常,则自己部分回滚)` |
| NOT_SUPPORTED | 如果B不存在事务,C以非事务的方式运行`(任何情况都不回滚)`;如果B存在事务,C暂停当前的事务并以非事务的方式运行`(B部分报错,则B部分回滚,C不回滚;非事务C部分报错,则都不会回滚)` |
| NEVER         | 如果B不存在事务,C以非事务的方式运行`(任何情况都不回滚)`,如果B存在事务,C则抛出异常`(C报错,B因为异常回滚)` |
| NESTED        | 和REQUIRED效果一样.                                          |



作者：我也不会呀
链接：https://juejin.cn/post/7032652904498462751
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
