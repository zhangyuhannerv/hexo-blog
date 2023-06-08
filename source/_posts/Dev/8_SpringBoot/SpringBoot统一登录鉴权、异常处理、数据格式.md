---
title: SpringBoot统一登录鉴权、异常处理、数据格式
categories:
  - Dev
  - SpringBoot
tags:
  - Dev
  - SpringBoot
  - SpringBoot统一登录鉴权、异常处理、数据格式
abbrlink: 39078
cover: https://sex.nyan.xyz/api/v2/img?uuid=39078
date: 2023-04-14 15:47:44
---

本篇将要学习 Spring Boot 统一功能处理模块，这也是 AOP 的实战环节
* 用户登录权限的校验实现接口 HandlerInterceptor + WebMvcConfigurer
* 异常处理使用注解 @RestControllerAdvice + @ExceptionHandler
* 数据格式返回使用注解 @ControllerAdvice 并且实现接口 @ResponseBodyAdvice

# 统一用户登录权限效验

用户登录权限的发展完善过程
最初用户登录效验：在每个方法中获取 Session 和 Session 中的用户信息，如果存在用户，那么就认为登录成功了，否则就登录失败了
第二版用户登录效验：提供统一的方法，在每个需要验证的方法中调用统一的用户登录身份效验方法来判断
第三版用户登录效验：使用 Spring AOP 来统一进行用户登录效验
第四版用户登录效验：使用 Spring 拦截器来实现用户的统一登录验证

## 最初用户登录权限效验

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/a1")
    public Boolean login (HttpServletRequest request) {
        // 有 Session 就获取，没有就不创建
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userinfo") != null) {
            // 说明已经登录，进行业务处理
            return true;
        } else {
            // 未登录
            return false;
        }
    }

    @RequestMapping("/a2")
    public Boolean login2 (HttpServletRequest request) {
        // 有 Session 就获取，没有就不创建
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userinfo") != null) {
            // 说明已经登录，进行业务处理
            return true;
        } else {
            // 未登录
            return false;
        }
    }
}
```

这种方式写的代码，每个方法中都有相同的用户登录验证权限，缺点是：  
每个方法中都要单独写用户登录验证的方法，即使封装成公共方法，也一样要传参调用和在方法中进行判断  
添加控制器越多，调用用户登录验证的方法也越多，这样就增加了后期的修改成功和维护成功  
这些用户登录验证的方法和现在要实现的业务几乎没有任何关联，但还是要在每个方法中都要写一遍，所以提供一个公共的 AOP 方法来进行统一的用户登录权限验证是非常好的解决办法。

## Spring AOP 统一用户登录验证

统一用户登录验证，首先想到的实现方法是使用 Spring AOP 前置通知或环绕通知来实现

```java
@Aspect // 当前类是一个切面
@Component
public class UserAspect {
    // 定义切点方法 Controller 包下、子孙包下所有类的所有方法
    @Pointcut("execution(* com.example.springaop.controller..*.*(..))")
    public void  pointcut(){}
    
    // 前置通知
    @Before("pointcut()")
    public void doBefore() {}
    
