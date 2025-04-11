# 机器学习补充

!!! note ""
    - 对这篇笔记的补充-- [Machine Learning](../ml/wedml.md)

## 滑动窗口目标检测

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409074521942.png)

不同大小方格均匀切片，检测这些切片上有无汽车

### 卷积实现

上述算法，切片有重叠部分，导致计算性能严重浪费
改进：
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409074848555.png)

以第二幅图为例，最后得到的每个 1x1x4 的张量就包含了四个位置的图像信息

## Bouding Box 预测
### YOLO
Means "you only look once"

训练集：把图像均匀切片，标出待检测目标的中心，根据中心确认图像属于哪个方格，标出边框数据，

构造神经网络, 下图为例，最后要得到 3x3x8 的张量

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409075658980.png)
### 交并比 (IoU)
intersection over union

实际预测时，往往会得到多个预测结果 
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409080022158.png)
IoU 计算的是边界框交集和并集之比，通常 IoU >=0.5 认为检测有效
### 非极大值抑制
目标：确保 YOLO 对每个对象只检测一次

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409080320339.png)
先找出 $P_{c}$ 最高的边框，随后检查其它的边界框，和这个边界框有很大的交并比并且高度重叠的其它边界框被抑制

另外，如果需要同时检测多个目标，最好分别使用非极大值抑制
### Anchor Boxes
目的：让 YOLO 中的一个格子可以检测出多个对象
方法：扩充张量，如下图
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409080843833.png)
同样进行阈值过滤，非极大值抑制，然后输出

## 人脸识别
难点：只有一个训练样本

Siamase network
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409092539230.png)
计算输出张量的差异判断是否为同一个人

### Triplet Loss

损失函数： 

$$
d(A,B) = \mid\mid(f(A)-f(B)\mid\mid^{2}
$$
成本函数： 

$$
\mathcal{J} = -\sum^{}_{} L(A,P,N)
$$

我们希望在构建三元组训练集的时候选一些更难判断的例子，提高学习效果

**这个损失有什么用呢**：在测试阶段，模型会将输入的人脸图像映射到一个**特征向量**（人脸嵌入），然后通过计算这个向量与数据库中已知用户的特征向量之间的**距离**，来判断是否为同一个人。

**关系**：三元损失在训练时优化了这个特征向量的空间布局，使得相同人的人脸特征向量尽量接近，不同人的人脸特征向量尽量远离。这样，在实际应用中，模型可以通过距离比较准确地判断人脸的相似度，从而实现识别或验证。

### 二分类解决面部识别
一张图肯定清楚了
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409093635084.png)
## 风格迁移
**成本函数**：

$$
J(G) = \alpha J_{content}(C,G) + \beta J_{style}(S,G)
$$ 
流程：随机初始化 G (generate)->梯度下降最小化 J (G)

**内容代价函数：**

$$
J_{content}(C,G) =  \frac{1}{4 \times n_H \times n_W \times n_C}\sum _{ \text{all entries}} (a^{(C)} - a^{(G)})^2 
$$
如果把内容代价函数放在神经网络的浅层计算，会导致颗粒度太小，反之颗粒度太大，所以一般在中等层次进行评估

**风格代价函数 (单层)**:

$$
J_{style}^{[l]}(S,G) = \frac{1}{4 \times {n_C}^2 \times (n_H \times n_W)^2} \sum _{i=1}^{n_C}\sum_{j=1}^{n_C}(G^{(S)}_{ij} - G^{(G)}_{ij})^2
$$

每个 channel 都对应着一种特征的提取，只要把 S 和 G 分别计算风格矩阵并进行比较

**多层整合：**

$$
J_{style}(S,G) = \sum_{l} \lambda^{[l]} J^{[l]}_{style}(S,G)
$$

## RNN

这里感觉图比文字管用
建立直觉：。RNN 的本质是 **记忆与预测的循环**。它通过不断地将历史信息传递到下一时间步，从而增强了模型的记忆能力，能够做出基于历史的更精准的预测。
下面来看细节

simple (standard) RNN
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409164710433.png)

