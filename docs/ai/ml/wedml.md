---
tags:
    - AI
    - course notes
---

!!! note ""
    - 还没写完
	- @start 2025.3.9
	- @end...
	- 相关资源
    	- [课程视频](https://www.bilibili.com/video/BV1MN4y1S7DE/?p=20&share_source=copy_web&vd_source=5d7da9075f18e5d133f46c25ab52f885)
    	- [课程仓库](https://github.com/greyhatguy007/Machine-Learning-Specialization-Coursera)
    	- [吴恩达《机器学习》课程笔记](https://kyonhuang.top/Andrew-Ng-Machine-Learning-notes/#/)
  	- 本地安装 Jupyter notebook 搭配仓库就够用了(尽量支持 [coursera 正版课](https://www.coursera.org/specializations/machine-learning-introduction) )

  
  

## 什么是机器学习

- 机器学习
	- 监督学习 (supervised learning)
	- 无监督学习 (unsupervised learning)

### 监督学习

- **监督学习**
	- 回归 (regression): 通过输入预测一个连续值(结果有无限多个可能)
	- 分类 (classification): 通过输入预测一个离散值 (从有限的可能中选择)
- **总结**：投喂的数据集**有标签**，让机器从中学习映射关系

### 无监督学习

- 投喂的数据集**没有标签**，机器靠数据的特征分析模式，发现隐藏的结构，不会像监督学习产生预测值。比如投喂一些动物图片，机器根据图片特征把这些图片分成几类(聚类算法-clustering)。
- 另外的算法还有降维(PCA)、异常检测等

## 线性回归模型


### 成本函数 

- 引入这个函数的目的：用于衡量模型预测的好坏

$$
J(w, b) = \frac{1}{2m} \sum_{i=1}^{m} \left( f_{w,b}(x^{(i)}) - y^{(i)} \right)^2
$$

### 梯度下降 (gradient descent)

- 本节讨论的实际是**批量梯度下降** ("Batch" gradient descent)
- 计算从 $j$ 值高点到 $j$ 值低点所走的最优路径

$$
\begin{equation*}
\left\{
\begin{aligned}
tmp\_w &= w - \alpha \frac{\partial}{\partial w} J(w, b) \\
tmp\_b &= b - \alpha \frac{\partial}{\partial b} J(w, b) \\
w &= tmp\_w \\
b &= tmp\_b
\end{aligned}
\right.
\end{equation*}
$$

$$
\begin{align*} \text{repeat}&\text{ until convergence:} \; \lbrace \newline
\;  w &= w -  \alpha \frac{\partial J(w,b)}{\partial w} \tag{3}  \; \newline 
 b &= b -  \alpha \frac{\partial J(w,b)}{\partial b}  \newline \rbrace
\end{align*}
$$

- 下面是求偏导的结果

$$
\begin{align}
\frac{\partial J(w,b)}{\partial w}  &= \frac{1}{m} \sum\limits_{i = 0}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)})x^{(i)} \tag{4}\\
  \frac{\partial J(w,b)}{\partial b}  &= \frac{1}{m} \sum\limits_{i = 0}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)}) \tag{5}\\
\end{align}
$$

- 越接近 $j(w, b)$ 的最小值，梯度下降越慢

#### 学习率 (learing rate)

- 如果 $\alpha$ 过小，所需的调整次数会增加
- 如果 $\alpha$ 过大，梯度下降可能无法收敛 

#### 可能存在的问题

- 局部最小不是全局最小 

#### 拟合过程

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250309193200829.png)

### @@ 梯度下降代码实现

