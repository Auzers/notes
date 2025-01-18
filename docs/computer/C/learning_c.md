# C 语言
!!! note ""
    **并非从零开始，并且仍然在更新**<br>
    **如发现有错误欢迎在评论区指正或发送到我的邮箱 1058564630@qq.com**

## 1 指针进阶

```c
int main()
{
    char* p = "hello bit";
    char arr[] = "abcde";
    p = arr;
    printf("%c", *p+2);
    return 0;
}
```

p不是数组名，可以改变指向的地址，打印结果为

>c

------

```c
int main()
{
    char* p = "hello bit";
    char arr[] = "abcde";
    arr = p;
    printf("%c", *p+2);
    return 0;
}
```

会报错，因为arr是**数组名**，不能更改其地址

------

```c
int main()
{
    char* p = "hello bit";
    *p = 'w';

    return 0;
}
```

运行会报错，**常量字符串**不能更改。

由此看这段代码

```c
int main()
{
    char* p1 = "hello";
    char* p2 = "hello";
    char p3[] = "hello";
    char p4[] = "hello";
    if (p1 == p2)
        printf("p1 == p2\n");
    else
        printf("p1 != p2\n");
    if (p3 == p4)
        printf("p3 == p4\n");
    else
        printf("p3 != p4\n");

    return 0;
}
```

运行结果如下：

>**p1 == p2**
>**p3 != p4**

- 对于p1和p2，两份相同的不能更改的常量字符串在内存中你没必要同时存在两份
  所以p1和p2指向**同一块内存空间**
- 对于p3和p4,数组名都不同，开辟了两块**不同的内存空间**各自存放了可改变的字符串，只是恰好存储的内容相等。

------

### 1.1 指针数组（每个元素都是指针）

```c
#include<stdio.h>
int main()
{
    //指针数组
    //数组 - 数组中存放的是指针（地址）
    // int *arr[3];//存放整形指针的数组
    // int a = 10;
    // int b = 20;
    // int c = 30;
    // int *arr[3] = {&a, &b, &c};
    int a[5] = {1,2,3,4,5};
    int b[] = {2,3,4,5,6};
    int c[] = {3,4,5,67,7};
    int *arr[3] = {a, b, c};
    int i, j;
    for (i = 0;i<3;i++)
    {

        for (j = 0;j<5;j++)
        {
            printf("%d ", *(arr[i] + j));//arr[i]中存放的是地址
        }
        printf("\n");
    }
}
```

**运行结果**

>**1 2 3 4 5** 
>**2 3 4 5 6** 
>**3 4 5 6 7** 

```c
int main()
{
    int a[5] = {1,2,3,4,5};
    int b[] = {2,3,4,5,6};
    int c[] = {3,4,5,67,7};
    int *arr[3] = {a, b, c};
    int i, j;
    for (i = 0;i<3;i++)
    {

        for (j = 0;j<5;j++)
        {
            printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
} 
```

实现了**模拟二维数组**的作用

### 1.2 数组指针

数组指针是一种**指针**

整形指针--**指向整形的指针**

数组指针--**指向数组的指针**

```c
int main()
{
    int a = 10;
    int* pa = &a;
    char ch = 'w';
    char *pc = &ch;
    int arr[10] = {1,2,3,4,5};
    double *d[5];

    //int *parr = &arr//这样肯定不对，arr是数组地址，parr是整形地址
    //int *parr[] = &arr//也不对，变成指针数组了
    int (*parr)[10] = &arr;//*要先与parr结合，此时的parr就是一个数组指针，指向了有十个元素的整形数组arr,parr存放的就是数组地址
    double* (*pd)[5] = &d;//一个小练习，pd就是一个数组指针。

    return 0;
}
```

**数组指针和指针数组有什么区别？**

```c
int main()
{
    int arr[10] ={0};
    int *p1 = arr;
    int (*p2)[10] = &arr;
    printf("%p\n",p1);
    printf("%p\n",p2);
    printf("%p\n",p1+1);
    printf("%p\n",p2+1);
    
    return 0;
}
```

**运行结果：**

>**000000000061FDE0**
>**000000000061FDE0**
>**000000000061FDE4**
>**000000000061FE08**

**p1+1一次跳过一个元素**
**p2+1一次跳过一个数组**

数组名是数组的首元素的地址
但是有两个**例外**：

- sizeof(数组名) -数组名表示整个数组，计算的是整个数组的大小，单位是字节
- &数组名 - 数组名表示整个数组，取出的是整个数组的地址

**数组指针的使用**

