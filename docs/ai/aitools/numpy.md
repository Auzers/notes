---
tags:
    - tools
---

# NumPy

## 1 Numpy是什么

NumPy 是 Python 语言的一个扩展程序库，主要用于数组计算。它具有以下

## 2 ndarray 对象

### 2.1 基本概念

`ndarray` 是 NumPy 最重要的特性，它具有以下特点：

- 所有元素必须是相同类型
- 从0开始索引
- 在内存中是连续存储的

### 2.2 内部结构

`ndarray` 内部由以下组件构成：

- 数据指针：指向实际数据的内存位置
- `dtype`：描述数组中元素的数据类型
- `shape`：表示数组每个维度大小的元组
- `stride`：在内存中跳转到下一个元素需要的字节数

### 2.3 创建数组

#### 2.3.1 使用 array() 函数

```python
import numpy as np

# 从列表创建数组
arr1 = np.array([1, 2, 3])

# 从嵌套列表创建二维数组
arr2 = np.array([[1, 2], [3, 4]])

# 指定数据类型
arr3 = np.array([1, 2, 3], dtype=float)
```

#### 2.3.2 特殊数组创建函数

```python
# 创建全0数组
zeros = np.zeros((2, 3))  # 2行3列的零矩阵

# 创建全1数组
ones = np.ones((2, 3))    # 2行3列的1矩阵

# 创建未初始化数组
empty = np.empty((2, 3))  # 2行3列的未初始化矩阵

# 创建等差数列
arange = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
```

### 2.4 数组属性

主要的数组属性包括：

| 属性               | 说明                                  |
| ------------------ | ------------------------------------- |
| `ndarray.ndim`     | 维度数量（秩）                        |
| `ndarray.shape`    | 数组形状，如 `(2, 3)` 表示2行3列      |
| `ndarray.size`     | 元素总数，等于 shape 中所有数字的乘积 |
| `ndarray.dtype`    | 元素类型，如 `int32`, `float64` 等    |
| `ndarray.itemsize` | 每个元素占用的字节数                  |

```python
import numpy as np
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(f"维度数: {arr.ndim}")        # 2
print(f"形状: {arr.shape}")         # (2, 3)
print(f"元素总数: {arr.size}")      # 6
print(f"数据类型: {arr.dtype}")     # int64
```

## 3 数组操作

### 3.1 索引和切片

NumPy 数组支持和 Python 列表类似的索引操作：

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])

# 基本索引
print(arr[0])     # 1
print(arr[-1])    # 5

# 切片
print(arr[1:4])   # [2 3 4]
print(arr[::2])   # [1 3 5]

# 多维数组索引
arr2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2d[0, 1])    # 2
print(arr2d[1, :])    # [4 5 6]
```

### 3.2 形状操作

#### 3.2.1 改变数组形状

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5, 6])

# reshape
arr_2d = arr.reshape(2, 3)
print(arr_2d)  # [[1 2 3]
               #  [4 5 6]]

# flatten
arr_flat = arr_2d.flatten()
print(arr_flat)  # [1 2 3 4 5 6]
```

#### 3.2.2 数组转置

```python
import numpy as np
arr = np.array([[1, 2, 3], [4, 5, 6]])

# 转置
arr_t = arr.T
print(arr_t)  # [[1 4]
              #  [2 5]
              #  [3 6]]
```

## 4 数组运算

### 4.1 基本运算

NumPy 数组支持直接进行数学运算：

```python
import numpy as np
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])

# 加法
print(arr1 + arr2)  # [5 7 9]

# 减法
print(arr2 - arr1)  # [3 3 3]

# 乘法（元素级）
print(arr1 * arr2)  # [4 10 18]

# 除法
print(arr2 / arr1)  # [4. 2.5 2.]
```

### 4.2 统计运算

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])

print(f"和: {arr.sum()}")       # 15
print(f"平均值: {arr.mean()}")  # 3.0
print(f"最大值: {arr.max()}")   # 5
print(f"最小值: {arr.min()}")   # 1
print(f"标准差: {arr.std()}")   # 1.4142135623730951
```

## 5 布尔索引

布尔索引是 NumPy 的一个强大特性，允许我们使用布尔数组来索引：

```python
import numpy as np
arr = np.array([0, 1, 2, 3, 4, 5])

# 创建布尔掩码
mask = arr > 2
print(mask)  # [False False False True True True]

# 使用布尔掩码索引
print(arr[mask])  # [3 4 5]

# 组合条件
print(arr[(arr > 2) & (arr < 5)])  # [3 4]
```

## 6 广播（Broadcasting）

广播是 NumPy 中的一个强大特性，它允许不同形状的数组进行运算。

### 6.1 广播规则

1. 让所有输入数组都向其中形状最长的数组看齐，形状中不足的部分都通过在前面加 1 补齐
2. 输出数组的形状是输入数组形状的各个维度上的最大值
3. 如果输入数组的某个维度和输出数组的对应维度的长度相同或者其长度为 1 时，这个数组能够用来计算
4. 当输入数组的某个维度的长度为 1 时，沿着此维度运算时都用此维度上的第一组值

```python
import numpy as np

# 示例1：标量与数组的广播
arr = np.array([1, 2, 3, 4])
print(arr * 2)  # [2 4 6 8]