```python
import math, copy
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('./deeplearning.mplstyle')
from lab_utils_uni import plt_house_x, plt_contour_wgrad, plt_divergence, plt_gradients

# Load our data set
x_train = np.array([1.0, 2.0])   #features
y_train = np.array([300.0, 500.0])   #target value

#Function to calculate the cost
def compute_cost(x, y, w, b):
   
    m = x.shape[0] 
    cost = 0
    
    for i in range(m):
        f_wb = w * x[i] + b
        cost = cost + (f_wb - y[i])**2
    total_cost = 1 / (2 * m) * cost

    return total_cost

def compute_gradient(x, y, w, b): 
    # Number of training examples
    m = x.shape[0]    
    dj_dw = 0
    dj_db = 0
    
    for i in range(m):  
        f_wb = w * x[i] + b 
        dj_dw_i = (f_wb - y[i]) * x[i] 
        dj_db_i = f_wb - y[i] 
        dj_db += dj_db_i
        dj_dw += dj_dw_i 
    dj_dw = dj_dw / m 
    dj_db = dj_db / m 
        
    return dj_dw, dj_db


def gradient_descent(x, y, w_in, b_in, alpha, num_iters, cost_function, gradient_function): 
    w = copy.deepcopy(w_in) # avoid modifying global w_in
    # An array to store cost J and w's at each iteration primarily for graphing later
    J_history = []
    p_history = []
    b = b_in
    w = w_in
    
    for i in range(num_iters):
        # Calculate the gradient and update the parameters using gradient_function
        dj_dw, dj_db = gradient_function(x, y, w , b)     

        # Update Parameters using equation (3) above
        b = b - alpha * dj_db                            
        w = w - alpha * dj_dw                            

        # Save cost J at each iteration
        if i<100000:      # prevent resource exhaustion 
            J_history.append( cost_function(x, y, w , b))
            p_history.append([w,b])
        # Print cost every at intervals 10 times or as many iterations if < 10
        if i% math.ceil(num_iters/10) == 0:
            print(f"Iteration {i:4}: Cost {J_history[-1]:0.2e} ",
                  f"dj_dw: {dj_dw: 0.3e}, dj_db: {dj_db: 0.3e}  ",
                  f"w: {w: 0.3e}, b:{b: 0.5e}")
 
    return w, b, J_history, p_history #return w and J,w history for graphing

# initialize parameters
w_init = 0
b_init = 0
# some gradient descent settings
iterations = 10000
tmp_alpha = 1.0e-2
# run gradient descent
w_final, b_final, J_hist, p_hist = gradient_descent(x_train ,y_train, w_init, b_init, tmp_alpha, 
                                                    iterations, compute_cost, compute_gradient)
print(f"(w,b) found by gradient descent: ({w_final:8.4f},{b_final:8.4f})")
```

- 输出示例

```output
Iteration    0: Cost 7.93e+04  dj_dw: -6.500e+02, dj_db: -4.000e+02   w:  6.500e+00, b: 4.00000e+00
Iteration 1000: Cost 3.41e+00  dj_dw: -3.712e-01, dj_db:  6.007e-01   w:  1.949e+02, b: 1.08228e+02
Iteration 2000: Cost 7.93e-01  dj_dw: -1.789e-01, dj_db:  2.895e-01   w:  1.975e+02, b: 1.03966e+02
Iteration 3000: Cost 1.84e-01  dj_dw: -8.625e-02, dj_db:  1.396e-01   w:  1.988e+02, b: 1.01912e+02
Iteration 4000: Cost 4.28e-02  dj_dw: -4.158e-02, dj_db:  6.727e-02   w:  1.994e+02, b: 1.00922e+02
Iteration 5000: Cost 9.95e-03  dj_dw: -2.004e-02, dj_db:  3.243e-02   w:  1.997e+02, b: 1.00444e+02
Iteration 6000: Cost 2.31e-03  dj_dw: -9.660e-03, dj_db:  1.563e-02   w:  1.999e+02, b: 1.00214e+02
Iteration 7000: Cost 5.37e-04  dj_dw: -4.657e-03, dj_db:  7.535e-03   w:  1.999e+02, b: 1.00103e+02
Iteration 8000: Cost 1.25e-04  dj_dw: -2.245e-03, dj_db:  3.632e-03   w:  2.000e+02, b: 1.00050e+02
Iteration 9000: Cost 2.90e-05  dj_dw: -1.082e-03, dj_db:  1.751e-03   w:  2.000e+02, b: 1.00024e+02
(w,b) found by gradient descent: (199.9929,100.0116)
```

- 接下来可以投喂数据集预测输出

```python
print(f"1000 sqft house prediction {w_final*1.0 + b_final:0.1f} Thousand dollars")
print(f"1200 sqft house prediction {w_final*1.2 + b_final:0.1f} Thousand dollars")
print(f"2000 sqft house prediction {w_final*2.0 + b_final:0.1f} Thousand dollars")
```