每一个 cell 的细节部分
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409164906553.png)


RNN 的反向传播
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165002398.png)
其它各种各样的模型
不是所有应用都是输入输出序列相同的，翻译-多对多，打分-一对多
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165024525.png)
### LSTM
长短时记忆 (long short-term memory)
为什么要有这个机制：举个例子，当你需要模型生成一段英语，可能前面已有的主语是 cats, 若干单词之后需要生成 was 或者 were，此时模型有遗忘的可能 (因为相差太远了)，此时引入 LSTM 的门机制，来帮助模型记忆一些重要内容。

![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165158759.png)

LSTM 的前向传播
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165243280.png)
### BRNN
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165719005.png)

缺点是要全部输入完成才能得到结果
### 深层循环神经网络
![image.png](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250409165655449.png)

## 上篇笔记的概念补充

### Dropout
下面是 ChatGPT 的回答：
Dropout 是一种在训练神经网络时用来 **减少过拟合** 的技术。简单来说，过拟合是指模型在训练数据上表现得很好，但在新的、未见过的数据上表现得很差。Dropout 通过在训练过程中随机丢弃（"drop"）神经网络中某些神经元，来防止模型过度依赖某些特定的神经元，从而增强模型的泛化能力。

**Dropout 在训练和推理时的不同**

- **训练时**：Dropout 会丢弃部分神经元，使模型不依赖某个特定神经元。
    
- **推理时**：在推理（预测）阶段，Dropout 不再丢弃神经元，所有神经元都参与计算。但为了保持训练时的输出一致，推理时的输出通常会乘以一个缩放因子，通常是 1−dropout rate1 - \text{dropout rate}1−dropout rate。
**5. 使用代码示例**

```python
import torch
import torch.nn as nn
import torch.optim as optim

class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(784, 256)  
        self.fc2 = nn.Linear(256, 128)  
        self.fc3 = nn.Linear(128, 10)   
        self.dropout = nn.Dropout(0.5)  # 添加 Dropout，丢弃 50% 的神经元
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)  # 在第一个隐藏层后应用 Dropout
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)  # 在第二个隐藏层后应用 Dropout
        x = self.fc3(x)
        return x


model = SimpleNN()
optimizer = optim.SGD(model.parameters(), lr=0.01)

input_data = torch.randn(32, 784)  
output_data = torch.randint(0, 10, (32,)) 

optimizer.zero_grad()
output = model(input_data)

criterion = nn.CrossEntropyLoss()
loss = criterion(output, output_data)

loss.backward()
optimizer.step()
```

### Momentum
Momentum 用于帮助梯度下降算法加速收敛。传统的梯度下降算法在更新模型参数时，每次只考虑当前梯度方向，容易陷入局部最优或者在鞍点附近波动。而Momentum通过引入“动量”概念，考虑了历史梯度信息，帮助加速收敛并抑制震荡。

优化后的梯度计算：
$$
v_{t+1} = \beta \cdot v_t + (1 - \beta) \cdot \nabla_{\theta} J(\theta_t)
$$
$\beta$ 一般为 0.9，这种方式很大程度保留了原始的梯度

###  RMSprop

RMSprop 通过调整每个参数的学习率，来提高梯度下降算法的效率。它的核心思想是根据每个参数的梯度的平方的均值来调整学习率，以减少学习率过大或过小导致的问题，特别是在非凸优化问题中（比如深度学习中的复杂损失面）。

与传统的梯度下降不同，RMSprop 通过计算梯度的平方的均值，来动态调整学习率，使得较大的梯度得到较小的更新，而较小的梯度则得到较大的更新，从而加速了优化过程。

$$
v_t = \beta \cdot v_{t-1} + (1 - \beta) \cdot (\nabla_{\theta} J(\theta_t))^2
$$

$$
\theta_{t+1} = \theta_{t} - \frac{\eta}{\sqrt{v_t + \epsilon}} \cdot \nabla_{\theta} J(\theta_t)
$$

$\epsilon$ 通常是 $10^{-8}$ ，防止除数为 0