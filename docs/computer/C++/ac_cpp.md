---
tags: 
  - programming language
---
# Accelerated C++

## Chapter 0

### 0.1 注释

### 0.2 `#include` 指令

- C++
	- 语言核心
	- 标准库
- `#include` 把不在语言核心的名称包含到当前文件中，是**预处理指令**的一种，本质上会把其后的文件内容**复制**到当前文件指定的位置
- `<iostream>` 表示对顺序或流输入/输出的支持

### 0.3 main 函数

- **函数**是一段具有名称的程序片段
- C++ 程序**有且仅有**一个 `main` 函数
- main 函数要返回一个整数类型的值作为结果，零表示成功，其他任意意味着程序运行有问题
- `int` 是语言核心内用于表示整数的名称

### 0.4 花括号

- C++ 中，编译器把出现在花括号之间的所有内容当作一个单元处理，这个单元就是**栈帧**

### 0.5 使用标准库进行输出

- 名字空间是一个相关名称的集合
- `std::cout` ：名称之前的 `std::` 表明 `cout` 是名为 std 的名字空间的一部分
- `std::cout` 是**标准输出流**，标准输出流是 C++实现用来进行普通的程序输出的工具。在**窗口操作系统环境下**的一个典型的 C++ 实现中，在程序运行时，系统环境会把程序和一个窗口**联系起来**， `std::cout` 指示了这个窗口
- `std::endl`表示一个**语句行的结束**。这意味着如果后续还有输出，则会在新一行中开始

### 0.6 返回语句

- 如 `return 0;`
- 返回值的类型必须和**函数声明的返回类型一致**
- 接受 main 的返回值的程序是 C++ 实现本身 (有点抽象...)

### 0.7 深入观察

- 表达式指示 C++ 编译器对某些事物进行**运算**。
- 运算会产生一个**结果**, 并且可能有**副作用**(类似 python 中的**纯函数和非纯函数**)，副作用不作为表达式额直接结果，但是会影响程序或系统环境的状态。如果在表达式后紧跟分号，表示让系统丢掉该表达式的结果，表示我们只对该表达式的副作用关心。
- 例如 `3 + 4` 这个运算的结果是 7 但是没有副作用。
- 表达式包含**运算符**和**操作数**
- 每个操作数都具有**类型**， `std::cout` 的类型就是 `std::ostream`
- C++ 
	- 内建模型，如 `int`
	- 语言模型之外的其他类型
- `std::endl` 本质上是一个**控制器**
- **控制器**的关键性质：把控制器写到流中，我们就可以控制这个流。
- 就 `std::endl` 而言，我们所作的动作是结束当前的**输出行**
- `std::cout << "Hello, World!" << std::endl;`会产生一个类型为`std::ostream`的`std::cout`作为其结果（这也是为什么可以进行**链式调用**的原因），作为副作用，它会将 Hello, World! 写入标准输出中并结束当前输出行。
- **作用域**是用来**避免名称冲突**的手段
- **名字空间作用域：** `std::cout` 是一种**限定名称**，其中 `::` 是**作用域运算符**
- 花括号是另一种作用域

### 0.8 小结

- C++程序通常具有**自由风格**
- **自由风格**：防止相邻名称混在一起时必须使用空白的编码风格
- 三个不能具有自由风格的例外 (不可以跨行)
	- 字符串直接量
	- `#include` 名称
	- `//` 注释

## Chapter 1

### 1.1 输入

```cpp
#include <iostream>
#include <string>

int main()
{
  std::cout << "Please enter your first name: ";
  std::string name;
  std::cin >> name;
  
  std::cout << "Hello, " + name + "!" << std::endl;
  return 0;
}
```

- **变量**：具有名称的对象。有的对象可能没有名称。
- **对象**是计算机中一段具有类型的内存空间。
- 定义变量，**名称** + **类型**， `std::string name` 定义了一个类型为 `std::string` 的变量 `name`
- `std::string` 定义在标准头 `<string>` 中，变量 name 定义在 main 函数中，表示 name 是一个 **局部变量**
- 局部变量的生存期是大括号内
- **接口**是某类型对象可实现操作的集合
- 定义一个类型为`string`的具名对象 name，则表示能够对 name 做库所允许对`string`类型对象做的所有操作
- 其中一个操作是初始化，标准库要求每一个`string`类型对象都有一个初始值，这意味着如果不显示为`string`类型对象指定值，则系统环境会对该对象进行**隐式初始化**，这样的对象就是一个不含任何字符的**空串**。
- **输入语句**
	- 就`std::cin >> name`而言，`>>`运算符会从**标准输入**读入一个字符串并将其存储在 name 变量中。该表达式的结果是`std::cin`，这表明其也支持**链式调用**。
	- 它会略去输入开始所碰到的**空白字符**（例如换行符、制表符等等），之后会连续读入**字符**到变量 name 中，直到遇到其他空白字符或**文件结束标记**。