    // 环绕通知
    @Around("pointcut()")
    public Object doAround(ProceedingJoinPoint joinPoint) {
        Object obj = null;
        System.out.println("Around 方法开始执行");
        try {
            obj = joinPoint.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        System.out.println("Around 方法结束执行");
        return obj;
    }
}
```

但如果只在以上代码 Spring AOP 的切面中实现用户登录权限效验的功能，有这样两个问题：
没有办法得到 HttpSession 和 Request 对象
我们要对一部分方法进行拦截，而另一部分方法不拦截，比如注册方法和登录方法是不拦截的，也就是实际的拦截规则很复杂，使用简单的 aspectJ 表达式无法满足拦截的需求

## Spring 拦截器

针对上面代码 Spring AOP 的问题，Spring 中提供了具体的实现拦截器：HandlerInterceptor，拦截器的实现有两步：
1. 创建自定义拦截器，实现 Spring 中的 HandlerInterceptor 接口中的 preHandle方法
2. 将自定义拦截器加入到框架的配置中，并且设置拦截规则
    给当前的类添加 @Configuration 注解  
    实现 WebMvcConfigurer 接口  
    重写 addInterceptors 方法  
    注意：一个项目中可以同时配置多个拦截器  
    1. 创建自定义拦截器
  
        ```java
        /**
         * @Description: 自定义用户登录的拦截器
        * @Date 2023/2/13 13:06
        */
        @Component
        public class LoginIntercept implements HandlerInterceptor {
            // 返回 true 表示拦截判断通过，可以访问后面的接口
            // 返回 false 表示拦截未通过，直接返回结果给前端
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                                    Object handler) throws Exception {
                // 1.得到 HttpSession 对象
                HttpSession session = request.getSession(false);
                if (session != null && session.getAttribute("userinfo") != null) {
                    // 表示已经登录
                    return true;
                }
                // 执行到此代码表示未登录，未登录就跳转到登录页面
                response.sendRedirect("/login.html");
                return false;
            }
        }
        ```

      2. 将自定义拦截器添加到系统配置中，并设置拦截的规则
          addPathPatterns：表示需要拦截的 URL，**表示拦截所有⽅法  
          excludePathPatterns：表示需要排除的 URL  
          说明：拦截规则可以拦截此项⽬中的使⽤ URL，包括静态⽂件（图⽚⽂件、JS 和 CSS 等⽂件）。
          ```java
          /**
           * @Description: 将自定义拦截器添加到系统配置中，并设置拦截的规则
          * @Date 2023/2/13 13:13
          */
          @Configuration
          public class AppConfig implements WebMvcConfigurer {

              @Resource
              private LoginIntercept loginIntercept;

              @Override
              public void addInterceptors(InterceptorRegistry registry) {
          //        registry.addInterceptor(new LoginIntercept());//可以直接new 也可以属性注入
                  registry.addInterceptor(loginIntercept).
                          addPathPatterns("/**").    // 拦截所有 url
                          excludePathPatterns("/user/login"). //不拦截登录注册接口
                          excludePathPatterns("/user/reg").
                          excludePathPatterns("/login.html").
                          excludePathPatterns("/reg.html").
                          excludePathPatterns("/**/*.js").
                          excludePathPatterns("/**/*.css").
                          excludePathPatterns("/**/*.png").
                          excludePathPatterns("/**/*.jpg");
              }
          }
          ```
## 练习：登录拦截器

要求登录、注册页面不拦截，其他页面都拦截  
当登录成功写入 session 之后，拦截的页面可正常访问  
在 1.3 中已经创建了自定义拦截器 和 将自定义拦截器添加到系统配置中，并设置拦截的规则
1. 下面创建登录和首页的 html
2. 创建 controller 包，在包中创建 UserController，写登录页面和首页的业务代码
    ```java
    @RestController
    @RequestMapping("/user")
    public class UserController {

        @RequestMapping("/login")
        public boolean login(HttpServletRequest request,String username, String password) {
            boolean result = false;
            if (StringUtils.hasLength(username) && StringUtils.hasLength(password)) {
                if(username.equals("admin") && password.equals("admin")) {
                    HttpSession session = request.getSession();
                    session.setAttribute("userinfo","userinfo");
                    return true;
                }
            }
            return result;
        }

        @RequestMapping("/index")
        public String index() {
            return "Hello Index";
        }
    }
    ```
3. 运行程序，访问页面，对比登录前和登录后的效果

## 拦截器实现原理

有了拦截器之后，会在调⽤ Controller 之前进⾏相应的业务处理  

实现原理源码分析  
所有的 Controller 执行都会通过一个调度器 DispatcherServlet 来实现
而所有方法都会执行 DispatcherServlet 中的 doDispatch 调度⽅法。

通过源码分析，可以看出，Sping 中的拦截器也是通过动态代理和环绕通知的思想实现的
##  统一访问前缀添加

所有请求地址添加 api 前缀，c 表示所有
```java
@Configuration
public class AppConfig implements WebMvcConfigurer {
    // 所有的接口添加 api 前缀
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("api", c -> true);
    }
}
```

# 统一异常处理

给当前的类上加 @ControllerAdvice 表示控制器通知类
给方法上添加 @ExceptionHandler(xxx.class)，表示异常处理器，添加异常返回的业务代码
```java
@RestController
@RequestMapping("/user")
public class UserController {
    @RequestMapping("/index")
    public String index() {
        int num = 10/0;
        return "Hello Index";
    }
}
```
在 config 包中，创建 MyExceptionAdvice 类
```java
@RestControllerAdvice // 当前是针对 Controller 的通知类（增强类）
public class MyExceptionAdvice {
    @ExceptionHandler(ArithmeticException.class)
    public HashMap<String,Object> arithmeticExceptionAdvice(ArithmeticException e) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("state",-1);
        result.put("data",null);
        result.put("msg" , "算出异常："+ e.getMessage());
        return result;
    }
}
```
也可以这样写，效果是一样的
```java
@ControllerAdvice
public class MyExceptionAdvice {
    @ExceptionHandler(ArithmeticException.class)
    @ResponseBody
    public HashMap<String,Object> arithmeticExceptionAdvice(ArithmeticException e) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("state",-1);
        result.put("data",null);
        result.put("msg" , "算数异常："+ e.getMessage());
        return result;
    }
}
```

如果再有一个空指针异常，那么上面的代码是不行的，还要写一个针对空指针异常处理器
```java
@ExceptionHandler(NullPointerException.class)
public HashMap<String,Object> nullPointerExceptionAdvice(NullPointerException e) {
    HashMap<String, Object> result = new HashMap<>();
    result.put("state",-1);
    result.put("data",null);
    result.put("msg" , "空指针异常异常："+ e.getMessage());
    return result;
}
@RequestMapping("/index")
public String index(HttpServletRequest request,String username, String password) {
    Object obj = null;
    System.out.println(obj.hashCode());
    return "Hello Index";
}
```

但是需要考虑的一点是，如果每个异常都这样写，那么工作量是非常大的，并且还有自定义异常，所以上面这样写肯定是不好的，既然是异常直接写 Exception 就好了，它是所有异常的父类，如果遇到不是前面写的两种异常，那么就会直接匹配到 Exception
当有多个异常通知时，匹配顺序为当前类及其⼦类向上依次匹配
```java
@ExceptionHandler(Exception.class)
public HashMap<String,Object> exceptionAdvice(Exception e) {
    HashMap<String, Object> result = new HashMap<>();
    result.put("state",-1);
    result.put("data",null);
    result.put("msg" , "异常："+ e.getMessage());
    return result;
}
```
可以看到优先匹配的还是前面写的 空指针异常
# 统一数据格式返回

## 统一数据格式返回的实现

1. 给当前类添加 @ControllerAdvice
2. 实现 ResponseBodyAdvice 重写其方法
supports 方法，此方法表示内容是否需要重写（通过此⽅法可以选择性部分控制器和方法进行重写），如果要重写返回 true
beforeBodyWrite 方法，方法返回之前调用此方法
```java
@ControllerAdvice
public class MyResponseAdvice implements ResponseBodyAdvice {

    // 返回一个 boolean 值，true 表示返回数据之前对数据进行重写，也就是会进入 beforeBodyWrite 方法
    // 返回 false 表示对结果不进行任何处理，直接返回
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    // 方法返回之前调用此方法
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        HashMap<String,Object> result = new HashMap<>();
        result.put("state",1);
        result.put("data",body);
        result.put("msg","");
        return result;
    }
}
@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/login")
    public boolean login(HttpServletRequest request,String username, String password) {
        boolean result = false;
        if (StringUtils.hasLength(username) && StringUtils.hasLength(password)) {
            if(username.equals("admin") && password.equals("admin")) {
                HttpSession session = request.getSession();
                session.setAttribute("userinfo","userinfo");
                return true;
            }
        }
        return result;
    }

    @RequestMapping("/reg")
    public int reg() {
        return 1;
    }
}
```