```c
int main()
{
    int arr[10] = {1,2,3,4,5,6,7,8,9,10};
    int (*pa)[10] =&arr;
    //此时想把数组元素打印出来就很麻烦，如下
    int i;
    for(i = 0;i<10;i++)
    {
        printf("%d ",*((*pa)+i));//数组地址解引用得到数组名的地址
        //也可以写作：
        printf("%d ",*((*pa)[i]));
    } 
    return 0;
}
void print1(int a[3][5],int r,int c)
{
    int i = 0;
    int j = 0;
    for(i = 0;i<r;i++)
    {
        for(j =0;j<c;j++)
        {
            printf("%d ",a[i][j]);
        }
        printf("\n");
    }
}
void print2(int (*p)[5],int r,int c )
{
     int i,j;
     for(i = 0;i<r;i++)
     {
        for(j = 0;j<c;j++)
        {
            printf("%d ",*(*(p+i)+j));
        }
        printf("\n");
     }
}
int main()
{
    int arr[3][5] = {{1,2,3,4,5},{2,3,4,5,6},{3,4,5,6,7}};
    print1(arr,3,5);
    print2(arr,3,5);//arr数组名表示数组首元素的地址。但是二维数组的首元素是第一行！！
    return 0;
}
```

理解一下

```c
int (*parr3[10])[5];//parr3是一个能存储数组指针的数组1，该数组能够存放十个数组指针，每个数组指针能够指向一个数组，数组五个元素，每个元素是int类型。
```

### 1.3 数组参数和指针参数

#### 1.3.1 *一维数组传参*

```c
void test(int arr[10])//ok,10可以省略不写
{}
void test(int arr[])//ok
{}
void test(int *arr)//ok
{}
void test2(int *arr[20])//ok
{}
void test2(int **arr)//ok
{}
int main()
{
    int arr[10] = {0};
    int *arr2[20] = {0};
    test(arr);
    test2(arr2);
    return 0;
}
```

#### 1.4.2 *二维数组传参*

```c
void test(int arr[3][5])//ok
{}
void test(int arr[][])//no,只能省略行，列是绝对不能省略的
{}
void test(int arr[][5])//ok
{}
void test(int* arr)//no,二维数组的首元素的地址是第一行的地址，拿一个指针变量接收肯定不行。
{}
void test(int* arr[5])//指针数组更不行了
{}
void test(int (*arr)[5])//整个可以，表示含五个整形元素的数组的地址。
{}
int main()
{
    int arr[3][5] = {0};
    test(arr);//传过去一个一位数组
    return 0;
}
```

### 1.5 函数指针

```c
int Add(int x,int y)
{
    return x + y;
}
int main()
{
    printf("%p\n",Add);
    printf("%p",&Add);
    return 0;
}
```

**输出结果：**

>**0000000000401550**
>**0000000000401550**

<u>数组名 ！= &数组名</u>
<u>函数名  = &函数名</u>
**那么改如何存储函数指针呢？**

```c
//参考数组指针
int (*pf)(int,int) = &Add;
//前面提到函数名 = &函数名，那么下面的写法也可以
int (*pf)(int,int) = Add;
```

**那么如何通过指针调用呢？**

```c
int ret = (*pf)(3,5);
//Add 和 &Add等价 则*pf 和 pf同样等价，所以下面的写法也可以
int ret = pf(3,5);
```

**两段代码**

```c
(*(void(*)())0)();//代码I

void(*signal(int,void(*)(int)))(int);//代码II
```

**代码I:**

>**1.** (void(\*)())0
>这部分是一个类型转换，它将 0 转换为一个函数指针：<br>
>0 是一个常数，表示空指针（NULL 或 nullptr）。
>(void(\*)()) 是一种类型转换，表示将 0 转换为**一个函数指针类型，具体是 void (\*)()，即指向返回类型为 void、没有参数的函数的指针。**
>通过这个类型转换，0 变成了一个 "无效的" 函数指针，它指向地址 0，这个地址通常是未定义的，表示没有合法的函数。<br>**2.** (*(void(\*)())0)
>这部分通过解引用操作符 * 来 "调用" 0 地址上的函数。由于 0 是一个空指针，解引用它实际上会引发未定义行为，因为 0 不是有效的函数地址。这会导致程序崩溃或其他不可预测的结果。<br>**3.** ();
>最后的 (); 是一个函数调用语法。它表示尝试调用 (*(void(*)())0) 所指向的函数。<br>
>综合起来：
>这段代码的整体意思是：<br>
>将 0 转换成一个无参数、返回 void 的函数指针。
>尝试解引用这个指针并调用该函数。由于这个指针是空的，指向地址 0

**代码II：**

>这段代码声明了signal函数，signal函数的两个参数一个为int类型一个为 函数指针，且这个函数指针参数为int 类型，返回类型是void
>而signal的返回类型是函数指针，这个函数指针指向一个返回类型为void，参数为int的函数。

代码II可能写作:
```void(*)(int)signal(int,void(*)(int));```
更容易理解，但遗憾的是语法不支持

