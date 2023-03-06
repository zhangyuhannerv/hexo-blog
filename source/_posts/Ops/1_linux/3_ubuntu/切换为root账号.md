---
title: '切换为root账号'
date: 2023-03-06 15:47:44
copyright_info: The copyright of this article is owned by Zhang Yuhan, and it follows the CC BY-NC-SA 4.0 agreement. For reprinting, please attach the original source link and this statement
categories: 
  - 'Ops'
  - 'linux'
  - 'ubuntu'
tags: 
  - 'Ops'
  - 'linux'
  - 'ubuntu'
  - '切换为root账号'
---
-   Ubuntu的默认root密码是随机的，即每次开机都有一个新的root密码。可以在终端输入命令 sudo passwd，然后输入当前用户的密码，回车.
    
-   终端会提示输入新的密码并确认，此时的密码就是root新密码。修改成功后，输入命令 su root，再输入新的密码就成功切换到root帐号了
