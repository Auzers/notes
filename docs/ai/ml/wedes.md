---
tags:
    - 环境配置
---


## windows 环境配置

### 必要的检查
```bash
python --version
pip --version
```

### 创建虚拟环境

- 目的：隔离项目依赖
```bash
python -m venv ml-ng # 创建名为 ml-ng 的虚拟环境，当然你可以自己定
```

```bash
.\ml-ng\Scripts\Activate.ps1 # Windows PowerShell
# OR
ml-ng\Scripts\activate.bat # cmd
```

### 安装库
```bash
pip install numpy matplotlib scipy h5py jupyter -i https://pypi.tuna.tsinghua.edu.cn/simple # 清华源加速
# 可以自行添加版本号如 pip install numpy==1.23.0,不添加默认最新版
```

### 关联 Jupyter notebook
```bash
python -m ipykernel install --user --name ml-ng --display-name "ML-NG"
```

### 测试
```bash
jupyter notebook # 启动
```

新建 python 文件，运行以下代码，如果出现正弦曲线则配置完成

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.title('Sin Function')
plt.show()

```