## 多元线性回归


### 向量化

- 原方法

$$
f_{\vec{w},b}(\vec{x})=\sum_{j=1}^{n}w_{j}x_{j}+b
$$

```python
f = 0
for j in range(n):
	f = f + w[j] * x[j]
f = f + b
```

- 向量化

$$
f_{\vec{w},b}(\vec{x})=\vec{w}\dot{\vec{x}}+b
$$

```python
f = np.dot(w,x) + b
```

- 原理

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250310103803265.png)

### 多元梯度下降


$$\begin{align*} \text{repeat}&\text{ until convergence:} \; \lbrace \newline\;
& w_j = w_j -  \alpha \frac{\partial J(\mathbf{w},b)}{\partial w_j} \tag{5}  \; & \text{for j = 0..n-1}\newline
&b\ \ = b -  \alpha \frac{\partial J(\mathbf{w},b)}{\partial b}  \newline \rbrace
\end{align*}$$

$$
\begin{align}
\frac{\partial J(\mathbf{w},b)}{\partial w_j}  &= \frac{1}{m} \sum\limits_{i = 0}^{m-1} (f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)})x_{j}^{(i)} \tag{6}  \\
\frac{\partial J(\mathbf{w},b)}{\partial b}  &= \frac{1}{m} \sum\limits_{i = 0}^{m-1} (f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)}) \tag{7}
\end{align}
$$


### @@ 多元梯度下降代码实现

```python
def compute_cost(X, y, w, b): 
    m = X.shape[0]
    cost = 0.0
    for i in range(m):                                
        f_wb_i = np.dot(X[i], w) + b           #(n,)(n,) = scalar (see np.dot)
        cost = cost + (f_wb_i - y[i])**2       #scalar
    cost = cost / (2 * m)                      #scalar    
    return cost

def compute_gradient(X, y, w, b): 
    m,n = X.shape           #(number of examples, number of features)
    dj_dw = np.zeros((n,))
    dj_db = 0.

    for i in range(m):                             
        err = (np.dot(X[i], w) + b) - y[i]   
        for j in range(n):                         
            dj_dw[j] = dj_dw[j] + err * X[i, j]    
        dj_db = dj_db + err                        
    dj_dw = dj_dw / m                                
    dj_db = dj_db / m                                
        
    return dj_db, dj_dw

def gradient_descent(X, y, w_in, b_in, cost_function, 
    # An array to store cost J and w's at each iteration primarily for graphing later
    J_history = []
    w = copy.deepcopy(w_in)  #avoid modifying global w within function
    b = b_in
    
    for i in range(num_iters):

        # Calculate the gradient and update the parameters
        dj_db,dj_dw = gradient_function(X, y, w, b)   ##None

        # Update Parameters using w, b, alpha and gradient
        w = w - alpha * dj_dw               ##None
        b = b - alpha * dj_db               ##None
      
        # Save cost J at each iteration
        if i<100000:      # prevent resource exhaustion 
            J_history.append( cost_function(X, y, w, b))

        # Print cost every at intervals 10 times or as many iterations if < 10
        if i% math.ceil(num_iters / 10) == 0:
            print(f"Iteration {i:4d}: Cost {J_history[-1]:8.2f}   ")
        
    return w, b, J_history #return final w,b and J history for graphing

# initialize parameters
X_train = np.array([[2104, 5, 1, 45], [1416, 3, 2, 40], [852, 2, 1, 35]])
y_train = np.array([460, 232, 178])
initial_w = np.zeros_like(w_init)
initial_b = 0.
# some gradient descent settings
iterations = 1000
alpha = 5.0e-7
# run gradient descent 
w_final, b_final, J_hist = gradient_descent(X_train, y_train, initial_w, initial_b,
                                                    compute_cost, compute_gradient, 
                                                    alpha, iterations)
print(f"b,w found by gradient descent: {b_final:0.2f},{w_final} ")
m,_ = X_train.shape
for i in range(m):
    print(f"prediction: {np.dot(X_train[i], w_final) + b_final:0.2f}, target value: {y_train[i]}")
```

### 特征缩放

