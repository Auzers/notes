# CS61A_notes

## 1 使用函数构建抽象

### 1.1 开始

### 1.2 编程要素

- 纯函数和非纯函数
	- 非纯函数:除了返回值外，调用一个非纯函数还会产生其他改变解释器和计算机的状态的副作用（side effect）。一个常见的副作用就是使用 `print` 函数产生（非返回值的）额外输出。
	- 纯函数：函数有一些输入（参数）并返回一些输出（调用返回结果）。  
**示例：**

```python
>>> print(print(1),print(2))  
1
2
None None
```

```python
>>> two = print(2)
2
>>> print(two)
None
```

### 1.3 定义新的函数

- 如何定义函数：

```python
def <name>(<formal parameters>):
    return <return expression>
```

**示例：**

```python
>>> def square(x):
	return mul(x,x)
```

- 当函数没有显式return，默认返回None值

**示例：**

```python
>>> def square(x):
...     mul(x,x) 
...
>>> a = square(4)  
>>> print(a)  
None
```

- 一个函数可以有多个返回值  
**示例：**

```python
def divide_exact(n, d):
    return n // d, n % d
a, b = divide_exact(10, 3)
print(a, b)
```

### 1.4 设计函数

#### 1.4.1 文档

函数定义通常包括描述函数的文档，称为“**文档字符串 docstring**”，它必须在函数体中缩进。文档字符串通常使用三个引号，第一行描述函数的任务，随后的几行可以描述参数并解释函数的意图：

```python
>>> def pressure(v, t, n):
        """计算理想气体的压力，单位为帕斯卡

        使用理想气体定律：http://en.wikipedia.org/wiki/Ideal_gas_law

        v -- 气体体积，单位为立方米
        t -- 绝对温度，单位为开尔文
        n -- 气体粒子
        """
        k = 1.38e-23  # 玻尔兹曼常数
        return n * k * t / v
```

当你使用函数名称作为参数调用 `help` 时，你会看到它的文档字符串（键入 q 以退出 Python help）。

```python
>>> help(pressure)
```

