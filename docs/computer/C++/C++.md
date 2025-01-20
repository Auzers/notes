# 从C到C++
!!! note ""
    - **以新的语法和示例代码呈现**
    - 包括但不限于<u>[acwing](https://www.acwing.com/)</u>的笔记内容

## 1 getline()相关
<u>[cin的几种读取方法和读取逻辑](https://blog.csdn.net/weixin_43725617/article/details/103079180)</u>

方法一(常用)：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

int main()
{
    string a;//string 是 C++ 标准库提供的一个类，代表动态长度的字符串。
    getline(cin, a);
    cout << a.size() << endl;
    return 0;
}
```
方法二：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

int main()
{
    char a[105];
    cin.get(a, 105);//需要注意cin.get()不会把换行符取出删除，影响下一次读入！
    cout << strlen(a) << endl;
    return 0;
}
```
方法三：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

int main()
{
    char a[105];
    cin.getline(a, 105);//需要注意cin.getline()会把换行符取出删除，不影响下一次读入！
    cout << strlen(a) << endl;
    return 0;
}
```

- `getline(cin, a);`：从标准输入（键盘）读取一行文本，并将其存储到 a 字符串中。getline 是 C++ 标准库中的一个函数，允许读取包含空格的整行文本。cin 表示从键盘输入数据。不存储最后的换行符，且会把换行符从标准输入流中丢弃。且getline()不能直接用于char数组。

## 2 for(auto c : a)相关

```cpp
#include <iostream>

using namespace std;

int main()
{
    string a;
    getline(cin,a);
    
    string b;
    for(auto c : a) b = b + c + ' ';
    cout << b << endl;
    b.pop_back();
    return 0;
}
```

- `for(auto c : a)`: 遍历字符串 a 中的每一个字符，将每个字符赋值给 c。

- `b.pop_back();`: 删除最后一个字符

- `for (auto c : a)`和`for (char &c : a)`的区别：前者修改C不会影响数组a，后者会影响到数组a.

- `auto` 是 C++ 中的一种类型推断机制，允许编译器根据表达式的类型自动推断变量的类型。使用 `auto` 可以减少代码中的显式类型声明，增加代码的可维护性和可读性。

## 3 insert()

```cpp
#include <iostream>
using namespace std;

int main()
{
    string str,substr;
    while(cin >> str >> substr)
    {
        int index = 0;
        for(int i = 0;i < str.size();i++ )
        {
            if(str[i] > str[index])
            {
                index = i;
            }
        }
        str.insert(index + 1,substr);
        cout << str <<endl;
    }


    return 0;
}
```

## 4 find() & rfind ()

- `a.find(b)`: 返回字符串a在字符串b中第一次出现的位置。假如a不在b中，返回`string::npos`。
- `a.rfind(b)`: 返回字符串a在字符串b中最后一次出现的位置。假如a不在b中，返回`string::npos`。
  
`string::npos`是一个常量，在 C++ 中是一个无符号整数类型的最大值
```cpp
#include <iostream>

using namespace std;

int main()
{
    string a;
    while (cin >> a)
    {
        for (auto c : a)
        {
            if(a.find(c) ==a.rfind(c))
            {
                cout << c;
                return 0;
            }
        }
    }
    cout << "no";
    return 0;
}

```

## 5 stringstream ssin()

**分割字符串形成字符串流**
```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main()
{
    string a,b,c;
    
    getline(cin,a);
    cin >> b >> c;
    
    stringstream ssin(a);
    string str;
    while(ssin >> str )
    {
        if(str == b)
        cout << c;
        else cout << str;
        cout << ' ';
    }
    return 0;
}
```
## 6 str.back()相关

- `str.back()`: 返回字符串的最后一个字符。
- `str.pop_back()`: 删除字符串的最后一个字符。
```cpp
#include <iostream>
#include <sstream>
using namespace std;
int main()
{
    string str,res;
    while(cin >> str)
    {
        if (str.back() == '.') str.pop_back();
        if (str.size() > res.size())
        {
            res = str;
        }
    }
    cout << res << endl;

    return 0;
}
```

## 7 swap()

- `swap(a,b)`: 交换a和b的值。其中a,b可以是任意同类型的变量。
**PS:**包含在`#include <algorithm>`中
示例：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int main()
{
    int a = 1, b = 2;
    swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}
```
输出结果：
```
2 1
```

## 8 substr()

- `a.substr(b)`: 返回字符串a从第a个字符开始，长度为b的子串。
```cpp
for(int i = 0;i < a.size();i++)
    {
        a = a.substr(1) + a[0];//a.substr(1)表示从第1个字符开始，长度为a.size()-1的子串，a[0]表示第0个字符
    }
```
- `a.substr(b,c)`: 返回字符串a从第b个字符开始，长度为c的子串。
实现字符串循环左移
```cpp
#include <iostream>

using namespace std;

int main()
{
    int n;
    while(cin >> n, n != 0)
    {
        string str[200];
        int index = 0;
        int min = 201;
        for (int i = 0; i < n; ++i) // 修改第 9 行
        {
            cin >> str[i]; // 修改第 11 行
            if(str[i].size() < min)
            {
                min = str[i].size();
                index = i;
            }
        }
        int i;
        string res;
        for(i = 1; i <= min; i++)
        {
            string tmp = str[index].substr(str[index].size() - i, i);
            cout << tmp << ' ' << endl;
            int j;
            for(j = 0; j < n; j++) // 修改第 20 行
            {
                string back = str[j].substr(str[j].size() - i, i);
                if(back != tmp)
                {
                    break;
                }
            }
            if(j == n)
            {
                res = tmp;
            }
            else
            {
                break; // 添加提前退出逻辑
            }
        }
        cout << res << endl;
    }
    return 0;
}
```

## 9 #include<bits/stdc++.h>

- `#include<bits/stdc++.h>`: 包含C++标准库的所有头文件。常用于竞赛。
```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
string a[209];
int main(){
    while(cin>>n){
        if(n==0) return 0;
        for(int i=0;i<n;++i) cin>>a[i],reverse(a[i].begin(),a[i].end());
        sort(a,a+n);
        string v="";
        for(int i=0;i<a[0].length();++i){
            if(a[0][i]==a[n-1][i]) v=a[0][i]+v;
            else break;
        }
        cout<<v<<"\n";
    }
}
```

## 10 reverse()

- `reverse(a.begin(),a.end())`: 反转字符串a。
```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int main()
{
    string a = "hello";
    reverse(a.begin(),a.end());
    cout << a << endl;
    return 0;
}
```
输出结果：
```
olleh
```

## 11 sort()


- 在 C++ 中,sort 函数的用法是 sort(begin,end,cmp)，其中 begin 是要排序的范围的起始迭代器，end 是范围的结束迭代器（不包括该位置的元素）,cmp是比较方法，如果不自定义则默认按照**字典序从小到大**排序。如果想要降序排列一些基本类型可以在cmp的位置`greater<type>()`,如果需要更复杂的排序方式则需要**自定义**返回类型为`bool`型的cmp函数。

**示例：**
```cpp
#include <iostream>
#include <algorithm>
using namespace std;
struct tmp
{
    int a;
    double b;
    string str;
}arr[10000];
int cmp(const tmp x,const tmp y)
{
    return x.a < y.a;
}
int main()
{
    int n;
    cin >> n;
   for(int i = 0; i < n;i++)
   {
       cin >> arr[i].a >> arr[i].b >> arr[i].str;
   }
   sort(arr,arr + n,cmp);
   for(int i = 0;i < n;i++)
   {
       printf("%d %.2f %s\n", arr[i].a, arr[i].b, arr[i].str.c_str());
   }
   
    return 0;
}
```

- `c_str()`:  C++ 中 std::string 类的一个成员函数，用于返回一个指向字符串内容的常量字符指针（const char*）。这个指针指向一个以 null 结尾的 C 风格字符串，通常用于与 C 风格的字符串函数进行交互。



## 12 unordered_set<int>

- `unordered_set<int> a`: 定义一个无序集合a，其中元素类型为int。
- `a.insert(b)`: 将b插入到a中。
- `a.count(b)`: 返回b在a中的个数。
- `a.find(b)`: 返回b在a中的迭代器。
- `a.erase(b)`: 删除a中的b。

```cpp
int get_unique_count(int a[], int n)
 {
    unordered_set<int> unique_nums;
    for (int i = 0; i < n; i++) unique_nums.insert(a[i]);//遍历数组，将每个元素插入集合中。集合会自动去重。
    return unique_nums.size();
}
```
## 13 结构体内部的构造函数

```cpp
struct Node
{
    int a,b;
    Node(int _a,int _b):a(_a),b(_b){}//把_a赋值给a,把_b赋值给b
};
```

## 14 链表

- `new`:new 是 C++ 中用于动态内存分配的关键字。它允许你在堆上分配内存，并返回指向该内存的指针。
Eg:
```cpp
 int* p = new int; // 在堆上分配一个整数
  *p = 10;          // 给这个整数赋值


int* arr = new int[5]; // 在堆上分配一个整数数组，大小为5
for (int i = 0; i < 5; ++i) {
    arr[i] = i;        // 初始化数组
} 
```
```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构体
struct Node
{
    int val;        // 节点存储的值
    Node* next;     // 指向下一个节点的指针
    
    // 构造函数，初始化节点
    Node(int _val) : val(_val), next(NULL) {}
};

int main()
{
    // 创建三个节点
    auto p = new Node(1);  // 创建值为1的节点
    auto q = new Node(2);  // 创建值为2的节点
    auto o = new Node(3);  // 创建值为3的节点
    
    // 连接节点，构建链表
    p->next = q;    // 将节点1指向节点2
    q->next = o;    // 将节点2指向节点3
    Node* head = p;//初始化链表的头节点

    //链表的遍历
    for(Node* i = head;i != NULL; i = -> next)
    {
        cout << i->val <<endl;
    }
    return 0;
}
```

- **最终的链表结构**
```
p        q        o
[1] ---> [2] ---> [3] ---> NULL
```

- **在链表中添加节点**(一般添加在最前面)
```cpp
Node* u = new Node(4);
u->next = head;
head = u;
```

- **节点的删除：**只要遍历不到需要删除的点就可以，至于有没有真正删除并不重要。
```cpp
head->next = head->next->next;相当于跳过了某一个节点
```

- **链表归并：**
!!! note ""

    === "题目-1"

        输入两个递增排序的链表，合并这两个链表并使新链表中的结点仍然是按照递增排序的。
    === "答案-1"

        **二路归并：**
        ```cpp
        /**
        * Definition for singly-linked list.
        * struct ListNode {
        *     int val;
        *     ListNode *next;
        *     ListNode(int x) : val(x), next(NULL) {}
        * };
        */
        class Solution {
        public:
            ListNode* merge(ListNode* l1, ListNode* l2) {
                auto dummy = new ListNode(-1),tail = dummy;//初始化一个虚拟节点
                while(l1&&l2)
                {
                    if(l1->val < l2->val)
                    {
                        tail->next = l1;
                        l1 = l1->next;
                    }
                    else
                    {
                    tail->next = l2;
                    l2 = l2->next;
                    }
                    tail = tail->next;
                }
                if(l1 == NULL) tail->next = l2;
                if(l2 == NULL) tail->next = l1;
                return dummy->next;
            }
        };
        ```   
- **链表反转：**

!!! note ""

    === "题目-2"

        定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。<br>
        样例:
        > 输入:1->2->3->4->5->NULL<br>
          输出:5->4->3->2->1->NULL
    === "答案-2"
        **法1：**
        ```cpp
        /**
        * Definition for singly-linked list.
        * struct ListNode {
        *     int val;
        *     ListNode *next;
        *     ListNode(int x) : val(x), next(NULL) {}
        * };
        */
        class Solution {
        public:
            ListNode* reverseList(ListNode* head) {
                if(!head || !head->next) return head;
            auto p = head, q = head->next;
            while (q)
            {
                auto o = q -> next;
                q->next = p;
                p = q;
                q = o;
            }
            head->next = NULL;
            return p;
                
            }
        };
        ```
        **法2（递归）：**
        ```cpp
        /**
        * Definition for singly-linked list.
        * struct ListNode {
        *     int val;
        *     ListNode *next;
        *     ListNode(int x) : val(x), next(NULL) {}
        * };
        */
        class Solution {
        public:
            ListNode* reverseList(ListNode* head) {
                if(!head || !head->next) return head;
                auto tail = reverseList(head->next);
                head->next->next = head;
                head->next = NULL;
                return tail;
                
            }
        };      
        ```

- **找公共节点：**
!!! note ""
    === "题目-3"
        找两个链表的公共节点
    === "答案-3"
        ```cpp
        /**
        * Definition for singly-linked list.
        * struct ListNode {
        *     int val;
        *     ListNode *next;
        *     ListNode(int x) : val(x), next(NULL) {}
        * };
        */
        class Solution {
        public:
            ListNode *findFirstCommonNode(ListNode *headA, ListNode *headB) {
                auto p = headA;
                auto q = headB;
                while(p != q)
                {
                    if(p) p = p->next;
                    else p = headB;
                    if(q) q = q ->next;
                    else q = headA;
                }
                return p;
                
            }
        };
        ```
    === "图解"
        <u>[双指针法图解](https://www.acwing.com/solution/content/26708/)</u>
        
- **删除链表中重复的节点:**
!!! note ""
    === "题目-4"
        删除链表中的重复节点
        >样例1<br>
        输入：1->2->3->3->4->4->5<br>
        输出：1->2->5

        >样例2<br>
        输入：1->1->1->2->3<br>
        输出：2->3
    === "答案-4"
        ```cpp
        /**
        * Definition for singly-linked list.
        * struct ListNode {
        *     int val;
        *     ListNode *next;
        *     ListNode(int x) : val(x), next(NULL) {}
        * };
        */
        class Solution {
        public:
            ListNode* deleteDuplication(ListNode* head) {
                auto dummy = new ListNode(-1);
                dummy->next = head;
                auto p = dummy;
                while (p->next) {
                auto q = p->next;
                while(q->next && p->next->val == q->next->val) q = q->next;
                if(q == p->next) p = p->next;
                else p->next = q->next;
                }

              return dummy->next;
            }
        };

        ```

## 15 类&对象

**示例：**

```cpp
#include <iostream>
 
using namespace std;
 
class Box
{
   public:
      double length;   // 长度
      double breadth;  // 宽度
      double height;   // 高度
      // 成员函数声明
      double get(void);
      void set( double len, double bre, double hei );
};
// 成员函数定义
double Box::get(void)
{
    return length * breadth * height;
}
 
void Box::set( double len, double bre, double hei)
{
    length = len;
    breadth = bre;
    height = hei;
}
int main( )
{
   Box Box1;        // 声明 Box1，类型为 Box
   Box Box2;        // 声明 Box2，类型为 Box
   Box Box3;        // 声明 Box3，类型为 Box
   double volume = 0.0;     // 用于存储体积
 
   // box 1 详述
   Box1.height = 5.0; 
   Box1.length = 6.0; 
   Box1.breadth = 7.0;
 
   // box 2 详述
   Box2.height = 10.0;
   Box2.length = 12.0;
   Box2.breadth = 13.0;
 
   // box 1 的体积
   volume = Box1.height * Box1.length * Box1.breadth;
   cout << "Box1 的体积：" << volume <<endl;
 
   // box 2 的体积
   volume = Box2.height * Box2.length * Box2.breadth;
   cout << "Box2 的体积：" << volume <<endl;
 
 
   // box 3 详述
   Box3.set(16.0, 8.0, 12.0); 
   volume = Box3.get(); 
   cout << "Box3 的体积：" << volume <<endl;
   return 0;
}
```
## 16 STL

!!! note ""
    === "multiset"
        multiset是<set>库中一个非常有用的类型，它可以看成一个序列，插入一个数，删除一个数都能够在O(logn)的时间内完成，而且他能时刻保证序列中的数是有序的，而且序列中可以存在重复的数。
    === "multiset_示例1"
        ```cpp
        class Solution {
        public:
            int getNumberOfK(vector<int>& nums , int k) {
                multiset<int> s;

                for(int x : nums) s.insert(x);

                return s.count(k);
            }
        };
        ```
    === "multiset_示例2"
        ```cpp
        #include <string>
        #include <iostream>
        #include <set>
        using namespace std;
        void main(){
            intx;
            scanf("%ld",&x);
            multiset<int>h;          //建立一个multiset类型，变量名是h，h序列里面存的是int类型,初始h为空
            while(x!=0){
                h.insert(x);         //将x插入h中
                scanf("%ld",&x);
            }    
            while(!h.empty()){       // 序列非空 h.empty()==true时 表示h已经空了
                __typeof(h.begin()) c=h.begin();
                                    //c指向h序列中第一个元素的地址，第一个元素是最小的元素
                printf("%ld ",*c);   //将地址c存的数据输出
                h.erase(c);          //从h序列中将c指向的元素删除
            }
        }
        ```
        <u>[更多multiset相关](https://blog.csdn.net/sodacoco/article/details/84798621)</u>

- <u>[迭代器和反向迭代器](https://blog.csdn.net/weixin_50945234/article/details/137363456)</u>

## 17 重载函数和重载运算符

- **重载函数:**在同一个作用域内，可以声明几个功能类似的同名函数，但是这些同名函数的形式参数（指参数的个数、类型或者顺序）必须不同。您不能仅通过返回类型的不同来重载函数。下面的实例中，同名函数 print() 被用于输出不同的数据类型：
```cpp
#include <iostream>
using namespace std;
 
class printData
{
   public:
      void print(int i) {
        cout << "整数为: " << i << endl;
      }
 
      void print(double  f) {
        cout << "浮点数为: " << f << endl;
      }
 
      void print(char c[]) {
        cout << "字符串为: " << c << endl;
      }
};
 
int main(void)
{
   printData pd;
 
   // 输出整数
   pd.print(5);
   // 输出浮点数
   pd.print(500.263);
   // 输出字符串
   char c[] = "Hello C++";
   pd.print(c);
 
   return 0;
}
```

- 关于重载函数的更详细内容可以看<u>[这篇文章](https://blog.csdn.net/weixin_45031801/article/details/135949885)</u>

- **重载运算符**
**重载运算符的基本语法：**operator 待重载运算符 (参数){函数体}

**示例：**
```cpp
#include <iostream>
using namespace std;
 
class Box
{
   public:
 
      double getVolume(void)
      {
         return length * breadth * height;
      }
      void setLength( double len )
      {
          length = len;
      }
 
      void setBreadth( double bre )
      {
          breadth = bre;
      }
 
      void setHeight( double hei )
      {
          height = hei;
      }
      // 重载 + 运算符，用于把两个 Box 对象相加
      Box operator+(const Box& b)
      {
         Box box;
         box.length = this->length + b.length;
         box.breadth = this->breadth + b.breadth;
         box.height = this->height + b.height;
         return box;
      }
   private:
      double length;      // 长度
      double breadth;     // 宽度
      double height;      // 高度
};
// 程序的主函数
int main( )
{
   Box Box1;                // 声明 Box1，类型为 Box
   Box Box2;                // 声明 Box2，类型为 Box
   Box Box3;                // 声明 Box3，类型为 Box
   double volume = 0.0;     // 把体积存储在该变量中
 
   // Box1 详述
   Box1.setLength(6.0); 
   Box1.setBreadth(7.0); 
   Box1.setHeight(5.0);
 
   // Box2 详述
   Box2.setLength(12.0); 
   Box2.setBreadth(13.0); 
   Box2.setHeight(10.0);
 
   // Box1 的体积
   volume = Box1.getVolume();
   cout << "Volume of Box1 : " << volume <<endl;
 
   // Box2 的体积
   volume = Box2.getVolume();
   cout << "Volume of Box2 : " << volume <<endl;
 
   // 把两个对象相加，得到 Box3
   Box3 = Box1 + Box2;
 
   // Box3 的体积
   volume = Box3.getVolume();
   cout << "Volume of Box3 : " << volume <<endl;
 
   return 0;
}
```

