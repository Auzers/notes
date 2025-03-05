---
tags:
  - programming language
---

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

## Chapter 3

```cpp
#include <iostream>
#include <string>
#include <ios>
#include <iomanip>
using std::cout; using std::string; 
using std::cin; using std::endl; 
using std::streamsize;  using std::setprecision;

int main()
{
  cout << "Please enter your first name: ";
  string name;
  cin >> name;
  cout << "Hello, " << name << "!" << endl;

  cout << "Please enter your midterm and final exam grades: ";
  double midterm, final;
  cin >> midterm >> final;

  cout << "Enter all your homework grades, "
          "followed by end-of-file: ";
  int count = 0;
  double sum = 0;
  double x;
  while (cin >> x) {
    ++count;
    sum += x;
  }

  streamsize prec = cout.precision();
  cout << "Your final grade is " << setprecision(3)
       << 0.2 * midterm + 0.4 * final + 0.4 * sum / count
       << setprecision(prec) << endl;

  return 0;
}
```

### 3.1 计算学生成绩

- 两个以上字符串直接量仅仅被空白符分隔开，那么这些字符串直接量就会被自动连接到一起。

```cpp
cout << "Enter all your homework grades, "
          "followed by end-of-file: ";
```

和

```cpp
cout << "Enter all your homework grades, followed by end-of-file: ";
```

等价。

- **缺省初始化**
	- 对于自定义类型，例如`string`，当我们在声明该类型变量的同时不进行初始化赋值操作，则该类型会自动的被隐含初始化为空字符串。
	- 但是定义**内置类型的局部变量**时，系统并不会提供该便利。这意味着我们在定义基本类型的变量时，需要手动为其进行初始化，否则可能会导致程序出现意想不到的错误。
	- 错误指：系统给这些变量分配适当的内存单元，而变量的值就有这些单元中的随机信息组成。
- `setprecision`
	- 位于头文件`<iomanip>`中，用于指明输出所包含的有效位数。
	- 是一个控制器，为流的后继输出设置了一个特定的**有效位数**
- `streamsize`
	- 位于头文件`<ios>`中，输入输出使用该类型表示长度
- `precision` 
	- cout 的成员函数，用于返回流在输出浮点数时所使用的精度。
- `cin >> x` 作为条件：
	- 类 istream 提供了一个转换来把 cin 转换成一个可以在条件中使用的值。
	- 用 cin 作为条件等价于检测最近一次从 cin 读数据的尝试是否成功。
	- 以下情况可能会失败
		- 到达输入文件的末尾
		- 输入和试图读取的变量不一致
		- 系统在输入装置中检测到一个硬件问题

### 3.2 中值代替平均值

```cpp
#include <algorithm>
#include <iomanip>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using std::cin;             using std::sort;
using std::cout;            using std::streamsize;
using std::endl;            using std::string;
using std::setprecision;    using std::vector;

int main()
{
	// ask for and read the student's name
	cout << "Please enter your first name: ";
	string name;
	cin >> name;
	cout << "Hello, " << name << "!" << endl;

	// ask for and read the midterm and final grades
	cout << "Please enter your midterm and final exam grades: ";
	double midterm, final;
	cin >> midterm >> final;

	// ask for and read the homework grades
	cout << "Enter all your homework grades, "
	        "followed by end-of-file: ";

	vector<double> homework;
	double x;
	// invariant: `homework' contains all the homework grades read so far
	while (cin >> x)
		homework.push_back(x);

	// check that the student entered some homework grades
	typedef vector<double>::size_type vec_sz;
	vec_sz size = homework.size();
	if (size == 0) {
		cout << endl << "You must enter your grades.  "
		                "Please try again." << endl;	
		return 1;
	}

	// sort the grades
	sort(homework.begin(), homework.end());

	// compute the median homework grade
	vec_sz mid = size/2;
	double median;
	median = size % 2 == 0 ? (homework[mid] + homework[mid-1]) / 2
	                       : homework[mid];

	// compute and write the final grade
	streamsize prec = cout.precision();
	cout << "Your final grade is " << setprecision(3)
	     << 0.2 * midterm + 0.4 * final + 0.4 * median
	     << setprecision(prec) << endl;

	return 0;
}