编写 Python 程序时，除了最简单的函数之外，都要包含文档字符串。要记住，虽然代码只编写一次，但是会在之后阅读多次。Python 文档包含了 [文档字符串准则](http://www.python.org/dev/peps/pep-0257/)，它会在不同的 Python 项目中保持一致。

注释：Python 中的注释可以附加到 `#` 号后的行尾。例如，上面代码中的注释 `玻尔兹曼常数` 描述了 `k` 变量的含义。这些注释不会出现在 Python 的 `help` 中，而且会被解释器忽略，它们只为人类而存在。

#### 1.4.2 参数默认值

```python
>>> def pressure(v, t, n=6.022e23):
"""计算理想气体的压力，单位为帕斯卡

使用理想气体定律：http://en.wikipedia.org/wiki/Ideal_gas_law

v -- 气体体积，单位为立方米
t -- 绝对温度，单位为开尔文
n -- 气体粒子，默认为一摩尔
"""
k = 1.38e-23  # 玻尔兹曼常数
return n * k * t / v
```

```python
>>> pressure(1, 273.15) 
2269.974834
>>> pressure(1, 273.15, 3 * 6.022e23) 
6809.924502
```

### 1.5 控制

#### 1.5.1 语句

#### 1.5.2 复合语句

#### 1.5.3 定义函数 II：局部赋值

#### 1.5.4 条件语句

**语法:**

```python
if <expression>:
    <suite>
elif <expression>:
    <suite>
else:
    <suite>
```

#### 1.5.5 迭代

**语法:**

```python
while <expression>:
<suite>
```

#### 1.5.6 测试

- `assert` -**断言**：断言（Assertions）：程序员使用 `assert` 语句来验证是否符合预期，例如验证被测试函数的输出。 `assert` 语句在布尔上下文中有一个表达式，后面是一个带引号的文本行（单引号或双引号都可以，但要保持一致）
- 如果表达式的计算结果为假值，则显示该行。
- 当被断言的表达式的计算结果为真值时，执行断言语句无效。而当它是假值时，`assert` 会导致错误，**使程序停止执行。**

**示例：**

```python
def fib(n):
    if n < 2:
        return 1
    else:
        a, b = 1, 1
        while n - 2:
            a, b = b,a + b
            n = n - 1
        return b
def fib_test():
        assert fib(2) == 1, '第二个斐波那契数应该是 1'
        assert fib(3) == 2, '第三个斐波那契数应该是 1'

fib_test()

```

### 1.6 高阶函数

#### 1.6.0 高阶函数的定义

在 Python 中，高阶函数（**Higher-order function**）是指：

1. **接受一个或多个函数作为参数**，或者
2. **返回一个函数作为结果**。

高阶函数的核心思想是：**函数可以像数据一样传递**。你可以将函数作为参数传递给另一个函数，或者将函数作为返回值返回。

**高阶函数的特征**

- **接受函数作为参数**：例如，`map()`、`filter()`、`sorted()` 等内置函数。
- **返回一个函数**：例如，Python 中的装饰器（decorators）就是一个常见的例子。

**课程视频中的部分笔记：**  
不同于平常的 if 控制语句，调用 if_ 这个函数的前会把所有参数求出来

```python
from math import sqrt
def if_(c,t,f):
    if c:
        return t
    else:
        return f
def real_sqrt(x):
    return if_(x >= 0,sqrt(x),0)

print(real_sqrt(-16))
```

**报错！**

```
Traceback (most recent call last):
  File "c:\Users\am\Desktop\python\text.py", line 11, in <module>
    print(real_sqrt(-16))
          ^^^^^^^^^^^^^^
  File "c:\Users\am\Desktop\python\text.py", line 8, in real_sqrt
    return if_(x >= 0,sqrt(x),0)
                      ^^^^^^^
ValueError: math domain error
```

#### 1.6.1 作为参数的函数

**示例：**

```python
>>> def summation(n, term):
        total, k = 0, 1
        while k <= n:
            total, k = total + term(k), k + 1
        return total
>>> def identity(x):
        return x
>>> def sum_naturals(n):
        return summation(n, identity)
>>> sum_naturals(10)
55
```

#### 1.6.2 作为通用方法的函数

- **迭代改进算法通用表达式**

```Python
>>> def improve(update, close, guess=1):
        while not close(guess):
            guess = update(guess)
        return guess
```

**迭代改进算法求黄金分割：**

```python
def improve(update,close,guess=1):
    while not close(guess):
        guess = update(guess)
    return guess

def approx_eq(x,y,tolerance = 1e-15):
    return abs(x - y) < tolerance

def golden_update(x):
    return 1/x + 1

def golden_close(x):
    return approx_eq(x * x,x + 1)

print(improve(golden_update,golden_close))
```

**测试代码：**

```python
from math import sqrt
phi = 1/2 + sqrt(5)/2
def improve_test():
    approx_phi = improve(golden_update, golden_close)
    assert approx_eq(phi, approx_phi), 'phi differs from its approximation'
improve_test()
```

#### 1.6.3 定义函数III: 嵌套定义 

#### 1.6.4 作为返回值的函数

**示例：**

```python
def composel1(f,g):
	def h(x):
		return f(g(x))
	return h
```

#### 1.6.5 示例：牛顿法

#### 1.6.6 柯里化 (Curring)

**示例：pow 函数的柯里化版本**

```python
from math import pow
def curry(x):
    def f(y):
        return pow(x,y)
    return f
h = curry(2)
print(h(3))
print(curry(2)(3))
```

上面的例子手动进行了 pow 函数的柯里化变换，也可以定义函数来了自动进行柯里化以及逆柯里化  
**示例：**

```python
>>> def curry2(f):
        """返回给定的双参数函数的柯里化版本"""
        def g(x):
            def h(y):
                return f(x, y)
            return h
        return g
>>> def uncurry2(g):
        """返回给定的柯里化函数的双参数版本"""
        def f(x, y):
            return g(x)(y)
        return f
>>> pow_curried = curry2(pow)
>>> pow_curried(2)(5)
32
>>> map_to_range(0, 10, pow_curried(2))
1
2
4
8
16
32
64
128
256
512
```

#### 1.6.7 Lambda 表达式

例如复合 f 和 g 两个函数的时候（1.6.3）

```python
def composel1(f,g):
	def h(x):
		return f(g(x))
	return h
```

还可以写作：

```python
def composel1(f,g):
	return lambda x: f(g(x))
```

逻辑如下：

```
lambda              x         :              f(g(x))
"A function that    takes x   and returns    f(g(x))"
```

**PS：更简洁的写法**

```python
composel1 = lambda f,g: lambda x: f(g(x))
```

#### 1.6.8 抽象和一等函数

一般而言，编程语言会对计算元素的操作方式施加限制。拥有最少限制的元素可以获得一等地位（first-class status）。这些一等元素的“权利和特权”包括：

1. 可以与名称绑定
2. 可以作为参数传递给函数
3. 可以作为函数的结果返回
4. 可以包含在数据结构中

Python 授予函数完全的一等地位，由此带来的表达能力的提升是巨大的。

#### 1.6.9 函数装饰器

#### 1.6.10 self-reference

**示例：**

```python 
>>> def print_all(x):
...     print(x)
...     return print_all
...
>>> print_all(1)(2)(100) 
1
2
100
<function print_all at 0x000002E6A80AF560>

>>> def print_sum(x):  
...     print(x)
...     def h(y): 
...             return print_sum(x + y)
...     return h
...
>>> print_sum(1)(3)(3)(5)
1
4
7
12
<function print_sum.<locals>.h at 0x000002E6A80AF6A0>
```

### 1.7 递归函数

#### 1.7.1 递归函数剖析

#### 1.7.2 互递归

#### 1.7.3 递归函数中的打印

#### 1.7.4 树递归

#### 1.7.5 示例：分割数

求正整数 n 的分割数，最大部分为 m，即 n 可以分割为不大于 m 的正整数的和，并且按递增顺序排列。例如，使用 4 作为最大数对 6 进行分割的方式有 9 种。

```
1.  6 = 2 + 4
2.  6 = 1 + 1 + 4
3.  6 = 3 + 3
4.  6 = 1 + 2 + 3
5.  6 = 1 + 1 + 1 + 3
6.  6 = 2 + 2 + 2
7.  6 = 1 + 1 + 2 + 2
8.  6 = 1 + 1 + 1 + 1 + 2
9.  6 = 1 + 1 + 1 + 1 + 1 + 1
```

我们将定义一个名为 `count_partitions(n, m)` 的函数，该函数返回使用 `m` 作为最大部分对 n 进行分割的方式的数量。这个函数有一个使用树递归的简单的解法，它基于以下的观察结果：

使用最大数为 m 的整数分割 n 的方式的数量等于

1. 使用最大数为 m 的整数分割 n-m 的方式的数量，加上
2. 使用最大数为 m-1 的整数分割 n 的方式的数量

要理解为什么上面的方法是正确的，我们可以将 n 的所有分割方式分为两组：至少包含一个 m 的和不包含 m 的。此外，第一组中的每次分割都是对 n-m 的分割，然后在最后加上 m。在上面的实例中，前两种拆分包含 4，而其余的不包含。

因此，我们可以递归地将使用最大数为 m 的整数分割 n 的问题转化为两个较简单的问题：① 使用最大数为 m 的整数分割更小的数字 n-m，以及 ② 使用最大数为 m-1 的整数分割 n。

为了实现它，我们需要指定以下的基线情况：

1. 整数 0 只有一种分割方式
2. 负整数 n 无法分割，即 0 种方式
3. 任何大于 0 的正整数 n 使用 0 或更小的部分进行分割的方式数量为 0

**示例：**

```python
>>> def count_partitions(n, m):
        """计算使用最大数 m 的整数分割 n 的方式的数量"""
        if n == 0:
            return 1
        elif n < 0:
            return 0
        elif m == 0:
            return 0
        else:
            return count_partitions(n-m, m) + count_partitions(n, m-1)

>>> count_partitions(6, 4)
9
>>> count_partitions(5, 5)
7
>>> count_partitions(10, 10)
42
>>> count_partitions(15, 15)
176
>>> count_partitions(20, 20)
627

```

## 2 使用数据构建抽象

### 2.1 引言

![Image](https://www.helloimg.com/i/2025/01/29/6799b9eb7f363.png)

## 参考文献