**但还有解决办法：** ----使用**typedef**对函数类型进行重定义

```c
typedef unsigned int uint;
```

这个语句的作用是用uint替代了unsigned int;
那么
```void(*signal(int,void(*)(int)))(int);```
***等价于***

```c
typedef void(*pfun_t)(int);
p_funt signal(int,p_funt);
```

### 1.6 函数指针数组

```c
int add(int x,int y);
{
    return x + y;
}
int sub(int x,int y);
{
    return x - y;
}
int main()
{
    int (*pf1)(int,int) = add;
    int (*pf2)(int,int) = sub;
    int (*pfArr[2])(int,int);
    //函数指针数组，里面的元素是什么类型？函数指针
    //该函数指针返回类型为int，参数为(int,int)函数
    return 0;
}
```

### 1.7 指向函数指针数组的指针

```c
int(*p)(int,int);//函数指针
int(*p2[4])(int,int)//函数指针的数组
int(*(*p3)[4])(int,int) = &p2 //指向函数指针数组的指针，*p3说明是一个指针，[4]这个指针指向一个含有四个元素的数组，这个数组中元素的类型是什么呢？是函数指针，且这些函数指针指向返回值为int,参数为(int,int)的函数。
```

### 1.8 回调函数

**概念：**
写了个a函数，但是不直接调用a函数，而是通过b函数调用a函数，即a函数地址传到了b函数的形参中
称a函数为回调函数
以**冒泡排序**为例子：

```c
//升序
void bubble_sort(int arr[],int sz)
{
    int i = 0;
    int j = 0;
    for(i = 0;i<sz-1-i;i++)
    {
        for(j = 0;j < sz-1-i;j++)//第一次把最大的放到最后，第二次把第二大的放到倒数第二个，以此类推。
        {
            if(arr[j]>arr[j+1]);
        {
            tmp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = tmp;
        }
        }
    }
}
void print_arr(int arr[],int sz)
{
    int i;
    for(i = 0;i<sz;i++)
    {
        printf(“%d ”,arr[i]);
    }
}
int main()
{
    int arr[10] = {9,8,7,6,5,4,3,2,1,0};
    int sz = sizeof(arr)/sizeof(arr[0]);
    return 0;
}


```

#### 1.8.1 qsort函数为例

下面用**qsort函数**实现功能：

```c
//qsort 的使用方法
void qsort(void*base,size_t num,size_t size,int(*compar)(const void*,const void*));
base 中存放的时待排序数据中第一个对象的地址 void*是无类型的指针，换句话说，可以容纳任何类型的指针。
num 元素个数
size 是一个元素的大小，因为不知道数组类型是什么，实际上和base联动
假设要写一个冒泡排序函数让你排序字符串，那么数据不一样，排序方法也不一样
compar是一个函数指针，是用来比较待排序数据中的两个元素的函数
void* e1 和 void* e2是两个待比较元素的地址
```

**关于compar指向的函数**

| return value | meaning                        |
| ------------ | ------------------------------ |
| <0           | p1指向的元素在p2指向的元素之后 |
| 0            | p1指向的元素等同于p2指向的元素 |
| >0           | p1指向的元素在p2指向的元素之前 |

```c
int compareMyType (const void * a, const void * b)
{
  if ( *(MyType*)a <  *(MyType*)b ) return -1;
  if ( *(MyType*)a == *(MyType*)b ) return 0;
  if ( *(MyType*)a >  *(MyType*)b ) return 1;
}
//这是最简单的手法
```



```c
#include<stdio.h>
#include<stdlib.h>//使用qsort函数需要引用的头文件
void print_arr(int arr[], int sz)
{
    int i;
    for (i = 0; i < sz; i++)
    {
        printf("%d ", arr[i]);
    }
}
int cmp_int(const void* e1, const void* e2)
{
    return *(int*)e1 - *(int*) e2;
}
int main()
{
    int arr[] = { 9,8,7,6,5,4,3,2,1,0 };
    int sz = sizeof(arr) / sizeof(arr[0]);
    qsort(arr, sz, sizeof(arr[0]), cmp_int);
    print_arr(arr, sz);
    return 0;
}

```

**使用qsort函数排序结构体：**

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
struct stu
{
    char name[20];
    int age;
};
int cmp_by_age(const void* e1, const void* e2)
{
    return (*(struct stu*)e1).age - (*(struct stu*)e2).age;//按年龄排序
    //return (struct stu*)e1->age - (struct stu*)e2)->age;这样也可以的
}
int cmp_by_name(const void* e1, const void* e2)
{
    return strcmp(((struct stu*)e1)->name, ((struct stu*)e2)->name);//想要实现降序直接把e1和e2换个位置。
}