# 示例2：不同形状数组的广播
a = np.array([[1, 2, 3],
              [4, 5, 6]])  # shape: (2, 3)
b = np.array([10, 20, 30])  # shape: (3,)
print(a + b)  # [[11 22 33]
              #  [14 25 36]]
```

### 6.2 广播的条件

两个数组能够广播的条件是：

1. 数组拥有相同形状，或
2. 其中一个数组的维度为 1，或
3. 其中一个数组的某个维度缺失

```python
import numpy as np

# 合法的广播
a = np.array([[1], [2], [3]])  # shape: (3, 1)
b = np.array([4, 5, 6])        # shape: (3,)
print(a + b)  # [[5 6 7]
              #  [6 7 8]
              #  [7 8 9]]

# 不合法的广播会引发错误
a = np.array([[1, 2], [3, 4]])  # shape: (2, 2)
b = np.array([1, 2, 3])         # shape: (3,)
# print(a + b)  # ValueError: operands could not be broadcast together
```

## 7 数组操作

### 7.1 数组变形

NumPy 提供了多种改变数组形状的方法：

```python
import numpy as np

arr = np.array([[1, 2], [3, 4], [5, 6]])

# 转置
print(arr.T)  # [[1 3 5]
              #  [2 4 6]]

# 重塑形状
print(arr.reshape(2, 3))  # [[1 2 3]
                         #  [4 5 6]]

# 展平数组
print(arr.flatten())  # [1 2 3 4 5 6]

# 添加新轴
print(arr[np.newaxis, :].shape)  # (1, 3, 2)
```

### 7.2 数组合并和分割

#### 7.2.1 合并操作

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# 垂直堆叠
print(np.vstack((a, b)))  # [[1 2]
                         #  [3 4]
                         #  [5 6]
                         #  [7 8]]

# 水平堆叠
print(np.hstack((a, b)))  # [[1 2 5 6]
                         #  [3 4 7 8]]

# 深度堆叠
print(np.dstack((a, b)))  # [[[1 5]
                         #   [2 6]]
                         #  [[3 7]
                         #   [4 8]]]
```

#### 7.2.2 分割操作

```python
import numpy as np

arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

# 垂直分割
v1, v2 = np.vsplit(arr, 2)  # 分成两部分

# 水平分割
h1, h2 = np.hsplit(arr, 2)  # 分成两部分

# 按指定位置分割
parts = np.split(arr, [1, 2], axis=0)  # 在位置1和2处分割
```

## 8 数学运算

### 8.1 基本数学函数

NumPy 提供了大量的数学函数：

```python
import numpy as np

arr = np.array([1, 4, 9, 16, 25])

# 基本运算
print(np.sqrt(arr))  # [1. 2. 3. 4. 5.]
print(np.exp(arr))   # 指数
print(np.log(arr))   # 自然对数
print(np.sin(arr))   # 正弦
print(np.cos(arr))   # 余弦

# 舍入函数
print(np.round(3.14159, 2))  # 3.14
print(np.floor([3.7, 2.1]))  # [3. 2.]
print(np.ceil([3.7, 2.1]))   # [4. 3.]
```

### 8.2 统计函数

```python
import numpy as np

arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# 基本统计
print(f"总和: {arr.sum()}")           # 45
print(f"平均值: {arr.mean()}")        # 5.0
print(f"标准差: {arr.std()}")         # 2.582...
print(f"方差: {arr.var()}")           # 6.666...
print(f"最小值: {arr.min()}")         # 1
print(f"最大值: {arr.max()}")         # 9

# 按轴统计
print(f"列和: {arr.sum(axis=0)}")     # [12 15 18]
print(f"行和: {arr.sum(axis=1)}")     # [6 15 24]
```

## 9 线性代数

NumPy 提供了丰富的线性代数运算功能：

```python
import numpy as np

# 创建矩阵
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# 矩阵乘法
print(np.dot(A, B))      # 矩阵乘法
print(A @ B)             # 与 dot 相同

# 特征值和特征向量
eigenvals, eigenvecs = np.linalg.eig(A)
print(f"特征值: {eigenvals}")
print(f"特征向量: {eigenvecs}")

# 求解线性方程组 Ax = b
b = np.array([1, 2])
x = np.linalg.solve(A, b)
print(f"方程解: {x}")

# 矩阵分解
U, s, Vh = np.linalg.svd(A)  # 奇异值分解
print(f"奇异值: {s}")
```

## 10 高级索引

### 10.1 整数索引

```python
import numpy as np

arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# 使用整数数组进行索引
indices = np.array([[0, 1], [1, 2]])
print(arr[indices])  # 选择指定位置的元素

# 使用多个索引数组
rows = np.array([0, 2])
cols = np.array([0, 2])
print(arr[rows, cols])  # [1 9]
```

### 10.2 布尔索引进阶

```python
import numpy as np

arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# 条件索引
mask = arr > 5
print(arr[mask])  # [6 7 8 9]

# 组合条件
complex_mask = (arr > 3) & (arr < 8)
print(arr[complex_mask])  # [4 5 6 7]

# 替换满足条件的元素
arr[arr % 2 == 0] = 0  # 将偶数替换为0
```




