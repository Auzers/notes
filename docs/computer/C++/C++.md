# 从C到C++
**以新的语法和示例代码呈现**

## 1 getline()相关

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

- `getline(cin, a);`：从标准输入（键盘）读取一行文本，并将其存储到 a 字符串中。getline 是 C++ 标准库中的一个函数，允许读取包含空格的整行文本。cin 表示从键盘输入数据。不存储最后的换行符，且会把换行符从标准输入流中丢弃。

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