int main()
{
    struct stu s[3] = { {"zhangsan",30},{"lisi",34},{"wangwu",20} };
    int sz = sizeof(s) / sizeof(s[0]);
    qsort(s, sz, sizeof(s[0]), cmp_by_age);
    printf("%s", s[0].name);
    return 0;
}
```

#### 1.8.2 模拟qsort实现一个冒泡排序的通用算法:

```c
//模拟qsort实现一个冒泡排序的通用算法
void print_arr(int* arr, int sz)
{
    int i;
    for (i = 0; i < sz; i++)
    {
        printf("%d ", arr[i]);
    }
}
void swap(char* buf1, char* buf2, int width)
{
    //利用width把字节逐个交换
    int i;
    char tmp;
    for (i = 0; i < width; i++)
    {
        tmp = *buf1;
        *buf1 = *buf2;
        *buf2 = tmp;
        buf1++;
        buf2++;
    }
}
void bubble_sort(void* base, int sz, int width, int(*cmp)(const void* e1, const void* e2))
{
    int i = 0;
    int j = 0;
    int tmp;
    for (i = 0; i < sz - 1; i++)
    {
        for (j = 0; j < sz - 1 - i; j++)
        {
            //两个元素比较
            //第一个元素(char*)base + width;
            //第二个元素(char*)base + 2*width;
            //第j个元素(char*)base + j*width;
            if (cmp((char*)base + j * width, (char*)base + (j + 1) * width) > 0)
            {
                //交换
                swap((char*)base + j * width, (char*)base + (j + 1) * width, width);
                //传进去了两个void 类型的地址，但是swap并不知道指针类型所以还要传入width;
            }

        }
    }
}
int cmp_int(const void* e1, const void* e2)
{
    return *(int*)e1 - *(int*)e2;
}
int main()
{
    int arr[10] = { 1,3,5,7,9,2,4,6,8,0 };
    int sz = sizeof(arr) / sizeof(arr[0]);
    bubble_sort(arr, sz, sizeof(arr[0]), cmp_int);
    print_arr(arr, sz);
    return 0;
} 
```

### 1.9 指针练习

#### 1.9.1 对指针的理解

**sizeof(数组名) - -计算整个数组的大小**

**&数组名，取出了整个数组的地址；**

**除此之外，所有数组名都是数组首元素的地址；**

```c
int main()
{
    int a[] = {1,2,3,4};
    sizeof(a) = 16;
    sizeof(a + 0) = 4;//32位平台是4，六十四位平台是8
    sizeof(*a) = 4;
    sizeof(a + 1) = 4;//第二个元素的地址
    sizeof(a[1]) = 4;
    -------------------
    sizeof(&a) = 4; 
    sizeof(*&a) = 16;
    sizeof(&a+1) = 4;
    sizeof(&a[0]) = 4;
    sizeof(&a[0] + 1) = 4;
    char arr[] = {'a','b','c','d','e','f'};
    strlen(arr) random;
    strlen(arr+0)  random;
    strlen(*arr)  error;
    strlen(arr[1]) error;
    strlen(&arr) random;//传到strlen里面后，char*[6]->char*;
    strlen(&arr + 1) random-6;
    strlen(&arr[0] + 1) random-1;
    char* p = "abcdef";
    strlen(p) = 6;
    strlen(p+1) = 5;
    strlen(*p) err;
    strlen(&p) random;
    strlen(&p + 1) random;//两个random之间没有任何关系，关键在&p的四个字节中有没有\0;
    --------
    int* a[3][4] = { 0 };
    sizeof(a[0]) = 16;//第一行的数组名，表示第一行首元素的地址
    sizeof(a[0]+1) = 4;//第一行第二个元素的地址
    sizeof(*(a[0] + 1)) = 4;//第一行第二个元素
    sizeof(a + 1) = 4;//a表示二维数组首元素的地址，即第一行的地址，a + 1为第二行的地址
    sizeof(*(a + 1)) = 16;//对第二行的地址解引用就找到了第二行的数组名
    sizeof(&a[0] + 1) = 4;//&a[0]是第一行的地址，+1得到第二行的地址。
    sizeof(*(&a[0]+1)) = 16;  //a[0]是第一行的数组名，&a[0]得到第一行的地址，&a[0]+1表示第二行的地址解引用得到第二行
    sizeof(*a) = 16;//a作为二维数组的数组名，没有&没有单独放在sizeof内部，那么a表示首元素的地址，也就是第一行的地址，对第一行的地址解引用得到第一行，所以*a就是第一行。
    sizeof(a) = 48;//二维数组的数组名，计算的是二维数组的大小。
    sizeof(a[3]) = 16;//没有调用越界元素
    
    return 0;
}
int main()
{
    short s =5;
    int a = 4;
    sizeof(s = a+6) = 2;
    s = 5;//sizeof内部的表达式不参与运算，
    return 0;
}
```

#### 1.9.2 指针笔试题

```c
int main()
{
    int a[5] = {1,2,3,4,5};
    int* ptr = (int*)(&a + 1);
    printf("%d %d",*(a + 1),*(ptr - 1));
    return 0;
}
```

**运行结果：**

> 2 5

```c
struct test
{
    int num;
    char* pcname;
    short sdate;
    char cha[2];
    short sba[4];
}* p;//1.结构体的大小是二十个字节。2.p的值为0x100000(一个十六进制的1就表示一个字节)
int main()
{
    p + 0x1 =0x100014 ;//相当于移动二十个字节，
    (unsigned long)p + 0x1 = 0x100001;//转换成整形后加一就是加一
    (unsigned int*)p + 0x1 = 0x100004;//实际上加的是4
    return 0;
}
```


```c
int main()
{
    int a[4] = {1,2,3,4};
    int* ptr1 = (int*)(&a + 1);
    int* ptr2 = (int*)((int)a + 1);//跳过一个字节，按照小端考虑，低——01 00 00 00| 02 00 00 00|....
    //从指向01到指向02,按照整形解引用后ptr2的内容是00 00 00 02
    printf("%x,%x",ptr1[-1],*ptr2);                                 
    //4,20000000
    printf("%#x,%#x",ptr1[-1],*ptr2);
    //0x4,0x20000000;
    return 0;
}
int main()
{
    int a[3][2] = {(0,1),(2,3),(4,5)};//注意里面是括号。
    int* p;
    p = a[0];
    printf("%d",p[0]);
    //1
    return 0;
}
int main()
{
    int a[5][5];
    int(*p)[4];
    p = a;
    printf("%p,%d",&p[4][2] - &a[4][2],&p[4][2] - &a[4][2]);//指针和指针相减得到两个指针之间的元素个数，
    //&p[4][2] - &a[4][2]结果应该是-4，二进制表示是1111 1111 1111 1111 1111 1111 1111 1100；
    //F F F F F F F C(32位系统）
    return 0;
}
12345 12345 12345 12345 12345
1234 5123 4512 3451 2345 1234 5
int main()
{
    int aa[2][5] = {1,2,3,4,5,6,7,8,9,10};
    int* ptr1 = (int*)(&aa + 1);//跳过一整个二维数组
    int* ptr2 = (int*)(*(aa+1));//跳到第二行。
    printf("%d %d",*(ptr1 - 1),*(ptr2 - 1));
    //10 6;
    return 0;
}
int main()
{
    char* a[] = {"work","at","alibaba"};//初始化了三个指针分别存放三个字符串的首元素的地址
    char** pa = a;//w的地址
    pa++;//使pa指向下一个char*类型的元素，a[]实际存放的是3个大小为8个字节的指针变量
    printf("%s",*pa);
    //at
    
    return 0;
}
int main()
{
    char* c[] = {"enter","new","point","first"};//c[]用四个指针存放了"a","b","c","d"的地址。
    char** cp[] = {c+3,c+2,c+1,c};//cp[]用四个二级指针存放了c+3,c+2,c+1,c的地址。
    char*** cpp = cp;//cpp[]存放了cp中第一个二级指针的地址
    **++cpp;//++找到cp[]中第2个二级指针c+2的地址,解引用后找到二级指针c+2,对二级指针c+2解引用得到"c";
    *--*++cpp + 3;//er
    *cpp[-2] + 3;//**(cpp-2) + 3;  st
    cpp[-1][-1] + 1;//*(*(cpp-1)-1) + 1;  ew
    return 0;
}

