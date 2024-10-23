---
title: OAuth 2.0 第三方登录
categories:
  - Dev
  - OAuth2.0
tags:
  - Dev
  - OAuth2.0
  - OAuth 2.0 第三方登录
cover: 'https://www.loliapi.com/acg/?uuid=14380'
abbrlink: 14380
date: 2023-05-09 09:04:44
---
# OAuth简介

## OAuth2.0介绍

### 介绍

OAuth协议：https://www.rfc-editor.org/rfc/rfc6749

OAuth（Open Authorization）是一个关于授权（authorization）的开放网络标准，允许用户授权第三方 应用访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方移动应用或分享他 们数据的所有内容。OAuth在全世界得到广泛应用，目前的版本是2.0版。

协议特点：

* 简单： 不管是OAuth服务提供者还是应用开发者，都很易于理解与使用；
* 安全： 没有涉及到用户密钥等信息，更安全更灵活；
* 开放： 任何服务提供商都可以实现OAuth，任何软件开发商都可以使用OAuth；

### 应用场景

* 原生app授权： app登录请求后台接口，为了安全认证，所有请求都带token信息，如果登录验证、 请求后台数据
* 前后端分离单页面应用： 前后端分离框架，前端请求后台数据，需要进行oauth2安全认证
* 第三方应用授权登录： 比如QQ，微博，微信的授权登录