```

- 中值避免了一些糟糕的成绩让平均成绩下降太多
- `vector` 类型表示向量，长度可变
- `vector<double>::size_type` 是一个 unsigned 类型，保存向量长度。
- `type_def` 把 vec_sz 设置成了 `vector<double>::size_type` 的替代名
- sort -- 排序
- 普通整数和无符号整数结合，普通整数会被转换成无符号整数
- C++ 强调速度，为注重性能的应用服务

## Chapter 4

### 4.1 组织计算

```cpp
#include <stdexcept>
#include <vector>
#include "grade.h"
#include "median.h"
#include "Student_info.h"

using std::domain_error;  using std::vector;


// compute a student's overall grade from midterm and final exam grades and homework grade
double grade(double midterm, double final, double homework)
{
	return 0.2 * midterm + 0.4 * final + 0.4 * homework;
}

// compute a student's overall grade from midterm and final exam grades
// and vector of homework grades.
// this function does not copy its argument, because `median' does so for us.
double grade(double midterm, double final, const vector<double>& hw)
{
	if (hw.size() == 0)
		throw domain_error("student has done no homework");
	return grade(midterm, final, median(hw));
}

double grade(const Student_info& s)
{
	return grade(s.midterm, s.final, s.homework);
}

```

- **按值调用**: 参数获得的只是参数值的一个复制，`double grade(double midterm, double final, double homework)`
- **引用**： `vector<double>& hw` 对 hw 操作相当于对 homework 操作
- **异常**： 

```cpp
if (hw.size() == 0)
		throw domain_error("student has done no homework");
```

- 如果向量为空就**抛出一个异常**，程序会在抛出异常的地方**中止执行**并转移到程序的另一部分(类似python 中的 try-except 语句)，并向这一部分提供一个**异常对象**
- `domain_error` 告诉我们取值有问题，我们自定义字符串描述错误信息
- **左值参数**：指示非临时变量的值

**读取逻辑优化**

```cpp
// read homework grades from an input stream into a `vector<double>'
istream& read_hw(istream& in, vector<double>& hw)
{
	if (in) {
		// get rid of previous contents
		hw.clear();

		// read homework grades
		double x;
		while (in >> x)
			hw.push_back(x);

		// clear the stream so that input will work for the next student
		in.clear(); // avoid failure by wrong input
	}
	return in;
}

```

- `vector<double>& hw` 是引用，节省了复制的开销
- 三种参数类型
	- `vector<double>` 
	- `const vector<double>`
	- `vector<double>&`
- `try-catch` 语句示例

```cpp
try {
		double final_grade = grade(midterm, final, homework);
		streamsize prec = cout.precision();
		cout << "Your final grade is " << setprecision(3)
		     << final_grade << setprecision(prec) << endl;
	} catch (domain_error) {
		cout << endl << "You must enter your grades.  "
			"Please try again." << endl;
		return 1;
	}