```

#### 1.9.3 作业题

定义一个函数指针，指向的函数有两个int 形参，并且返回一个函数指针，返回的函数指针指向一个有一个int形参且返回int 的函数。

```c
int (*)(int)(*p)(int int);//没有这种写法
int (*(*p)(int int))(int);
```

**杨氏矩阵查找对应字符**

```c

```

## 2 字符串函数和内存函数

### 2.1 字符串函数

**strlen**的返回值是 **size_t（无符号整形）**

传地址，遇到'\0'停止，返回'\0'之前的字符个数

```c
int main()
{
    if(strlen("abc") - strlen("abcdef") > 0)
    {
        printf(">");
    }
    return 0;
}
```

**运行结果：**

> **>**

**strcpy**

- **原字符串一定要以'\0'结尾**
- **原字符串长度不够也能拷贝但是会报错**，<u>**所以目标字符串长度要够大**</u>
- **目标空间一定要可以修改**

```c
int main()
{
    char* str = "abcdef";
    char* p = "fedcba";
    strcpy(str,p);//目标空间不可修改
    return 0;
}
```

**strstr  字串查找函数**

```c
#include<string.h>
int main()
{
    char* arr1[] = "abcdef";
    char* arr2[] = "bcd";
    char* ret = strstr(arr1,arr2);//在arr1中查找arr2，找到了就返回arr2在arr1中第一次出现的地址，否则返回空指针。
    if(ret = NUll)
    {
        printf("没找到");
    }
    else
    {
        printf("找到了");
    }
    return 0;
}
//模拟实现
int my_strstr(char*, char*);
int main()
{
    char* arr1 = "abcdef";
    char* arr2 = "bcdd";
    if (my_strstr(arr1, arr2) == 1)
        printf("found");
    else
        printf("not found");
    return 0;
}
int my_strstr(char* str1, char* str2)
{
    int i, j;
    while (*str1++ != *str2)
    {
        if(*str1 == '\0')
            return -1;
    }
    str1--;
    while (*++str2 != '\0')
    {
        str1++;
        if (*str1 != *str2)
            return -1;

    }
    return 1;

}
```

**strtok函数**

> **char* strtok(char* str,const char* sep)**

- 第一个参数指定一个字符串，包含了sep中包含的分隔符
- strtok函数找到str中的下一个标记，并将其用'\0'结尾，也就是会改变分隔符，返回一个指向这个标记的指针。**这也是为什么str不用const修饰的原因**
- 第一个参数不为**NUll**时，函数将保存他在字符串中的位置,strtok函数将保存它在字符串中的位置。
- 第一个参数为**NULL**时，函数将在同一个字符串中被保存的位置开始查找下一个标记。
- 如果字符串中不存在更多的标记，则返回**NULL**指针

```c
int main()
{
    char arr[] = "zpw@bitedu.tech";
    char* p = "@.";
    char tmp[20] = {0}；
    strcpy(tmp,arr);
    //使用strtok时的常用操作。
    char* ret = NULL;
    for(ret = strtok(tmp,p);ret != NULL;ret = strtok(NULL,p))
    {
        printf("%s\n",ret);
    }
    return 0;
}
```

**strerror函数**

在调用库函数失败的时候都会设置错误码

> **char * strerror(int errornum);**

需要引用头文件

```c
#include<errno.h>
#include<string.h>
```

**使用示例：**

```c
int main()
{
    FILe* pf = fopen("c.text","r");//打开失败则pf = NULL
    if(pf == NUll)
    {
        printf("%s",strerror(errno));//strerror返回错误码对印的字符串的首个字符的地址。
    }
    fclose(pf);//关闭文件
    return 0;
}
```

更简单的函数 **perror**

```c
int main()
{
    FILe* pf = fopen("c.text","r");//打开失败则pf = NULL
    if(pf == NUll)
    {
        printf("%s\n",strerror(errno));//strerror返回错误码对印的字符串的首个字符的地址。
        perror(input);//头文件是<stdio.h>,直接打印 input :"错误信息"
    }
    fclose(pf);//关闭文件
    return 0;
}
```

**字符分类函数：**

**iscntrl(int c)**：检查字符是否为控制字符。控制字符是ASCII码在0到31之间（包括DEL字符）的字符。

**isspace(int c)**：检查字符是否为空白字符。空白字符包括空格、制表符、换行符等。

**isdigit(int c)**：检查字符是否为数字字符（'0'到'9'）。

**isxdigit(int c)**：检查字符是否为十六进制数字字符（'0'到'9'、'A'到'F'、'a'到'f'）。

**islower(int c)**：检查字符是否为小写字母（'a'到'z'）。

**isupper(int c)**：检查字符是否为大写字母（'A'到'Z'）。

**isalpha(int c)**：检查字符是否为字母（'a'到'z'或'A'到'Z'）。

**isalnum(int c)**：检查字符是否为字母或数字（'0'到'9'、'a'到'z'、'A'到'Z'）。

**ispunct(int c)**：检查字符是否为标点符号（逗号、句号、问号等，但不包括空格、制表符等空白字符）。

**isgraph(int c)**：检查字符是否为可打印的非空白字符（即除空白字符外的任何可打印字符）。

**isprint(int c)**：检查字符是否为可打印字符，包括字母、数字、空格、标点符号等，但不包括控制字符。

### 2.2 内存函数

- **memcpy(void* destination,void* source,size_t num)**

  **PS**:不能处理**重叠**的内存

```c
int main()
{
    int arr1[10] = {1,2,3,4,5,6,7,8,9,10};
    int arr2[20] = {0};
    //strcpy()不能完成整形数组的复制
    memcpy(arr2,arr1,20);//拷贝20个字节，
    return 0;
}
//模拟实现
void my_mempy(void* dest,void* src,size_t num)
{
    void* ret = dest;
    assert(dest && src);
    while(num--)
    {
        (char*)dest =(char*)src;
        dest = (char*)dest + 1;
        src = (char*)src + 1; 
    }
    return ret;
}
```

- **memmove**()可以处理重叠的内存

  **模拟实现：**

```c
void my_memmove(void* destination,void* source,size_t num )//主要是从前向后拷贝还是从后向前拷贝
{
    //不难发现当source的位置在destination后面的时候从前向后拷贝，反之从后向前
    if(dest < src)
    {
        //前 ->后
        while(num--)
        {
            *(char*)dest = *(char*)src;
            dest = (char*)dest + 1;
            src = (char*)src + 1;
        }
    }
    else
    {
        //后 ->前
        while(num--)
        {
            *((char*)dest + num) = *((char*)src + num);
        }
    }
}
```

**所以直接用memmove()就行了？**

**memcmp**(const void* p1,const void* p2,size_t num);

返回方式类似**strcmp**

```c
int main()
{
    float arr1[] ={1.0,2.0,3.0,4.0};
    float arr2[] = {1.0.3.0};
    int ret = memcmp(arr1,arr2,8);
    printf("%d\n",ret);
    return 0;
}
```

**memset()**

```c
int main()
{
    int arr[10] = {0};
    memset(arr,1,20);//以字节为单位进行设置,不是元素
    for(int i = 0;i < 10;i++)
    {
        printf("%d ",arr[i]);
    }
    return 0;
}
```

## 3 自定义类型

```c
struct
    {
        char name;
    }x;
