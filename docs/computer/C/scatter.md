# 零碎的知识
!!! abstract
    这里放置一些不成体系的小知识点
    **仍在更新！**

## typeof & define
**只可意会，看下面的例子**
```c
typedef int *PTR;
PTR a,b;
```
此时a,b都是指针变量。
```c
#define PTR int*
 ```
 ```
PTR a,b;
```
此时等同于
```
int *a,b;
```
只有a为指针变量，而b为整型变量。