```

- **保证一条语句的副作用个数不会超过一个**，抛出一个异常是一个副作用，因此在一条可能会引发异常的语句中不应该再出现任何其他的副作用，尤其是哪些包含有输入和输出的语句。上面的语句满足了这个要求，**没有把 final_grade 放入输入输出语句中**。

### 4.2 组织数据

```cpp
int main()
{
    vector<Student_info> students;
    student_info record;
    string::size_type maxlen = 0;

    //读并存储所有的记录，然后找出最长的姓名的长度
    while(read(cin, record))
    {
        maxlen = max(maxlen, record.name.size());
        students.push_back(record);
    }

    //按字母顺序排列记录
    sort(Students.begin(), students.end(), compare);
    for (vector<Student_info>::size_type i = 0; i != students.size(); i++)
    {
        //输出姓名，填充姓名以达到maxlen + 1的长度
        cout << setw(maxlen + 1) << students[i].name;
    }

    //计算并输出成绩
    try
    {
        double final_grade = grade(students[i]);
        streamsize prec = cout.precision();
        cout << setprecision(3) << final_grade << setprecision(prec);
    }
    catch(domain_error e){
        cout << e.what();
    }
    cout << endl;

    return 0;
}
```

- max 函数在 `algorithm` 中定义
- e 是异常的名称，这样就可以输出 what() 中的信息。

### 4.3 把各部分代码连接到一起

- 组装 median 函数

```cpp
// median 函数的源文件 -- median.cpp
#include <algorithm>    // to get the declaration of `sort'
#include <stdexcept>    // to get the declaration of `domain_error'
#include <vector>       // to get the declaration of `vector'

using std::domain_error;   using std::sort;   using std::vector;

#include "median.h"

// compute the median of a `vector<double>'
// note that calling this function copies the entire argument `vector'
double median(vector<double> vec)
{
	typedef vector<double>::size_type vec_sz;

	vec_sz size = vec.size();
	if (size == 0)
		throw domain_error("median of an empty vector");

	sort(vec.begin(), vec.end());

	vec_sz mid = size/2;

	return size % 2 == 0 ? (vec[mid] + vec[mid-1]) / 2 : vec[mid];
}

```

- 需要包含 median 函数使用的所有名称的声明。
- 如何在别的文件使用 median 函数

```cpp
#include "median.h"
int main {/* */}
```

- 自己的文件称作**头文件**，系统环境提供的头文件称作**标准头**

```cpp
//median.h 最终形式
#ifndef GUARD_median_h
#define GUARD_median_h
#include <vector>
double median(std::vector<double>);

#endif

```

- 头文件应该有什么
	- median 的声明
		- 保证 vector 可用，所以要有 vector 头
		- 头文件应该使用完整的限定名而不是 using 声明
	- `#ifndef` 检查 median.h 是否被重复包含，必须位于文件的第一行

### 4.4 把计算成绩的程序分块

```cpp
#ifndef GUARD_Student_info
#define GUARD_Student_info

// `Student_info.h' 头文件
#include <iostream>
#include <string>
#include <vector>

struct Student_info {
	std::string name;
	double midterm, final;
	std::vector<double> homework;
};

bool compare(const Student_info&, const Student_info&);
std::istream& read(std::istream&, Student_info&);
std::istream& read_hw(std::istream&, std::vector<double>&);
#endif

```

```cpp
// median.cpp 源文件
#include "Student_info.h"

using std::istream;  using std::vector;

bool compare(const Student_info& x, const Student_info& y)
{
	return x.name < y.name;
}

istream& read(istream& is, Student_info& s)
{
	// read and store the student's name and midterm and final exam grades
	is >> s.name >> s.midterm >> s.final;

	read_hw(is, s.homework);  // read and store all the student's homework grades
	return is;
}

// read homework grades from an input stream into a `vector<double>'
istream& read_hw(istream& in, vector<double>& hw)
{
	if (in) {
		// get rid of previous contents
		hw.clear();

		// read homework grades
		double x;
		while (in >> x)
			hw.push_back(x);

		// clear the stream so that input will work for the next student
		in.clear();
	}
	return in;
}
```

- 源文件中包含头文件可以检查声明和定义是否一致

### 4.5 修正后的计算成绩的程序

```cpp
#include <algorithm>
#include <iomanip>
#include <ios>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>
#include "grade.h"
#include "Student_info.h"

using std::cin;                     using std::setprecision;
using std::cout;                    using std::sort;
using std::domain_error;            using std::streamsize;
using std::endl;                    using std::string;
using std::max;                     using std::vector;