struct
    {
        char name;
    }*p;
//*p = x这种语法是错误的，编译器会将其看作是两个不同的结构体尽管里面的数据类型相同
```

**考虑一下这种代码是否可行**

```c
struct N
{
    char a;
    struct N n;
}
```

**这种语法也是错误的，如果可以，那么struct N类型所占内存的大小不可计算！**

那么如何实现结构体的自引用呢？

### 3.1 结构体的自引用

```c
struct Node
{
	int data;
	struct Node next;
};
//可行否？
如果可以，那sizeof(struct Node)是多少？
```

### 3.2 结构体内存对齐

```c
struct s1
{
    char c1;
    int i;
    char c2;
}
//sizeof(s1) = 12
struct s2
{
    char c1;
    int i;
    double d;
}
//sizeof(s2) = 16
struct s3
{
    char c1;
    char c2;
    int i;
}
//sizeof(s3) = 8

```

**如何计算**

结构体的对齐规则：

> 1. 第一个成员在与结构体变量偏移量为0的地址处。
>
> 2. 其他成员变量要对齐到某个数字（对齐数）的整数倍的地址处。
>
> **对齐数** = 编译器默认的一个对齐数 与 该成员大小的较小值。
> ==VS中默认的值为8==
>
> ==Linux - 没有默认对齐数的概念==
>
> 3. 结构体总大小为最大对齐数（每个成员变量都有一个对齐数）的整数倍。
> 4. 如果嵌套了结构体的情况，嵌套的结构体对齐到自己的最大对齐数的整数倍处，结构体的整
>
> 体大小就是所有最大对齐数（含嵌套结构体的对齐数）的整数倍。

**"等我学会画图一定回来把这里讲清楚"**

**为什么存在内存对齐？**

- **平台原因**：不是所有的硬件平台都能访问任意地址上的任意数据的；某些硬件平台只能在某些地址处取某些特定类型的数据，否则抛出硬件异常。
- **性能原因**：数据结构应该尽可能地在自然边界上对齐，原因在于，为了访问未对齐的内存，处理器需要作两次内存访问；而对齐的内存仅需要一次访问

> 牺牲了空间换取了时间。

当满足占据较小空间的成员放在一起时，占用的空间最少。

**如何修改默认对齐数？**(不合适的时候才修改)

```c
#pragma pack(2)//把默认对齐数改为了2
struct S
{
    char c1;
    int i;
    char c2;
}
```

**offsetof(type,member)**:用于计算结构体成员相对首地址的偏移量。[模拟实现]()

示例：

```c
struct S
{
    char c1;
    int i;
    char c2;
}
int main()
{
    printf("%d ",offsetof(struct S,c1));
    printf("%d ",offsetof(struct S,i));
    printf("%d",offsetof(struct S,c2));
    
    return 0;
}
```

运行结果：

> 0 4 8

### 3.3 位段

位段的声明：

>1. 位段的成员必须是*int ,unsigned int, signed int*
>
>2. 位段的成员名后面有一个冒号和一个数字。

**PS: 位段不适合跨平台使用**

比如：

```c
struct A
{
    int _a:2;//_a成员占2个bit位置
    int _b:5;//_b成员占5个bit位置
    int _c:10;//_c成员占10个bit位置
    int _d:30;//_d成员占30个bit位置
      
}
// sizeof (struct A) = 8

