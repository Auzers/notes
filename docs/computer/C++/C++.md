# 从C到C++
**以新的语法和示例代码呈现**

## getline(,)&cin.get(,)&cin.getline(,)

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

## for(auto c : a)&for (char &c : a)

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

## insert()

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

## find() & rfind ()

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

## stringstream ssin()

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