int main()
{
	vector<Student_info> students;
	Student_info record;
	string::size_type maxlen = 0;       // the length of the longest name

	// read and store all the students' data.
	// Invariant:	`students' contains all the student records read so far
	//			`maxlen' contains the length of the longest name in `students'
	while (read(cin, record)) {
		// find length of longest name
		maxlen = max(maxlen, record.name.size());
		students.push_back(record);
	}

	// alphabetize the student records
	sort(students.begin(), students.end(), compare);

	// write the names and grades
	for (vector<Student_info>::size_type i = 0;
	     i != students.size(); ++i) {

		// write the name, padded on the right to `maxlen' `+' `1' characters
		cout << students[i].name
		     << string(maxlen + 1 - students[i].name.size(), ' ');

		// compute and write the grade
		try {
			double final_grade = grade(students[i]);
			streamsize prec = cout.precision();
			cout << setprecision(3) << final_grade
			     << setprecision(prec);
		} catch (domain_error e) {
			cout << e.what();
		}
		cout << endl;
	}
	return 0;
}

```

### 4.6 小结

- `#include <系统头>` ：系统头可能不是以文件的形式实现的
- `#include "自定义头文件"` ：通常有后缀 `.h`
- 结构的定义在每一个源文件中只可以出现一次，因此它应该出现在一个有适当防护措施的头文件中。

## Chapter 5

### 5.1 按类别来区分学生

- 在除了向量结尾的其他地方插入或删除元素的开销可能会很大

### 5.2 迭代器

- **迭代器**(iterator)能够
	- 识别一个容器以及容器中的一个元素
	- 检查存储在这个元素中的值
	- 提供操作来移动在容器中的元素
	- 采用对应于容器所能够有效处理的方式来对可用的操作进行约束

```cpp
for (vector<Student_info>::size_type i = 0; i!= students.sizes(); ++i) 
	cout << students[i].name << endl;
// OR
for (vector<Student_info>::const_iterator iter = students.begin(); iter != students.end(); ++iter)
	cout << (*iter).name << endl;
```

- 每一个标准容器都定义了两种相关的迭代器类型
	- `container-type::const_iterator` 如果仅仅读选用这个
	- `container-type::iterator`
- `(*iter).name` 可以写为 `iter->name`

### 5.3 用迭代器代替索引

- `iter = students.erase(iter)` 只是删除 iter 会使迭代器失效，因为 iter 指向的元素已经消失了，这个语句会让 iter 指向被删除元素后面的的那个元素。

### 5.4 重新思考数据结构以实现更好的性能

### 5.5 list 类型

- list 类型在 `<list>` 头文件中定义
- list 不支持索引，但是支持迭代器
- 对 list 来说，erase 和 push_back 操作不会使指向其他元素的迭代器失效，只有指向已被删除的元素的迭代器才会失效。
- 不能使用标准库的 sort 函数来为存储在 list 中的值排序。

这是 list 类提供的 sort 成员函数

```cpp
list<Student_info> students
students.sort(compare);
```

对比 vector

```cpp
vector<Student_info> students;
sort(students.begin(), students.end(), compare);
```

- 小规模输入 list 效率要比 vector 低
- 大规模的输入，vector 性能会飞速下降

### 5.6 分割字符串

- substr 是 string 类的一个成员
	- 从第一个参数给定的索引开始复制字符，复制的字符个数由第二个参数指定。

### 5.7 测试 split 函数

```cpp
int main()
{
	string s;

	// read and split each line of input
	while (getline(cin, s)) {
		vector<string> v = split(s);

		// write each word in `v'
		for (vector<string>::size_type i = 0; i != v.size(); ++i)
			cout << v[i] << endl;
	}
	return 0;
}

```

- `getline` : 
	- 第一个参数是一个输入流，第二个参数是一个字符串引用，作用是把从输入流中读取到的数据存在字符串引用中。
	- 返回值逻辑和 cin 相同
	- 读取一行输入

### 5.8 连接字符串