```

- 开辟空间逻辑：先按照数据类型开辟空间，再逐个分配空间。
  如果上一次开辟的空间还够用就不开辟。

### 3.4 枚举enum

#### 3.4.1 枚举类型的定义

```c
//声明枚举类型
enum color
{
	RED,
    GREEN,
    BLUE,
}//存放枚举的可能常量
int main()
{
    printf("%d ",RED);
    printf("%d ",GREEN);
    printf("%d ",BLUE);
}
```

输出结果：

> 0 1 2

从第一个开始逐步递增1

示例

```c
enum color
{
	RED = 5,
    GREEN, //6
    BLUE, //7
}
```

### 3.5 联合体

#### 3.5.1 联合体的定义

```c
union un
{
    char c;
    int i;
};
int main()
{
    union un u;
    printf("%d",sizeof(u));
    //输出4；
    printf("%p %p %p",&u,&(u.c),&(u.i));
    //发现三个地址相同
    return 0;
}
```

关键在于联合体的成员**公用同一块空间**

#### 3.5.2 联合体的特点

- 成员共用同一块内存空间

- 大小至少是最大成员的大小。
- 只能同时调用联合体中**一个成员**

Eg:测试大小端联合体方法

[关于大小端](scatter.md#4)

1. 传统方法

```c
int main()
{
    int a = 1;
    if(*(char*)&a == 1)
    {
        printf("small");
    }
    else
        printf("big");
    return 0;
}
```



2. 联合体方法

```c
int check_sys()
{
    union U
    {
        char c;
        int i;
    }u;
    u.i = 1;
    return u.c;
}
int main()
{
    if(check_sys == 1)
    {
        printf("小端");
    }
    else
        printf("大端");
    return 0;
}
```

#### 3.5.3 联合体大小的计算

- 联合体的大小至少是最大成员的大小。
- 当最大成员的大小不是[最大对齐数]()的整数倍的时候就要对齐到最大对齐数的整数倍。

```c
union Un1
{
    char a[5];//对齐数是min{1,8} = 1
    int i;//对齐数是min{4,8} = 4;
    //所以最大对齐数是4
};
union Un2
{
    short c[7];////对齐数是min{2,8} = 2
    int i;//对齐数是min{4,8} = 4;
    //所以最大对齐数是4
}
int main()
{
    printf("%d %d",sizeof(Un1),sizeof(Un2));
    //输出8 16
}
```

## 4 文件

**用处不大随便写点**

### 4.1 数据文件和程序文件

- 数据文件

>包括源程序文件（后缀为.c）,目标文件（windows环境后缀为.obj），可执行程序（windows环境后缀为.exe）

- 数据文件

>文件的内容不一定是程序，卫视程序读写的数据，比如程序运行需要从中读取数据的文件或者需要输出内容的文件。

本章讨论的是**数据文件**

### 4.2 文件名

  一个文件要有一个唯一的文件标识，以便用户识别和引用。
  文件名包含三个部分：文件路径+文件名主干+文件后缀
  EG: `c:\code\test.txt`
 为了方便起见，文件表示常被称作**文件名**

### 4.3 文件的打开和关闭

#### 4.3.1 文件指针

  每个被使用的文件都在内存中开辟了一个相应的文件信息区，用来存放文件的相关信息。这些信息被保存在一个**结构体变量**，而该结构体类型是有系统声明的，叫做**FILE**。每当打开一个文件时，系统会根据文件的情况**自动创建一个FILE结构的变量并填充其中的信息**

#### 4.3.2 打开和关闭

```c
FIle* pf;//文件指针变量
FILE* fopen(const char* filename,const char* mode);
int fclose(FILE* stream);
```

```c
//Eg
int main()
{
	FILE* pf = fopen("test.dat","w");//只写，如果没如果没有这个文件会自动创建一个同名文件
	//若用路径打开记得转义
	if(pf == NULL)
	{
		perror ("fopen");
		return 1;
	}
	//写文件
	//关闭文件
	fclose(pf);
	pf = NULL;
	return 0;
}
```

#### 4.2.3 顺序读写

```c
//Eg
int main()
{
	FILE* pf = fopen("test.dat","w");//只写，如果没如果没有这个文件会自动创建一个同名文件
	//若用路径打开记得转义
	if(pf == NULL)
	{
		perror ("fopen");
		return 1;
	}
	//写文件
	*fputc('b',pf);
	*fputc('i',pf);
	*fputc('t',pf);
	//关闭文件
	fclose(pf);
	pf = NULL;
	return 0;
}
```

#### 4.2.4 流 

C语言程序只要运行起来就默认打开了三个流：

stdin-标准输入流-键盘

stdout-标准输出流-屏幕

stderr-标准错误流-屏幕