- **缓冲区(buffer)**
	- 通常，输入/输出操作会将它的输出保存在**缓冲区**这样的内部数据结构中。
	- 缓冲区是用来优化输出操作的，只有在**必要的时候**，系统才会把缓冲区的内容写入到输出装置中，从而**刷新缓冲区**。这样就可以把几个输出操作合并到一个单独的写操作中了。
	- **缓冲区刷新**
		- 缓冲区满了
		- 请求从**标准输入**中读取数据
		- 明确要求刷新，如 `std::flush` , `std::endl`

### 1.2 为姓名装框

```cpp
#include <iostream>
#include <string>

int main()
{
  std::cout << "Please enter your first name: ";
  std::string name;
  std::cin >> name;
  
 	const std::string greeting = "Hello, " + name + "!";
  const std::string spaces(greeting.size(), ' ');
  const std::string second = "* " + spaces + " *";
  const std::string first(second.size(), '*');
  
  
  std::cout << std::endl;
  std::cout << first << std::endl;
  std::cout << second << std::endl;
  std::cout << "* " + greeting + " *" << std::endl;
  std::cout << second << std::endl;
  std::cout << first << std::endl;
  return 0;
}
```

- C++ 允许使用`+`**连接**一个字符串和一个字符串直接量或两个字符串。例如：`"Hello, " + name + "!"`。
- 但 `+` 不允许连接两个字符串直接量。如 `cout << "hello," + "world" << end;` (error!!)
- **运算符重载:** 如果一个运算符对于不同类型的操作数来说具有不同的含义，那么我们就说这个运算符被重载了，本例中 `+` 可以用于数学计算也可以用于字符串的连接，所以 `+` 被重载了。
- `const` : 用于表示**常量**的关键字，对常量定义的**同时**必须对其进行初始化，否则将不会再有机会对其进行初始化，因为系统环境会对`string`类型对象进行**隐式初始化**，而常量的值不允许修改。
- 另外注意到 `const std::string greeting = "Hello, " + name + "!"` ，这表示对常量的初始化值**不必**是一个常量。(name 是变量)
- **成员函数：** `greeting.size()` , `string` 类型对象内部有一个成员 size 函数
- **字符直接量：** 单引号 `' '` 用来表示字符直接量。其所对应的内建类型为 `char` 。
- C++ 允许根据一个整数值和一个字符值来**构造字符串**。
- 例如`std::string stars(10, '*')`定义一个包含有10个`'*'`字符的字符串 starts 。

### 1.3 小结

## Chapter 2

### 2.1 问题

```cpp
#include <iostream>
#include <string>

// say what standard-library names we use
using std::cin;         using std::endl;
using std::cout;        using std::string;


int main()
{
	// ask for the person's name
	cout << "Please enter your first name: ";

	// read the name
	string name;
	cin >> name;

	// build the message that we intend to write
	const string greeting = "Hello, " + name + "!";

	// the number of blanks surrounding the greeting
	const int pad = 1;

	// the number of rows and columns to write
	const int rows = pad * 2 + 3;
	const string::size_type cols = greeting.size() + pad * 2 + 2;

	// write a blank line to separate the output from the input
	cout << endl;

	// write `rows' rows of output
	// invariant: we have written `r' rows so far
	for (int r = 0; r != rows; ++r) {

		string::size_type c = 0;

		// invariant: we have written `c' characters so far in the current row
		while (c != cols) {

			// is it time to write the greeting?
			if (r == pad + 1 && c == pad + 1) {
				cout << greeting;
				c += greeting.size();
			} else {

				// are we on the border?
				if (r == 0 || r == rows - 1 ||
				    c == 0 || c == cols - 1)
					cout << "*";
				else
					cout << " ";
				++c;
			}
		}

		cout << endl;
	}

	return 0;
}

```

### 2.2 程序的整体结构

### 2.3 输出数目未知的行

### 2.4 输出一行

### 2.5 完整的框架程序

- **using 声明**： `using std::cout`这个声明可以实现**仅一次**的说明`cout`这个名称是来自于`std`这个名称空间的，从而**避免重复使用`std::`**，当然这同时隐含着 " 我们不会定义自己的`cout` " 这一信息
- 使用`using`声明的名称与其他名称具有同样的特性，例如在大括号中使用`using`声明的名称其生存期自定义开始，到大括号结束。
- **短路现象**：
	- `condition1 || condition2` ,如果 condition1 为真，后续不再执行
	- `condition1 && condition2` ,如果 condition1 为假，后续不再执行

### 2.6 计数

### 2.7 小结

- 操作数组合方式--运算符的优先级和结合性决定。
- 操作数怎样被转换为其他类型
- 操作数的运算次序