![认证步骤](https://s2.loli.net/2023/05/10/LVK6NaplUntM9Ss.png)

### 基本概念

OAuth的作用就是让"客户端"安全可控地获取"用户"的授权，与"服务提供商"进行交互
* Resource owner（资源拥有者）：拥有该资源的最终用户，他有访问资源的账号密码；
* Resource server（资源服务器）：受保护资源所在的服务器，如果请求包含正确的访问令牌，就可以访问受保护的资源；
* Client（客户端）：请求访问资源的客户端，可以是浏览器、移动设备或者服务器，客户端会携带访问令牌访问资源服务器上的资源；
* Authorization server（认证服务器）：负责认证客户端身份的服务器，如果客户端认证通过，会给客户端发放访问资源服务器的令牌。

### 优缺点

优点

* 更安全，客户端不接触用户密码，服务器端更易集中保护
* 广泛传播并被持续采用
* 短寿命和封装的token
* 资源服务器和授权服务器解耦
* 集中式授权，简化客户端
* HTTP/JSON友好，易于请求和传递token
* 考虑多种客户端架构场景
* 客户可以具有不同的信任级别

缺点

* 协议框架太宽泛，造成各种实现的兼容性和互操作性差
* 不是一个认证协议，本身并不能告诉你任何用户信息

## OAuth授权模式

### 四种授权模式

不管哪一种授权方式，第三方应用申请令牌之前，都必须先到系统备案，说明自己的身份，然后会拿到两个身份识别码：客户端 ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的

* Authorization Code（授权码模式）：正宗的OAuth2的授权模式，客户端先将用户导向认证服务器，认证用户成功后获取授权码，然后进行授权，最后根据授权码获取访问令牌；
* Implicit（隐藏式）：和授权码模式相比，取消了获取授权码的过程，直接获取访问令牌；
* Password（密码模式）：客户端直接向用户获取用户名和密码，之后向认证服务器获取访问令牌；
* Client Credentials（客户端凭证模式）：客户端直接通过客户端认证（比如client_id和client_secret）从认证服务器获取访问令牌。

一般来说，授权码模式和密码模式是两种常用的授权模式

### 授权码模式

指应用先申请一个授权码，然后再用这个授权码获取令牌

流程：

* 客户端将用户导向认证服务器的授权页面;
* 用户在认证服务器页面登录并授权；
* 认证服务器返回授权码给客户端；
* 客户端将授权码传递给客户端所在的后端服务（也可以是自己的认证服务器），由后端服务在后端请求认证服务器获取令牌，并返回给客户端。

### 密码模式

如果用户信任应用，应用可以直接携带用户的用户名和密码，直接申请令牌

流程：

* 客户端要求用户提供用户名和密码；
* 客户端携带用户名和密码，访问授权服务器；
* 授权服务器验证用户身份之后，直接返回令牌。

# 二、三方授权登录

## 需求介绍

自研应用需要扩展时，绕不开的就是集成其他社交软件的三方登录，比如微信/QQ/微博/Github等等，而这用到的模式属于OAuth的授权码方式授权，下面我就介绍几种三方授权登录教程，同时给予数据库扩展设计思路

## 第三方授权登录数据库设计

第三方授权登录的时候，第三方的用户信息是存数据库原有的 user 表还是新建一张表呢 ？答案得看具体项目。三方授权登录之后，第三方用户信息一般都会返回用户唯一的标志 `openid` 或者 `unionid` 或者 id，具体是什么得看第三方，比如 github 的是 id

### 直接通过注册的方式保存到数据库

如果网站没有注册功能的，直接通过第三方授权登录，授权成功之后，可以直接把第三的用户信息注册保存到自己数据库的 user 表里面。典型的例子就是微信公众号的授权登录。

如果网站有注册功能的，也可以通过第三方授权登录，授权成功之后，也可以直接把第三的用户信息注册保存到自己数据库的 user 表里面（但是密码是后端自动生成的，用户也不知道，只能用第三方授权登录），这样子的第三方的用户和原生注册的用户信息都在同一张表了，这种情况得看自己项目的具体情况。

### 增加映射表

现实中很多网站都有多种账户登录方式，比如可以用网站的注册 id 登录，还可以用手机号登录，可以用 QQ 登录等等。数据库中都是有映射关系，QQ、手机号等都是映射在网站的注册 id 上。保证不管用什么方式登录，只要去查映射关系，发现是映射在网站注册的哪个 id 上，就让哪个 id 登录成功。

### 建立一个 oauth 表

建立一个 oauth 表，一个 id 列，记录对应的用户注册表的 id，然后你有多少个第三方登陆功能，你就建立多少列，记录第三方登陆接口返回的 openid；第三方登陆的时候，通过这个表的记录的 openid 获取 id 信息，如果存在通过 id 读取注册表然后用 session 记录相关信息。不存在就转向用户登陆/注册界面要用户输入本站注册的账户进行 openid 绑定或者新注册账户信息进行绑定。

## 数据库实战举例

* 用户表分为用户基础信息表 + 用户授权信息表；
* 所有和授权相关，都放在用户信息授权表，用户信息表和用户授权表是一对多的关系

用户基础信息表

![用户基础信息表](https://s2.loli.net/2023/05/10/Mt3EAq9DB1JaHdZ.png)

用户授权信息表

![用户授权信息表](https://s2.loli.net/2023/05/10/Fex7oUvMXwJRtzT.png)

# GitHub 登录

## 概述

文档：https://docs.github.com/cn/developers/apps/building-oauth-apps/creating-an-oauth-app

Github的OAuth 授权原理大致如下

* A网站让用户跳转到 GitHub
* GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意"
* 用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码
* A 网站使用授权码，向 GitHub 请求令牌
* GitHub 返回令牌
* A 网站使用令牌，向 GitHub 请求用户数据

![流程示意](https://s2.loli.net/2023/05/10/R8gaobmxlfcrI73.png)

## 应用登记

一个应用要求 OAuth 授权，必须先到对方网站登记，让对方知道是谁在请求，所以要先去 GitHub 登记一下（免费）。GitHub的文档

首先访问Authorized OAuth App，填写登记表进行创建（进入 Github 的 Setting 页面，点击 Developer settings，选择OAuth Apps，选择new OAuth App）

![应用注册](https://s2.loli.net/2023/05/10/iU6ZDjT7HPv5enV.png)

注意回调地址要与我们待会写的接口地址匹配，否则会报错，进入应用后就能看见我们应用了，secrets没有的话可以生成，注意保存

* Client ID
* Client secrets

## Github授权登录原理

### 请求用户的 GitHub 身份

它会提示用户使用他们可以用于登录和授权您的应用程序的特定帐户

```shell
GET https://github.com/login/oauth/authorize
```

![参数说明](https://s2.loli.net/2023/05/10/RgrleDdjsbPpfM9.png)

### 用户被 GitHub 重定向回站点

如果用户接受您的请求，GitHub 将重定向回您的站点，其中包含一个临时code的代码参数以及您在上一步中提供的state参数状态。临时代码将在 10 分钟后过期。如果状态不匹配，则第三方创建了请求，您应该中止该过程。

也就是重回到我们的站点，也就是发送了`http://localhost:8080/oauth/githubCallback(自定义)`，并且携带了code将此交换code为访问令牌OAUTH-TOKEN

```shell
POST https://github.com/login/oauth/access_token
```

![参数说明](https://s2.loli.net/2023/05/10/rhxk3RvTmH4aAKN.png)

### 使用访问令牌访问API

访问令牌允许代表用户向 API 发出请求，获取用户的基本信息

```shell
Authorization: token OAUTH-TOKEN
GET https://api.github.com/user
```

## 代码实战

### 配置环境

引入依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>2.0.7</version>
</dependency>
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.4</version>
</dependency>
```

配置application.yml

```yml
github:
  clientId: ab3d67630b13025715cf
  clientSecret: 29f8c274c7634aa988f42c6507692da4fe118be8
  directUrl: http://localhost:8080/oauth/githubCallback

server:
  port: 8080
```

### 配置bean类

```java
@Data
@Component
@ConfigurationProperties(prefix = "github")
public class GitHubOAuthInfo {

    private String clientId;

    private String clientSecret;

    private String directUrl;
}
```

### 配置state工具类

```java
@Service
public class OauthService {

    private Set<String> stateSet = new HashSet<>();

    /**
     * 生成随机state字符串，这里可以存入Redis或者Set，返回时进行校验，不过要注意失效时间
    */
    public String genState(){
        String state = UUID.randomUUID().toString();
        stateSet.add(state);
        return state;
    }

    /**
     * 校验state，防止CSRF
     * 校验成功后删除
    */
    public boolean checkState(String state){
        if(stateSet.contains(state)){
            stateSet.remove(state);
            return true;
        }
        return false;
    }


}
```

### 认证与授权

```java
@RestController
@Slf4j
@RequestMapping("/oauth")
public class AuthController {

    @Autowired
    private GitHubOAuthInfo gitHubOAuthInfo;

    @Autowired
    private OauthService oauthService;

    /**
     * Github认证令牌服务器地址
     */
    private static final String ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

    /**
     * Github认证服务器地址
    */
    private static final String AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

    /**
     * Github资源服务器地址
     */
    private static final String RESOURCE_URL = "https://api.github.com/user";



    /**
     * 前端获取认证的URL，由后端拼接好返回前端进行请求
    */
    @GetMapping("/githubLogin")
    public void githubLogin(HttpServletResponse response) throws IOException {

        // 生成并保存state，忽略该参数有可能导致CSRF攻击
        String state = oauthService.genState();
        // 传递参数response_type、client_id、state、redirect_uri
        String param = "response_type=code&" + "client_id=" + gitHubOAuthInfo.getClientId() + "&state=" + state
                + "&redirect_uri=" + gitHubOAuthInfo.getDirectUrl();

        // 1、请求Github认证服务器
        response.sendRedirect(AUTHORIZE_URL + "?" + param);
    }

    /**
     * GitHub回调方法
     *  code 授权码
     * state 应与发送时一致，防止CSRF攻击
     */
    @GetMapping("/githubCallback")
    public String githubCallback(String code, String state, HttpServletResponse response) throws Exception {
        // 验证state，如果不一致，可能被CSRF攻击
        if(!oauthService.checkState(state)) {
            throw new Exception("State验证失败");
        }

        // 设置JSONObject请求体
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("client_id",gitHubOAuthInfo.getClientId());
        jsonObject.put("client_secret",gitHubOAuthInfo.getClientSecret());
        jsonObject.put("code",code);

        String accessTokenRequestJson = null;
        try{
            long start = System.currentTimeMillis();
            // 请求accessToken，成功获取到后进行下一步信息获取,这里第一次可能会超时
            accessTokenRequestJson = HttpRequest.post(ACCESS_TOKEN_URL)
                    .header("Accept"," application/json")
                    .body(jsonObject.toJSONString())
                    .timeout(30000)
                    .execute().body();
            log.info("请求令牌耗时：{}",System.currentTimeMillis()-start);
        }catch (Exception e){
            log.error("请求令牌API访问异常，异常原因：",e);
            throw new Exception(e);
        }

        log.info("获取到的accessToken为：{}",accessTokenRequestJson);

        JSONObject accessTokenObject = JSONObject.parseObject(accessTokenRequestJson);
        // 如果返回的数据包含error，表示失败，错误原因存储在error_description
        if(accessTokenObject.containsKey("error")) {
            log.error("错误，原因：{}",accessTokenRequestJson);
            throw  new Exception("error_description，令牌获取错误");
        }
        // 如果返回结果中包含access_token，表示成功
        if(!accessTokenObject.containsKey("access_token")) {
            throw  new Exception("获取token失败");
        }

        // 得到token和token_type
        String accessToken = (String) accessTokenObject.get("access_token");
        String tokenType = (String) accessTokenObject.get("token_type");
        String userInfo = null;
        try{
            long start = System.currentTimeMillis();
            // 请求资源服务器获取个人信息
            userInfo = HttpRequest.get(RESOURCE_URL)
                    .header("Authorization", tokenType + " " + accessToken)
                    .timeout(5000)
                    .execute().body();
            log.info("请求令牌耗时：{}",System.currentTimeMillis()-start);
        }catch (Exception e){
            log.error("请求令牌API访问异常，异常原因：",e);
            throw new Exception(e);
        }

        JSONObject userInfoJson = JSONObject.parseObject(userInfo);
        return userInfoJson.toJSONString();
    }

}
```

最后浏览器访问http://localhost:8080/oauth/githubLogin，即可进入用户授权状态，授权后会进行跳转，自动获取用户的基本信息，后面可以和数据库联动

# QQ登录

## 概述

官方参考文档：https://wiki.connect.qq.com/oauth2-0简介

大体和Github登录类似，QQ登录OAuth2.0总体处理流程如下

* 申请接入，获取appid和apikey；
* 开发应用，并设置协作者帐号进行测试联调；
* 放置QQ登录按钮；
* 通过用户登录验证和授权，获取Access Token；
* 通过Access Token获取用户的OpenID；
* 调用OpenAPI，来请求访问或修改用户授权的资源。

## 应用创建
首先没有注册的开发者需要先注册并实名，去开发者平台注册并实名，认证通过后进入QQ 互联管理中心，创建一个网站应用新应用（需要先审核个人身份），然后注册应用信息，和 GitHub 的步骤类似

注册后，可以看到应用的 APP ID、APP Key，以及被允许的接口，当然只有一个获取用户信息

## QQ授权登录原理

参考：https://wiki.connect.qq.com/准备工作_oauth2-0

![原理示意图](https://s2.loli.net/2023/05/10/LlNQYbG9DAStOky.png)

### 获取Authorization Code

打开浏览器，访问如下地址（请将client_id，redirect_uri，scope等参数值替换为你自己的）

```shell
GET https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=[YOUR_APPID]&redirect_uri=[YOUR_REDIRECT_URI]&scope=[THE_SCOPE]
```

如果用户点击 “授权并登录”，则成功跳转到指定的redirect_uri，并跟上Authorization Code（注意此code会在10分钟内过期）

### 通过Authorization Code获取Access Token

获取到的access token具有30天有效期，用户再次登录时自动刷新，第三方网站可存储access token信息，以便后续调用OpenAPI访问和修改用户信息时使用

```shell
GET https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=[YOUR_APP_ID]&client_secret=[YOUR_APP_Key]&code=[The_AUTHORIZATION_CODE]&redirect_uri=[YOUR_REDIRECT_URI]
```

### 使用Access Token获取用户信息

发送请求到如下地址，获取用户的OpenID

```shell
GET https://graph.qq.com/oauth2.0/me?access_token=YOUR_ACCESS_TOKEN
```

使用Access Token以及OpenID来访问和修改用户数据，建议网站在用户登录后，即调用get_user_info接口，获得该用户的头像、昵称并显示在网站上，使用户体验统一。

```shell
GET https://graph.qq.com/user/get_user_info?access_token=YOUR_ACCESS_TOKEN&oauth_consumer_key=YOUR_APP_ID&openid=YOUR_OPENID
```

## 代码实战

### 配置环境

依赖和上面一样，主要配置yml配置文件

```yml
qq:
  qqAppId: 101474821
  qqAppKey: 00d91cc7f636d71faac8629d559f9fee
  directUrl: http://localhost:8080/oauth/qqCallback
```

### 配置bean类与工具类

```java
@Data
@Component
@ConfigurationProperties(prefix = "qq")
public class QqOAuthInfo {

    private String qqAppId;

    private String qqAppKey;

    private String directUrl;
}
```

### 认证与授权

qq的比较麻烦，需要实名认证，创建应用也需要备案域名等

```java
@RestController
@Slf4j
@RequestMapping("/oauth")
public class QqAuthController {

    @Autowired
    private QqOAuthInfo qqOAuthInfo;

    @Autowired
    private OauthService oauthService;

    /**
     * QQ认证服务器地址
     */
    private static final String AUTHORIZE_URL = "https://graph.qq.com/oauth2.0/authorize";

    /**
     * QQ认证令牌服务器地址
     */
    private static final String ACCESS_TOKEN_URL = "https://graph.qq.com/oauth2.0/token";

    /**
     * QQ的openId Url
     */
    private static final String OPEN_ID_URL = "https://graph.qq.com/oauth2.0/me";

    /**
     * QQ的用户数据URL
     */
    private static final String USER_INFO_URL = "https://graph.qq.com/user/get_user_info";

    /**
     * 前端获取认证的URL，由后端拼接好返回前端进行请求
     */
    @GetMapping("/qqLogin")
    public void githubLogin(HttpServletResponse response) throws IOException {

        // 生成并保存state，忽略该参数有可能导致CSRF攻击
        String state = oauthService.genState();
        // 传递参数response_type、client_id、state、redirect_uri
        String param = "response_type=code&" + "client_id=" + qqOAuthInfo.getQqAppId() + "&state=" + state
                + "&redirect_uri=" + qqOAuthInfo.getDirectUrl();

        System.out.println(AUTHORIZE_URL + "?" + param);
        // 请求QQ认证服务器
        response.sendRedirect(AUTHORIZE_URL + "?" + param);
    }

    /**
     * QQ回调方法
     * code 授权码
     * state 应与发送时一致
     */
    @GetMapping("/qqCallback")
    public String githubCallback(String code, String state, HttpServletResponse response) throws Exception {
        // 验证state，如果不一致，可能被CSRF攻击
        if(!oauthService.checkState(state)) {
            throw new Exception("State验证失败");
        }

        // 设置请求参数，fmt参数因历史原因，默认是x-www-form-urlencoded格式，如果填写json，则返回json格式
        String param = "grant_type=authorization_code&code=" + code + "&redirect_uri=" +
                qqOAuthInfo.getDirectUrl() + "&client_id=" + qqOAuthInfo.getQqAppId() +
                "&client_secret=" + qqOAuthInfo.getQqAppKey() + "&fmt=json";


        String accessTokenRequestJson = null;
        try{
            long start = System.currentTimeMillis();
            // 请求accessToken，成功获取到后进行下一步信息获取,这里第一次可能会超时
            accessTokenRequestJson = HttpRequest.get(ACCESS_TOKEN_URL)
                    .body(param)
                    .timeout(30000)
                    .execute().body();
            log.info("请求令牌耗时：{}",System.currentTimeMillis()-start);
        }catch (Exception e){
            log.error("请求令牌API访问异常，异常原因：",e);
            throw new Exception(e);
        }
        /**
         * result示例：
         * 成功：access_token=A24B37194E89A0DDF8DDFA7EF8D3E4F8&expires_in=7776000&refresh_token=BD36DADB0FE7B910B4C8BBE1A41F6783
         */
        log.info("获取到的accessToken为：{}",accessTokenRequestJson);

        JSONObject accessTokenObject = JSONObject.parseObject(accessTokenRequestJson);
        // 如果返回的数据包含error，表示失败，错误原因存储在error_description
        if(accessTokenObject.containsKey("error")) {
            log.error("错误，原因：{}",accessTokenRequestJson);
            throw  new Exception("error_description，令牌获取错误");
        }
        // 如果返回结果中包含access_token，表示成功
        if(!accessTokenObject.containsKey("access_token")) {
            throw  new Exception("获取token失败");
        }

        // 得到token和token_type
        String accessToken = (String) accessTokenObject.get("access_token");
        String meParams = "access_token=" + accessToken;
        String meBody = null;
        try{
            long start = System.currentTimeMillis();
            // 请求accessToken，成功获取到后进行下一步信息获取,这里第一次可能会超时
            meBody = HttpRequest.get(OPEN_ID_URL)
                    .body(meParams)
                    .execute().body();
            log.info("请求令牌耗时：{}",System.currentTimeMillis()-start);
        }catch (Exception e){
            log.error("openId访问异常，异常原因：",e);
            throw new Exception(e);
        }

        // 成功返回如下：callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
        JSONObject meJsonObject = JSONObject.parseObject(meBody);
        // 取出openid
        String openid = meJsonObject.getString("openid");

        // 使用Access Token以及OpenID来访问和修改用户数据
        String userInfoParam = "access_token=" + accessToken + "&oauth_consumer_key=" + qqOAuthInfo.getQqAppId() + "&openid=" + openid;
        String userInfo = null;
        try{
            long start = System.currentTimeMillis();
            // 请求accessToken，成功获取到后进行下一步信息获取,这里第一次可能会超时
            userInfo = HttpRequest.get(USER_INFO_URL)
                    .body(userInfoParam)
                    .timeout(5000)
                    .execute().body();
            log.info("请求令牌耗时：{}",System.currentTimeMillis()-start);
        }catch (Exception e){
            log.error("用户数据访问异常，异常原因：",e);
            throw new Exception(e);
        }

        JSONObject userInfoJson = JSONObject.parseObject(userInfo);

        return userInfoJson.toJSONString();
    }
}
```

# 微信登录

官方文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html

***
来源：https://blog.csdn.net/lemon_TT/article/details/127500409