- 目的是加速梯度下降的收敛
	- 由于不同特征的数量级可能会有差异，导致对应的 $w_{i}$ 权重更高，后果是梯度下降走 Z 字。

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250310195806439.png)


- 均值归一化 
$$
x_i := \dfrac{x_i - \mu_i}{max - min}
$$
- z-score 归一化
	- 归一化，所有要素平均值为 0，标准差为 1

$$
x^{(i)}_j = \dfrac{x^{(i)}_j - \mu_j}{\sigma_j} \tag{4}
$$ 
$$
\begin{align}
\mu_j &= \frac{1}{m} \sum_{i=0}^{m-1} x^{(i)}_j \tag{5}\\
\sigma^2_j &= \frac{1}{m} \sum_{i=0}^{m-1} (x^{(i)}_j - \mu_j)^2  \tag{6}
\end{align}
$$

### @@ z-score 归一化代码实现
```python
def zscore_normalize_features(X):
    """
    computes  X, zcore normalized by column
    
    Args:
      X (ndarray (m,n))     : input data, m examples, n features
      
    Returns:
      X_norm (ndarray (m,n)): input normalized by column
      mu (ndarray (n,))     : mean of each feature
      sigma (ndarray (n,))  : standard deviation of each feature
    """
    # find the mean of each column/feature
    mu     = np.mean(X, axis=0)                 # mu will have shape (n,)
    # find the standard deviation of each column/feature
    sigma  = np.std(X, axis=0)                  # sigma will have shape (n,)
    # element-wise, subtract mu for that column from each example, divide by std for that column
    X_norm = (X - mu) / sigma      

    return (X_norm, mu, sigma)
```

- axis=0 表示逐列求均值，axis=1 表示逐行求均值
- 下面是三种特征缩放的对比图

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250310191453830.png)

进行预测
```python
#predict target using normalized features
m = X_norm.shape[0]
yp = np.zeros(m)
for i in range(m):
    yp[i] = np.dot(X_norm[i], w_norm) + b_norm

    # plot predictions and targets versus original features    
fig,ax=plt.subplots(1,4,figsize=(12, 3),sharey=True)
for i in range(len(ax)):
    ax[i].scatter(X_train[:,i],y_train, label = 'target')
    ax[i].set_xlabel(X_features[i])
    ax[i].scatter(X_train[:,i],yp,color=dlc["dlorange"], label = 'predict')
ax[0].set_ylabel("Price"); ax[0].legend();
fig.suptitle("target versus prediction using z-score normalized model")
plt.show()
```

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250310195128783.png)

- 用于预测的 input 也必须标准化

#### 怎么选择合适的学习率
- 尝试并观察参数变化

### 特征工程


## 符号声明

|           General Notation           |                                                                          Description                                                                          | Python (if applicable) |
| :----------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------: |
|                 $a$                  |                                                                       scalar, non-bold                                                                        |                        |
|             $\mathbf{a}$             |                                                                         vector, bold                                                                          |                        |
|             $\mathbf{A}$             |                                                                     matrix, bold capital                                                                      |                        |
|            **Regression**            |                                                                                                                                                               |                        |
|             $\mathbf{X}$             |                                                                    training example matrix                                                                    |       `X_train`        |
|             $\mathbf{y}$             |                                                                   training example targets                                                                    |       `y_train`        |
|    $\mathbf{x}^{(i)}$, $y^{(i)}$     |                                                                   $i_{th}$ Training Example                                                                   |     `X[i]`, `y[i]`     |
|                 $m$                  |                                                                  number of training examples                                                                  |          `m`           |
|                 $n$                  |                                                              number of features in each example                                                               |          `n`           |
|             $\mathbf{w}$             |                                                                       parameter: weight                                                                       |          `w`           |
|                 $b$                  |                                                                        parameter: bias                                                                        |          `b`           |
| $f_{\mathbf{w},b}(\mathbf{x}^{(i)})$ | The result model evaluation at $\mathbf{x}^{(i)}$ parameterized by $\mathbf{w},b$: $f_{\mathbf{w},b}(\mathbf{x}^{(i)}) = \mathbf{w} \cdot \mathbf{x}^{(i)}+b$ |         `f_wb`         |
